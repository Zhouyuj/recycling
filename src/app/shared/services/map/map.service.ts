import { Injectable } from '@angular/core';

import { Observable, Subject, of } from 'rxjs/index';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

import { Marker } from './marker.model';
import { Map } from './map.model';
import { Polyline } from './polyline.model';
import { Driving } from './driving.model';
import coordtransform from 'coordtransform';

/**
 * 地图 service
 * 集中业务需求的接口
 * 此 service 将高德 API 包装一层
 */

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _map: any;
  private _driving: any;
  private _mapListener$: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  public createDriving(opt: Driving): any {
    this.driving = new AMap.Driving(opt);
    return this.driving;
  }

  public loadMap(mapModel: Map): Observable<boolean> {
    const subscription = this.initMap().subscribe((hasLoaded: boolean) => {
      if (hasLoaded) {
        this.map = this.createMap(mapModel);
        this._mapListener$.next(true);
        if (subscription) {
          subscription.unsubscribe(); // 取消定时器
        }
      }
    });
    return this._mapListener$;
  }

  public get mapListener$() {
    return this._mapListener$;
  }

  /*****
   * API map start
   *****/
  // 各业务组件可调用的生成地图方法.注意:该方法使用的前提是this.isLoaded=true;(即业务组件中先调用this.initMap,一般可忽略)
  public createMap(opt: Map): any {
    this.map = new AMap.Map(opt.domId, {
      center: this.lngLat(opt.center),
      zoom: opt.zoom
    });
    return this.map;
  }

  // 初始化地图,全局调用的生成地图方法(应该在首屏调用一次即可,首屏具有地图功能)
  // 注意:在组件中调用次方法,需要在订阅值为 true 时调用 unsubscribe()
  public initMap(): Observable<boolean> {
    return interval(100).pipe(
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
    const URL =
      'https://webapi.amap.com/maps?v=1.4.4&key=234f52ac0db9acffc06680a652bc86dc&plugin=AMap.Driving';
    const scriptElm = document.createElement('script');
    scriptElm.setAttribute('type', 'text/javascript');
    scriptElm.setAttribute('src', URL);
    scriptElm.setAttribute('defer', '');
    scriptElm.setAttribute('async', '');
    document.getElementsByTagName('head')[0].appendChild(scriptElm);
  }

  // 判断地图是否加载完成(window.AMap)
  public get isLoaded(): boolean {
    return (
      window['AMap'] !== undefined && window['AMap'].constructor !== undefined
    );
  }

  get map() {
    return this._map;
  }

  set map(o: any) {
    this._map = o;
  }

  get driving() {
    return this._driving;
  }

  set driving(o: any) {
    this._driving = o;
  }

  // 设置地图显示的中心点
  public setCenter(lngLat: number[]): void {
    this.map.setCenter(this.lngLat(lngLat));
  }

  /*****
   * API map end
   *****/

  /*****
   * API marker start
   *****/
  // 新建单个 marker 并返回
  public createMarker(opt: Marker) {
    return new AMap.Marker(opt);
  }

  // 删除单个 marker
  public removeMarker() {}

  // 批量新建 marker TODO
  public createMarkers(opt: Marker[]): any[] {
    const result: any[] = opt.map(preMarker => new AMap.Marker(preMarker));
    return result;
  }

  // 全部删除 marker TODO
  public removeAllMarkers(markers: any[]) {
    this._map.remove(markers);
  }

  public getAllOverlays(
    type: 'marker' | 'circle' | 'polyline' | 'polygon'
  ): any {
    return this.map.getAllOverlays(type);
  }

  // 显示单个 marker TODO
  public showMarker() {}

  // 批量显示 marker TODO
  public showMarkers() {}

  // 隐藏单个 marker TODO
  public hideMarker() {}

  // 批量隐藏 marker TODO
  public hideMarkers() {}

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

  /** 其他函数 TODO **/

  /**
   * API LngLat
   *
   * @param {number} lngLat[0] => lng
   * @param {number} lngLat[1] => lat
   */
  public lngLat(lngLat: number[]) {
    console.log(lngLat, coordtransform.wgs84togcj02(lngLat[0], lngLat[1]));
    const transformed = coordtransform.wgs84togcj02(lngLat[0], lngLat[1]);
    return new AMap.LngLat(transformed[0], transformed[1]);
  }
}
