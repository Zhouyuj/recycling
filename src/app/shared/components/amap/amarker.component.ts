import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { MapService } from 'src/app/shared/services/map/map.service';
import { Marker, MarkerType } from '../../services/map/marker.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-amarker',
    template: '<div class="marker"></div>',
})
export class AmarkerComponent implements OnInit, OnDestroy, OnChanges {

    @Input() longitude: number;
    @Input() latitude: number;
    @Input() type: string;
    @Input() text: string;
    @Input() color: string;
    @Output() drag = new EventEmitter<Function>();
    @Output() remove = new EventEmitter<Function>();
    @Output() create = new EventEmitter<Function>();

    private _marker: Marker;
    private _complete$: Subscription;

    constructor(private mapService: MapService) {
    }

    ngOnInit() {
        this._complete$ = this.mapService.mapListener$.subscribe(() => {
            this.init();
        });
    }

    ngOnChanges() {
        if (this.mapService.map && !this._marker) {
            this.init();
        }
    }

    ngOnDestroy() {
        if (this._complete$) {
            this._complete$.unsubscribe();
        }
    }

    init() {
        this.createMarkerByType();
        this.remove.emit(this.removeMarkers.bind(this));
        this.create.emit(this.createMarkerByType.bind(this));
    }

    removeMarkers() {
        this.mapService.removeAllMarkers([this._marker]);
    }

    createMarkerByType(): void {
        const lngLat = this.mapService.lngLat([this.longitude, this.latitude]);
        const center: number[] = [lngLat.lng, lngLat.lat];
        if (!this.type) {
            throw new Error('can not missing `type` input');
        }
        switch (this.type) {
            case MarkerType.RECYCLING: {
                this._marker = this.createRecyclingMarker(center);
                break;
            }
            case MarkerType.VEHICLE: {
                if (!this.text) {
                    throw new Error('can not missing `text` input');
                }
                this._marker = this.createVehicleMarker(center, this.text);
                break;
            }
            case MarkerType.STATION: {
                if (!this.text) {
                    throw new Error('can not missing `text` input');
                }
                if (!this.color) {
                    throw new Error('can not missing `color` input');
                }
                this._marker = this.createStationMarker(center, this.text, this.color);
                break;
            }
        }
    }

    createMarkerContentForRecycling(): string {
        return '' +
            '<div class="map-marker-content-station">' +
            '    <img src="assets/images/map-icon/marker_bg.svg">' +
            '    <div class="map-marker-recycling-icon">' +
            '        <img src="assets/images/map-icon/recycling.svg">' +
            '    </div>' +
            '</div>';
    }

    createRecyclingMarker(lngLat: number[]) {
        const marker = new Marker({
            map     : this.mapService.map,
            position: lngLat,
            content: this.createMarkerContentForRecycling(),
            offset: [-24, -50]
        });
        const amapMarker = this.mapService.createMarker(marker);
        return amapMarker;
    }

    createMarkerContentForCar(plateNumber: string): string {
        return '' +
            '<div class="map-marker-content-vehicle">' +
            '    <img src="assets/images/map-icon/vehicle.png">' +
            '    <div class="map-marker-label-vehicle">' + plateNumber + '</div>' +
            '</div>';
    }

    createVehicleMarker(lngLat: number[], text: string) {
        const marker = new Marker({
            map     : this.mapService.map,
            position: lngLat,
            content: this.createMarkerContentForCar(text),
            offset: [-24, -50],
        });
        const amapMarker = this.mapService.createMarker(marker);
        return amapMarker;
    }

    createMarkerContentForNumber(num: string, color: string): string {
        return '' +
            '<div class="map-marker-content-station">' +
            '    <img src="assets/images/map-icon/marker_bg.svg">' +
            '    <div class="map-marker-text" style="background-color:' + color + '">' + num + '</div>' +
            '</div>';
    }

    createStationMarker(lngLat: number[], text: string, color: string) {
        const markerOptions: any = {
            map     : this.mapService.map,
            position: lngLat,
            content: this.createMarkerContentForNumber(text, color),
            offset: [-24, -50],
        };
        if (this.drag.observers.length) {
            markerOptions.draggable = true;
        }
        const marker = new Marker(markerOptions);
        const amapMarker = this.mapService.createMarker(marker);
        amapMarker.on('dragend', (event: any) => {
            this.drag.emit(event);
        });
        return amapMarker;
    }
}
