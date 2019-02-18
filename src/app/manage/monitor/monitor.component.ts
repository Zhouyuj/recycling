import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs/index';
import { map } from 'rxjs/internal/operators/map';

import { MapService } from '../../shared/services/map/map.service';
import { MonitorService } from './monitor.service';

import { Map } from './models/map.model';
import { ModelConverter } from './models/model-converter';
import { PageReq } from '../../shared/models/page/page-req.model';
import { PageRes } from '../../shared/models/page/page-res.model';
import { PlanRes } from '../plan/models/plan-res.model';
import { Result } from '../../shared/models/response/result.model';
import { RouteModel } from '../plan/models/route.model';
import { RouteListModel } from '../plan/models/route.model';
import { TaskModel, TaskState } from '../plan/models/task.model';
import { Marker } from '../../shared/services/map/marker.model';
import { VerifyUtil } from '../../shared/utils/verify-utils';
import { TableBasicComponent } from '../table-basic.component';
import { Driving } from 'src/app/shared/services/map/driving.model';

@Component({
    selector   : 'app-monitor',
    templateUrl: './monitor.component.html',
    styleUrls  : [ './monitor.component.scss' ]
})
export class MonitorComponent extends TableBasicComponent implements OnInit {
    /* 面包屑导航 */
    breadcrumbs = [
        {
            link : '/',
            title: '实时监控',
        },
    ];
    isShowSideBar = false;
    isShowCity = false;
    isShowGasStation = false;
    isShowTaskTable = false;

    map: Map;   // 高德地图对象
    stationMarkers: Marker[] = [];
    vehicleMarkers: Marker[] = [];

    routeListCache: RouteListModel[];
    taskListCache: TaskModel[];
    routeListSubject$: Subject<RouteListModel[]> = new Subject<RouteListModel[]>();
    taskListSubject$: Subject<TaskModel[]> = new Subject<TaskModel[]>();

    private drivingService: any;

    constructor(private mapService: MapService,
                private monitorService: MonitorService) {
        super();
    }

    ngOnInit() {
        this.calcTableScrollY();

        this.initMap().subscribe(() => {
            this.createDrivingService();
            this.executePlanWithRoute();
        });

        this.routeListSubject$.subscribe((routeList: RouteListModel[]) => {
            this.removeVehicleMarkers();
            this.createVehicleMarkers(routeList);
            // 每10秒刷新车辆位置
            interval(10000).subscribe(() => {
                this.removeVehicleMarkers();
                this.createVehicleMarkers(routeList);
            });
        });

        this.taskListSubject$.subscribe((taskModelList: TaskModel[]) => {
            this.removeStationMarkers();
            this.createStationMarkers(taskModelList);
            this.drawRouteWaypoints(taskModelList);
        });
    }

    initMap() {
        const subject = new Subject();
        const subscription = this.mapService.initMap().subscribe((hasLoaded: boolean) => {
            if (hasLoaded) {
                this.map = this.mapService.createMap(new Map('map', [ 113.18691, 23.031716 ], 15));
                if (subscription) {
                    subscription.unsubscribe(); // 取消定时器
                    subject.next(true);
                }
            }
        });
        return subject;
    }

    onToggleSideBar(e: boolean) {
        // console.log(e);
    }

    onToggleCity(e: boolean) {
        // console.log(e);
    }

    onToggleGasStation(e: boolean) {
        // console.log(e);
    }

    onSelectRoute($event: Event, item: RouteListModel) {
        this.onStopPro($event);
        if (item.checked) {
            item.checked = false;
            this.taskListCache = [];
            this.isShowTaskTable = false;
            this.removeStationMarkers();
            this.clearRouteWaypoints();
        } else {
            this.routeListCache.forEach((routeItem: RouteListModel) => {
                routeItem.checked = false;
            });
            item.checked = true;
            this.isShowTaskTable = true;
            this.getTaskList(item.id);
        }
    }

    onClickTask($event: Event, item: TaskModel) {
        this.onStopPro($event);
        if (item.lng && item.lat) {
            this.setCenter([item.lng, item.lat]);
        }
    }

    onCollapseTask(data: TaskModel, e: boolean) {
        this.taskListCache.forEach((d: TaskModel) => {
            if (d.id === data.id) {
                d.expand = e;
                return;
            }
        });
    }

    onStopPro($event: Event): void {
        $event.stopPropagation();
    }

    /**
     * 获取“执行中”的方案
     */
    getPlanList(): Observable<number[]> {
        return this.monitorService
            .getPlanList(new PageReq(1, 50), { status: 'Executing' })
            .pipe(
                map((res: Result<PageRes<PlanRes[]>>) => res.data.content),
                map((res: PlanRes[]) => res.map((p: PlanRes) => p.id))
            );
    }

    /**
     * 获取‘执行中方案’的所有线路
     */
    getRouteList(planIds: number[]): Observable<Result<RouteModel[]>> {
        return this.monitorService.getRouteList({ planIds });
    }

    /**
     * 获取‘选中线路’的任务
     *
     * 收运任务状态
     * ToDo：待收集-绿色
     * Going：正在前往-蓝色
     * Collecting：收集中-蓝色
     * Delay：延缓（挂起）-黄色
     * Skipped：跳过-红色
     * Completed：完成收集-灰色
     */
    getTaskList(routeId: number) {
        this.monitorService.getTaskList(routeId).subscribe((res: Result<TaskModel[]>) => {
            this.taskListCache = res.data.map((t: TaskModel) => ModelConverter.taskResToListModel(t, routeId));
            this.taskListSubject$.next(this.taskListCache);
        });
    }

    /**
     * 根据执行中的方案，获取所属的所有线路数据
     */
    executePlanWithRoute(): void {
        const planList = this.getPlanList();
        planList.subscribe((planRes: number[]) => {
            const routeList = this.getRouteList(planRes);
            routeList.subscribe((routeRes: Result<RouteModel[]>) => {
                if (routeRes.data) {
                    this.routeListCache = routeRes.data.map((r: RouteModel) => ModelConverter.routeResToListModel(r));
                    this.routeListSubject$.next(this.routeListCache);
                }
            });
        });
    }

    /** start of map **/

    /**
     * @param lngLat [经度, 维度]
     */
    setCenter(lngLat: number[]): void {
        this.mapService.setCenter(lngLat);
    }

    createDrivingService(): void {
        const drivingModel = new Driving({
            map: this.map,
            hideMarkers: true
        });
        this.drivingService = this.mapService.createDriving(drivingModel);
    }

    clearRouteWaypoints() {
        this.drivingService.clear();
    }

    /**
     * 根据任务列表数据直接在地图上画出行车路径
     * 如果数据是有5个点，会由起点一直画到终点（包括起点终点之间的途经点）
     *
     * @param taskModelList
     */
    drawRouteWaypoints(taskModelList: TaskModel[]) {
        const firstTaskModel: TaskModel = taskModelList[0];
        const lastLenght: number = taskModelList.length - 1;
        const lastTaskModel: TaskModel = taskModelList[lastLenght];
        const matchRoute = this.routeListCache.find((route: RouteModel) => route.id === firstTaskModel.routeId);
        const waypoints: number[] = [];
        taskModelList.forEach((taskModel: TaskModel, index: number) => {
            if (index === lastLenght) {
                return;
            }
            waypoints.push(this.mapService.lngLat([taskModel.lng, taskModel.lat]));
        });
        this.drivingService.search(
            new AMap.LngLat(matchRoute.vehicle.lng, matchRoute.vehicle.lat),
            new AMap.LngLat(lastTaskModel.lng, lastTaskModel.lat),
            {waypoints}
        );
    }

    convertTaskStateToColor(state: string): string {
        let color: string;
        switch (state) {
        case TaskState.ToDo:
            color = '#79cf6b'; // green
            break;
        case TaskState.Going:
        case TaskState.Collecting:
            color = '#42b4fc'; // blue
            break;
        case TaskState.Delay:
            color = '#fdc034'; // yellow
            break;
        case TaskState.Skipped:
            color = '#ce4544'; // red
            break;
        case TaskState.Completed:
            color = '#9d9d9d'; // gray
            break;
        }
        return color;
    }

    createMarkerContentForNumber(num = 1, color: string): string {
        return '' +
            '<div class="map-marker-content-station">' +
            '    <img src="assets/images/map-icon/marker_bg.svg">' +
            '    <div class="map-marker-text" style="background-color:' + color + '">' + num + '</div>' +
            '</div>';
    }

    createMarkerContentForCar(plateNumber: string): string {
        return '' +
            '<div class="map-marker-content-vehicle">' +
            '    <img src="assets/images/map-icon/vehicle.png">' +
            '    <div class="map-marker-label-vehicle">' + plateNumber + '</div>' +
            '</div>';
    }

    createStationMarker(lngLat: number[], text = 1, state: string): void {
        const marker = new Marker({
            map     : this.map,
            position: lngLat,
            content: this.createMarkerContentForNumber(text, this.convertTaskStateToColor(state)),
            offset: [-24, -50]
        });
        const amapMarker = this.mapService.createMarker(marker);
        this.stationMarkers.push(amapMarker);
    }

    createVehicleMarker(lngLat: number[], text: string): void {
        const marker = new Marker({
            map     : this.map,
            position: lngLat,
            content: this.createMarkerContentForCar(text),
            offset: [-24, -50]
        });
        const amapMarker = this.mapService.createMarker(marker);
        this.vehicleMarkers.push(amapMarker);
    }

    createVehicleMarkers(routeList: RouteModel[]): void {
        routeList.forEach((item: RouteListModel) => {
            if (VerifyUtil.isNotEmpty(item.vehicle.lng) &&
                VerifyUtil.isNotEmpty(item.vehicle.lat) &&
                VerifyUtil.isNotEmpty(item.vehicle.plateNumber)) {
                this.createVehicleMarker([item.vehicle.lng, item.vehicle.lat], item.vehicle.plateNumber);
            }
        });
    }

    createStationMarkers(taskModelList: TaskModel[]): void {
        taskModelList.forEach((item: TaskModel) => {
            if (VerifyUtil.isNotEmpty(item.lng) &&
                VerifyUtil.isNotEmpty(item.lat) &&
                VerifyUtil.isNotEmpty(item.priority)) {
                this.createStationMarker([item.lng, item.lat], item.priority, item.state);
            }
        });
    }

    removeVehicleMarkers(): void {
        this.removeMarkers(this.vehicleMarkers);
        this.vehicleMarkers = [];
    }

    removeStationMarkers(): void {
        this.removeMarkers(this.stationMarkers);
        this.stationMarkers = [];
    }

    removeMarkers(markers: Marker[]): void {
        if (markers) {
            this.mapService.removeAllMarkers(markers);
        }
    }

    /** end of map **/
}
