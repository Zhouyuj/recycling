import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { GET, POST, Body, Query, RebirthHttp } from 'rebirth-http';

import { Result } from '../../../shared/models/response/result.model';
import { CustomerReq } from './customer-req.model';
import { CustomerRes } from './customer-res.model';
import { Duration } from './customers-info-form/form.model';
import { FormModel } from './customers-info-form/form.model';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';

@Injectable({
    providedIn: 'root'
})
export class CustomersInfoService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    @GET('/customer-types')
    public getCustomerTypes(): Observable<Result<any>> {//TODO
        return null;
    }

    @GET('/customers')
    public getCustomerList(
        @Query('page') page: PageReq,
        @Query('address') address?: string,
        @Query('contactName') contactName?: string,
        @Query('mobilePhone') mobilePhone?: string,
        @Query('name') name?: string,
        @Query('state') state?: string,
        @Query('username') username?: string
    ): Observable<Result<PageRes<CustomerRes[]>>> {//TODO
        return null;
    }

    /**
     * 创建广场点
     * @returns {null}
     */
    @POST('/customers')
    public addCustomer(@Body customer: CustomerReq): Observable<Result<{ id: string }>> {//TODO
        return null;
    }

}
