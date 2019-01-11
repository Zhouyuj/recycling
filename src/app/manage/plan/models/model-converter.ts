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
import {CustomerRes, CollectionPeriod as CollectionPeriodOfCustomerRes} from '../../base/customers-info/customer-res.model';
import {DemandRes} from './demand.model';

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

    public static demandResToListModel(r: DemandRes): DemandListModel {
        let l: DemandListModel;
        return l;
    }

    public static customerResToListModel(r: CustomerRes): DemandListModel {
        let l: DemandListModel, collectionPeriods = null, subTaskList = null;
        collectionPeriods = r.collectionPeriodList.map((cl: CollectionPeriodOfCustomerRes) => {
            let period = {
                ...cl,
                vehicle: cl.plateNumber,
                priority: cl.priorityType,
            };
            delete period.plateNumber;
            delete period.priorityType;
            return period;
        });
        if (r.customerList && r.customerList.length > 0) {
            subTaskList = r.customerList.map((sc: CustomerRes) => {
                return {
                    id              : sc.id,
                    name            : sc.name,
                    amountOfGarbage : sc.dustbin,
                    collectionPeriod: collectionPeriods,    // 子请求收运时间段由父提供
                    checked         : false,
                }
            });
        }
        try {
            l = {
                id                : r.id,
                name              : r.name,
                collectionPeriods : collectionPeriods,
                collectionPeriodId: collectionPeriods[ 0 ].id,
                selectedPeriod    : collectionPeriods[ 0 ],
                amountOfGarbage   : r.dustbin,
                checked           : false,
                expand            : false,
                subTaskList       : subTaskList || null,
            };
        } catch (e) {
            console.error('收运单位数据转化为收运请求数据出错::尤其检查收运时间段是否为空数组', r);
        }
        return l;
    }

    public static demandListModelToReq(l: DemandListModel): DemandReq {
        let req: DemandReq;
        let amountOfGarbage, subTaskList;
        if (VerifyUtil.isNotEmpty(l.subTaskList) && l.subTaskList.length > 0) { // 聚类请求 收运量传 0
            amountOfGarbage = 0;
            subTaskList = l.subTaskList.map((sub: SubDemandModel) => { // 子请求
                return {
                    amountOfGarbage: sub.amountOfGarbage,
                    customerId     : sub.id,
                    name           : sub.name,
                }
            });
        } else {
            amountOfGarbage = l.amountOfGarbage; // 普通请求收运量
        }
        req = {
            amountOfGarbage   : amountOfGarbage,
            collectionPeriodId: l.collectionPeriodId,
            customerId        : l.id,
            name              : l.name,
            subTaskList       : subTaskList || null,
        };
        return req;
    }
}