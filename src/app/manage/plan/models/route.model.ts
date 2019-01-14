/**
 * Created by wujiahui on 2018/12/7.
 */

import { TaskEnum } from './task.enum';

export interface RouteModel {
    id: string;
    lock: boolean;
    name: string;
    plateNumber: string;
    priority: number;
    state: RouteState;
}

export interface RouteListModel extends RouteModel {
    checked?: boolean;   // 是否被选中
}

export enum RouteState {
    Stopped = 'Stopped',
    UnExecuted = 'UnExecuted',
    Executing = 'Executing',
    Completed = 'Completed',
}