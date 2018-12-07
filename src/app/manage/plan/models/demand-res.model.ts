/**
 * Created by wujiahui on 2018/12/7.
 */
export class DemandRes {
    amountOfGarbage: number;    // 收运量（桶）
    dateType: string;   // Working：工作日 | Holiday：节假日
    endTime: number;
    garbageCategory: string;    // KitchenWaste | WasteGrease
    id: number;
    name: string;
    priorityType: string;   // Hard | High | Low
    startTime: number;
}