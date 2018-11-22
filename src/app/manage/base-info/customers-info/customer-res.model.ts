/**
 * Created by wujiahui on 2018/11/6.
 */
export class CustomerRes {
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
    public level: string;
    public plateNumber: string;
    public startTime: number;
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

let o = {
    "address": {
        "city": "漳州市",
        "cityCode": 350600,
        "county": "龙文区",
        "countyCode": 350603,
        "detailedAddress": "福建省漳州市龙文区蓝田镇xxx",
        "lat": 23.123123,
        "lng": 123.123123,
        "province": "福建省",
        "provinceCode": 350000,
        "street": "蓝田镇",
        "streetCode": 350603100
    },
    "cardNumber": "string",
    "category": "Separate",
    "childSize": 0,
    "collectionPeriodList": [
        {
            "dateType": "Working",
            "endTime": 10800,
            "garbageCategory": "KitchenWaste",
            "plateNumber": "粤Y88888",
            "priorityType": "Hard",
            "startTime": 10800
        }
    ],
    "contactInfo": {
        "contactName": "曹操",
        "landlinePhone": "020-85111260",
        "mobilePhone": 16888888888
    },
    "createdDate": "2018-11-22T07:39:25.274Z",
    "customerList": [
        {
            "address": {
                "city": "漳州市",
                "cityCode": 350600,
                "county": "龙文区",
                "countyCode": 350603,
                "detailedAddress": "福建省漳州市龙文区蓝田镇xxx",
                "lat": 23.123123,
                "lng": 123.123123,
                "province": "福建省",
                "provinceCode": 350000,
                "street": "蓝田镇",
                "streetCode": 350603100
            },
            "cardNumber": "string",
            "category": "Separate",
            "collectionPeriodList": [
                {
                    "dateType": "Working",
                    "endTime": 10800,
                    "garbageCategory": "KitchenWaste",
                    "plateNumber": "粤Y88888",
                    "priorityType": "Hard",
                    "startTime": 10800
                }
            ],
            "contactInfo": {
                "contactName": "曹操",
                "landlinePhone": "020-85111260",
                "mobilePhone": 16888888888
            },
            "createdDate": "2018-11-22T07:39:25.274Z",
            "dustbin": 10,
            "id": 0,
            "images": [
                {
                    "id": 1,
                    "type": "Image",
                    "url": "http://host/image.png"
                }
            ],
            "name": "九龙烧味或万达广场",
            "needKey": true,
            "type": {
                "code": "CateringIndustry",
                "id": 1,
                "name": "餐饮行业"
            },
            "username": "admin"
        }
    ],
    "dustbin": 10,
    "id": 0,
    "images": [
        {
            "id": 1,
            "type": "Image",
            "url": "http://host/image.png"
        }
    ],
    "name": "九龙烧味或万达广场",
    "needKey": true,
    "type": {
        "code": "CateringIndustry",
        "id": 1,
        "name": "餐饮行业"
    },
    "username": "admin"
}


export class CustomerResV2 {
    public address: Address;    // *
    public cardNumber: string; // RFID卡卡号
    public category: string; // 收运单位类别: Cluster-聚类(广场点),  Separate-(收集单位) *
    public childSize: number; // 子收集点总个数
    public collectionPeriodList: CollectionPeriod[];
    public contactInfo: ContactInfo;
    public createdDate: string;
    public customerList: CustomerResV2[];
    public dustbin: number;
    public id: string; // *
    public images: [{ id: number, type: string, url: string }];
    public name: string; // *
    public type: { code: string, name: string, id: string };
    public username: string;
}