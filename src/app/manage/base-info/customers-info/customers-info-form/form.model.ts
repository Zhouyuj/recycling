/**
 * Created by wujiahui on 2018/11/6.
 */
export class FormModel {
    id: string = null;
    collectionName: string = null;
    isPlaza: string = 'Part';
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
    type: 'food' | 'oil' = 'food';
    food: DurationDetail[] = [ new DurationDetail() ];
    oil: DurationDetail[] = [ new DurationDetail() ];
}

export class DurationDetail {
    id = 0; // 用于页面的增删
    workingDay: string = null; // Holiday-节假日,Working-工作日
    startTime: Date = null;
    endTime: Date = null;
    level: string = null; // Low-低级,High-中等,Hard-极高
    vehicle: string = null;

    constructor(id?: number) {
        this.id = id || 0;
    }
}

export class ChildCollections {
    id = 0;
    name: string = null;

    constructor(id?: number, name?: string) {
        this.id = id || 0;
        this.name = name;
    }
}