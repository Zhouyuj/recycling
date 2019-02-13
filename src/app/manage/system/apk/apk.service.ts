import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
// import { RebirthHttp, Headers, GET, POST, Body, Query } from 'rebirth-http';
import { ApkRes } from './models/apk-res.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';



@Injectable({
    providedIn: 'root'
})
export class ApkService  {

    constructor(private http: HttpClient) {
        // super(http);
    }
/*

    @GET('/apps/latest')
    getApkList(): Observable<Result<ApkRes>> {
        return null;
    }

    /!**
     *
     * @param formData
     * @param version
     * @param description
     * @returns { id: number, type: Image | Video | Audio, url: string }
     *!/
    @Headers({ 'Content-Type': 'multipart/form-data' })
    @POST('/apps')
    addApk(@Body formData: FormData,
           @Query('version') version: string,
           @Query('description') description: string): Observable<Result<{ id: number, type: string, url: string }>> {
        return null;
    }
*/
    getApkList(url: string) {
        return this.http.get(url);
    }

    addApk(formData: FormData, url: string) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
            // headers: new HttpHeaders().set('Content-Type', 'multipart/form-data'),
            // headers: { 'Content-Type': 'multipart/form-data' },
            // headers: { 'Content-Type': 'multipart/form-data', 'X-RequestedWith': 'XMLHttpRequest' },
        };
        return this.http.post(url, formData, httpOptions);
    }
}
