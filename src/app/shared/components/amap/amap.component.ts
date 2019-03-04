import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MapService } from 'src/app/shared/services/map/map.service';
import { Map } from '../../services/map/map.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-amap',
    template: '<div id="amap" class="map"></div>',
    styles: ['.map { height: 100%; width: 100%; }']
})
export class AmapComponent implements OnInit, OnDestroy {

    @Input() longitude: number;
    @Input() latitude: number;
    @Input() zoom: number;
    @Output() center = new EventEmitter<Function>();

    private _complete$: Subscription;

    constructor(private mapService: MapService) {
    }

    ngOnInit() {
        const mapModel = new Map('amap', [this.longitude, this.latitude], this.zoom);

        this._complete$ = this.mapService.loadMap(mapModel).subscribe(() => {
            this.center.emit(this.mapService.setCenter.bind(this.mapService));
        });
    }

    ngOnDestroy() {
        this._complete$.unsubscribe();
    }
}
