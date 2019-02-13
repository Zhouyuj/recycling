/**
 * Created by wujiahui on 2018/12/19.
 */

import {Observable} from 'rxjs/index';

export class EditPlanMockService {

    getRouteList(planId, name?, plateNumber?) {
        return Observable.create(observer => {
            observer.next({
                'status': 1,
                'data'  : [
                    {
                        'id'         : 1,
                        'lock'       : true,
                        'name'       : '线路1',
                        'plateNumber': '闽Y88888',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 2.5,
                                'id'             : 11,
                                'name'           : '音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
                            }
                        ]
                    },
                    {
                        'id'         : 2,
                        'lock'       : false,
                        'name'       : '线路2',
                        'plateNumber': '闽Y99999',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 4,
                                'id'             : 21,
                                'name'           : '没有音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
                            }
                        ]
                    }, {
                        'id'         : 3,
                        'lock'       : false,
                        'name'       : '线路2',
                        'plateNumber': '闽Y99999',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 4,
                                'id'             : 21,
                                'name'           : '没有音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
                            }
                        ]
                    }, {
                        'id'         : 4,
                        'lock'       : false,
                        'name'       : '线路2',
                        'plateNumber': '闽Y99999',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 4,
                                'id'             : 21,
                                'name'           : '没有音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
                            }
                        ]
                    }, {
                        'id'         : 5,
                        'lock'       : false,
                        'name'       : '线路2',
                        'plateNumber': '闽Y99999',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 4,
                                'id'             : 21,
                                'name'           : '没有音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
                            }
                        ]
                    }, {
                        'id'         : 6,
                        'lock'       : false,
                        'name'       : '线路2',
                        'plateNumber': '闽Y99999',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 4,
                                'id'             : 21,
                                'name'           : '没有音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
                            }
                        ]
                    }, {
                        'id'         : 7,
                        'lock'       : false,
                        'name'       : '线路2',
                        'plateNumber': '闽Y99999',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 4,
                                'id'             : 21,
                                'name'           : '没有音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
                            }
                        ]
                    }, {
                        'id'         : 8,
                        'lock'       : false,
                        'name'       : '线路2',
                        'plateNumber': '闽Y99999',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 4,
                                'id'             : 21,
                                'name'           : '没有音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
                            }
                        ]
                    }, {
                        'id'         : 9,
                        'lock'       : false,
                        'name'       : '线路2',
                        'plateNumber': '闽Y99999',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 4,
                                'id'             : 21,
                                'name'           : '没有音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
                            }
                        ]
                    }, {
                        'id'         : 10,
                        'lock'       : false,
                        'name'       : '线路2',
                        'plateNumber': '闽Y99999',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 4,
                                'id'             : 21,
                                'name'           : '没有音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
                            }
                        ]
                    }, {
                        'id'         : 11,
                        'lock'       : false,
                        'name'       : '线路2',
                        'plateNumber': '闽Y99999',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 4,
                                'id'             : 21,
                                'name'           : '没有音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
                            }
                        ]
                    }, {
                        'id'         : 12,
                        'lock'       : false,
                        'name'       : '线路12',
                        'plateNumber': '闽Y99999',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 4,
                                'id'             : 21,
                                'name'           : '没有音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
                            }
                        ]
                    }, {
                        'id'         : 13,
                        'lock'       : false,
                        'name'       : '线路13',
                        'plateNumber': '闽Y99999',
                        'priority'   : 1,
                        'taskList'   : [
                            {
                                'amountOfGarbage': 4,
                                'id'             : 21,
                                'name'           : '没有音乐餐厅',
                                'priority'       : 1,
                                'state'          : 'Pending'
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
                'status': 1,
                'data'  : {
                    'last' : true,
                    'page' : 1,
                    'pages': 1,
                    'size' : 12,
                    'total': 3,
                    content: [
                        {
                            'id'                : 1, /* 请求 id */
                            'amountOfGarbage'   : 1,
                            'collectionPeriodId': 11,
                            'collectionPeriods' : [
                                {
                                    'id'             : 11, /* 请求收运时间 id */
                                    'dateType'       : 'Working',
                                    'endTime'        : 36000,
                                    'garbageCategory': 'KitchenWaste,WasteGrease',
                                    'priority'       : 'Hard',
                                    'startTime'      : 10800,
                                    'vehicle'        : '闽Y88888',
                                },
                                {
                                    'id'             : 12, /* 请求收运时间 id */
                                    'dateType'       : 'Holiday',
                                    'endTime'        : 48000,
                                    'garbageCategory': 'KitchenWaste,WasteGrease',
                                    'priority'       : 'Low',
                                    'startTime'      : 36000,
                                    'vehicle'        : '闽Y88881',
                                }
                            ],
                            'name'              : '小学1',
                            'subTaskList'       : [
                                {
                                    'id'              : 111, /* 子请求 id */
                                    'amountOfGarbage' : 2.5,
                                    'collectionPeriod': {
                                        'id'             : 11, /* 子请求收运时间 id */
                                        'dateType'       : 'Working',
                                        'endTime'        : 36000,
                                        'garbageCategory': 'KitchenWaste,WasteGrease',
                                        'priority'       : 'Hard',
                                        'startTime'      : 10800,
                                        'vehicle'        : '闽Y88883',
                                    },
                                    'name'            : '小学1饭堂1'
                                },
                                {
                                    'id'              : 1112, /* 子请求 id */
                                    'amountOfGarbage' : 1.2,
                                    'collectionPeriod': {
                                        'id'             : 12, /* 子请求收运时间 id */
                                        'dateType'       : 'Holiday',
                                        'endTime'        : 48000,
                                        'garbageCategory': 'KitchenWaste,WasteGrease',
                                        'priority'       : 'Hard',
                                        'startTime'      : 36000,
                                        'vehicle'        : '闽Y88884',
                                    },
                                    'name'            : '小学1饭堂2',
                                },
                            ],
                        },
                        {
                            'id'                : 2, /* 请求 id */
                            'amountOfGarbage'   : 3.5,
                            'collectionPeriodId': 21,
                            'collectionPeriods' : [
                                {
                                    'id'             : 21, /* 请求收运时间 id */
                                    'dateType'       : 'Working',
                                    'endTime'        : 36000,
                                    'garbageCategory': 'KitchenWaste,WasteGrease',
                                    'priority'       : 'Hard',
                                    'startTime'      : 10800,
                                    'vehicle'        : '闽Y88885',
                                },
                                {
                                    'id'             : 22, /* 请求收运时间 id */
                                    'dateType'       : 'Holiday',
                                    'endTime'        : 36000,
                                    'garbageCategory': 'KitchenWaste,WasteGrease',
                                    'priority'       : 'Low',
                                    'startTime'      : 10800,
                                    'vehicle'        : '闽Y88886',
                                },
                            ],
                            'name'              : '我是普通请求',
                            'subTaskList'       : null,
                        },
                        {
                            'id'                : 3, /* 请求 id */
                            'amountOfGarbage'   : 1.5,
                            'collectionPeriodId': 31,
                            'collectionPeriods' : [
                                {
                                    'id'             : 31, /* 请求收运时间 id */
                                    'dateType'       : 'Holiday',
                                    'endTime'        : 36000,
                                    'garbageCategory': 'KitchenWaste,WasteGrease',
                                    'priority'       : 'Low',
                                    'startTime'      : 10800,
                                    'vehicle'        : '闽Y88887',
                                }
                            ],
                            'name'              : '我是普通请求3',
                            'subTaskList'       : null,
                        },
                    ],
                },
            })
            ;
        });
    }

    getDistributeList(id?) {
        return Observable.create(observer => {
            observer.next({
                'status': 1,
                'data'  : [
                    {
                        'amountOfGarbage': 2.5,
                        'id'             : 1,
                        'name'           : '音乐餐厅',
                        'priority'       : 1,
                        'state'          : 'ToDo',
                        'collectionPeriod': {
                            startTime: 18000,
                            endTime: 36000,
                        },
                    },
                    {
                        'amountOfGarbage': 1.7,
                        'id'             : 2,
                        'name'           : '音乐餐厅',
                        'priority'       : 2,
                        'state'          : 'ToDo',
                        'collectionPeriod': {
                            startTime: 18000,
                            endTime: 36000,
                        },
                    },
                ],
            });
        });
    }
}
