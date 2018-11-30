/**
 * Created by wujiahui on 2018/11/6.
 */
export class FormModel {
    id: string = null;
    collectionName: string = null;
    category: string = 'Separate';   // 业务上分: 聚类点Cluster / 普通收集点Separate
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
}

export class Duration {
    tabType: 'food' | 'oil' = 'food';  // 该值只用于切换tab
    food: DurationDetail[] = [ new DurationDetail() ];
    oil: DurationDetail[] = [ new DurationDetail() ];
}

export class DurationDetail {
    id: string = null;
    idx = 0; // 用于页面的增删
    workingDay: string = null; // Holiday-节假日,Working-工作日
    startTime: Date = null;
    endTime: Date = null;
    priorityType: string = null; // Low-低级,High-中等,Hard-极高
    plateNumber: string = null;

    constructor(idx?: number) {
        this.idx = idx || 0;
    }
}

export class ChildCollections {
    idx = 0; // 用于页面的增删
    name: string = null;
    id: string = null;

    constructor(idx?: number, name?: string, id?: string) {
        this.idx = idx || 0;
        this.name = name;
        this.id = id;
    }
}