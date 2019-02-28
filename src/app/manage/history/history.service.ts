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
  RequestOptions
} from 'rebirth-http';

import { PlanRes } from '../plan/models/plan-res.model';
import { PageReq } from '../../shared/models/page/page-req.model';
import { PageRes } from '../../shared/models/page/page-res.model';
import { Result } from '../../shared/models/response/result.model';
import { RouteModel, RouteListModel } from '../plan/models/route.model';
import { TaskModel } from '../plan/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET('/routes')
  getRouteList(@Query('params')
  params: {
    name?: string;
    planId?: number;
    planIds?: number[];
    plateNumber?: string;
  }): Observable<Result<RouteModel[]>> {
    return null;
  }

  @GET('/routes/:id/tasks')
  getTaskList(@Path('id') id: number): Observable<Result<TaskModel[]>> {
    return null;
  }

  @GET('/plans')
  getPlanList(
    @Query('page') page: PageReq,
    @Query('params') params: any
  ): Observable<Result<PageRes<PlanRes[]>>> {
    return null;
  }

  @DELETE('/plans/:id')
  delPlan(@Path('id') id: number): Observable<Result<any>> {
    return null;
  }

  @GET('/reports/plans/:id')
  @RequestOptions({
    responseType: 'blob'
  })
  getPlanReport(@Path('id') id: number): Observable<any> {
    return null;
  }
}