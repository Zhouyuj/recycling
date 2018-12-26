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
                            "id"              : 1,
                            "name"            : "小学1",
                            "collectionPeriod": [
                                {
                                    "dateType"    : "Working",
                                    "startTime"   : 10800,
                                    "endTime"     : 36000,
                                    "priorityType": "Hard",
                                },
                            ],
                            "amountOfGarbage" : 2.5,
                            "garbageCategory" : "KitchenWaste,WasteGrease",
                            "plateNumber"     : "闽A88888",
                        },
                        {
                            "id"              : 2,
                            "name"            : "小学2",
                            "collectionPeriod": [
                                {
                                    "dateType"    : "Holiday",
                                    "startTime"   : 20800,
                                    "endTime"     : 36000,
                                    "priorityType": "Hard",
                                },
                            ],
                            "amountOfGarbage" : 3,
                            "garbageCategory" : "KitchenWaste,WasteGrease",
                            "plateNumber"     : "闽A77777",
                        },
                        {
                            "id"              : 3,
                            "name"            : "小学3",
                            "collectionPeriod": [
                                {
                                    "dateType"    : "Working",
                                    "startTime"   : 10800,
                                    "endTime"     : 36000,
                                    "priorityType": "Hard",
                                },
                            ],
                            "amountOfGarbage" : 4.5,
                            "garbageCategory" : "KitchenWaste,WasteGrease",
                            "plateNumber"     : "闽A11111",
                        },
                    ],
                },
            })
            ;
        });
    }
}
