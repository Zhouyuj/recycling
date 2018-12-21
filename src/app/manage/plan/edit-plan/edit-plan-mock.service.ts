/**
 * Created by wujiahui on 2018/12/19.
 */

import {Observable} from 'rxjs/index';

export class EditPlanMockService {

    getRouteList(planId, name?, plateNumber?) {
        return Observable.create(observer => {
            observer.next({
                "status": 1,
                "data"  : [
                    {
                        "id"         : 1,
                        "lock"       : true,
                        "name"       : "线路1",
                        "plateNumber": "闽Y88888",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 2.5,
                                "id"             : 11,
                                "name"           : "音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },
                    {
                        "id"         : 2,
                        "lock"       : false,
                        "name"       : "线路2",
                        "plateNumber": "闽Y99999",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 4,
                                "id"             : 21,
                                "name"           : "没有音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },{
                        "id"         : 2,
                        "lock"       : false,
                        "name"       : "线路2",
                        "plateNumber": "闽Y99999",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 4,
                                "id"             : 21,
                                "name"           : "没有音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },{
                        "id"         : 2,
                        "lock"       : false,
                        "name"       : "线路2",
                        "plateNumber": "闽Y99999",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 4,
                                "id"             : 21,
                                "name"           : "没有音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },{
                        "id"         : 2,
                        "lock"       : false,
                        "name"       : "线路2",
                        "plateNumber": "闽Y99999",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 4,
                                "id"             : 21,
                                "name"           : "没有音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },{
                        "id"         : 2,
                        "lock"       : false,
                        "name"       : "线路2",
                        "plateNumber": "闽Y99999",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 4,
                                "id"             : 21,
                                "name"           : "没有音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },{
                        "id"         : 2,
                        "lock"       : false,
                        "name"       : "线路2",
                        "plateNumber": "闽Y99999",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 4,
                                "id"             : 21,
                                "name"           : "没有音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },{
                        "id"         : 2,
                        "lock"       : false,
                        "name"       : "线路2",
                        "plateNumber": "闽Y99999",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 4,
                                "id"             : 21,
                                "name"           : "没有音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },{
                        "id"         : 2,
                        "lock"       : false,
                        "name"       : "线路2",
                        "plateNumber": "闽Y99999",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 4,
                                "id"             : 21,
                                "name"           : "没有音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },{
                        "id"         : 2,
                        "lock"       : false,
                        "name"       : "线路2",
                        "plateNumber": "闽Y99999",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 4,
                                "id"             : 21,
                                "name"           : "没有音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },{
                        "id"         : 2,
                        "lock"       : false,
                        "name"       : "线路2",
                        "plateNumber": "闽Y99999",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 4,
                                "id"             : 21,
                                "name"           : "没有音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },{
                        "id"         : 2,
                        "lock"       : false,
                        "name"       : "线路12",
                        "plateNumber": "闽Y99999",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 4,
                                "id"             : 21,
                                "name"           : "没有音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },{
                        "id"         : 2,
                        "lock"       : false,
                        "name"       : "线路13",
                        "plateNumber": "闽Y99999",
                        "priority"   : 1,
                        "taskList"   : [
                            {
                                "amountOfGarbage": 4,
                                "id"             : 21,
                                "name"           : "没有音乐餐厅",
                                "priority"       : 1,
                                "state"          : "Pending"
                            }
                        ]
                    },
                ],
            });
        });
    }
}
