/**
 * Created by wujiahui on 2018/11/30.
 */
import { PlanStateEnum } from './plan.enum';
import { PlanCategoryEnum } from './plan.enum';

export class PlanRes {
    category: PlanCategoryEnum; // Formal：正式的,Demo：演示的
    createdDate: number;
    editUser: string;   // 编辑人员
    id: number;
    name: string; // 方案名字
    numberOfRoutes: number; // 路线总数
    numberOfTasks: number; // 收集点总数
    state: PlanStateEnum;  // UnExecuted：未执行; Executing：执行中; Stopped：已停止; Completed：已完成
}
