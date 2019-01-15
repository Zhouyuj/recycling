/**
 * Created by wujiahui on 2018/12/24.
 */

export interface DemandModel {
    id: number; /* 请求 id */
    name: string;
    collectionPeriods: CollectionPeriod[],
    collectionPeriodId: number,
    amountOfGarbage: number;    // 收运量(桶)
    //vehiclePlate: string,
    checked?: boolean;
    expand?: boolean;
    taskList?: SubDemandModel[];
}

export interface SubDemandModel {
    id: number;
    name: string;
    amountOfGarbage: number;
    collectionPeriod: CollectionPeriod;
    checked?: boolean;
    editable?: boolean;
}

export interface CollectionPeriod {
    id: number;
    dateType: string;
    startTime: number;
    endTime: number;
    priority: string;
    garbageCategory: string;    // KitchenWaste, WasteGrease
    vehicle: string;
}

export interface DemandRes extends DemandModel {
}

export interface DemandListModel extends DemandModel {
    // 选中的收运时间段 提供给列表中编辑使用
    selectedPeriod?: CollectionPeriod;
    editable?: boolean;
}

export interface DemandReq {
    amountOfGarbage: number;
    collectionPeriodId: number;
    customerId: number;
    name: string;
    taskList?: {
        amountOfGarbage: number,
        customerId: number,
        name: string,
    }[];
}
