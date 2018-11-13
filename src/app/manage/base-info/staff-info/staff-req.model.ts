/**
 * Created by wujiahui on 2018/11/13.
 */

export class StaffReq {
    address: AddressReq;
    contactInfo: ContactInfoReq;
    entryTime: number = null;
    identity: string = null;
    name: string = null;
    password: string = null;
    post: { id: number, name: string } = null;
    role: [ { id: number,name: string } ] = null;
    sex: string = null;
    username: string = null;
}

export class AddressReq {
    city: string = null;
    cityCode: string = null;
    county: string = null;
    countyCode: string = null;
    detailedAddress: string = null;
    province: string = null;
    provinceCode: string = null;
    street: string = null;
    streetCode: string = null;
}

export class ContactInfoReq {
    email: string = null;
    emergencyContact: string = null;
    emergencyContactPhone: string = null;
    landlinePhone: string = null;
    mobilePhone: string = null;
}