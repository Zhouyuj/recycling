/**
 * Created by wujiahui on 2018/11/8.
 */

import { CustomerRes, Address, BusinessLine, CollectionPeriod } from './customer-res.model';
import { FormModel, Duration, ChildCollections, DurationDetail } from './form.model';
import { CustomerReq, AddressReq, ContactInfo} from './customer-req.model';
import { ListModel } from './list.model';
import { DateUtil } from '../../../shared/utils/date-utils';

export class ModelConverter {

    public static customerResToFormModel(o: CustomerRes): FormModel {
        let f: FormModel;
        f = {
            id               : o.id,
            collectionName   : o.name || null,
            isPlaza          : o.rfidId ? 'Whole' : 'Part' || null,
            address          : [ o.address.provinceCode + '', o.address.cityCode + '', o.address.countyCode + '' ] || null,
            account          : o.username || null,
            password         : null,
            detailAddress    : o.address && o.address.detailedAddress || null,
            contactPersonName: o.contactInfo && o.contactInfo.contactName || null,
            mobile           : o.contactInfo && o.contactInfo.mobilePhone + '' || null,
            dustbinCounts    : o.dustbin || null,
            collectionType   : o.type.id + '' || null,
            tel              : o.contactInfo && o.contactInfo.landlinePhone || null,
            hasKey           : o.businessLine && o.businessLine.needKey ? '1' : '0',
            duration         : this.convertToDuration(o.businessLine) || null,
            childCollections : this.convertToChildCollection(o.customerList) || null,
            lat              : o.address && o.address.lat + '' || null,
            lng              : o.address && o.address.lng + '' || null,
        };
        return f;
    }

    public static customerResToListModel(o: CustomerRes, countyNames: [{ code:string, name:string }]): ListModel {
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

    public static formModelToCustomerReq(f: FormModel): CustomerReq {
        console.log(f);
        let c: CustomerReq;
        let foodPeriod = f.duration.food
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
        let oilPeriod = f.duration.oil
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
        let customerList = f.childCollections
            .filter((o: ChildCollections) => o.name && o.name !== null)
            .map((cc: ChildCollections) => {
                return {
                    name: cc.name
                }
            });
        customerList = customerList.length > 0 ? customerList : null;
        c = {
            name: f.collectionName || null,
            username: f.account || null,
            password: f.password || null,
            typeId: parseInt(f.collectionType) || null,
            address: new AddressReq({
                provinceCode   : f.address[ 0 ] || null,
                cityCode       : f.address[ 1 ] || null,
                countyCode     : f.address[ 2 ] || null,
                detailedAddress: f.detailAddress || null,
                lat            : f.lat || null,
                lng            : f.lng || null,
            }),
            businessLine: new BusinessLine({
                businessType        : f.isPlaza,
                collectionPeriodList: [ ...foodPeriod, ...oilPeriod ],
                needKey             : [ false, true ][ f.hasKey ],
            }),
            contactInfo: new ContactInfo({
                contactName  : f.contactPersonName,
                landlinePhone: f.tel,
                mobilePhone  : f.mobile,
            }),
            customerList: customerList,
            dustbin: f.dustbinCounts || null,
        };
        return c;
    }

    public static getCountyName(code: string, countyNames: [{ code:string, name:string }]): string {
        let result = (countyNames.filter(item => item.code == code)[ 0 ] || { name: '' }).name || '';
        return result;
    }

    public static convertToDuration(o: BusinessLine): Duration {
        if (!o || !o.collectionPeriodList) {
            return { type: 'food', food: [ new DurationDetail() ], oil: [ new DurationDetail() ] };
        }
        let d: Duration;
        let food = o.collectionPeriodList
            .filter((item: CollectionPeriod) => item.garbageCategory === 'KitchenWaste')
            .map((item: CollectionPeriod, index) => {  // TODO 优化为一个操作
                let _d = new DurationDetail();
                _d.id = index;
                _d.workingDay = item.dateType;
                _d.startTime = this.convertSecondToDate(item.startTime);
                _d.endTime = this.convertSecondToDate(item.endTime);
                _d.level = item.level;
                _d.vehicle = item.plateNumber;
                return _d;
            });
        let oil = o.collectionPeriodList
            .filter((item: CollectionPeriod) => item.garbageCategory === 'WasteGrease')
            .map((item: CollectionPeriod, index) => {  // TODO 优化为一个操作
                let _d = new DurationDetail();
                _d.id = index;
                _d.workingDay = item.dateType;
                _d.startTime = this.convertSecondToDate(item.startTime);
                _d.endTime = this.convertSecondToDate(item.endTime);
                _d.level = item.level;
                _d.vehicle = item.plateNumber;
                return _d;
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

    public static convertNumberToString(num: number): string {
        if (num) {
            //return <string>num;
            return null;
        }
        return null
    }

    public static calSecondFromHourAndMin(timestamp: number): number {
        let time = new Date(timestamp);
        let hour = time.getHours();
        let min = time.getMinutes();
        let result = hour * 3600 + min * 60;
        return result;
    }
}