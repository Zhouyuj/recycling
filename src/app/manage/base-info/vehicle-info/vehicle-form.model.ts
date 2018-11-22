/**
 * Created by wujiahui on 2018/11/12.
 */

export class VehicleFormModel {
    id: number;
    plateNumber: string;        // required
    idNumber: string;
    engineModel: string;
    boxId: string;
    buyDate: Date;              // required
    planDepartureTime: Date;    // required
    planBackTime: Date;         // required
    type: string;               // 1-5吨餐厨车 = null; 2-8吨餐厨车 = null; 3-1吨油脂车 required
    district: string[];         // code required
    test: string;               // '1', '0'
}
