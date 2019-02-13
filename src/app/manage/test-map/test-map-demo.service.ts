import { Injectable } from '@angular/core';

import { isUndefined } from 'util';
import { Observable } from 'rxjs/index';
import { interval, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Marker, MarkerIcon, Animation } from './marker';
import { Map } from './map';
import {Polyline} from './polyline';
import { Polygon } from './polygon';

import { TestMarkerDemoService } from './test-marker-demo.service';

/**
 * 地图 service
 * 集中业务需求的接口
 * 此 service 将高德 API 包装一层
 */

@Injectable({
    providedIn: 'root'
})
export class TestMapDemoService {

    private _map: any;

    constructor(private testMarkerDemoService: TestMarkerDemoService) {
    }

    /*****
     * API map start
     *****/
    // 各业务组件可调用的生成地图方法.注意:该方法使用的前提是this.isLoaded=true;(即业务组件中先调用this.initMap,一般可忽略)
    public createMap(opts: Map): any {
        this.map = new AMap.Map(opts.domId, {
            center: new AMap.LngLat(opts.center[ 0 ], opts.center[ 1 ]),
            zoom  : opts.zoom
        });
        return this.map;
    }

    // 初始化地图,全局调用的生成地图方法(应该在首屏调用一次即可,首屏具有地图功能)
    // 注意:在组件中调用此方法,需要在订阅值为 true 时调用 unsubscribe()
    public initMap(): Observable<boolean> {
        return interval(100)
            .pipe(
                map(() => {
                    if (!this.isLoaded) {
                        this.load();
                    }
                    return this.isLoaded;
                })
            );
    }

    // 获取高德地图脚本
    public load(): void {
        // 判断脚本是否存在 TODO
        if (1) {
            const SRC = 'https://webapi.amap.com/maps?v=1.4.4&key=234f52ac0db9acffc06680a652bc86dc&plugin=AMap.ToolBar';
            const scriptElm = document.createElement('script');
            scriptElm.setAttribute('type', 'text/javascript');
            scriptElm.setAttribute('src', SRC);
            scriptElm.setAttribute('defer', '');
            scriptElm.setAttribute('async', '');
            document.getElementsByTagName('head')[ 0 ].appendChild(scriptElm);
        }
    }

    // 判断地图是否加载完成(window.AMap)
    public get isLoaded(): boolean {
        return window[ 'AMap' ] !== undefined && window[ 'AMap' ].constructor !== undefined;
    }

    get map() {
        return this._map;
    }

    set map(o: any) {
        this._map = o;
    }

    // 设置地图显示的中心点
    public setCenter(lngLat: number[]): void {
        this.map.setCenter(new AMap.LngLat(lngLat[ 0 ], lngLat[ 1 ]));
    }

    /*****
     * API map end
     *****/

    /*****
     * API marker start
     *****/
    // 新建单个 marker 并返回
    public createMarker(opts: Marker) {
        return new AMap.Marker(opts);
    }

    // 删除单个 marker
    public removeMarker() {

    }

    // 批量新建 marker TODO
    public createMarkers(opts: Marker[]): any[] {
        const result: any[] = opts.map(preMarker => new AMap.Marker(preMarker));
        return result;
    }

    // 批量删除 marker TODO
    public removeMarkers() {

    }

    // 显示单个 marker TODO
    public showMarker() {
    }

    // 批量显示 marker TODO
    public showMarkers() {
    }

    // 隐藏单个 marker TODO
    public hideMarker() {
    }

    // 批量隐藏 marker TODO
    public hideMarkers() {
    }

    // 移动 marker TODO
    public moveMarker(opt: { marker: any, lngLat: number, speed: number, cb?: Function }) {
    }

    /*****
     * API marker end
     *****/

    /*****
     * API polyline start
     *****/
    public createPolyline(opts: Polyline) {
        return new AMap.Polyline(opts);
    }

    /*****
     * API polyline end
     *****/

    /*****
     * API polygon start
     *****/
    public createPolygon(opts: Polygon) {
        return new AMap.Polygon(opts);
    }

    /*****
     * API polygon end
     *****/

    /** 其他函数 TODO **/

}
