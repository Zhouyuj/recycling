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
import { LocationModel } from '../../models/location.model';
import { DateUtil } from 'src/app/shared/utils/date-utils';
import { repeat } from 'rxjs/operators';

interface ILngLat {
    lng: number;
    lat: number;
}

@Component({
  selector: 'app-history-scheme-route-detail',
  templateUrl: './scheme-route-detail.component.html',
  styleUrls: ['./scheme-route-detail.component.scss']
})
export class SchemeRouteDetailComponent extends TableBasicComponent implements OnInit {

    percent = 0;
    speed = 1;
    isPlay = false;
    isOpen = false;
    hasRunPlan = false;
    isSpinning = false;
    interval$: any;
    currentRoute: RouteModel | any;
    listCache: TaskModel[];
    locationList: LocationModel[];
    startLngLat: number[];
    map: Map;

    taskPaneHeight: string;
    startTime: string;
    endTime: string;
    timeDiffIndex = 0;

    runPlanVechileMarker: any;

    private drivingRunPlanService: any;
    private drivingPlanRouteService: any;

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

        this.initMap().subscribe(() => {
            this.startTime = DateUtil.dateFormat(new Date(this.currentRoute.startTime), 'h:m:s');
            this.endTime = DateUtil.dateFormat(new Date(this.currentRoute.endTime), 'h:m:s');

            this.historyService.getLocations(this.currentRoute.vehicle.id, this.currentRoute.startTime, this.currentRoute.endTime)
                .subscribe((result: Result<LocationModel[]>) => {
                    this.locationList = result.data;
                    if (this.locationList) {
                        this.hasRunPlan = true;
                        this.startLngLat = [
                            this.locationList[0].longitude,
                            this.locationList[1].latitude
                        ];

                        this.setCenter(this.startLngLat);
                        this.createVehicleMarker(this.startLngLat, this.currentRoute.vehicle.plateNumber);
                    }
                });

            this.createDrivingService();
            this.searchTaskListWithRender();
        });
        this.assembleRouteByParams();
    }

  constructor(
    private mapService: MapService,
    private historyService: HistoryService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    super();
  }

    calcTaskPaneHeight(): void {
        this.taskPaneHeight = (+this.tableScrollY.replace('px', '') - 60) + 'px';
    }

    searchTaskListWithRender(): void {
        this.isSpinning = true;
        this.historyService.getTaskList(this.currentRoute.id)
        .subscribe((result: Result<TaskModel[]>) => {
            this.isSpinning = false;
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
                    id: +params.get('vehicleId'),
                    plateNumber: params.get('plateNumber'),
                    lat: +params.get('lat'),
                    lng: +params.get('lng'),
                },
                startTime: +params.get('startTime'),
                endTime: +params.get('endTime'),
                collectionQuantity: +params.get('collectionQuantity'),
                weighedQuantity: +params.get('weighedQuantity'),
                date: params.get('date').substr(0, 10),
            };
        });
    }

  searchTaskListWithRender(): void {
    this.historyService
      .getTaskList(this.currentRoute.id)
      .subscribe((result: Result<TaskModel[]>) => {
        this.listCache = result.data;
        this.createVehicleMarkers(this.listCache);
      });
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

    /**
     * 根据任务列表数据直接在地图上画出行车路径
     * 如果数据是有5个点，会由起点一直画到终点（包括起点终点之间的途经点）
     */
    drawRouteWaypoints(drivingService: any, lngLatList: ILngLat[]) {
        const firstModel: ILngLat = lngLatList[0];
        const lastLenght: number = lngLatList.length - 1;
        const lastModel: ILngLat = lngLatList[lastLenght];
        if (firstModel) {
            const waypoints: number[] = [];
            lngLatList.forEach((model: ILngLat, index: number) => {
                if (index === lastLenght) {
                    return;
                }
                waypoints.push(this.mapService.lngLat([model.lng, model.lat]));
            });
            drivingService.search(
                new AMap.LngLat(this.startLngLat[0], this.startLngLat[1]),
                new AMap.LngLat(lastModel.lng, lastModel.lat),
                {waypoints}
            );
        }
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
        new AMap.LngLat(
          this.currentRoute.vehicle.lng,
          this.currentRoute.vehicle.lat
        ),
        new AMap.LngLat(lastTaskModel.lng, lastTaskModel.lat),
        { waypoints }
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

    createStationMarker(lngLat: number[], text = 1, state: string) {
        const marker = new Marker({
            map     : this.map,
            position: lngLat,
            content: this.createMarkerContentForNumber(text, this.convertTaskStateToColor(state)),
            offset: [-24, -50]
        });
        const amapMarker = this.mapService.createMarker(marker);
        return amapMarker;
    }

  createStationMarker(lngLat: number[], text = 1, state: string): void {
    const marker = new Marker({
      map: this.map,
      position: lngLat,
      content: this.createMarkerContentForNumber(
        text,
        this.convertTaskStateToColor(state)
      ),
      offset: [-24, -50]
    });
    const amapMarker = this.mapService.createMarker(marker);
  }

    createVehicleMarker(lngLat: number[], text: string) {
        const marker = new Marker({
            map     : this.map,
            position: lngLat,
            content: this.createMarkerContentForCar(text),
            offset: [-24, -50]
        });
        const amapMarker = this.mapService.createMarker(marker);
        return amapMarker;
    }

  createVehicleMarker(lngLat: number[], text: string): void {
    const marker = new Marker({
      map: this.map,
      position: lngLat,
      content: this.createMarkerContentForCar(text),
      offset: [-24, -50]
    });
    const amapMarker = this.mapService.createMarker(marker);
  }

  createVehicleMarkers(taskList: TaskModel[]) {
    taskList.forEach((task: TaskModel) => {
      if (
        VerifyUtil.isNotEmpty(task.lng) &&
        VerifyUtil.isNotEmpty(task.lat) &&
        VerifyUtil.isNotEmpty(task.priority)
      ) {
        this.createStationMarker(
          [task.lng, task.lat],
          task.priority,
          task.state
        );
      }
    });
  }

    onStopPro($event: Event): void {
        $event.stopPropagation();
    }

    onClickTask($event: Event, item: TaskModel) {
        this.onStopPro($event);
        if (item.lng && item.lat) {
            this.setCenter([item.lng, item.lat]);
        }
    }

    onToCenter() {
        this.setCenter(this.startLngLat);
    }

    onPlanRoute() {
        const lngLatList: ILngLat[] = this.listCache.map((model: TaskModel) => {
            return {
                lng: model.lng,
                lat: model.lat
            };
        });
        this.drawRouteWaypoints(this.drivingPlanRouteService, lngLatList);
    }

  onPlanRoute() {
    this.drawRouteWaypoints(this.listCache);
  }

  onToggle() {
    this.isOpen = !this.isOpen;
  }

    updateInterval() {
        this.onPlay();  // 先暂停
        this.onPlay();  // 再开始
    }

    excuteRunPlan() {
        const vehicle = this.locationList[this.timeDiffIndex];
        const center = [vehicle.longitude, vehicle.latitude];
        if (this.runPlanVechileMarker) {
            this.mapService.removeAllMarkers([this.runPlanVechileMarker]);
        }
        this.runPlanVechileMarker = this.createVehicleMarker(center, this.currentRoute.vehicle.plateNumber);
    }

    onRunPlan() {
        const lngLatList: ILngLat[] = this.locationList.map((model: LocationModel) => {
            return {
                lng: model.longitude,
                lat: model.latitude
            };
        });
        this.drawRouteWaypoints(this.drivingRunPlanService, lngLatList);
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
      });
    }
    this.isPlay = !this.isPlay;
  }
}
