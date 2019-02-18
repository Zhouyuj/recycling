/**
 * Created by wujiahui on 2018/10/26.
 */

/**
 * 自封装的 icon 对象
 * marker 的 icon 属性可以是该类(MarkerIcon),或者是本地图片地址(string)
 * 当 marker 存在 content 时,此属性无效
 */
export class MarkerIcon {
    public size: number[];
    public image: string;
    public imageOffset: number[];
    public imageSize: number[];

    constructor(obj: {
        size: number[],
        image: string,
        imageSize: number[],
        imageOffset?: number[]
    }) {
        /* tslint:disable-next-line */
        for (let k in obj) {
            this[k] = obj[k];
        }
    }
}
export class Marker {
    public id: string;           // id
    public map: any;             // 要显示该marker的地图对象
    public position: number[];   // 点标记在地图上显示的位置，默认为地图中心点
    public isTransform: boolean; // 是否需要转换坐标
    public offset: number[];     // 点标记显示位置偏移量，默认值为Pixel(-10,-34)。指定position后，默认以marker左上角位置为基准点
    public title: string;        // 鼠标滑过点标记时的文字提示，不设置则鼠标滑过点标无文字提示
    public icon: MarkerIcon;     // 需在点标记中显示的图标。可以是一个本地图标地址，或者Icon对象。有合法的content内容时，此属性无效
    public content: string | object; // 点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖
    public topWhenClick: boolean;    // 鼠标点击时marker是否置顶，默认false
    public bubble: boolean;          // 是否将覆盖物的鼠标或touch等事件冒泡到地图上,默认值：false
    public draggable: boolean;       // 设置点标记是否可拖拽移动，默认为false
    public raiseOnDrag: boolean;     // 设置拖拽点标记时是否开启点标记离开地图的效果
    public cursor: string;           // 指定鼠标悬停时的鼠标样式
    public visible: boolean;         // 点标记是否可见，默认为true
    public zIndex: number;           // 点标记的叠加顺序。地图上存在多个点标记叠加时，级别较高的点标记在上层显示default 100
    public animation: Animation;     // default AMAP_ANIMATION_NONE
    public clickable: boolean;       // 点标记是否可点击
    public extData: any;             // 用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等
    public label: any;               // 添加文本标注，content为文本标注的内容，offset为偏移量，左上角为偏移量为（0,0)

    constructor(obj: {
        map: any,
        position: number[],
        id?: string,
        isTransform?: boolean,
        offset?: number[],
        title?: string,
        icon?: MarkerIcon,
        content?: string | object,
        draggable?: boolean,
        label?: { content: string, offset: number[] },
    }) {
        /* tslint:disable-next-line */
        for (let k in obj) {
            this[k] = obj[k];
        }
        if (this.content) {
            delete this.icon;
        }
        this.assembleMarker(this);

    } // constructor end

    /**
     * 将自定义的marker配置按照官方 API 组装成合法的 AMap.Marker 对象
     * 未来有需求将在这里添加判断条件
     * @param marker
     */
    private assembleMarker(marker: any) {
        /* 1-坐标 */
        if (marker.isTransform) {
            const tempLngLat = this.lngLatTransformer(marker.position);
            marker.position = new AMap.LngLat(tempLngLat[ 0 ], tempLngLat[ 1 ]);
        } else {
            marker.position = new AMap.LngLat(marker.position[ 0 ], marker.position[ 1 ]);
        }
        /* 2-offset */
        if (marker.offset) {
            marker.offset = new AMap.Pixel(marker.offset[ 0 ], marker.offset[ 1 ]);
        }
        /* 3-content */
        if (marker.content) {
            marker.content = marker.content;
        } else if (marker.icon) {
            /* 4-icon */
            if (typeof(marker.icon) === 'string') {
                marker.icon = marker.icon;
            } else {
                marker.icon = new AMap.Icon(new MarkerIcon(marker.icon));
            }
        }
    }

    // 坐标转换
    private lngLatTransformer(position: number[]): number[] {
        return null;
    }
}

export class MarkerLabel {
    public content: string;
    public offset: number[];

    constructor(obj: {
        content: string,
        offset?: number[]
    }) {
        this.content = obj.content;
        if (obj.offset) {
            this.offset = new AMap.Pixel(obj.offset[0], obj.offset[1]);
        }
    }
}

/**
 * marker 动画效果
 */
export class Animation {
    public static AMAP_ANIMATION_NONE = 'AMAP_ANIMATION_NONE'; // default none
    public static AMAP_ANIMATION_DROP = 'AMAP_ANIMATION_DROP'; // 点标掉落效果
    public static AMAP_ANIMATION_BOUNCE = 'AMAP_ANIMATION_BOUNCE'; // 点标弹跳效果
}
