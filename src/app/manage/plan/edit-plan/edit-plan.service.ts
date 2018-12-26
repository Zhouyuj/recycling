import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { RebirthHttp, GET, Query, POST, Body, DELETE } from 'rebirth-http';
import { Result } from '../../../shared/models/response/result.model';
import { RouteModel } from '../models/route.model';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { DemandListModel } from '../models/demand.model';
import {PageRes} from '../../../shared/models/page/page-res.model';

@Injectable({
    providedIn: 'root'
})
export class EditPlanService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    @GET('/routes')
    getRouteList(@Query('planId') planId: string,/* 编辑方案的id,必填 */
                 @Query('name') name?: string,
                 @Query('plateNumber') plateNumber?: string): Observable<Result<RouteModel[]>> {
        return null;
    }

    @POST('/plan/:id/routes')
    addRoute(@Query('id') id: string, @Body routeDTO: { name: string, plateNumber: string }): Observable<Result<number>> {
        return null;
    }

    @DELETE('')
    delRoute(id) {
    }

    @GET('/customer-demands')
    getDemandList(@Query('page') page: PageReq, @Query('name') name: string, @Query('params') params?: any): Observable<Result<PageRes<DemandListModel[]>>> {
        return null;
    }
}
