/**
 * Created by wujiahui on 2018/11/6.
 */
import { FormModel, DurationDetail, ChildCollections } from './form.model';

export class CustomerReq {
    public address: AddressReq;
    public category: string;    // Cluster | Separate
    public contactInfo: ContactInfo;
    public collectionPeriodList: CollectionPeriod[];
    public customerList: { name: string }[];
    public dustbin: number;
    public name: string;
    public password: string;
    public needKey: boolean;
    public typeId: number;      // 1：餐饮行业,2：政府,3：医院,4：学校,5：企业,6：其它
    public username: string;
}

export class AddressReq {
    public provinceCode: string;
    public cityCode: string;
    public countyCode: string;
    //public streetCode: string;
    public detailedAddress: string;
    public lat: string;
    public lng: string;

    constructor(address?: any) {
        this.provinceCode = address.provinceCode || null;
        this.cityCode = address.cityCode || null;
        this.countyCode = address.countyCode || null;
        //this.streetCode = address.streetCode || null;
        this.detailedAddress = address.detailedAddress || '';
        this.lat = address.lat || null;
        this.lng = address.lng || null;
    }
}

export class CollectionPeriod {
    public workingDay: string; // Holiday-节假日,Working-工作日
    public endTime: number;
    public garbageCategory: string; // KitchenWaste | WasteGrease
    public priorityType: string; // Low-低级,High-中等,Hard-极高
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
