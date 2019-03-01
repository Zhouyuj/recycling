import { OnInit, Component } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { MapService } from 'src/app/shared/services/map/map.service';
import { Map, ILngLat } from 'src/app/shared/services/map/map.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouteModel } from 'src/app/manage/plan/models/route.model';
import { Marker, MarkerType } from 'src/app/shared/services/map/marker.model';
import { TableBasicComponent } from 'src/app/manage/table-basic.component';
import { HistoryService } from '../../history.service';
import { TaskModel, TaskState } from 'src/app/manage/plan/models/task.model';
import { Result } from 'src/app/shared/models/response/result.model';
import { Driving } from 'src/app/shared/services/map/driving.model';
import { VerifyUtil } from 'src/app/shared/utils/verify-utils';
import { LocationModel } from '../../models/location.model';
import { DateUtil } from 'src/app/shared/utils/date-utils';

@Component({
    selector: 'app-history-scheme-route-detail',
    templateUrl: './scheme-route-detail.component.html',
    styleUrls: [ './scheme-route-detail.component.scss' ]
})
export class SchemeRouteDetailComponent extends TableBasicComponent implements OnInit {

    /**
     * Map component
     */
    vehicleMarkerType: MarkerType = MarkerType.VEHICLE;
    stationMarkerType: MarkerType = MarkerType.STATION;
    currentRoute: RouteModel | any;
    startLngLat: ILngLat;
    runPlanVehiclePosition: ILngLat;
    /**
     * Monitor component
     */
    percent = 0;
    speed = 1;
    isPlay = false;
    isOpen = false;
    hasRunPlan = false;
    isSpinning = false;
    interval$: any;

    taskList: TaskModel[];
    locationList: LocationModel[];
    map: Map;

    taskPaneHeight: string;
    startTime: string;
    endTime: string;
    timeDiffIndex = 0;

    runPlanVechileMarker: any;

    private drivingRunPlanService: any;
    private drivingPlanRouteService: any;
    private onPlanRoute$ = new Subject<boolean>();
    private onRunPlan$ = new Subject<boolean>();
    private onRunPlanVehicleRemove$ = new Subject<boolean>();
    private onRunPlanVehicleCreate$ = new Subject<boolean>();
    private onSetCenter$ = new Subject<ILngLat>();

    constructor(
        private mapService: MapService,
        private historyService: HistoryService,
        private location: Location,
        private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.calcTableScrollY(-50);
        this.calcTaskPaneHeight();

        this.assembleRouteByParams();
        this.getTaskList();

        this.startTime = DateUtil.dateFormat(new Date(this.currentRoute.startTime), 'h:m:s');
        this.endTime = DateUtil.dateFormat(new Date(this.currentRoute.endTime), 'h:m:s');

        if (this.currentRoute.vehicle.id &&
            this.startTime !== 'NaN:NaN:NaN' &&
            this.endTime !== 'NaN:NaN:NaN') {
            // this.historyService.getLocations(100, 1551075913000, 1551091519000)
            this.historyService.getLocations(this.currentRoute.vehicle.id, this.currentRoute.startTime, this.currentRoute.endTime)
                .subscribe((result: Result<LocationModel[]>) => {
                    this.locationList = result.data;
                    if (this.locationList) {
                        this.hasRunPlan = true;
                        this.setStartLngLat(
                            this.locationList[0].longitude,
                            this.locationList[1].latitude
                        );
                        this.setCenter(this.startLngLat);
                    }
            });
        }
    }

    calcTaskPaneHeight(): void {
        this.taskPaneHeight = (+this.tableScrollY.replace('px', '') - 60) + 'px';
    }

    getTaskList(): void {
        this.isSpinning = true;
        this.historyService.getTaskList(this.currentRoute.id)
            .subscribe((result: Result<TaskModel[]>) => {
                this.isSpinning = false;
                this.taskList = result.data;
            });
    }

    onDragEvent(event, property: TaskModel) {
        this.historyService.updateCustomerLocation(property.customerId, {
            lng: event.lnglat.O,
            lat: event.lnglat.P
        }).subscribe(console.log);
    }

    assembleRouteByParams(): void {
        this.route.paramMap.subscribe((params) => {
            let date: any = this.transformParamValue(params.get('date'));
            if (date.length > 0) {
                date = date.substr(0, 10);
            }
            this.currentRoute = {
                id: this.transformParamValue(+params.get('id')),
                name: this.transformParamValue(params.get('name')),
                driver: this.transformParamValue(params.get('driver')),
                vehicle: {
                    id: this.transformParamValue(+params.get('vehicleId')),
                    plateNumber: this.transformParamValue(params.get('plateNumber')),
                    lat: this.transformParamValue(+params.get('lat')),
                    lng: this.transformParamValue(+params.get('lng')),
                },
                startTime: this.transformParamValue(+params.get('startTime')),
                endTime: this.transformParamValue(+params.get('endTime')),
                collectionQuantity: this.transformParamValue(+params.get('collectionQuantity')),
                weighedQuantity: this.transformParamValue(+params.get('weighedQuantity')),
                date
            };
            this.setStartLngLat(this.currentRoute.vehicle.lng, this.currentRoute.vehicle.lat);
        });
    }

    transformParamValue(value: string | number): string | number {
        if (isNaN(<number>value) && typeof value === 'number') {
            return '';
        }
        if (value === 'null' || value === 'undefined') {
            return '';
        }
        return value;
    }

    setStartLngLat(lng: number, lat: number) {
        this.startLngLat = { lng, lat };
    }

    setCenter(lngLat: ILngLat): void {
        this.onSetCenter$.next(lngLat);
    }

    createDrivingService(): void {
        const drivingRunPlanModel = new Driving({
            map: this.map,
            hideMarkers: true
        });
        this.drivingRunPlanService = this.mapService.createDriving(drivingRunPlanModel);
        const drivingPlanRouteModel = new Driving({
            map: this.map,
            hideMarkers: true,
            outlineColor: 'blue'
        });
        this.drivingPlanRouteService = this.mapService.createDriving(drivingPlanRouteModel);
    }

    clearRunPlanWaypoints() {
        this.drivingRunPlanService.clear();
    }

    clearPlanRouteWaypoints() {
        this.drivingPlanRouteService.clear();
    }

    drawPlanRouteWaypoints(event: Function) {
        this.onPlanRoute$.subscribe(() => {
            if (this.taskList && this.taskList.length) {
                const lngLatList: ILngLat[] = this.taskList.map((model: TaskModel) => {
                    return {
                        lng: model.lng,
                        lat: model.lat
                    };
                });
                event(this.startLngLat, lngLatList);
            }
        });
    }

    drawRunPlanWaypoints(event: Function) {
        this.onRunPlan$.subscribe(() => {
            if (this.locationList && this.locationList.length) {
                const lngLatList: ILngLat[] = this.locationList.map((model: LocationModel) => {
                    return {
                        lng: model.longitude,
                        lat: model.latitude
                    };
                });
                event(this.startLngLat, lngLatList);
            }
        });
    }

    runPlanVehicleRemove(event: Function) {
        this.onRunPlanVehicleRemove$.subscribe(() => {
            event();
        });
    }

    runPlanVehicleCreate(event: Function) {
        this.onRunPlanVehicleCreate$.subscribe(() => {
            event();
        });
    }

    setCenterFunction(event: Function) {
        this.onSetCenter$.subscribe((lngLat: ILngLat) => {
            event([lngLat.lng, lngLat.lat]);
        });
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

    onBack() {
        this.location.back();
    }

    onStopPro($event: Event): void {
        $event.stopPropagation();
    }

    onClickTask($event: Event, item: TaskModel) {
        this.onStopPro($event);
        if (item.lng && item.lat) {
            this.setCenter(item);
        }
    }

    onToCenter() {
        this.setCenter(this.startLngLat);
    }

    onPlanRoute() {
        this.onPlanRoute$.next(true);
    }

    onRunPlan() {
        this.onRunPlan$.next(true);
    }

    onToggle() {
        this.isOpen = !this.isOpen;
    }

    updateInterval() {
        this.onPlay();  // 先暂停
        this.onPlay();  // 再开始
    }

    excuteRunPlan() {
        if (this.locationList && this.locationList.length) {
            const vehicle = this.locationList[this.timeDiffIndex];
            this.runPlanVehiclePosition = {
                lng: vehicle.longitude,
                lat: vehicle.latitude
            };
        }
        this.onRunPlanVehicleRemove$.next(true);
        this.onRunPlanVehicleCreate$.next(true);
    }

    onPlay() {
        if (this.isPlay) {
            this.interval$.unsubscribe();
        } else {
            const timeDiff = 1 / (this.locationList.length / 100);
            this.interval$ = timer(1000, 1000 / this.speed).subscribe(() => {
                if (this.percent < 100) {
                    this.timeDiffIndex++;
                    this.percent += timeDiff;
                    this.excuteRunPlan();
                }
            });
        }
        this.isPlay = !this.isPlay;
    }
}
