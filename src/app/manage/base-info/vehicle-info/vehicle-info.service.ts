import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { RebirthHttp, GET, Path, POST, PUT, Query, Body, DELETE } from 'rebirth-http';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { Result } from '../../../shared/models/response/result.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { VehicleReq } from './vehicle-req.model';
import { VehicleRes } from './vehicle-res.model';

@Injectable({
    providedIn: 'root'
})
export class VehicleInfoService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    mockListData(): Observable<[object]> {
        return null;
    }

    @GET('/vehicles')
    public getVehicleList(@Query('page') page: PageReq,
                          @Query('params') params?: any): Observable<Result<PageRes<VehicleRes[]>>> {//TODO
        return null;
    }

    @POST('/vehicles')
    public addVehicle(@Body vehicle: VehicleReq): Observable<Result<{ id: string }>> {
        return null;
    }

    /**
     * 更新车辆
     * @returns {null}
     */
    @PUT('/vehicles/:id')
    public updateVehicle(@Body vehicle: VehicleReq, @Path('id') id?: number): Observable<Result<{ id: string }>> {
        return null;
    }

    /**
     * 删除车辆
     * @returns {null}
     */
    @DELETE('/vehicles/:id')
    public delCustomer(@Path('id') id: number): Observable<Result<{ id: string }>> {
        return null;
    }

}
