/**
 * Created by wujiahui on 2019/1/17.
 */

import { Observable } from 'rxjs/index';

export class MonitorMockService {

    getPlanList(page, params) {
        return Observable.create(observer => {
            observer.next({
                'status': 1,
                'data'  : {
                    'content': [
                        {
                            'category'          : 'Formal',
                            'collectionQuantity': 400,
                            'createdDate'       : 1541518953756,
                            'editUser'          : '张三',
                            'id'                : 1,
                            'name'              : '新方案',
                            'numberOfRoutes'    : 10,
                            'numberOfTasks'     : 400,
                            'predictQuantity'   : 400,
                            'state'             : 'Executing',
                            'weighedQuantity'   : 400
                        }
                    ],
                    'last'   : true,
                    'page'   : 1,
                    'pages'  : 1,
                    'size'   : 20,
                    'total'  : 1
                },
            });
        });
    }

    getRouteList(params: {
        name?: string,
        planId?: number,
        planIds?: number[],
        plateNumber?: string
    }) {
        return Observable.create(observer => {
            observer.next({
                'status': 1,
                'data'  : [
                    {
                        'driver'  : '司机小赵',
                        'id'      : 1,
                        'lock'    : true,
                        'name'    : '线路1',
                        'priority': 1,
                        'state'   : 'Executing',
                        'vehicle' : {
                            'lat'        : 23.123123,
                            'lng'        : 123.123123,
                            'plateNumber': '闽Y88888'
                        }
                    },
                    {
                        'driver'  : '司机小名',
                        'id'      : 2,
                        'lock'    : true,
                        'name'    : '线路2',
                        'priority': 1,
                        'state'   : 'Executing',
                        'vehicle' : {
                            'lat'        : 23.123123,
                            'lng'        : 123.123123,
                            'plateNumber': '闽Y11111'
                        }
                    }
                ],
            });
        });
    }

    getTaskList(id) {
        return Observable.create(observer => {
            observer.next({
                'status': 1,
                'data'  : [
                    {
                        'id'              : 10201,
                        'name'            : '万科广场或海底捞',
                        'amountOfGarbage' : 21.0,
                        'priority'        : 1,
                        'state'           : 'ToDo',
                        'collectionPeriod': { 'startTime': 36000, 'endTime': 86340, 'dateType': 'Working' },
                        'taskList'        : [],
                    },
                    {
                        'id'              : 10204,
                        'name'            : '东方大广场',
                        'amountOfGarbage' : 2.5,
                        'priority'        : 2,
                        'state'           : 'ToDo',
                        'collectionPeriod': { 'startTime': 39600, 'endTime': 86340, 'dateType': 'Working' },
                        'taskList'        : [
                            {
                                'id'              : 10205,
                                'name'            : '东方大广场重庆火锅',
                                'amountOfGarbage' : 2.3,
                                'state'           : 'ToDo',
                                'collectionPeriod': { 'startTime': 39600, 'endTime': 86340, 'dateType': 'Working' }
                            },
                        ],
                    },
                    {
                        'id'              : 10318,
                        'name'            : '九龙烧味',
                        'amountOfGarbage' : 0.1,
                        'priority'        : 3,
                        'state'           : 'ToDo',
                        'collectionPeriod': { 'startTime': 39840, 'endTime': 43440, 'dateType': 'Holiday' },
                        'taskList'        : [],
                    },
                ],
            });
        });
    }

    getTaskListV2(id) {
        return Observable.create(observer => {
            observer.next({
                'status': 1,
                'data'  : [
                    {
                        'id'              : 10201,
                        'name'            : '万科广场或海底捞',
                        'amountOfGarbage' : 21.0,
                        'priority'        : 1,
                        'state'           : 'ToDo',
                        'collectionPeriod': { 'startTime': 36000, 'endTime': 86340, 'dateType': 'Working' },
                        'taskList'        : [],
                    },
                    {
                        'id'              : 10204,
                        'name'            : '东方大广场',
                        'amountOfGarbage' : 2.5,
                        'priority'        : 2,
                        'state'           : 'ToDo',
                        'collectionPeriod': { 'startTime': 39600, 'endTime': 86340, 'dateType': 'Working' },
                        'taskList'        : [
                            {
                                'id'              : 10205,
                                'name'            : '东方大广场重庆火锅',
                                'amountOfGarbage' : 2.3,
                                'state'           : 'ToDo',
                                'collectionPeriod': { 'startTime': 39600, 'endTime': 86340, 'dateType': 'Working' }
                            },
                        ],
                    },
                    {
                        'id'              : 10318,
                        'name'            : '九龙烧味',
                        'amountOfGarbage' : 0.1,
                        'priority'        : 3,
                        'state'           : 'ToDo',
                        'collectionPeriod': { 'startTime': 39840, 'endTime': 43440, 'dateType': 'Holiday' },
                        'taskList'        : [],
                    },
                ],
            });
        });
    }
}
