/**
 * Created by wujiahui on 2018/11/30.
 */

export enum PlanCategoryEnum {
    Formal = 'Formal',  // 正式的
    Demo = 'Demo',      // 演示的
    FormalChinese = '正式',
    DemoChinese = '演示',
}
export enum PlanCategoryEnumChinese {
    Formal = '正式',
    Demo = '演示',
}

export enum PlanStateEnum {
    UnExecuted = 'UnExecuted',  // 未执行
    Executing = 'Executing',    // 执行中
    Stopped = 'Stopped',        // 已停止
    Completed = 'Completed',    // 已完成
    UnExecutedChinese = '未执行',
    ExecutingChinese = '执行中',
    StoppedChinese = '已停止',
    CompletedChinese = '已完成',
}
export enum PlanStateEnumChinese {
    UnExecuted = '未执行',  // 未执行
    Executing = '执行中',    // 执行中
    Stopped = '已停止',        // 已停止
    Completed = '已完成',    // 已完成
}

export enum PlanOperationEnum {
    EXECUTE = 'EXECUTE',
    STOP = 'STOP',
    EDIT = 'EDIT',
    PLANNING = 'PLANNING',
}
