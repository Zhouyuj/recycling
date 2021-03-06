/**
 * Created by wujiahui on 2018/11/8.
 */

import { CustomerRes, Address, CollectionPeriod } from './customer-res.model';
import {
  FormModel,
  Duration,
  ChildCollections,
  DurationDetail
} from './form.model';
import { CustomerReq, AddressReq, ContactInfo } from './customer-req.model';
import { ListModel } from './list.model';
import { DateUtil } from '../../../shared/utils/date-utils';

export class ModelConverter {
  public static customerResToFormModel(
    o: CustomerRes,
    parentName: string = ''
  ): FormModel {
    let f: FormModel;
    f = {
      id: o.id,
      collectionName:
        o.name.indexOf(parentName) >= 0 ? o.name : parentName + o.name,
      category: o.category,
      address:
        [
          `${o.address.provinceCode || ''}`,
          `${o.address.cityCode || ''}`,
          `${o.address.countyCode || ''}`,
          `${o.address.streetCode || ''}`
        ] || null,
      account: o.username || '',
      username: o.username,
      password: '',
      detailAddress: (o.address && o.address.detailedAddress) || '',
      contactPersonName: (o.contactInfo && o.contactInfo.contactName) || '',
      mobile: ((o.contactInfo && o.contactInfo.mobilePhone) || '') + '',
      dustbinCounts: o.dustbin || null,
      collectionType: o.type.id + '' || '',
      tel: (o.contactInfo && o.contactInfo.landlinePhone) || '',
      hasKey: o.needKey ? '1' : '0',
      duration: this.convertToDuration(o.collectionPeriodList) || null,
      childCollections: this.convertToChildCollection(o.customerList) || null,
      lat: (o.address && o.address.lat + '') || '',
      lng: (o.address && o.address.lng + '') || '',
      level: o.level
    };
    return f;
  }

  public static customerResToListModel(o: CustomerRes): ListModel {
    let l: ListModel;
    l = {
      id: o.id,
      lngLat: `(${o.address.lng}, ${o.address.lat})` || '',
      images: o.images || null,
      name: o.name,
      countyName: `${o.address.county || ''}${o.address.street || ''}`,
      duration: o.collectionPeriodList ? o.collectionPeriodList.length : 0,
      fullAddress: o.address.fullAddress,
      username: o.username || '',
      totalDustbins: o.dustbin || 0,
      createdDate: DateUtil.dateFormat(new Date(o.createdDate), 'yyyy-MM-dd'),
      contactName: o.contactInfo ? o.contactInfo.contactName : '',
      mobilePhone: o.contactInfo ? o.contactInfo.mobilePhone : '',
      landlinePhone: o.contactInfo ? o.contactInfo.landlinePhone : '',
      category: o.category,
      level: o.level,
      customerList: o.customerList
        ? o.customerList.map(item => {
            return this.customerResToListModel(item);
          })
        : null,
      expand: false,
      checked: false,
      disabled: false,
      parent: null
    } as any;
    return l;
  }

  /**
   * 需要判断是否收集点类型（聚类点|普通点）来组装req
   * @param f
   * @returns {CustomerReq}
   */
  public static formModelToCustomerReq(
    f: FormModel,
    parentName: string = '',
    oldCusterName: string = ''
  ): CustomerReq {
    let c: CustomerReq;
    const foodPeriod = f.duration.food
      .filter(
        (o: DurationDetail) => o.dateType !== null
      ) /* 过滤为空的数据,因为有默认的值 */
      .map((o: DurationDetail) => {
        return {
          id: o.id,
          dateType: o.dateType,
          // startTime      : this.calSecondFromHourAndMin(o.startTime),
          // endTime        : this.calSecondFromHourAndMin(o.endTime),
          startTime: this.hourMinToSec(o.startTime),
          endTime: this.hourMinToSec(o.endTime),
          priorityType: o.priorityType,
          plateNumber: o.plateNumber,
          garbageCategory: 'KitchenWaste' // 餐厨垃圾
        };
      });
    const oilPeriod = f.duration.oil
      .filter((o: DurationDetail) => o.dateType !== null) /* 过滤为空的数据 */
      .map((o: DurationDetail) => {
        return {
          id: o.id,
          dateType: o.dateType,
          // startTime      : this.calSecondFromHourAndMin(o.startTime),
          // endTime        : this.calSecondFromHourAndMin(o.endTime),
          startTime: this.hourMinToSec(o.startTime),
          endTime: this.hourMinToSec(o.endTime),
          priorityType: o.priorityType,
          plateNumber: o.plateNumber,
          garbageCategory: 'WasteGrease' // 餐厨垃圾
        };
      });
    let customerList = f.childCollections
      .filter((o: ChildCollections) => o.name && o.name !== null)
      .map((cc: ChildCollections) => {
        let collectionNamePrefix = ''; // 前缀
        if (oldCusterName) {
          // 如果修改的是聚类点,需要将子收集点的前缀（旧聚类点名称)替换为新的聚类点名称作为前缀
          const reg = new RegExp(oldCusterName, 'g');
          cc.name = cc.name.replace(reg, '');
        }
        if (cc.name.indexOf(f.collectionName) < 0) {
          // 子收集点添加前缀
          collectionNamePrefix = f.collectionName;
        }
        return {
          id: cc.id || null,
          name: collectionNamePrefix + cc.name
        };
      });
    customerList = customerList.length > 0 ? customerList : null;
    c = {
      address: new AddressReq({
        provinceCode: f.address[0] || null,
        cityCode: f.address[1] || null,
        countyCode: f.address[2] || null,
        streetCode: f.address[3] || null,
        detailedAddress: f.detailAddress || null,
        lat: f.lat || null,
        lng: f.lng || null
      }),
      category: f.category,
      contactInfo: new ContactInfo({
        contactName: f.contactPersonName,
        landlinePhone: f.tel,
        mobilePhone: f.mobile
      }),
      customerList: customerList,
      collectionPeriodList: [...foodPeriod, ...oilPeriod],
      dustbin: f.dustbinCounts || null,
      name:
        f.collectionName.indexOf(parentName) >= 0
          ? f.collectionName
          : parentName + f.collectionName,
      password: f.password || null,
      needKey: f.hasKey === '1' ? true : false,
      typeId: parseInt(f.collectionType, 10) || null,
      username: f.username || null
    };
    return c;
  }

  public static getCountyName(
    code: string,
    countyNames: [{ code: string; name: string }]
  ): string {
    const result =
      (countyNames.filter(item => item.code === code)[0] || { name: '' })
        .name || '';
    return result;
  }

  public static convertToDuration(c: CollectionPeriod[]): Duration {
    const d = new Duration();
    if (!c) {
      return d;
    }
    const food = c
      .filter(
        (item: CollectionPeriod) => item.garbageCategory === 'KitchenWaste'
      )
      .map((item: CollectionPeriod, index) => {
        // TODO 优化为一个操作
        const _d = new DurationDetail();
        _d.id = item.id;
        _d.idx = index;
        _d.dateType = item.dateType;
        // _d.startTime = this.convertSecondToDate(item.startTime);
        // _d.endTime = this.convertSecondToDate(item.endTime);
        _d.startTime = this.secToHourMin(item.startTime);
        _d.endTime = this.secToHourMin(item.endTime);
        _d.priorityType = item.priorityType;
        _d.plateNumber = item.plateNumber;
        return _d;
      });
    const oil = c
      .filter(
        (item: CollectionPeriod) => item.garbageCategory === 'WasteGrease'
      )
      .map((item: CollectionPeriod, index) => {
        // TODO 优化为一个操作
        const _d = new DurationDetail();
        _d.id = item.id;
        _d.idx = index;
        _d.dateType = item.dateType;
        // _d.startTime = this.convertSecondToDate(item.startTime);
        // _d.endTime = this.convertSecondToDate(item.endTime);
        _d.endTime = this.secToHourMin(item.endTime);
        _d.startTime = this.secToHourMin(item.startTime);
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
      return [new ChildCollections()];
    }
    let c: ChildCollections[] = [];
    c = o.map((item: CustomerRes, index) => {
      return {
        idx: index,
        name: item.name,
        id: item.id
      };
    });
    return c;
  }

  /**
   * @param sec
   * @returns {Date}
   */
  public static convertSecondToDate(sec: number): Date {
    const num_hour = sec / 3600;
    const h = Math.floor(num_hour);
    const m = (sec / 3600 - h) * 60;
    const result = new Date();
    result.setHours(h);
    result.setMinutes(m);
    return result;
  }

  public static calSecondFromHourAndMin(time: Date): number {
    const hour = time ? time.getHours() : 0;
    const min = time ? time.getMinutes() : 0;
    const result = hour * 3600 + min * 60;
    return result;
  }

  public static hourMinToSec(value: string[]): number {
    const numArr = value.map(item => parseInt(item, 10));
    return numArr[0] * 3600 + numArr[1] * 60;
  }

  public static secToHourMin(sec: number): string[] {
    const hour = Math.floor(sec / 3600);
    const min = Math.floor((sec - hour * 3600) / 60);
    return [
      hour > 10 ? `${hour}` : `0${hour}`,
      min > 10 ? `${min}` : `0${min}`
    ];
  }
}
