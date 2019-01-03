/**
 * Created by wujiahui on 2018/11/30.
 */
import { PlanRes } from './plan-res.model';
import { PlanListModel } from './plan-list.model';
import { PlanStateEnumChinese } from './plan.enum';
import { PlanCategoryEnumChinese } from './plan.enum';
import { DemandModel } from './demand.model';
import {DemandListModel} from './demand.model';
import {CollectionPeriod} from './demand.model';
import {SubDemandModel} from './demand.model';
import {DemandReq} from './demand.model';
import {VerifyUtil} from '../../../shared/utils/verify-utils';

export class ModelConverter {

    public static planResToPlanListModel(r: PlanRes): PlanListModel {
        let l = new PlanListModel();
        l.id = r.id;
        l.name = r.name;
        l.numberOfRoutes = r.numberOfRoutes;
        l.numberOfTasks = r.numberOfTasks;
        l.state = PlanStateEnumChinese[ r.state ];
        l.category = PlanCategoryEnumChinese[ r.category ];
        l.editUser = r.editUser;
        l.checked = false;
        return l;
    }

    public static planResToFormModel(r: PlanRes) {

    }

    public static demandResToListModel(r: DemandModel): DemandListModel {
        let l: DemandListModel;
        l = r;
        l.selectedPeriod = r.collectionPeriods.find((p: CollectionPeriod) => p.id === r.collectionPeriodId);
        //l.collectionPeriodId = null;
        l.checked = false;
        if (l.subTaskList && l.subTaskList.length > 0) {
            l.subTaskList.forEach((child: SubDemandModel) => {
                child.checked = false;
            });
        }
        return l;
    }

    public static listModelToReq(l: DemandListModel): DemandReq {
        let req: DemandReq;
        if (VerifyUtil.isNotEmpty(l.subTaskList) && l.subTaskList.length > 0) { // 聚类请求 收运量传 0
            req.amountOfGarbage = 0;
            req.subTaskList = l.subTaskList.map((sub: SubDemandModel) => { // 子请求
                return {
                    amountOfGarbage: sub.amountOfGarbage,
                    customerId: sub.id,
                    name: sub.name,
                }
            });
        } else {
            req.amountOfGarbage = l.amountOfGarbage; // 普通请求收运量
        }
        // 请求时间段id
        req.collectionPeriodId = l.collectionPeriodId;
        // 请求id
        req.customerId = l.id;
        // 请求名字
        req.name = l.name;
        return req;
    }
}