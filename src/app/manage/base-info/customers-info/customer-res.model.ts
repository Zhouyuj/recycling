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


export class CustomerResV2 {
    address: {
        city: string,
        cityCode: number,
        county: string,
        countyCode: number,
        detailedAddress: string,
        lat: number,
        lng: number,
        province: string,
        provinceCode: number,
        street: string,
        streetCode: number
    };

    businessLine: {
        businessType: string,
        collectionPeriodList: [{
            dateType: string,
            endTime: number,
            garbageCategory: string,
            level: string,
            plateNumber: string,
            startTime: number
        }],
        needKey: boolean,
    };

    childSize: number;

    contactInfo: {
        contactName: string,
        landlinePhone: string,
        mobilePhone: number,
    };

    createdDate: number | string;

    customerList: [{
        address: {
            city: string,
            cityCode: number,
            county: string,
            countyCode: number,
            detailedAddress: string,
            lat: number,
            lng: number,
            province: string,
            provinceCode: number,
            street: string,
            streetCode: number
        },
        businessLine: {
            businessType: string,
            collectionPeriodList: [{
                dateType: string,
                endTime: number,
                garbageCategory: string,
                level: string,
                plateNumber: string,
                startTime: number
            }],
            needKey: boolean,
        },
        contactInfo: {
            contactName: string,
            landlinePhone: string,
            mobilePhone: number,
        };
        createdDate: number | string;
        dustbin: number,
        id: number,
        images: [{
            id: number,
            type: string,
            url: string,
        }],
        name: string,
        rfidId: string,
        type: {
            code: string,
            name: string,
        },
        username: string,
    }];
}