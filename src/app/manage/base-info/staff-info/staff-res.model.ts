/**
 * Created by wujiahui on 2018/11/13.
 */

export class StaffRes {
    address: AddressRes;
    contactInfo: ContactInfoRes;
    entryTime: number;
    id: number;
    identity: string;
    name: string;
    post: { id: number, name: string };
    roles: [ { id: number,name: string } ];
    sex: string = null;
    username: string = null;
}

export class AddressRes {
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

export class ContactInfoRes {
    email: string = null;
    emergencyContact: string = null;
    emergencyContactPhone: string = null;
    landlinePhone: string = null;
    mobilePhone: string = null;
}