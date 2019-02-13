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
            available        : v.state === 'Available' ? true : false,
            plateNumber      : v.plateNumber,
            // district         : v.area,
            driver           : v.driver,
            planDepartureTime: DateUtil
                .dateFormat(new Date(this.convertSecondToDate(v.businessLine.planDepartureTime)), 'hh:mm'),
            vehicleType      : v.businessLine.type.name,
            idNumber         : v.idNumber,
            engineModel      : v.engineModel,
            boxId            : v.boxId,
            buyDate          : DateUtil.dateFormat(new Date(v.buyDate), 'yyyy-MM-dd'),
            checked          : false,
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
            // planDepartureTime: this.convertSecondToDate(v.businessLine.planDepartureTime) || null,
            // planBackTime     : this.convertSecondToDate(v.businessLine.planBackTime) || null,
            planDepartureTime: this.secToHourMin(v.businessLine.planDepartureTime) || null,
            planBackTime     : this.secToHourMin(v.businessLine.planBackTime) || null,
            type             : v.businessLine.type.id + '' || null,
            // district         : v.areaCode ? [ v.areaCode ] : [ '' ],
            test             : v.businessLine.test ? '1' : '0',
        };
        return f;
    }

    public static formModelToVehicleReq(f: VehicleFormModel): VehicleReq {
        let v: VehicleReq;
        v = {
            boxId       : f.boxId,
            businessLine: {
                // areaCode         : f.district[ 0 ],
                // planBackTime     : this.convertDateToSecond(f.planBackTime),
                planBackTime     : this.hourMinToSec(f.planBackTime),
                planDepartureTime: this.hourMinToSec(f.planDepartureTime),
                // planDepartureTime: this.convertDateToSecond(f.planDepartureTime),
                test             : [ false, true ][ f.test ],
                typeId           : parseInt(f.type, 10),
            },
            buyDate     : f.buyDate.getTime(),
            engineModel : f.engineModel,
            idNumber    : f.idNumber,
            plateNumber : f.plateNumber,
        };
        return v;
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

    public static convertDateToSecond(date: Date): number {
        const hour = date.getHours();
        const min = date.getMinutes();
        const result: number = hour * 3600 + min * 60;
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
            min > 10 ? `${min}` : `0${min}`,

        ];
    }
}
