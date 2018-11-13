/**
 * Created by wujiahui on 2018/9/18.
 */
// mock service
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class VehicleInfoMockService {

    constructor() {
    }

    mockListData(): Observable<[object]> {
        return Observable.create(observer => {
            observer.next([
                {
                    "areaCode"    : "350603",
                    "areaName"    : "龙文区",
                    "boxId"       : "boxId",
                    "businessLine": {
                        "plan"             : true,
                        "planBackTime"     : 10800,
                        "planDepartureTime": 10800,
                        "test"             : false,
                        "type"             : {
                            "id"  : 0,
                            "name": "A truck",
                        }
                    },
                    "buyDate"     : new Date(),
                    "createdDate" : new Date(),
                    "driver"      : "司机",
                    "engineModel" : "123123",
                    "id"          : 0,
                    "idNumber"    : "车架号",
                    "lat"         : "lat",
                    "lng"         : "lng",
                    "oil"         : 0,
                    "plateNumber" : "闽A88888",
                    "state"       : "Available"
                },
                {
                    "areaCode"    : "350603",
                    "areaName"    : "龙文区",
                    "boxId"       : "boxId",
                    "businessLine": {
                        "plan"             : true,
                        "planBackTime"     : 10800,
                        "planDepartureTime": 10800,
                        "test"             : false,
                        "type"             : {
                            "id"  : 0,
                            "name": "A truck",
                        }
                    },
                    "buyDate"     : new Date(),
                    "createdDate" : new Date(),
                    "driver"      : "司机",
                    "engineModel" : "123123",
                    "id"          : 0,
                    "idNumber"    : "车架号",
                    "lat"         : "lat",
                    "lng"         : "lng",
                    "oil"         : 0,
                    "plateNumber" : "闽A88888",
                    "state"       : "Available"
                },
                {
                    "areaCode"    : "350603",
                    "areaName"    : "龙文区",
                    "boxId"       : "boxId",
                    "businessLine": {
                        "plan"             : true,
                        "planBackTime"     : 10800,
                        "planDepartureTime": 10800,
                        "test"             : false,
                        "type"             : {
                            "id"  : 0,
                            "name": "A truck",
                        }
                    },
                    "buyDate"     : new Date(),
                    "createdDate" : new Date(),
                    "driver"      : "司机",
                    "engineModel" : "123123",
                    "id"          : 0,
                    "idNumber"    : "车架号",
                    "lat"         : "lat",
                    "lng"         : "lng",
                    "oil"         : 0,
                    "plateNumber" : "闽A88888",
                    "state"       : "Available"
                },
                {
                    "areaCode"    : "350603",
                    "areaName"    : "龙文区",
                    "boxId"       : "boxId",
                    "businessLine": {
                        "plan"             : true,
                        "planBackTime"     : 10800,
                        "planDepartureTime": 10800,
                        "test"             : false,
                        "type"             : {
                            "id"  : 0,
                            "name": "A truck",
                        }
                    },
                    "buyDate"     : new Date(),
                    "createdDate" : new Date(),
                    "driver"      : "司机",
                    "engineModel" : "123123",
                    "id"          : 0,
                    "idNumber"    : "车架号",
                    "lat"         : "lat",
                    "lng"         : "lng",
                    "oil"         : 0,
                    "plateNumber" : "闽A88888",
                    "state"       : "Available"
                },
                {
                    "areaCode"    : "350603",
                    "areaName"    : "龙文区",
                    "boxId"       : "boxId",
                    "businessLine": {
                        "plan"             : true,
                        "planBackTime"     : 10800,
                        "planDepartureTime": 10800,
                        "test"             : false,
                        "type"             : {
                            "id"  : 0,
                            "name": "A truck",
                        }
                    },
                    "buyDate"     : new Date(),
                    "createdDate" : new Date(),
                    "driver"      : "司机",
                    "engineModel" : "123123",
                    "id"          : 0,
                    "idNumber"    : "车架号",
                    "lat"         : "lat",
                    "lng"         : "lng",
                    "oil"         : 0,
                    "plateNumber" : "闽A88888",
                    "state"       : "Available"
                },
                {
                    "areaCode"    : "350603",
                    "areaName"    : "龙文区",
                    "boxId"       : "boxId",
                    "businessLine": {
                        "plan"             : true,
                        "planBackTime"     : 10800,
                        "planDepartureTime": 10800,
                        "test"             : false,
                        "type"             : {
                            "id"  : 0,
                            "name": "A truck",
                        }
                    },
                    "buyDate"     : new Date(),
                    "createdDate" : new Date(),
                    "driver"      : "司机",
                    "engineModel" : "123123",
                    "id"          : 0,
                    "idNumber"    : "车架号",
                    "lat"         : "lat",
                    "lng"         : "lng",
                    "oil"         : 0,
                    "plateNumber" : "闽A88888",
                    "state"       : "Available"
                },
                {
                    "areaCode"    : "350603",
                    "areaName"    : "龙文区",
                    "boxId"       : "boxId",
                    "businessLine": {
                        "plan"             : true,
                        "planBackTime"     : 10800,
                        "planDepartureTime": 10800,
                        "test"             : false,
                        "type"             : {
                            "id"  : 0,
                            "name": "A truck",
                        }
                    },
                    "buyDate"     : new Date(),
                    "createdDate" : new Date(),
                    "driver"      : "司机",
                    "engineModel" : "123123",
                    "id"          : 0,
                    "idNumber"    : "车架号",
                    "lat"         : "lat",
                    "lng"         : "lng",
                    "oil"         : 0,
                    "plateNumber" : "闽A88888",
                    "state"       : "Available"
                },
                {
                    "areaCode"    : "350603",
                    "areaName"    : "龙文区",
                    "boxId"       : "boxId",
                    "businessLine": {
                        "plan"             : true,
                        "planBackTime"     : 10800,
                        "planDepartureTime": 10800,
                        "test"             : false,
                        "type"             : {
                            "id"  : 0,
                            "name": "A truck",
                        }
                    },
                    "buyDate"     : new Date(),
                    "createdDate" : new Date(),
                    "driver"      : "司机",
                    "engineModel" : "123123",
                    "id"          : 0,
                    "idNumber"    : "车架号",
                    "lat"         : "lat",
                    "lng"         : "lng",
                    "oil"         : 0,
                    "plateNumber" : "闽A88888",
                    "state"       : "Available"
                },
                {
                    "areaCode"    : "350603",
                    "areaName"    : "龙文区",
                    "boxId"       : "boxId",
                    "businessLine": {
                        "plan"             : true,
                        "planBackTime"     : 10800,
                        "planDepartureTime": 10800,
                        "test"             : false,
                        "type"             : {
                            "id"  : 0,
                            "name": "A truck",
                        }
                    },
                    "buyDate"     : new Date(),
                    "createdDate" : new Date(),
                    "driver"      : "司机",
                    "engineModel" : "123123",
                    "id"          : 0,
                    "idNumber"    : "车架号",
                    "lat"         : "lat",
                    "lng"         : "lng",
                    "oil"         : 0,
                    "plateNumber" : "闽A88888",
                    "state"       : "Available"
                },
                {
                    "areaCode"    : "350603",
                    "areaName"    : "龙文区",
                    "boxId"       : "boxId",
                    "businessLine": {
                        "plan"             : true,
                        "planBackTime"     : 10800,
                        "planDepartureTime": 10800,
                        "test"             : false,
                        "type"             : {
                            "id"  : 0,
                            "name": "A truck",
                        }
                    },
                    "buyDate"     : new Date(),
                    "createdDate" : new Date(),
                    "driver"      : "司机",
                    "engineModel" : "123123",
                    "id"          : 0,
                    "idNumber"    : "车架号",
                    "lat"         : "lat",
                    "lng"         : "lng",
                    "oil"         : 0,
                    "plateNumber" : "闽A88888",
                    "state"       : "Available"
                },

            ]);
        });
    }

    getVehicleList() {
        return Observable.create(observer => {
            observer.next({
                status: 1,
                data: {
                    "last": true,
                    "page": 1,
                    "pages": 0,
                    "size": 20,
                    "total": 10,
                    content: [
                        {
                            "areaCode"    : "350603",
                            "areaName"    : "龙文区",
                            "boxId"       : "boxId",
                            "businessLine": {
                                "plan"             : true,
                                "planBackTime"     : 10800,
                                "planDepartureTime": 10800,
                                "test"             : false,
                                "type"             : {
                                    "id"  : 1,
                                    "name": "A truck",
                                }
                            },
                            "buyDate"     : new Date(),
                            "createdDate" : new Date(),
                            "driver"      : "司机",
                            "engineModel" : "123123",
                            "id"          : 0,
                            "idNumber"    : "车架号",
                            "lat"         : "lat",
                            "lng"         : "lng",
                            "oil"         : 0,
                            "plateNumber" : "闽A88888",
                            "state"       : "Available"
                        },
                        {
                            "areaCode"    : "350603",
                            "areaName"    : "龙文区",
                            "boxId"       : "boxId",
                            "businessLine": {
                                "plan"             : true,
                                "planBackTime"     : 10800,
                                "planDepartureTime": 10800,
                                "test"             : false,
                                "type"             : {
                                    "id"  : 1,
                                    "name": "A truck",
                                }
                            },
                            "buyDate"     : new Date(),
                            "createdDate" : new Date(),
                            "driver"      : "司机",
                            "engineModel" : "123123",
                            "id"          : 1,
                            "idNumber"    : "车架号",
                            "lat"         : "lat",
                            "lng"         : "lng",
                            "oil"         : 0,
                            "plateNumber" : "闽A88888",
                            "state"       : "Available"
                        },
                        {
                            "areaCode"    : "350603",
                            "areaName"    : "龙文区",
                            "boxId"       : "boxId",
                            "businessLine": {
                                "plan"             : true,
                                "planBackTime"     : 10800,
                                "planDepartureTime": 10800,
                                "test"             : false,
                                "type"             : {
                                    "id"  : 1,
                                    "name": "A truck",
                                }
                            },
                            "buyDate"     : new Date(),
                            "createdDate" : new Date(),
                            "driver"      : "司机",
                            "engineModel" : "123123",
                            "id"          : 2,
                            "idNumber"    : "车架号",
                            "lat"         : "lat",
                            "lng"         : "lng",
                            "oil"         : 0,
                            "plateNumber" : "闽A88888",
                            "state"       : "Available"
                        },
                        {
                            "areaCode"    : "350603",
                            "areaName"    : "龙文区",
                            "boxId"       : "boxId",
                            "businessLine": {
                                "plan"             : true,
                                "planBackTime"     : 10800,
                                "planDepartureTime": 10800,
                                "test"             : false,
                                "type"             : {
                                    "id"  : 1,
                                    "name": "A truck",
                                }
                            },
                            "buyDate"     : new Date(),
                            "createdDate" : new Date(),
                            "driver"      : "司机",
                            "engineModel" : "123123",
                            "id"          : 3,
                            "idNumber"    : "车架号",
                            "lat"         : "lat",
                            "lng"         : "lng",
                            "oil"         : 0,
                            "plateNumber" : "闽A88888",
                            "state"       : "Available"
                        },
                        {
                            "areaCode"    : "350603",
                            "areaName"    : "龙文区",
                            "boxId"       : "boxId",
                            "businessLine": {
                                "plan"             : true,
                                "planBackTime"     : 10800,
                                "planDepartureTime": 10800,
                                "test"             : false,
                                "type"             : {
                                    "id"  : 1,
                                    "name": "A truck",
                                }
                            },
                            "buyDate"     : new Date(),
                            "createdDate" : new Date(),
                            "driver"      : "司机",
                            "engineModel" : "123123",
                            "id"          : 4,
                            "idNumber"    : "车架号",
                            "lat"         : "lat",
                            "lng"         : "lng",
                            "oil"         : 0,
                            "plateNumber" : "闽A88888",
                            "state"       : "Available"
                        },
                        {
                            "areaCode"    : "350603",
                            "areaName"    : "龙文区",
                            "boxId"       : "boxId",
                            "businessLine": {
                                "plan"             : true,
                                "planBackTime"     : 10800,
                                "planDepartureTime": 10800,
                                "test"             : false,
                                "type"             : {
                                    "id"  : 1,
                                    "name": "A truck",
                                }
                            },
                            "buyDate"     : new Date(),
                            "createdDate" : new Date(),
                            "driver"      : "司机",
                            "engineModel" : "123123",
                            "id"          : 5,
                            "idNumber"    : "车架号",
                            "lat"         : "lat",
                            "lng"         : "lng",
                            "oil"         : 0,
                            "plateNumber" : "闽A88888",
                            "state"       : "Available"
                        },
                        {
                            "areaCode"    : "350603",
                            "areaName"    : "龙文区",
                            "boxId"       : "boxId",
                            "businessLine": {
                                "plan"             : true,
                                "planBackTime"     : 10800,
                                "planDepartureTime": 10800,
                                "test"             : false,
                                "type"             : {
                                    "id"  : 1,
                                    "name": "A truck",
                                }
                            },
                            "buyDate"     : new Date(),
                            "createdDate" : new Date(),
                            "driver"      : "司机",
                            "engineModel" : "123123",
                            "id"          : 6,
                            "idNumber"    : "车架号",
                            "lat"         : "lat",
                            "lng"         : "lng",
                            "oil"         : 0,
                            "plateNumber" : "闽A88888",
                            "state"       : "Available"
                        },
                        {
                            "areaCode"    : "350603",
                            "areaName"    : "龙文区",
                            "boxId"       : "boxId",
                            "businessLine": {
                                "plan"             : true,
                                "planBackTime"     : 10800,
                                "planDepartureTime": 10800,
                                "test"             : false,
                                "type"             : {
                                    "id"  : 1,
                                    "name": "A truck",
                                }
                            },
                            "buyDate"     : new Date(),
                            "createdDate" : new Date(),
                            "driver"      : "司机",
                            "engineModel" : "123123",
                            "id"          : 7,
                            "idNumber"    : "车架号",
                            "lat"         : "lat",
                            "lng"         : "lng",
                            "oil"         : 0,
                            "plateNumber" : "闽A88888",
                            "state"       : "Available"
                        },
                        {
                            "areaCode"    : "350603",
                            "areaName"    : "龙文区",
                            "boxId"       : "boxId",
                            "businessLine": {
                                "plan"             : true,
                                "planBackTime"     : 10800,
                                "planDepartureTime": 10800,
                                "test"             : false,
                                "type"             : {
                                    "id"  : 1,
                                    "name": "A truck",
                                }
                            },
                            "buyDate"     : new Date(),
                            "createdDate" : new Date(),
                            "driver"      : "司机",
                            "engineModel" : "123123",
                            "id"          : 8,
                            "idNumber"    : "车架号",
                            "lat"         : "lat",
                            "lng"         : "lng",
                            "oil"         : 0,
                            "plateNumber" : "闽A88888",
                            "state"       : "Available"
                        },
                        {
                            "areaCode"    : "350603",
                            "areaName"    : "龙文区",
                            "boxId"       : "boxId",
                            "businessLine": {
                                "plan"             : true,
                                "planBackTime"     : 10800,
                                "planDepartureTime": 10800,
                                "test"             : false,
                                "type"             : {
                                    "id"  : 1,
                                    "name": "A truck",
                                }
                            },
                            "buyDate"     : new Date(),
                            "createdDate" : new Date(),
                            "driver"      : "司机",
                            "engineModel" : "123123",
                            "id"          : 9,
                            "idNumber"    : "车架号",
                            "lat"         : "lat",
                            "lng"         : "lng",
                            "oil"         : 0,
                            "plateNumber" : "闽A88888",
                            "state"       : "Available"
                        },
                    ]
                },
            });
        });
    }
}
