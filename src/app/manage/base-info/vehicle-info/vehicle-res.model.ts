/**
 * Created by wujiahui on 2018/11/12.
 */

export class VehicleRes {
    areaCode: string = null;
    area: string = null;
    boxId: string = null;
    businessLine: BusinessLineRes = null;
    buyDate: number = null;
    createdDate: number = null;
    driver: string = null;
    engineModel: string = null;
    id: number = null;
    idNumber: string = null;
    lat: string = null;
    lng: string = null;
    oil: number = null;
    plateNumber: string = null;
    state: string = null;  // Deleted/Available/UnAvailable
}

export class BusinessLineRes {
    plan: boolean = null;
    planBackTime: number = null;
    planDepartureTime: number = null;
    test: boolean = null;
    type: {
        id  : number,
        name: string,
    } = null;
}
