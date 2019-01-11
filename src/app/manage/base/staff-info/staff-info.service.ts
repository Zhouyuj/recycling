import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';

import { RebirthHttp, GET, POST, PUT, DELETE, Query, Path, Body } from 'rebirth-http';

import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { StaffRes } from './staff-res.model';
import {StaffReq} from './staff-req.model';

@Injectable({
    providedIn: 'root'
})
export class StaffInfoService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    @GET('/employees')
    getStaffList(@Query('page') pageReq: PageReq, @Query('params') params?: any): any {
        return null;
    }

    @POST('/employees')
    addStaff(@Body staff: StaffReq): Observable<Result<PageRes<StaffRes[]>>> {
        return null;
    }

    @PUT('/employees/:id')
    updateStaff(@Path('id') id: number, @Body staff: StaffReq): Observable<any> {
        return null;
    }

    @DELETE('/employees/:id')
    delStaff(@Path('id') id: number): Observable<any> {
        return null;
    }
}
