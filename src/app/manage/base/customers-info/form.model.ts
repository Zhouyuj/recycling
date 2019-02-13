/**
 * Created by wujiahui on 2018/11/6.
 */
export class Duration {
    tabType: 'food' | 'oil' = 'food';  // 该值只用于切换tab
    food: DurationDetail[] = [];
    oil: DurationDetail[] = [];
}

export class ChildCollections {
    idx = 0; // 用于页面的增删
    name: string = null;
    id: number = null;

    constructor(idx?: number, name?: string, id?: number) {
        this.idx = idx || 0;
        this.name = name;
        this.id = id;
    }
}

export class FormModel {
    id: number = null;
    collectionName: string = null;
    category = 'Separate';   // 业务上分: 聚类点Cluster / 普通收集点Separate
    address: string[];
    account: string = null;
    password: string = null;
    detailAddress: string = null;
    contactPersonName: string = null;
    mobile: string = null;
    dustbinCounts: number = null;
    collectionType: string = null;
    tel: string = null;
    hasKey: string = null;
    duration: Duration = new Duration();
    childCollections: ChildCollections[] = [ new ChildCollections() ];
    lat: string = null;
    lng: string = null;
    level: number = null; // 显示/隐藏 收运时间段
}

export class DurationDetail {
    id: number = null;
    idx = 0; // 用于页面的增删
    dateType: string = null; // Holiday-节假日,Working-工作日
    startTime: string[] = null;
    endTime: string[] = null;
    priorityType: string = null; // Low-低级,High-中等,Hard-极高
    plateNumber: string = null;

    constructor(idx?: number) {
        this.idx = idx || 0;
    }
}
