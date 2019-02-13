/**
 * Created by wujiahui on 2018/10/30.
 */
export class Polygon {
    public id: string;
    public map: any;
    public path: number[][];
    public isTransform: boolean; // 是否需要转换坐标
    public zIndex: number;  // 多边形覆盖物的叠加顺序。默认zIndex：10
    public strokeColor: string; // 线条颜色，使用16进制颜色代码赋值。默认值为#006600
    public strokeOpacity: number; // 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
    public strokeWeight: number; // 轮廓线宽度
    public strokeStyle: string; // 轮廓线样式，实线:solid，虚线:dashed
    public fillColor: string; // 多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
    public fillOpacity: number; // 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
    public draggable: boolean; // 设置多边形是否可拖拽移动，默认为false
    public extData: any; // 用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等

    constructor(opts: {
        map: any,
        path: number[][],
        id?: string,
        isTransform?: boolean,
        zIndex?: number,
        strokeColor?: string,
        strokeOpacity?: number,
        strokeWeight?: number,
        strokeStyle?: string,
        fillColor?: string,
        fillOpacity?: number,
        draggable?: boolean,
        extData?: any,
    }) {
        Object.assign(this, opts);
        this.assemblePolyline(this);
    }

    private assemblePolyline(polygon: any) {
        // ---- 设置一些默认值 ----
        // 1-id
        if (polygon.id) {
            polygon.extData = { id: polygon.id };
            delete polygon.id;
        }
        // 2-坐标
        if (polygon.isTransform) {
            polygon.path = polygon.path.map(lngLat => this.lngLatTransform(lngLat));
        }
        if (!polygon.strokeWeight) {
            polygon.strokeWeight = 2;
        }
        if (!polygon.strokeColor) {
            polygon.strokeColor = '#CC66CC';
        }
        if (!polygon.fillColor) {
            polygon.fillColor = '#CCF3FF';
        }
        if (!polygon.fillOpacity) {
            polygon.fillOpacity = 0.5;
        }
    }

    // 坐标转换
    private lngLatTransform(position: number[]): number[] {
        return null;
    }
}
