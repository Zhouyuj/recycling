/**
 * Created by wujiahui on 2018/9/17.
 */
// mock service
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class StaffInfoMockService {

    constructor() {
    }

    getStaffList(pageReq, params): Observable<[object]> {
        return Observable.create(observer => {
            observer.next(
                {
                    'data': {
                        'content': [
                            {
                                'address': {
                                    'city': '漳州市',
                                    'cityCode': '350600',
                                    'county': '龙文区',
                                    'countyCode': '350603',
                                    'detailedAddress': '福建省漳州市龙文区蓝田镇xxx',
                                    'province': '福建省',
                                    'provinceCode': '350000',
                                    'street': '蓝田镇',
                                    'streetCode': '350603100'
                                },
                                'contactInfo': {
                                    'email': 'yuningli@locision.com',
                                    'emergencyContact': '李白',
                                    'emergencyContactPhone': '15888888889',
                                    'landlinePhone': '0754-85111260',
                                    'mobilePhone': '15888888888'
                                },
                                'entryTime': 1541518953756,
                                'id': 1,
                                'identity': '440583199409141250',
                                'name': '张三',
                                'post': {
                                    'id': 1,
                                    'name': '司机'
                                },
                                'roles': [
                                    {
                                        'id': 1,
                                        'name': '系统管理员'
                                    }
                                ],
                                'sex': 'Male',
                                'username': 'admin'
                            },
                            {
                                'address': {
                                    'city': '漳州市',
                                    'cityCode': '350600',
                                    'county': '龙文区',
                                    'countyCode': '350603',
                                    'detailedAddress': '福建省漳州市龙文区蓝田镇xxx',
                                    'province': '福建省',
                                    'provinceCode': '350000',
                                    'street': '蓝田镇',
                                    'streetCode': '350603100'
                                },
                                'contactInfo': {
                                    'email': 'yuningli@locision.com',
                                    'emergencyContact': '李白',
                                    'emergencyContactPhone': '15888888889',
                                    'landlinePhone': '0754-85111260',
                                    'mobilePhone': '15888888888'
                                },
                                'entryTime': 1541518953756,
                                'id': 2,
                                'identity': '440583199409141250',
                                'name': '张三',
                                'post': {
                                    'id': 1,
                                    'name': '司机'
                                },
                                'roles': [
                                    {
                                        'id': 1,
                                        'name': '系统管理员'
                                    }
                                ],
                                'sex': 'Male',
                                'username': 'admin'
                            },
                            {
                                'address': {
                                    'city': '漳州市',
                                    'cityCode': '350600',
                                    'county': '龙文区',
                                    'countyCode': '350603',
                                    'detailedAddress': '福建省漳州市龙文区蓝田镇xxx',
                                    'province': '福建省',
                                    'provinceCode': '350000',
                                    'street': '蓝田镇',
                                    'streetCode': '350603100'
                                },
                                'contactInfo': {
                                    'email': 'yuningli@locision.com',
                                    'emergencyContact': '李白',
                                    'emergencyContactPhone': '15888888889',
                                    'landlinePhone': '0754-85111260',
                                    'mobilePhone': '15888888888'
                                },
                                'entryTime': 1541518953756,
                                'id': 3,
                                'identity': '440583199409141250',
                                'name': '张三',
                                'post': {
                                    'id': 1,
                                    'name': '司机'
                                },
                                'roles': [
                                    {
                                        'id': 1,
                                        'name': '系统管理员'
                                    }
                                ],
                                'sex': 'Male',
                                'username': 'admin'
                            },
                            {
                                'address': {
                                    'city': '漳州市',
                                    'cityCode': '350600',
                                    'county': '龙文区',
                                    'countyCode': '350603',
                                    'detailedAddress': '福建省漳州市龙文区蓝田镇xxx',
                                    'province': '福建省',
                                    'provinceCode': '350000',
                                    'street': '蓝田镇',
                                    'streetCode': '350603100'
                                },
                                'contactInfo': {
                                    'email': 'yuningli@locision.com',
                                    'emergencyContact': '李白',
                                    'emergencyContactPhone': '15888888889',
                                    'landlinePhone': '0754-85111260',
                                    'mobilePhone': '15888888888'
                                },
                                'entryTime': 1541518953756,
                                'id': 4,
                                'identity': '440583199409141250',
                                'name': '张三',
                                'post': {
                                    'id': 1,
                                    'name': '司机'
                                },
                                'roles': [
                                    {
                                        'id': 1,
                                        'name': '系统管理员'
                                    }
                                ],
                                'sex': 'Male',
                                'username': 'admin'
                            },
                            {
                                'address': {
                                    'city': '漳州市',
                                    'cityCode': '350600',
                                    'county': '龙文区',
                                    'countyCode': '350603',
                                    'detailedAddress': '福建省漳州市龙文区蓝田镇xxx',
                                    'province': '福建省',
                                    'provinceCode': '350000',
                                    'street': '蓝田镇',
                                    'streetCode': '350603100'
                                },
                                'contactInfo': {
                                    'email': 'yuningli@locision.com',
                                    'emergencyContact': '李白',
                                    'emergencyContactPhone': '15888888889',
                                    'landlinePhone': '0754-85111260',
                                    'mobilePhone': '15888888888'
                                },
                                'entryTime': 1541518953756,
                                'id': 5,
                                'identity': '440583199409141250',
                                'name': '张三',
                                'post': {
                                    'id': 1,
                                    'name': '司机'
                                },
                                'roles': [
                                    {
                                        'id': 1,
                                        'name': '系统管理员'
                                    }
                                ],
                                'sex': 'Male',
                                'username': 'admin'
                            },
                            {
                                'address': {
                                    'city': '漳州市',
                                    'cityCode': '350600',
                                    'county': '龙文区',
                                    'countyCode': '350603',
                                    'detailedAddress': '福建省漳州市龙文区蓝田镇xxx',
                                    'province': '福建省',
                                    'provinceCode': '350000',
                                    'street': '蓝田镇',
                                    'streetCode': '350603100'
                                },
                                'contactInfo': {
                                    'email': 'yuningli@locision.com',
                                    'emergencyContact': '李白',
                                    'emergencyContactPhone': '15888888889',
                                    'landlinePhone': '0754-85111260',
                                    'mobilePhone': '15888888888'
                                },
                                'entryTime': 1541518953756,
                                'id': 6,
                                'identity': '440583199409141250',
                                'name': '张三',
                                'post': {
                                    'id': 1,
                                    'name': '司机'
                                },
                                'roles': [
                                    {
                                        'id': 1,
                                        'name': '系统管理员'
                                    }
                                ],
                                'sex': 'Male',
                                'username': 'admin'
                            },
                        ],
                        'last': true,
                        'page': 1,
                        'pages': 0,
                        'size': 20,
                        'total': 0
                    },
                    'status': 1
                }
            );
        });
    }

    addStaff() {}
    updateStaff() {}
    delStaff() {}
}
