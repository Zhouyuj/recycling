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
                    }, {
                        "id"         : 3,
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
                    }, {
                        "id"         : 4,
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
                    }, {
                        "id"         : 5,
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
                    }, {
                        "id"         : 6,
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
                    }, {
                        "id"         : 7,
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
                    }, {
                        "id"         : 8,
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
                    }, {
                        "id"         : 9,
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
                    }, {
                        "id"         : 10,
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
                    }, {
                        "id"         : 11,
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
                    }, {
                        "id"         : 12,
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
                    }, {
                        "id"         : 13,
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

    getDemandList(a, b, c?) {
        return Observable.create(observer => {
            observer.next({
                "status": 1,
                "data"  : {
                    "last" : true,
                    "page" : 1,
                    "pages": 1,
                    "size" : 12,
                    "total": 3,
                    content: [
                        {
                            "id": 1,    /* 请求 id */
                            "amountOfGarbage": 1,
                            "collectionPeriodId": 11,
                            "collectionPeriods": [
                                {
                                    "id": 11,   /* 请求收运时间 id */
                                    "dateType": "Working",
                                    "endTime": 36000,
                                    "garbageCategory": "KitchenWaste,WasteGrease",
                                    "priority": "Hard",
                                    "startTime": 10800,
                                }
                            ],
                            "name": "小学1",
                            "subTaskList": [
                                {
                                    "id": 111,    /* 子请求 id */
                                    "amountOfGarbage": 2.5,
                                    "collectionPeriod": {
                                        "id": 1111,    /* 子请求收运时间 id */
                                        "dateType": "Working",
                                        "endTime": 36000,
                                        "garbageCategory": "KitchenWaste,WasteGrease",
                                        "priority": "Hard",
                                        "startTime": 10800
                                    },
                                    "name": "小学1饭堂1"
                                }
                            ],
                            "vehiclePlate": "闽Y88888",
                        },
                        {
                            "id": 2,    /* 请求 id */
                            "amountOfGarbage": 3.5,
                            "collectionPeriodId": 21,
                            "collectionPeriods": [
                                {
                                    "id": 21,   /* 请求收运时间 id */
                                    "dateType": "Working",
                                    "endTime": 36000,
                                    "garbageCategory": "KitchenWaste,WasteGrease",
                                    "priority": "Hard",
                                    "startTime": 10800,
                                }
                            ],
                            "name": "我是普通请求",
                            "subTaskList": [],
                            "vehiclePlate": "闽Y22222",
                        },
                    ],
                },
            })
            ;
        });
    }
}
