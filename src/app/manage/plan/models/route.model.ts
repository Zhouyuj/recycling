/**
 * Created by wujiahui on 2018/12/7.
 */

import { TaskEnum } from './task.enum';
import { TaskModel } from './task.model';

export interface RouteModel {
    id: number;
    lock: boolean;
    name: string;
    priority: number;
    driver: string;
    state: RouteState;
    vehicle: VehicleOfRoute;
    taskList?: TaskModel[];
}

export interface RouteListModel extends RouteModel {
    checked?: boolean;   // 是否被选中
}

export interface VehicleOfRoute {
    lat: number;
    lng: number;
    plateNumber: string;
}

export enum RouteState {
    Stopped = 'Stopped',
    UnExecuted = 'UnExecuted',
    Executing = 'Executing',
    Completed = 'Completed',
}
