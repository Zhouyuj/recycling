import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { RebirthHttp, GET, Query, POST, Body, DELETE, Path, PATCH } from 'rebirth-http';
import { Result } from '../../../shared/models/response/result.model';
import { RouteModel } from '../models/route.model';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { DemandModel, DemandReq } from '../models/demand.model';
import { TaskModel } from '../models/task.model';

@Injectable({
    providedIn: 'root'
})
export class EditPlanService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    @GET('/routes')
    getRouteList(@Query('planId') planId: string, /* 编辑方案的id,必填 */
                 @Query('param') param?: { name?: string, plateNumber?: string }): Observable<Result<RouteModel[]>> {
        return null;
    }

    @POST('/plans/:id/routes')
    addRoute(@Body routeDTO: any, @Path('id') id: string): Observable<Result<number>> {
        return null;
    }

    @PATCH('/plans/:id/routes/:routeId')
    updateRoute(@Body routeDTO: { name?: string, priority?: number, vehicle?: string},
                @Path('id') id: string,
                @Path('routeId') routeId: string): Observable<Result<any>> {
        return null;
    }

    @DELETE('/plans/:id/routes/:routeId')
    delRoute(@Path('id') id: string, @Path('routeId') routeId: string) {
        return null;
    }

    @GET('/routes/:id/tasks')
    getDistributeList(@Path('id') id: string): Observable<Result<TaskModel[]>> {
        return null;
    }

    @GET('/tasks')
    getDemandList(@Query('page') page: PageReq, @Query('params') params?: any): Observable<Result<PageRes<DemandModel[]>>> {
        return null;
    }

    @POST('/tasks')
    addDemands(@Body tasks: DemandReq[]): Observable<Result<{ id: number }>> {
        return null;
    }
}
