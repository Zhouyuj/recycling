/**
 * Created by wujiahui on 2018/11/30.
 */
import { PlanRes } from './plan-res.model';
import { PlanListModel } from './plan-list.model';
import { PlanStateEnumChinese } from './plan.enum';
import { PlanCategoryEnumChinese } from './plan.enum';
import { DemandModel } from './demand.model';

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

    public static demandResToListModel(r: DemandModel) {

    }
}