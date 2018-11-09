/**
 * Created by wujiahui on 2018/11/6.
 */
import { FormModel } from './customers-info-form/form.model';
import { DurationDetail } from './customers-info-form/form.model';
import { ChildCollections } from './customers-info-form/form.model';

export class CustomerReq {
    public name: string;
    public typeId: number;
    public username: string;
    public password: string;
    public address: Address;
    public businessLine: BusinessLine;
    public contactInfo: ContactInfo;
    public customerList: { name: string }[];
    public dustbin: number;

    constructor(formData?: FormModel) {
        /* 收运单位名称 */
        this.name = formData.collectionName || null;
        /* 用户名 */
        this.username = formData.account || null;
        /* 密码 */
        this.password = formData.password || null;
        /* 地址 */
        this.address = new Address({
            provinceCode   : formData.address[ 0 ] || null,
            cityCode       : formData.address[ 1 ] || null,
            countyCode     : formData.address[ 2 ] || null,
            detailedAddress: formData.detailAddress || null,
            lat            : formData.lat || null,
            lng            : formData.lng || null,
        });
        /* 收运单位类型 */
        this.typeId = formData.collectionType || null;

        let foodPeriod = formData.duration.food
            .filter((o: DurationDetail) => o.workingDay !== null)   /* 过滤为空的数据,因为有默认的值 */
            .map((o: DurationDetail) => {
                return {
                    dateType       : o.workingDay,
                    startTime      : this.calSecondFromHourAndMin(o.startTime.getTime()),
                    endTime        : this.calSecondFromHourAndMin(o.endTime.getTime()),
                    level          : o.level,
                    plateNumber    : o.vehicle,
                    garbageCategory: 'KitchenWaste', // 餐厨垃圾
                }
            });
        let oilPeriod = formData.duration.oil
            .filter((o: DurationDetail) => o.workingDay !== null)   /* 过滤为空的数据 */
            .map((o: DurationDetail) => {
                return {
                    dateType       : o.workingDay,
                    startTime      : this.calSecondFromHourAndMin(o.startTime.getTime()),
                    endTime        : this.calSecondFromHourAndMin(o.endTime.getTime()),
                    level          : o.level,
                    plateNumber    : o.vehicle,
                    garbageCategory: 'WasteGrease', // 餐厨垃圾
                }
            });
        console.log([ ...foodPeriod, ...oilPeriod ]);
        this.businessLine = new BusinessLine({
            businessType        : formData.isPlaza,
            collectionPeriodList: [ ...foodPeriod, ...oilPeriod ],
            needKey             : [ false, true ][ formData.hasKey ],
        });
        this.contactInfo = new ContactInfo({
            contactName  : formData.contactPersonName,
            landlinePhone: formData.tel,
            mobilePhone  : formData.mobile,
        });
        this.customerList = formData.childCollections
            .filter((o: ChildCollections) => o.name !== null)
            .map((cc: ChildCollections) => {
                return {
                    name: cc.name
                }
            });
        this.dustbin = formData.dustbinCounts || null;
    }

    calSecondFromHourAndMin(timestamp: number): number {
        let time = new Date(timestamp);
        let hour = time.getHours();
        let min = time.getMinutes();
        let result = hour * 3600 + min * 60;
        return result;
    }
}

export class Address {
    public provinceCode: string;
    public cityCode: string;
    public countyCode: string;
    public streetCode: string;
    public detailedAddress: string;
    public lat: string;
    public lng: string;

    constructor(address?: any) {
        this.provinceCode = address.provinceCode || null;
        this.cityCode = address.cityCode || null;
        this.countyCode = address.countyCode || null;
        this.streetCode = address.streetCode || null;
        this.detailedAddress = address.detailedAddress || '';
        this.lat = address.lat || null;
        this.lng = address.lng || null;
    }
}

export class BusinessLine {
    public businessType: string;    // 'whole'-广场点 | 'part'-部分收运单位
    public collectionPeriodList: [{
        "dateType": string,
        "endTime": number,
        "garbageCategory": string,
        "level": string,
        "plateNumber": string,
        "startTime": number
    }];
    public needKey: boolean;

    constructor(bl: any) {
        this.businessType = bl.businessType;
        this.collectionPeriodList = bl.collectionPeriodList;
        this.needKey = bl.needKey;
    }
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
