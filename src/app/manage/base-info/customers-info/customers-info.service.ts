import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { GET, Query, RebirthHttp } from 'rebirth-http';

@Injectable({
    providedIn: 'root'
})
export class CustomersInfoService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    @GET('/customer-types')
    public getCustomerTypes(): Observable<any> {
        return null;
    }

    @GET('/customers')
    public getCustomerList(): Observable<any> {
        return null;
    }

    mockListData(): Observable<[object]> {
        return null;
    }
}
