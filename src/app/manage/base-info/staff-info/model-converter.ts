/**
 * Created by wujiahui on 2018/11/13.
 */

import {StaffRes} from './staff-res.model';
import {StaffList} from './staff-list.model';

export class ModelConverter {

    public static staffResToListModel(res: StaffRes, districts: [ { code: string, name: string } ]): StaffList {
        let l: StaffList;
        l = {
            name                 : res.name,
            username             : res.username,
            sex                  : { 'Male': '男', 'Female': '女' }[ res.sex ],
            position             : res.address.detailedAddress || res.address.county,
            role                 : [ '系统管理员', '中控人员', '司机', '收运人员' ][ res.role - 1 ],
            entryTime            : new Date(res.entryTime),
            identity             : string,
            address              : string,
            mobilePhone          : string,
            emergencyContact     : string,
            emergencyContactPhone: string,
            email                : string,
        }
    }

    public static getDistrictName(code: string, all: [ { code: string, name: string } ]): string {
        let name = (all.filter(district => code == district.code) || [])[ 0 ] || null;
        return name;
    }
}