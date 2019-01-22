import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { RebirthHttp, Query, GET, Path } from 'rebirth-http';

import { PlanRes } from '../plan/models/plan-res.model';
import { PageReq } from '../../shared/models/page/page-req.model';
import { PageRes } from '../../shared/models/page/page-res.model';
import { Result } from '../../shared/models/response/result.model';
import { RouteModel } from '../plan/models/route.model';
import { TaskModel } from '../plan/models/task.model';

@Injectable({
    providedIn: 'root'
})
export class MonitorService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    @GET('/plans')
    getPlanList(@Query('page') page: PageReq, @Query('params') params: any): Observable<Result<PageRes<PlanRes[]>>> {
        return null;
    }

    @GET('/routes')
    getRouteList(@Query('params') params: {
        name?: string,
        planId?: number,
        planIds?: number[],
        plateNumber?: string
    }): Observable<Result<RouteModel[]>> {
        return null;
    }

    @GET('/routes/:id/tasks')
    getTaskList(@Path('id') id: number): Observable<Result<TaskModel[]>> {
        return null;
    }

}
