/**
 * Created by wujiahui on 2018/11/12.
 */

export class VehicleReq {
    boxId: string = null;
    businessLine: BusinessLineReq;
    buyDate: number = null;
    engineModel: string = null;
    idNumber: string = null;
    plateNumber: string
}

export class BusinessLineReq {
    areaCode: string = null;
    planBackTime: number = null;
    planDepartureTime: number = null;
    test: boolean = null;
    typeId: number = null; // 1-5吨餐厨车 = null; 2-8吨餐厨车 = null; 3-1吨油脂车
}