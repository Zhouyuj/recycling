/**
 * Created by wujiahui on 2018/12/10.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { RebirthHttp, Headers, GET, POST, Body, Query } from 'rebirth-http';
import { ApkRes } from './models/apk-res.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';


@Injectable({
    providedIn: 'root'
})
export class ApkServiceV2 extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    @GET('/apps/latest')
    getApkList(url?): Observable<Result<ApkRes>> {
        return null;
    }

    /**
     *
     * @param formData
     * @param version
     * @param description
     * @returns { id: number, type: Image | Video | Audio, url: string }
     */
    // @Headers({ 'Content-Type': undefined })
    @POST('/apps')
    addApk(@Body formData: FormData,
           @Query('params') params: { version: string, description: string }
           ): Observable<Result<{ id: number, type: string, url: string }>> {
        return null;
    }

}
