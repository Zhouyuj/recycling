/**
 * Created by wujiahui on 2018/12/24.
 */

export interface DemandModel {
    id: number;
    name: string;
    collectionPeriod: CollectionPeriod[],
    amountOfGarbage: number;    // 收运量(桶)
    garbageCategory: string;    // KitchenWaste, WasteGrease
    plateNumber: string;
    collectionPeriodId: number;
    checked?: boolean;
}

export interface DemandRes extends DemandModel {}

export interface DemandListModel extends DemandModel {
    checked?: boolean;
}

export interface CollectionPeriod {
    dateType : string;
    startTime : number;
    endTime : number;
    priorityType: string;
}
