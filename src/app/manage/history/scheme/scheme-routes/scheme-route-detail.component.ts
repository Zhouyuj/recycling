import { OnInit, Component } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { MapService } from 'src/app/shared/services/map/map.service';
import { Map } from 'src/app/shared/services/map/map.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouteModel } from 'src/app/manage/plan/models/route.model';
import { Marker } from 'src/app/shared/services/map/marker.model';
import { TableBasicComponent } from 'src/app/manage/table-basic.component';
import { HistoryService } from '../../history.service';
import { TaskModel, TaskState } from 'src/app/manage/plan/models/task.model';
import { Result } from 'src/app/shared/models/response/result.model';
import { Driving } from 'src/app/shared/services/map/driving.model';
import { VerifyUtil } from 'src/app/shared/utils/verify-utils';

@Component({
    selector: 'app-history-scheme-route-detail',
    templateUrl: './scheme-route-detail.component.html',
    styleUrls: [ './scheme-route-detail.component.scss' ]
})
export class SchemeRouteDetailComponent extends TableBasicComponent implements OnInit {

    percent = 0;
    speed = 1;
    isPlay = false;
    isOpen = false;
    interval$: any;
    currentRoute: RouteModel | any;
    listCache: TaskModel[];
    map: Map;

    private drivingService: any;

    constructor(
        private mapService: MapService,
        private historyService: HistoryService,
        private location: Location,
        private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.calcTableScrollY(-50);
        this.initMap().subscribe(() => {
            const lngLat = [
                this.currentRoute.vehicle.lng,
                this.currentRoute.vehicle.lat,
            ];
            this.setCenter(lngLat);
            this.createVehicleMarker(lngLat, this.currentRoute.vehicle.plateNumber);
            this.createDrivingService();
            this.searchTaskListWithRender();
        });
        this.assembleRouteByParams();
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

    searchTaskListWithRender(): void {
        this.historyService.getTaskList(this.currentRoute.id)
        .subscribe((result: Result<TaskModel[]>) => {
            this.listCache = result.data;
            this.createVehicleMarkers(this.listCache);
        });
    }

    assembleRouteByParams(): void {
        this.route.paramMap.subscribe((params) => {
            this.currentRoute = {
                id: +params.get('id'),
                name: params.get('name'),
                driver: params.get('driver'),
                vehicle: {
                    plateNumber: params.get('plateNumber'),
                    lat: +params.get('lat'),
                    lng: +params.get('lng'),
                },
                collectionQuantity: +params.get('collectionQuantity'),
                weighedQuantity: +params.get('weighedQuantity')
            };
        });
    }

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
        if (firstTaskModel) {
            const waypoints: number[] = [];
            taskModelList.forEach((taskModel: TaskModel, index: number) => {
                if (index === lastLenght) {
                    return;
                }
                waypoints.push(this.mapService.lngLat([taskModel.lng, taskModel.lat]));
            });
            this.drivingService.search(
                new AMap.LngLat(this.currentRoute.vehicle.lng, this.currentRoute.vehicle.lat),
                new AMap.LngLat(lastTaskModel.lng, lastTaskModel.lat),
                {waypoints}
            );
        }
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

    createStationMarker(lngLat: number[], text = 1, state: string): void {
        const marker = new Marker({
            map     : this.map,
            position: lngLat,
            content: this.createMarkerContentForNumber(text, this.convertTaskStateToColor(state)),
            offset: [-24, -50]
        });
        const amapMarker = this.mapService.createMarker(marker);
    }

    createMarkerContentForCar(plateNumber: string): string {
        return '' +
            '<div class="map-marker-content-vehicle">' +
            '    <img src="assets/images/map-icon/vehicle.png">' +
            '    <div class="map-marker-label-vehicle">' + plateNumber + '</div>' +
            '</div>';
    }

    createVehicleMarker(lngLat: number[], text: string): void {
        const marker = new Marker({
            map     : this.map,
            position: lngLat,
            content: this.createMarkerContentForCar(text),
            offset: [-24, -50]
        });
        const amapMarker = this.mapService.createMarker(marker);
    }

    createVehicleMarkers(taskList: TaskModel[]) {
        taskList.forEach((task: TaskModel) => {
            if (VerifyUtil.isNotEmpty(task.lng) &&
                VerifyUtil.isNotEmpty(task.lat) &&
                VerifyUtil.isNotEmpty(task.priority)) {
                this.createStationMarker([task.lng, task.lat], task.priority, task.state);
            }
        });
    }

    onBack() {
        this.location.back();
    }

    onToCenter() {
        this.setCenter([
            this.currentRoute.vehicle.lng,
            this.currentRoute.vehicle.lat,
        ]);
    }

    onPlanRoute() {
        this.drawRouteWaypoints(this.listCache);
    }

    onToggle() {
        this.isOpen = !this.isOpen;
    }

    onTest() {
        if (this.isPlay) {
            this.interval$.unsubscribe();
        } else {
            this.interval$ = timer(1000, 1000 / this.speed).subscribe(() => {
                if (this.percent < 100) {
                    this.percent += 1;
                }
            });
        }
        this.isPlay = !this.isPlay;
    }
}
