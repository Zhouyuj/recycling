import { Injectable } from '@angular/core';

import { Marker, MarkerIcon, Animation } from './marker';

/**
 * 地图 service
 * 集中业务需求的接口
 * 此 service 将高德 API 包装一层
 */

@Injectable({
    providedIn: 'root'
})
export class TestMapDemoService {

    public _map: any;

    constructor() {
    }

    /***** API map start *****/
    /** 地图api,应该全局统一调配 **/
    public createMap() {
    }

    private build(filename): void {
        const scriptElm = document.createElement('script');
        scriptElm.setAttribute('type', 'text/javascript');
        scriptElm.setAttribute('src', filename);
        scriptElm.setAttribute('defer', '');
        scriptElm.setAttribute('async', '');
        document.getElementsByTagName('head')[0].appendChild(scriptElm);
    }

    public load(): void {
        const URL = 'https://webapi.amap.com/maps?v=1.4.1&key=234f52ac0db9acffc06680a652bc86dc' + '&plugin=AMap.Autocomplete';
        this.build(URL);
    }

    get map() {
        return this._map;
    }

    /***** API map end *****/

    /***** API marker start *****/
    // 新建单个marker
    public createMarker(opt: Marker) {
        return this.assembleMarker(opt);
    }

    // 将自定义的marker配置按照官方 API 组装成合法的 AMap.Marker 对象
    private assembleMarker(opt: Marker) {
        let id: string = opt.id;
        let map = opt.map;
        let lngLat: { lng: number, lat: number } = new AMap.LngLat(opt.position[ 0 ], opt.position[ 1 ]); // TODO transform
        let title: string = opt.title;
        let animation: string = Animation.AMAP_ANIMATION_BOUNCE;
        let offset: number[];
        let content: string | object;
        let icon: string | MarkerIcon;
        if (opt.offset) {
            offset = new AMap.Pixel(opt.offset[0], opt.offset[1]);
        }
        if (opt.content) {
            content = opt.content;
        } else if (opt.icon) {
            if (typeof(opt.icon) === 'string') {
                icon = opt.icon;
            } else {
                icon = new AMap.Icon({
                    size       : new AMap.Size(opt.icon.size[ 0 ], opt.icon.size[ 1 ]),
                    image      : opt.icon.image,
                    imageOffset: new AMap.Pixel(opt.icon.imageOffset[ 0 ], opt.icon.imageOffset[ 1 ]),
                    imageSize  : new AMap.Size(opt.icon.imageSize[ 0 ], opt.icon.imageSize[ 1 ]),
                });
            }
        }
        let draggable: boolean = opt.draggable || false;

        let marker = new AMap.Marker(id, map, lngLat, title, animation, offset, icon, content, draggable);
        return marker;
    }

    // 删除单个marker
    public removeMarker() {

    }

    // 批量新建marker
    public createMarkers() {

    }

    // 批量删除marker
    public removeMarkers() {

    }

    /***** API marker end *****/

}
