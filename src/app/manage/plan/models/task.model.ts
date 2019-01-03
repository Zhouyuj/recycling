/**
 * Created by wujiahui on 2019/1/2.
 */


export interface TaskModel {
    id             : number;
    name           : string;
    amountOfGarbage: number;
    priority       : number;
    // ToDo：待收集,Going：正在前往,Collecting：收集中,Delay：延缓（挂起）,Skipped：跳过,Completed：完成收集
    // 完成/跳过 不可取消派发
    state          : string;
    // 缺少时间段
    collectionPeriod: {
        startTime: number,
        endTime: number,
    }
}