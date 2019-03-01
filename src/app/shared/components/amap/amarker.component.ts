import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapService } from 'src/app/shared/services/map/map.service';
import { Marker, MarkerType } from '../../services/map/marker.model';

@Component({
    selector   : 'app-amarker',
    templateUrl: './amarker.component.html',
})
export class AmarkerComponent implements OnInit {

    @Input() longitude: number;
    @Input() latitude: number;
    @Input() type: string;
    @Input() text: string;
    @Input() color: string;
    @Input() onDragEvent: Function;
    @Output() remove = new EventEmitter<Function>();
    @Output() create = new EventEmitter<Function>();

    private _markers = [];

    constructor(private mapService: MapService) {
    }

    ngOnInit() {
        if (this.mapService.map) {
            this.init();
        } else {
            this.mapService.mapListener$.subscribe(() => {
                this.init();
            });
        }
    }

    init() {
        this.createMarkerByType();
        this.remove.emit(this.removeMarkers.bind(this));
        this.create.emit(this.createMarkerByType.bind(this));
    }

    removeMarkers() {
        this.mapService.removeAllMarkers(this._markers);
    }

    createMarkerByType(): void {
        const center: number[] = [this.longitude, this.latitude];
        if (!this.type) {
            throw new Error('can not missing `type` input');
        }
        switch (this.type) {
            case MarkerType.VEHICLE: {
                if (!this.text) {
                    throw new Error('can not missing `text` input');
                }
                this._markers.push(this.createVehicleMarker(center, this.text));
                break;
            }
            case MarkerType.STATION: {
                if (!this.text) {
                    throw new Error('can not missing `text` input');
                }
                if (!this.color) {
                    throw new Error('can not missing `color` input');
                }
                this._markers.push(this.createStationMarker(center, this.text, this.color));
            }
        }
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
        if (this.onDragEvent) {
            markerOptions.draggable = true;
        }
        const marker = new Marker(markerOptions);
        const amapMarker = this.mapService.createMarker(marker);
        amapMarker.on('dragend', this.onDragEvent);
        return amapMarker;
    }
}
