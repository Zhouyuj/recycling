/**
 * Created by wujiahui on 2018/11/8.
 */

import {CustomerRes} from './customer-res.model';
import {FormModel} from './customers-info-form/form.model';
import {Duration} from './customers-info-form/form.model';
import {ChildCollections} from './customers-info-form/form.model';
import {BusinessLine} from './customer-res.model';
import {DurationDetail} from './customers-info-form/form.model';
import {CollectionPeriod} from './customer-res.model';
import {CustomerReq} from './customer-req.model';
import {ListModel} from './list.model';
import {DateUtil} from '../../../shared/utils/date-utils';

export class ModelConverter {
    public static customerResToFormModel(o: CustomerRes): FormModel {
        let f: FormModel;
        f = {
            collectionName   : o.name || null,
            isPlaza          : o.rfidId ? 'Whole' : 'Part' || null,
            address          : [ o.address.provinceCode + '', o.address.cityCode + '', o.address.countyCode + '' ] || null,
            account          : o.username || null,
            password         : null,
            detailAddress    : o.address && o.address.detailedAddress || null,
            contactPersonName: o.contactInfo && o.contactInfo.contactName || null,
            mobile           : o.contactInfo && o.contactInfo.mobilePhone + '' || null,
            dustbinCounts    : o.dustbin || null,
            collectionType   : o.type.id || null,
            tel              : o.contactInfo && o.contactInfo.landlinePhone || null,
            hasKey           : o.businessLine && o.businessLine.needKey ? '1' : '0',
            duration         : this.convertToDuration(o.businessLine) || null,
            childCollections : this.convertToChildCollection(o.customerList) || null,
            lat              : o.address && o.address.lat + '' || null,
            lng              : o.address && o.address.lng + '' || null,
        };
        return f;
    }

    public static customerResToListModel(o: CustomerRes, countyNames: [{ code:number, name:string }]): ListModel {
        let l: ListModel;
        l = {
            id           : o.id,
            lngLat       : `(${o.address.lng}, ${o.address.lat})` || '',
            images       : o.images ? o.images.length : 0,
            name         : o.name,
            countyCode   : this.getCountyName(o.address.countyCode, countyNames),
            duration     : o.businessLine ? o.businessLine.collectionPeriodList.length : 0,
            detailAddress: o.address.detailedAddress,
            username     : o.username || '',
            totalDustbins: o.dustbin || 0,
            createTime   : DateUtil.dateFormat(new Date(o.createdDate), 'yyyy-MM-dd'),
            contactName  : o.contactInfo ? o.contactInfo.contactName : '',
            mobilePhone  : o.contactInfo ? o.contactInfo.mobilePhone : '',
        } as any;
        return l;
    }

    public static getCountyName(code: number, countyNames: [{ code:number, name:string }]): string {
        let result = countyNames.filter(item => item.code === code)[ 0 ].name || '';
        return result;
    }

    public static convertToDuration(o: BusinessLine): Duration {
        if (!o || !o.collectionPeriodList) {
            return { type: 'food', food: [ new DurationDetail() ], oil: [ new DurationDetail() ] };
        }
        let d: Duration;
        let food = o.collectionPeriodList.map((item: CollectionPeriod, index) => {  // TODO 优化为一个操作
            if (item.garbageCategory === 'KitchenWaste') { // 餐厨垃圾
                let _d = new DurationDetail();
                _d.id = index;
                _d.workingDay = item.dateType;
                _d.startTime = this.convertSecondToDate(item.startTime);
                _d.endTime = this.convertSecondToDate(item.endTime);
                _d.level = item.level;
                _d.vehicle = item.plateNumber;
                return _d;
            }
            return;
        }).map((item: DurationDetail) => {
            return item || new DurationDetail();
        });
        let oil = o.collectionPeriodList.map((item: CollectionPeriod, index) => {  // TODO 优化为一个操作
            if (item.garbageCategory === 'WasteGrease') { // 废弃油脂
                let _d = new DurationDetail();
                _d.id = index;
                _d.workingDay = item.dateType;
                _d.startTime = this.convertSecondToDate(item.startTime);
                _d.endTime = this.convertSecondToDate(item.endTime);
                _d.level = item.level;
                _d.vehicle = item.plateNumber;
                return _d;
            }
            return;
        }).map((item: DurationDetail) => {
            return item || new DurationDetail();
        });
        d = { type: 'food', food, oil };
        return d;
    }

    public static convertToChildCollection(o: CustomerRes[]): ChildCollections[] {
        if (!o) {
            return [ new ChildCollections() ];
        }
        let c: ChildCollections[] = [];
        c = o.map((item: CustomerRes, index) => {
            return {
                id  : index,
                name: item.name,
            }
        });
        return c;
    }

    /**
     * 计算方法:
     * eg. 时间插件输入的为: 21:27 即 sec = 70020
     * 1-求当前时间戳（毫秒）假设为 1541729677068
     * 2-将 sec 补零为毫秒单位即 70020000
     * 3-将当前时间戳的相等sec长度的部分置换为sec,再new Date(),即可
     * 由于目前需求只需要 h 和 m,故该方法适合
     * @param sec
     * @returns {Date}
     */
    public static convertSecondToDate(sec: number): Date {
        let timestampStr = `${Date.now()}`;
        let length = `${sec}`.length;
        timestampStr = timestampStr.slice(-timestampStr.length, -length - 3) + `${sec}000`;
        let timestamp = parseInt(timestampStr);
        return new Date(timestamp);
    }

    public static convertDateToSecond(date: Date): number {
        let hour = date.getHours();
        let min = date.getMinutes();
        let result: number = hour * 3600 + min * 60;
        return result;
    }
}