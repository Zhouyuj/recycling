import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import {
  RebirthHttp,
  Query,
  GET,
  DELETE,
  Path,
  POST,
  PUT,
  Body,
  RequestOptions
} from 'rebirth-http';

import { PlanRes } from '../plan/models/plan-res.model';
import { PageReq } from '../../shared/models/page/page-req.model';
import { PageRes } from '../../shared/models/page/page-res.model';
import { Result } from '../../shared/models/response/result.model';
import { RouteModel, RouteListModel } from '../plan/models/route.model';
import { TaskModel } from '../plan/models/task.model';
import { LocationModel } from './models/location.model';
import { WeighBridgesModel } from './weigh-bridges/weigh-bridges.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET('/locations/:vehicleId/:startTime/:endTime')
  getLocations(
    @Path('vehicleId') vehicleId: number,
    @Path('startTime') startTime: number,
    @Path('endTime') endTime: number
  ): Observable<Result<LocationModel[]>> {
    return null;
  }

  @PUT('/customers/:id/location')
  updateCustomerLocation(
    @Path('id') id: number,
    @Body location: { lng: number; lat: number }
  ): Observable<Result<any>> {
    return null;
  }

  @GET('/routes/:id/tasks')
  getTaskList(@Path('id') id: number): Observable<Result<TaskModel[]>> {
    return null;
  }

  @GET('/weighBridges')
  getWeighBridgesList(
    @Query('page') page: PageReq,
    @Query('params') params?: any
  ): Observable<Result<PageRes<WeighBridgesModel[]>>> {
    return null;
  }

  @GET('/weighBridges/export/:month')
  @RequestOptions({
    responseType: 'blob'
  })
  getWeighBridgesReport(@Path('month') month: string): Observable<any> {
    return null;
  }
}
