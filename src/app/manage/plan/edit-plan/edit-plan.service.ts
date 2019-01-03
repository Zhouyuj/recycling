import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { RebirthHttp, GET, Query, POST, Body, DELETE, Path } from 'rebirth-http';
import { Result } from '../../../shared/models/response/result.model';
import { RouteModel } from '../models/route.model';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { DemandModel } from '../models/demand.model';
import { TaskModel } from '../models/task.model';

@Injectable({
    providedIn: 'root'
})
export class EditPlanService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    @GET('/routes')
    getRouteList(@Query('planId') planId: number,/* 编辑方案的id,必填 */
                 @Query('name') name?: string,
                 @Query('plateNumber') plateNumber?: string): Observable<Result<RouteModel[]>> {
        return null;
    }

    @POST('/plans/:id/routes')
    addRoute(@Body routeDTO: any, @Path('id') id: number): Observable<Result<number>> {
        return null;
    }

    @GET('/routes/:id/tasks')
    getDistributeList(@Path('id') id: string): Observable<Result<TaskModel[]>> {
        return null;
    }

    @DELETE('')
    delRoute(id) {
    }

    @GET('/customer-demands')
    getDemandList(@Query('page') page: PageReq, @Query('name') name: string, @Query('params') params?: any): Observable<Result<PageRes<DemandModel[]>>> {
        return null;
    }
}
