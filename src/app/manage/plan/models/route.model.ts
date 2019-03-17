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
  collectionQuantity: number; // 手持报量(吨)
  weighedQuantity: number; // 地磅报量(吨)
  startTime: number;
  endTime: number;
  taskList?: TaskModel[];
  username: string;
  endMileage: any;
  startMileage: any;
}

export interface RouteListModel extends RouteModel {
  checked?: boolean; // 是否被选中
}

export interface VehicleOfRoute {
  id: number;
  lat: number;
  lng: number;
  plateNumber: string;
}

export enum RouteState {
  Stopped = 'Stopped',
  UnExecuted = 'UnExecuted',
  Executing = 'Executing',
  Completed = 'Completed'
}
