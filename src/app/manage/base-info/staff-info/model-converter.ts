/**
 * Created by wujiahui on 2018/11/13.
 */

import { StaffRes } from './staff-res.model';
import { StaffListModel } from './staff-list.model';
import { StaffFormModel } from './staff-form.model';
import { AddressRes } from './staff-res.model';
import { DateUtil } from '../../../shared/utils/date-utils';
import { StaffReq, AddressReq, ContactInfoReq } from './staff-req.model';

export class ModelConverter {

    public static staffResToListModel(res: StaffRes): StaffListModel {
        let l: StaffListModel;
        l = {
            id                   : res.id,
            name                 : res.name || '',
            username             : res.username || null,
            sex                  : { 'Male': '男', 'Female': '女' }[ res.sex ] || '',
            position             : res.post.name || '',
            roles                : this.getRoleNames(res.roles) || '',
            entryTime            : DateUtil.dateFormat(new Date(res.entryTime), 'yyyy-MM-dd') || '',
            identity             : res.identity || null,
            address              : `${res.address.homeAddress || ''}` || '',
            mobilePhone          : res.contactInfo.mobilePhone || '',
            landlinePhone        : res.contactInfo.landlinePhone || '',
            emergencyContact     : res.contactInfo.emergencyContact || '',
            emergencyContactPhone: res.contactInfo.emergencyContactPhone || '',
            email                : res.contactInfo.email || '',
            checked              : false,
        };
        return l;
    }

    public static staffResToFormModel(res: StaffRes): StaffFormModel {
        let f: StaffFormModel;
        f = {
            id                   : res.id,
            name                 : res.name || '',
            sex                  : res.sex || '',
            username             : res.username || '',
            password             : '',
            position             : res.post.id + '',
            roles                : res.roles.length > 0 ? res.roles.map(role => `${role.id}`) : null,
            entryTime            : new Date(res.entryTime) || null,
            identity             : res.identity || '',
            landlinePhone        : res.contactInfo.landlinePhone || '',
            mobilePhone          : res.contactInfo.mobilePhone || '',
            address              : this.getDistrictCodeByRes(res.address) || null,
            detailAddress        : res.address.detailedAddress || null,
            emergencyContact     : res.contactInfo.emergencyContact || null,
            emergencyContactPhone: res.contactInfo.emergencyContactPhone || null,
            email                : res.contactInfo.email || null,
        };
        return f;
    }

    public static formModelToStaffReq(f: StaffFormModel): StaffReq {
        let req: StaffReq;
        req = {
            address    : new AddressReq({
                provinceCode   : f.address[ 0 ],
                cityCode       : f.address[ 1 ],
                countyCode     : f.address[ 2 ],
                streetCode     : f.address[ 3 ],
                detailedAddress: f.detailAddress || null,
            }),
            contactInfo: new ContactInfoReq({
                email                : f.email,
                emergencyContact     : f.emergencyContact,
                emergencyContactPhone: f.emergencyContactPhone,
                landlinePhone        : f.landlinePhone,
                mobilePhone          : f.mobilePhone,
            }),
            entryTime  : f.entryTime.getTime() || null,
            identity   : f.identity || null,
            name       : f.name || null,
            password   : f.password || null,
            postId     : parseInt(f.position) || null,
            roles      : f.roles.map((role: string) => parseInt(role)) || null,
            sex        : f.sex || null,
            username   : f.username || null,
        };
        return req;
    }

    public static getDistrictCodeByRes(res: AddressRes): string[] {
        return [ `${res.provinceCode}`, `${res.cityCode}`, `${res.countyCode}`, `${res.streetCode}` ];
    }

    public static getRoleNames(roles: [{id: number, name: string}]): string {
        if (roles.length > 0) {
            return roles.map(role => role.name).join(',');
        }
    }
}