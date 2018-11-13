/**
 * Created by wujiahui on 2018/11/12.
 */

import { DateUtil } from '../../../shared/utils/date-utils';
import { VehicleRes } from './vehicle-res.model';
import { VehicleListModel } from './vehicle-list.model';
import { VehicleFormModel } from './vehicle-form.model';
import {VehicleReq} from './vehicle-req.model';

export class ModelConverter {

    public static vehicleResToListModel(v: VehicleRes): VehicleListModel {
        let l: VehicleListModel;
        l = {
            id               : v.id,
            lngLat           : `${v.lng}, ${v.lat}`,
            plan             : v.businessLine.plan,
            available        : v.state == 'Available' ? true : false,
            plateNumber      : v.plateNumber,
            district         : v.areaName,
            driver           : v.driver,
            planDepartureTime: DateUtil
                .dateFormat(new Date(this.convertSecondToDate(v.businessLine.planDepartureTime)), 'hh:mm'),
            vehicleType      : v.businessLine.type.name,
            idNumber         : v.idNumber,
            engineModel      : v.engineModel,
            boxId            : v.boxId,
            buyDate          : DateUtil.dateFormat(new Date(v.buyDate), 'yyyy-MM-dd'),
        };
        return l;
    }

    public static vehicleResToFormModel(v: VehicleRes): VehicleFormModel {
        let f: VehicleFormModel;
        f = {
            id               : v.id,
            plateNumber      : v.plateNumber || null,
            idNumber         : v.idNumber || null,
            engineModel      : v.engineModel || null,
            boxId            : v.boxId || null,
            buyDate          : new Date(v.buyDate) || null,
            planDepartureTime: this.convertSecondToDate(v.businessLine.planDepartureTime) || null,
            planBackTime     : this.convertSecondToDate(v.businessLine.planBackTime) || null,
            type             : v.businessLine.type.id + '' || null,
            district         : v.areaCode ? [ v.areaCode ] : [''],
            test             : v.businessLine.test ? '1' : '0',
        };
        return f;
    }

    public static formModelToVehicleReq(f: VehicleFormModel): VehicleReq {
        let v: VehicleReq;
        v = {
            boxId       : f.boxId,
            businessLine: {
                areaCode         : f.district[ 0 ],
                planBackTime     : this.convertDateToSecond(f.planBackTime),
                planDepartureTime: this.convertDateToSecond(f.planDepartureTime),
                test             : [ false, true ][ f.test ],
                typeId           : parseInt(f.type),
            },
            buyDate     : f.buyDate.getTime(),
            engineModel : f.engineModel,
            idNumber    : f.idNumber,
            plateNumber : f.plateNumber,
        };
        return v;
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