import { Map } from './map.model';

export class Driving {
    policy: DrivingPolicy; // 驾车路线规划策略
    extensions: string; // 默认值：base，返回基本地址信息, 当取值为：all，返回DriveStep基本信息+DriveStep详细信息
    ferry: number; // 默认为0，表示可以使用轮渡，为1的时候表示不可以使用轮渡
    map: Map; // AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选
    panel: string | HTMLElement; // 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。可选
    hideMarkers: boolean; // 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标, 默认值为：false
    showTraffic: boolean; // 设置是否显示实时路况信息，默认设置为true。显示绿色代表畅通，黄色代表轻微拥堵，红色代表比较拥堵，灰色表示无路况信息。
    province: string; // 车牌省份的汉字缩写，用于判断是否限行，与number属性组合使用，可选。例如：京
    number: string; // 除省份之外车牌的字母和数字，用于判断限行相关，与province属性组合使用，可选。例如:NH1N11
    isOutline: boolean; // 使用map属性时，绘制的规划线路是否显示描边。缺省为true
    outlineColor: string; // 使用map属性时，绘制的规划线路的描边颜色。缺省为'white'
    autoFitView: boolean; // 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围

    constructor(obj?: {
        policy?: DrivingPolicy,
        extensions?: string,
        ferry?: number,
        map?: Map,
        panel?: string | HTMLElement,
        hideMarkers?: boolean,
        showTraffic?: boolean,
        province?: string,
        number?: string,
        isOutline?: boolean,
        outlineColor?: string,
        autoFitView?: boolean
    }) {
        /* tslint:disable-next-line */
        for (let k in obj) {
            this[k] = obj[k];
        }
    }
}

export enum DrivingPolicy {
    LEAST_TIME = 'LEAST_TIME', // 最快捷模式
    LEAST_FEE = 'LEAST_FEE', // 最经济模式
    LEAST_DISTANCE = 'LEAST_DISTANCE', // 最短距离模式
    REAL_TRAFFIC = 'REAL_TRAFFIC' // 考虑实时路况
}
