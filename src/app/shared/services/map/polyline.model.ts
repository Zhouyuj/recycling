/**
 * Created by wujiahui on 2018/10/30.
 */
export class Polyline {
    public id: string;
    public map: any;
    public path: number[][];
    public isTransform: boolean; // 是否需要转换坐标
    public zIndex: number;  // default 50
    public strokeColor: string; // 线条颜色，使用16进制颜色代码赋值。默认值为#006600
    public strokeWeight: number;    // 线条宽度，单位：像素
    public strokeStyle: string;    // 线样式，实线:solid，虚线:dashed
    public isOutline: boolean;  // 线条是否带描边，默认false
    public borderWeight: number;    // 描边的宽度，默认为1
    public outlineColor: string;    // 线条描边颜色，此项仅在isOutline为true时有效，默认：#000000
    public lineJoin: string;    // 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
    public lineCap: string;    // 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
    public draggable: boolean;    // 设置折线是否可拖拽移动，默认为false
    public showDir: boolean;    // 是否延路径显示白色方向箭头,默认false。Canvas绘制时有效，建议折线宽度大于6时使用
    public extData: any;    // 用户自定义属性，支持JavaScript API任意数据类型，如Polyline的id等

    constructor(opts: {
        map: any,
        path: number[][],
        id?: string,
        isTransform?: boolean,
        strokeColor?: string,
        strokeWeight?: number,
        strokeStyle?: string,
        borderWeight?: number,
        outlineColor?: string,
        lineJoin?: string,
        lineCap?: string,
        draggable?: boolean,
        showDir?: boolean,
        extData?: any,
    }) {
        Object.assign(this, opts);
        this.assemblePolyline(this);
    }

    private assemblePolyline(polyline: any) {
        // 设置一些默认值
        // 1-id
        if (polyline.id) {
            polyline.extData = { id: polyline.id };
            delete polyline.id;
        }
        // 2-坐标
        if (polyline.isTransform) {
            polyline.path = polyline.path.map(lngLat => this.lngLatTransform(lngLat));
        }
        // 3-折现拐点:圆头
        if (!polyline.lineJoin) {
            polyline.lineJoin = 'round';
        }
        // 4-两端线帽:圆头
        if (!polyline.lineCap) {
            polyline.lineCap = 'round';
        }
        // 5-箭头:显示
        if (!polyline.showDir) {
            polyline.showDir = true;
        }

    }

    // 坐标转换
    private lngLatTransform(position: number[]): number[] {
        return null;
    }
}
