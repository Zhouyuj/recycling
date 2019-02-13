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
    postId: number = null;
    roles: number[] = null;
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
    constructor(req?) {
        this.city = req.city || null;
        this.cityCode = req.cityCode || null;
        this.county = req.county || null;
        this.countyCode = req.countyCode || null;
        this.detailedAddress = req.detailedAddress || null;
        this.province = req.province || null;
        this.provinceCode = req.provinceCode || null;
        this.street = req.street || null;
        this.streetCode = req.streetCode || null;
    }
}

export class ContactInfoReq {
    email: string = null;
    emergencyContact: string = null;
    emergencyContactPhone: string = null;
    landlinePhone: string = null;
    mobilePhone: string = null;
    constructor(req?) {
        this.email = req.email || null;
        this.emergencyContact = req.emergencyContact || null;
        this.emergencyContactPhone = req.emergencyContactPhone || null;
        this.landlinePhone = req.landlinePhone || null;
        this.mobilePhone = req.mobilePhone || null;
    }
}
