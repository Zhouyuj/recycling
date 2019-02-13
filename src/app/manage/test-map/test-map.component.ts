import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/index';
// import { Marker } from '../../shared/services/map/marker.model';
// import { Map } from '../../shared/services/map/map.model';

import { Marker } from './marker';
import { Map } from './map';
import { MapService } from '../../shared/services/map/map.service';
import { TestMapDemoService } from './test-map-demo.service';
import { Polyline } from './polyline';
import { Polygon } from './polygon';

@Component({
    selector   : 'app-test-map',
    templateUrl: './test-map.component.html',
    styleUrls  : [ './test-map.component.scss' ]
})
export class TestMapComponent implements OnInit {

    public map: any;
    public markers_temp: any[];

    constructor(private mapService: TestMapDemoService) {
    }

    ngOnInit() {
        this.initMap();
    }

    public initMap(): void {
        const subscription = this.mapService.initMap().subscribe((hasLoaded: boolean) => {
            if (hasLoaded) {
                this.map = this.mapService.createMap(new Map('container', [ 113.18691, 23.031716 ], 15));
                if (subscription) {
                    subscription.unsubscribe(); // 取消定时器
                }
            }
        });
    }

    public setCenter(lngLat: number[]) {
        const path = [
            [ 113.186894, 23.031745 ],
            [ 113.192811, 23.033113 ],
            [ 113.175259, 23.027268 ],
            [ 113.177619, 23.019092 ],
            [ 113.196588, 23.039215 ],
            [ 113.166737, 23.019604 ],
        ];
        this.mapService.setCenter(lngLat);
        this.createMarker(lngLat);
        // this.createPolyline(path);
        // this.createPolygon(path);
    }

    public createMarker(lngLat: number[]) {
        const marker = this.mapService.createMarker(new Marker({ id: 'haha', map: this.map, position: lngLat }));
    }

    public createPolyline(path: number[][]) {
        const polyline = this.mapService.createPolyline(new Polyline({ id: 'hiahia', map: this.map, path: path }));
    }

    public createPolygon(path: number[][]) {
        const opt = new Polygon({ id: 'hehe', map: this.map, path: path });
        console.log(opt);
        const polygon = this.mapService.createPolygon(opt);
    }
}
