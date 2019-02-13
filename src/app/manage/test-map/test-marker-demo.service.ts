/**
 * Created by wujiahui on 2018/10/31.
 */

import { Marker } from './marker';

export class TestMarkerDemoService {

    constructor() {
    }

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
    public showMarker() {}

    // 批量显示 marker TODO
    public showMarkers() {}

    // 隐藏单个 marker TODO
    public hideMarker() {}

    // 批量隐藏 marker TODO
    public hideMarkers() {}

}
