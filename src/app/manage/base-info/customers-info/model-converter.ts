/**
 * Created by wujiahui on 2018/11/8.
 */

import { CustomerRes, Address, CollectionPeriod } from './customer-res.model';
import { FormModel, Duration, ChildCollections, DurationDetail } from './form.model';
import { CustomerReq, AddressReq, ContactInfo} from './customer-req.model';
import { ListModel } from './list.model';
import { DateUtil } from '../../../shared/utils/date-utils';

export class ModelConverter {

    public static customerResToFormModel(o: CustomerRes): FormModel {
        let f: FormModel;
        f = {
            id               : o.id,
            collectionName   : o.name || '',
            category         : o.category,
            address          : [
                `${o.address.provinceCode || ''}`,
                `${o.address.cityCode || ''}`,
                `${o.address.countyCode || ''}`,
                `${o.address.streetCode || ''}`,
            ] || null,
            account          : o.username || '',
            password         : '',
            detailAddress    : o.address && o.address.detailedAddress || '',
            contactPersonName: o.contactInfo && o.contactInfo.contactName || '',
            mobile           : (o.contactInfo && o.contactInfo.mobilePhone || '') + '',
            dustbinCounts    : o.dustbin || null,
            collectionType   : o.type.id + '' || '',
            tel              : o.contactInfo && o.contactInfo.landlinePhone || '',
            hasKey           : o.needKey ? '1' : '0',
            duration         : this.convertToDuration(o.collectionPeriodList) || null,
            childCollections : this.convertToChildCollection(o.customerList) || null,
            lat              : o.address && o.address.lat + '' || '',
            lng              : o.address && o.address.lng + '' || '',
            level            : o.level,
        };
        return f;
    }

    public static customerResToListModel(o: CustomerRes): ListModel {
        let l: ListModel;
        l = {
            id           : o.id,
            lngLat       : `(${o.address.lng}, ${o.address.lat})` || '',
            images       : o.images || null,
            name         : o.name,
            countyName   : `${o.address.county || ''}${o.address.street || ''}`,
            duration     : o.collectionPeriodList ? o.collectionPeriodList.length : 0,
            detailAddress: o.address.detailedAddress,
            username     : o.username || '',
            totalDustbins: o.dustbin || 0,
            createdDate  : DateUtil.dateFormat(new Date(o.createdDate), 'yyyy-MM-dd'),
            contactName  : o.contactInfo ? o.contactInfo.contactName : '',
            mobilePhone  : o.contactInfo ? o.contactInfo.mobilePhone : '',
            landlinePhone  : o.contactInfo ? o.contactInfo.landlinePhone : '',
            category     : o.category,
            level        : o.level,
            customerList : o.customerList ? o.customerList.map(item => {
                return this.customerResToListModel(item);
            }) : null,
            expand       : false,
            checked      : false,
            disabled     : false,
            parent       : null,
        } as any;
        return l;
    }

    /**
     * 需要判断是否收集点类型（聚类点|普通点）来组装req
     * @param f
     * @returns {CustomerReq}
     */
    public static formModelToCustomerReq(f: FormModel): CustomerReq {
        let c: CustomerReq;
        let foodPeriod = f.duration.food
            .filter((o: DurationDetail) => o.dateType !== null)   /* 过滤为空的数据,因为有默认的值 */
            .map((o: DurationDetail) => {
                return {
                    id             : o.id,
                    dateType       : o.dateType,
                    startTime      : this.calSecondFromHourAndMin(o.startTime),
                    endTime        : this.calSecondFromHourAndMin(o.endTime),
                    priorityType   : o.priorityType,
                    plateNumber    : o.plateNumber,
                    garbageCategory: 'KitchenWaste', // 餐厨垃圾
                }
            });
        let oilPeriod = f.duration.oil
            .filter((o: DurationDetail) => o.dateType !== null)   /* 过滤为空的数据 */
            .map((o: DurationDetail) => {
                return {
                    id             : o.id,
                    dateType       : o.dateType,
                    startTime      : this.calSecondFromHourAndMin(o.startTime),
                    endTime        : this.calSecondFromHourAndMin(o.endTime),
                    priorityType   : o.priorityType,
                    plateNumber    : o.plateNumber,
                    garbageCategory: 'WasteGrease', // 餐厨垃圾
                }
            });
        let customerList = f.childCollections
            .filter((o: ChildCollections) => o.name && o.name !== null)
            .map((cc: ChildCollections) => {
                return {
                    id  : cc.id || null,
                    name: cc.name
                }
            });
        customerList = customerList.length > 0 ? customerList : null;
        c = {
            address             : new AddressReq({
                provinceCode   : f.address[ 0 ] || null,
                cityCode       : f.address[ 1 ] || null,
                countyCode     : f.address[ 2 ] || null,
                streetCode     : f.address[ 3 ] || null,
                detailedAddress: f.detailAddress || null,
                lat            : f.lat || null,
                lng            : f.lng || null,
            }),
            category            : f.category,
            contactInfo         : new ContactInfo({
                contactName  : f.contactPersonName,
                landlinePhone: f.tel,
                mobilePhone  : f.mobile,
            }),
            customerList        : customerList,
            collectionPeriodList: [ ...foodPeriod, ...oilPeriod ],
            dustbin             : f.dustbinCounts || null,
            name                : f.collectionName || null,
            password            : f.password || null,
            needKey             : f.hasKey === '1' ? true : false,
            typeId              : parseInt(f.collectionType) || null,
            username            : f.account || null,
        };
        return c;
    }

    public static getCountyName(code: string, countyNames: [{ code:string, name:string }]): string {
        let result = (countyNames.filter(item => item.code == code)[ 0 ] || { name: '' }).name || '';
        return result;
    }

    public static convertToDuration(c: CollectionPeriod[]): Duration {
        let d = new Duration();
        if (!c) return d;
        let food = c.filter((item: CollectionPeriod) => item.garbageCategory === 'KitchenWaste')
            .map((item: CollectionPeriod, index) => {  // TODO 优化为一个操作
                let _d = new DurationDetail();
                _d.id = item.id;
                _d.idx = index;
                _d.dateType = item.dateType;
                _d.startTime = this.convertSecondToDate(item.startTime);
                _d.endTime = this.convertSecondToDate(item.endTime);
                _d.priorityType = item.priorityType;
                _d.plateNumber = item.plateNumber;
                return _d;
            });
        let oil = c.filter((item: CollectionPeriod) => item.garbageCategory === 'WasteGrease')
            .map((item: CollectionPeriod, index) => {  // TODO 优化为一个操作
                let _d = new DurationDetail();
                _d.id = item.id;
                _d.idx = index;
                _d.dateType = item.dateType;
                _d.startTime = this.convertSecondToDate(item.startTime);
                _d.endTime = this.convertSecondToDate(item.endTime);
                _d.priorityType = item.priorityType;
                _d.plateNumber = item.plateNumber;
                return _d;
            });
        d.tabType = 'food';
        d.food = food;
        d.oil = oil;
        return d;
    }

    public static convertToChildCollection(o: CustomerRes[]): ChildCollections[] {
        if (!o) {
            return [ new ChildCollections() ];
        }
        let c: ChildCollections[] = [];
        c = o.map((item: CustomerRes, index) => {
            return {
                idx : index,
                name: item.name,
                id  : item.id,
            }
        });
        return c;
    }

    /**
     * @param sec
     * @returns {Date}
     */
    public static convertSecondToDate(sec: number): Date {
        let num_hour = sec / 3600;
        let h = Math.floor(num_hour);
        let m = (sec / 3600 - h) * 60;
        let result = new Date();
        result.setHours(h);
        result.setMinutes(m);
        return result;
    }

    public static calSecondFromHourAndMin(time: Date): number {
        let hour = time.getHours();
        let min = time.getMinutes();
        let result = hour * 3600 + min * 60;
        return result;
    }
}