import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, OnChanges } from '@angular/core';
import { MapService } from 'src/app/shared/services/map/map.service';
import { Driving } from '../../services/map/driving.model';
import { Subscription } from 'rxjs';
import { ILngLat } from '../../services/map/map.model';

@Component({
    selector: 'app-adriving',
    template: '<div class="driving"></div>',
})
export class AdrivingComponent implements OnInit, OnDestroy, OnChanges {

    @Input() outlineColor: string;
    @Output() drawWaypointsEvent = new EventEmitter<any>();
    @Output() clearEvent = new EventEmitter<Function>();

    private _drivingService: Driving;
    private _complete$: Subscription;

    constructor(private mapService: MapService) {
    }

    ngOnInit() {
        this._complete$ = this.mapService.mapListener$.subscribe(() => {
            this.init();
        });
    }

    ngOnChanges() {
        if (this.mapService.map) {
            this.init();
        }
    }

    ngOnDestroy() {
        if (this._complete$) {
            this._complete$.unsubscribe();
        }
    }

    init() {
        this.create();
        this.drawWaypointsEvent.emit(this.drawWaypoints.bind(this));
        this.clearEvent.emit(this.clear.bind(this));
    }

    create() {
        const drivingModel = new Driving({
            map: this.mapService.map,
            hideMarkers: true,
            outlineColor: this.outlineColor,
        });
        this._drivingService = this.mapService.createDriving(drivingModel);
    }

    /**
     * 根据任务列表数据直接在地图上画出行车路径
     * 如果数据是有5个点，会由起点一直画到终点（包括起点终点之间的途经点）
     */
    drawWaypoints(start: ILngLat, lngLatList: ILngLat[]): any {
        const converLngLat = this.mapService.lngLat;
        const firstModel: ILngLat = lngLatList[0];
        const lastLenght: number = lngLatList.length - 1;
        const lastModel: ILngLat = lngLatList[lastLenght];
        if (firstModel) {
            const waypoints: number[] = [];
            lngLatList.forEach((model: ILngLat, index: number) => {
                if (index === lastLenght) {
                    return;
                }
                waypoints.push(converLngLat([model.lng, model.lat]));
            });
            this._drivingService.search(
                converLngLat([start.lng, start.lat]),
                converLngLat([lastModel.lng, lastModel.lat]),
                {waypoints}
            );
        }
    }

    clear() {
        this._drivingService.clear();
    }
}
