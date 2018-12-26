/**
 * Created by wujiahui on 2018/12/7.
 */

import { TaskEnum } from './task.enum';

export interface RouteModel {
    id: number;
    lock: boolean;
    name: string;
    plateNumber: string;
    priority: number;
}

export interface RouteListModel {
    id: number;
    lock: boolean;
    name: string;
    plateNumber: string;
    priority: number;
    checked: boolean;   // 是否被选中
}
