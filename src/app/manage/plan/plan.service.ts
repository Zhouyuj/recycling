import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { RebirthHttp, GET, Query, POST, Body } from 'rebirth-http';

import { PageReq } from '../../shared/models/page/page-req.model';
import { PageRes } from '../../shared/models/page/page-res.model';
import { PlanReq } from './models/plan-req.model';
import { PlanRes } from './models/plan-res.model';
import { Result } from '../../shared/models/response/result.model';
import { RouteModel } from './models/route.model';

@Injectable({
    providedIn: 'root'
})
export class PlanService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    @GET('/plans')
    getPlanList(@Query('page') page: PageReq, @Query('params') params: any): Observable<Result<PageRes<PlanRes[]>>> {
        return null;
    }

    /**
     * 新建方案时: 不必传入id
     * 复制方案时: 需传入源方案id
     * @param planReq
     * @param copyPlanId
     * @returns {null}
     */
    @POST('/plans')
    addPlan(@Body planReq: PlanReq, @Query('copyPlanId') copyPlanId?: string) {
        return null;
    }

    @GET('/routes')
    getRouteList(@Query('name') name?: string,
                 @Query('planId') planId?: number,
                 @Query('plateNumber') plateNumber?: string): Observable<Result<RouteModel[]>> {
        return null;
    }

}
