import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/internal/operators/map';
import { merge } from 'rxjs';
import { forkJoin } from 'rxjs';

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
import { TaskModel } from '../plan/models/task.model';
import { Marker, MarkerIcon } from '../../shared/services/map/marker.model';
import { VerifyUtil } from '../../shared/utils/verify-utils';

@Component({
    selector   : 'app-monitor',
    templateUrl: './monitor.component.html',
    styleUrls  : [ './monitor.component.scss' ]
})
export class MonitorComponent implements OnInit {
    /* 面包屑导航 */
    breadcrumbs = [
        {
            link : '/',
            title: '实时导航',
        },
    ];
    isShowSideBar = false;
    isShowCity = false;
    isShowGasStation = false;
    isShowTaskTable = false;

    map: any;   // 高德地图对象
    markers: any[] = []; // 高德覆盖物对象

    routeListCache: RouteListModel[];
    taskListCache: TaskModel[];

    constructor(private mapService: MapService,
                private monitorService: MonitorService) {
    }

    ngOnInit() {
        this.initMap()
            .getPlanList();
    }

    initMap(): MonitorComponent {
        const subscription = this.mapService.initMap().subscribe((hasLoaded: boolean) => {
            if (hasLoaded) {
                this.map = this.mapService.createMap(new Map('map', [ 113.18691, 23.031716 ], 15));
                if (subscription) {
                    subscription.unsubscribe(); // 取消定时器
                }
            }
        });
        return this;
    }

    onToggleSideBar(e: boolean) {
        console.log(e);
    }

    onToggleCity(e: boolean) {
        console.log(e);
    }

    onToggleGasStation(e: boolean) {
        console.log(e);
    }

    onSelectRoute($e, item: RouteListModel) {
        this.onStopPro($e);
        if (item.checked) {
            item.checked = false;
            this.taskListCache = [];
            this.isShowTaskTable = false;
        } else {
            this.routeListCache.forEach((r: RouteListModel) => {
                r.checked = false;
            });
            item.checked = true;
            this.isShowTaskTable = true;
            this.getTaskList(item.id);
        }
        if (item.checked && VerifyUtil.isNotEmpty(item.vehicle.lng) && VerifyUtil.isNotEmpty(item.vehicle.lat)) {
            this.createVehicleMarker([ item.vehicle.lng, item.vehicle.lat ]);
        }
    }

    onClickTask($event, item) {
        this.onStopPro($event);
        console.log(item);
    }

    onCollapseTask(data: TaskModel, e: boolean) {
        this.taskListCache.forEach((d: TaskModel) => {
            if (d.id === data.id) {
                d.expand = e;
                return;
            }
        });
    }

    onStopPro($e) {
        $e.stopPropagation();
    }

    /**
     * 获取“执行中”的方案
     */
    getPlanList() {
        this.monitorService
            .getPlanList(new PageReq(1, 50), { status: 'Executing' })
            .pipe(
                map((res: Result<PageRes<PlanRes[]>>) => res.data.content),
                map((res: PlanRes[]) => res.map((p: PlanRes) => p.id))
            )
            .subscribe((res: number[]) => {
                this.getRouteList(res);
            });
    }

    /**
     * 获取‘执行中方案’的所有线路
     */
    getRouteList(planIds: number[]) {
        this.monitorService.getRouteList({ planIds }).subscribe((res: Result<RouteModel[]>) => {
            if (res.data) {
                this.routeListCache = res.data.map((r: RouteModel) => ModelConverter.routeResToListModel(r));
            }
        });
    }

    /**
     * 获取‘选中线路’的任务
     *
     * 收运任务状态
     * ToDo：待收集-绿色
     * Going：正在前往- TODO
     * Collecting：收集中-蓝色
     * Delay：延缓（挂起）-黄色
     * Skipped：跳过-红色
     * Completed：完成收集-灰色
     */
    getTaskList(routeId: number) {
        this.monitorService.getTaskList(routeId).subscribe((res: Result<TaskModel[]>) => {
            this.taskListCache = res.data.map((t: TaskModel) => ModelConverter.taskResToListModel(t));
            console.log('taskList::', this.taskListCache);
        });
    }

    /** start of map **/

    /**
     * @param lngLat [经度, 维度]
     */
    setCenter(lngLat: number[]) {
        this.mapService.setCenter(lngLat);
    }

    createVehicleMarker(lngLat: number[]) {
        if (this.markers.length > 0) {
            this.removeMarkers(this.markers);
        }
        const marker = new Marker({
            map     : this.map,
            position: lngLat,
            icon    : new MarkerIcon({
                size: [56, 85],
                image: 'assets/images/map-icon/marker_bg.svg',
            }),
        });
        this.markers = [ ...this.markers, this.mapService.createMarker(marker) ];
        this.setCenter(lngLat);
        console.log(this.mapService.getAllOverlays('marker')[0].getIcon());
        // const marker = new AMap.Marker({
        //    map: this.map,
        //    position: lngLat,
        //    icon: 'assets/images/map-icon/marker_bg.svg',
        // });
        // this.markers = [
        //    ...this.markers,
        //    marker,
        // ]
    }

    removeMarkers(markers: any[]) {
        if (markers) {
            this.mapService.removeAllMarkers(markers);
            this.markers = [];
        }
    }

    /** end of map **/
}
