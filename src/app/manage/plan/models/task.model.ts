/**
 * Created by wujiahui on 2019/1/2.
 */

export interface TaskModel {
    id: number;
    name: string;
    amountOfGarbage: number;
    priority: number;
    state: string;
    collectionPeriod: {
        startTime: number,
        endTime  : number,
    };
    taskList:[{
        id: number;
        name: string;
        amountOfGarbage: number;
        state: string;
        collectionPeriod: {
            startTime: number,
            endTime  : number,
        }
    }];
    checked?: boolean;
    expand?: boolean;
}