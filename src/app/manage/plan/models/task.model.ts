/**
 * Created by wujiahui on 2019/1/2.
 */

export interface TaskModel {
    id: number;
    name: string;
    amountOfGarbage: number;
    priority: number;
    state: string;
    lat: number;
    lng: number;
    collectionPeriod: {
        startTime: number,
        endTime  : number,
    };
    taskList: SubTaskModel[];
    checked?: boolean;
    expand?: boolean;
}

export interface SubTaskModel {
    id: number,
    name: string,
    amountOfGarbage: number,
    state: string,
    collectionPeriod: {
        startTime: number,
        endTime  : number,
    },
    checked?: boolean,
}
