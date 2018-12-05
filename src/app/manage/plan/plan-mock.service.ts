/**
 * Created by wujiahui on 2018/12/4.
 */

import {Observable} from 'rxjs/index';
import {PlanCategoryEnum} from './models/plan.enum';
import {PlanStateEnum} from './models/plan.enum';

export class PlanMockService {

    getPlanList(page, params) {
        return Observable.create(observer => {
            observer.next({
                "status": 1,
                "data"  : {
                    "page"   : 1,
                    "size"   : 12,
                    "total"  : 0,
                    "pages"  : 0,
                    "last"   : true,
                    "content": [
                        {
                            "category"      : "Formal",
                            "createdDate"   : 1541518953756,
                            "editUser"      : "张三",
                            "id"            : 1,
                            "name"          : "新方案1",
                            "numberOfRoutes": 10,
                            "numberOfTasks" : 400,
                            "state"         : "Executing",
                        },
                        {
                            "category"      : "Demo",
                            "createdDate"   : 1541518953777,
                            "editUser"      : "李四",
                            "id"            : 2,
                            "name"          : "新方案2",
                            "numberOfRoutes": 12,
                            "numberOfTasks" : 500,
                            "state"         : "Executing",
                        },
                    ],
                }
            });
        });
    }

    addPlan() {}
}