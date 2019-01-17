import { Component, OnInit } from '@angular/core';

import { MapService } from '../../../shared/services/map/map.service';

import { Map } from '../models/map.model';

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

    map: any;

    routeListCache: any;
    taskListCache: any;

    constructor(private mapService: MapService) {
    }

    ngOnInit() {
        this.initMap();
    }

    initMap(): void {
        let subscription = this.mapService.initMap().subscribe((hasLoaded: boolean) => {
            if (hasLoaded) {
                this.map = this.mapService.createMap(new Map('map', [ 113.18691, 23.031716 ], 15));
                subscription && subscription.unsubscribe(); // 取消定时器
            }
        });
    }

    onToggleSideBar(e) {
        console.log(e);
    }

    onToggleCity(e) {
        console.log(e);
    }

    onToggleGasStation(e) {
        console.log(e);
    }

    /**
     * 显示tips
     */
    onShowTips() {

    }

}
