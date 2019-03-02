/**
 * Created by wujiahui on 2018/11/30.
 */

import { CollectionPeriod } from './demand.model';
import { CustomerRes, CollectionPeriod as CollectionPeriodOfCustomerRes } from '../../base/customers-info/customer-res.model';
import { DemandRes, DemandListModel, DemandModel, DemandReq } from './demand.model';
import { PlanRes } from './plan-res.model';
import { PlanListModel } from './plan-list.model';
import { SubDemandModel } from './demand.model';
import { VerifyUtil } from '../../../shared/utils/verify-utils';

export class ModelConverter {

    public static planResToPlanListModel(r: PlanRes): PlanListModel {
        const l = new PlanListModel();
        l.id = r.id;
        l.name = r.name;
        l.numberOfRoutes = r.numberOfRoutes;
        l.numberOfTasks = r.numberOfTasks;
        l.state = r.state;
        l.category = r.category;
        l.editUser = r.editUser;
        l.createdDate = r.createdDate;
        l.checked = false;
        l.edit = false;
        return l;
    }

    // TODO
    public static demandResToListModel(r: DemandRes): DemandListModel {
        const l: DemandListModel = r;
        return l;
    }

    public static customerResToListModel(r: CustomerRes): DemandListModel {
        let l: DemandListModel, collectionPeriods = null, taskList = null;
        collectionPeriods = r.collectionPeriodList.map((cl: CollectionPeriodOfCustomerRes) => {
            const period = {
                ...cl,
                vehicle : cl.plateNumber,
                priority: cl.priorityType,
            };
            delete period.plateNumber;
            delete period.priorityType;
            return period;
        });
        if (r.customerList && r.customerList.length > 0) {
            taskList = r.customerList.map((sc: CustomerRes) => {
                return {
                    id              : sc.id,
                    name            : sc.name,
                    amountOfGarbage : sc.dustbin,
                    collectionPeriod: collectionPeriods,    // 子请求收运时间段由父提供
                    checked         : false,
                };
            });
        }
        // try {
        //     l = {
        //         id                : r.id,
        //         name              : r.name,
        //         collectionPeriods : collectionPeriods,
        //         collectionPeriodId: collectionPeriods[ 0 ].id,
        //         selectedPeriod    : collectionPeriods[ 0 ],
        //         amountOfGarbage   : r.dustbin,
        //         checked           : false,
        //         expand            : false,
        //         taskList          : taskList || null,
        //     };
        // } catch (e) {
        //     console.error('收运单位数据转化为收运请求数据出错::尤其检查收运时间段是否为空数组', r);
        // }
        l = {
            id                : r.id,
            name              : r.name,
            collectionPeriods : collectionPeriods,
            collectionPeriodId: collectionPeriods.length ? collectionPeriods[ 0 ].id : -1,
            selectedPeriod    : collectionPeriods.length ? collectionPeriods[ 0 ] : undefined,
            amountOfGarbage   : r.dustbin,
            checked           : false,
            expand            : false,
            taskList          : taskList || null,
        };
        return l;
    }

    /**
     * 筛选,组装数据
     * @param l
     * @returns {DemandReq}
     */
    public static demandListModelToReq(l: DemandListModel): DemandReq {
        let req: DemandReq;
        let amountOfGarbage = 0, taskList;
        if (VerifyUtil.isNotEmpty(l.taskList) && l.taskList.length > 0) { // 聚类请求收运量
            taskList = l.taskList
                .filter((sub: SubDemandModel) => sub.checked)
                .map((sub: SubDemandModel) => { // 子请求
                    amountOfGarbage += sub.amountOfGarbage;
                    return {
                        amountOfGarbage: sub.amountOfGarbage || 0,
                        customerId     : sub.id,
                        name           : sub.name,
                    };
                });
        } else {
            amountOfGarbage = l.amountOfGarbage; // 普通请求收运量
        }
        req = {
            amountOfGarbage   : amountOfGarbage || 0,
            collectionPeriodId: l.collectionPeriodId,
            customerId        : l.id,
            name              : l.name,
            taskList          : taskList || null,
        };
        return req;
    }
}
