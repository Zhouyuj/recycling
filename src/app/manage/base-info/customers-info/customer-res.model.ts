/**
 * Created by wujiahui on 2018/11/6.
 */
export class CustomerResOld {
    public address: Address;
    public businessLine: BusinessLine;
    public contactInfo: ContactInfo;
    public createdDate: string;
    public childSize: number;
    public customerList: [ CustomerRes ];
    public dustbin: number;
    public id: string;
    public name: string;
    public type: { code: string, name: string, id: string };
    public username: string;
    public images: [{ id: number, type: string, url: string }];
    public rfidId: string;
}

export class Address {
    public province: string;
    public provinceCode: string;
    public city: string;
    public cityCode: string;
    public county: string;
    public countyCode: string;
    public street: string;
    public streetCode: string;
    public lng: string;
    public lat: string;
    public detailedAddress: string;
}

export class BusinessLine {
    public businessType: string;
    public collectionPeriodList: [CollectionPeriod];
    public needKey: boolean;

    constructor(bl: any) {
        this.businessType = bl.businessType;
        this.collectionPeriodList = bl.collectionPeriodList;
        this.needKey = bl.needKey;
    }
}

export class CollectionPeriod {
    public dateType: string;
    public endTime: number;
    public garbageCategory: string;
    public priorityType: string;
    public plateNumber: string;
    public startTime: number;
    public id: string;
}

export class ContactInfo {
    public contactName: string;
    public landlinePhone: string;
    public mobilePhone: number;

    constructor(ci: any) {
        this.contactName = ci.contactName;
        this.landlinePhone = ci.landlinePhone;
        this.mobilePhone = ci.mobilePhone;
    }
}

export class CustomerRes {
    public address: Address;    // *
    public cardNumber: string; // RFID卡卡号
    public category: string; // 收运单位类别: Cluster-聚类(广场点),  Separate-(收集单位) *
    public childSize: number; // 子收集点总个数
    public collectionPeriodList: CollectionPeriod[];
    public contactInfo: ContactInfo;
    public createdDate: string;
    public customerList: CustomerRes[];
    public dustbin: number;
    public id: string; // *
    public images: [{ id: number, type: string, url: string }];
    public name: string; // *
    public needKey: boolean;
    public type: { code: string, name: string, id: string };
    public username: string;
    public level: number; // 0 | 1（0:普通点/聚类点; 1:子收集点）
}