import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { GET, Path, POST, PUT, DELETE, Body, Query, RebirthHttp } from 'rebirth-http';

import { Result } from '../../../shared/models/response/result.model';
import { CustomerReq } from './customer-req.model';
import { CustomerRes } from './customer-res.model';
import { Duration, FormModel } from './form.model';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import {VehicleRes} from '../vehicle-info/vehicle-res.model';

@Injectable({
    providedIn: 'root'
})
export class CustomersInfoService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    @GET('/customer-types')
    public getCustomerTypes(): Observable<Result<any>> {
        return null;
    }


    /**
     * 获取该收集点的所属车辆
     * @param page
     * @param params
     * @returns {null}
     */
    @GET('/vehicles')
    public getCustomerVehicles(@Query('page') page: PageReq,
                               @Query('area') area: string,
                               @Query('state') state: string,
                               @Query('plateNumber') plateNumber?: string): Observable<Result<PageRes<VehicleRes[]>>> {//TODO
        return null;
    }

    @GET('/customers')
    public getCustomerList(@Query('page') page: PageReq,
                           @Query('params') params?: any
                           /*@Query('address') address?: string,
                            @Query('contactName') contactName?: string,
                            @Query('mobilePhone') mobilePhone?: string,
                            @Query('name') name?: string,
                            @Query('state') state?: string,
                            @Query('username') username?: string*/): Observable<Result<PageRes<CustomerRes[]>>> {//TODO
        return null;
    }

    /**
     * 创建收集点
     * @returns {null}
     */
    @POST('/customers/:parentId')
    public addCustomer(@Body customer: CustomerReq, @Path('parentId') parentId?: string): Observable<Result<{ id: string }>> {
        return null;
    }

    /**
     * 更新收集点
     * @returns {null}
     */
    @PUT('/customers/:id')
    public updateCustomer(@Body customer: CustomerReq, @Path('id') id?: string): Observable<Result<{ id: string }>> {
        return null;
    }

    /**
     * 删除收集点
     * @returns {null}
     */
    @DELETE('/customers/:id')
    public delCustomer(@Path('id') id: string): Observable<Result<{ id: string }>> {
        return null;
    }

}
