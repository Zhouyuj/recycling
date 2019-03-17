import { Injectable } from '@angular/core';
import { CustomerCountModel } from './model/customer-count.model';
import { GET, RebirthHttp, BaseUrl, RequestOptions } from 'rebirth-http';
import { Observable } from 'rxjs/index';
import { Result } from '../../shared/models/response/result.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@BaseUrl(environment.wechatApi)
@Injectable({
  providedIn: 'root'
})
export class ManageService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }
  @GET('/customerCounts/:username/:month')
  getCustomerCountsByUsernameAndMonth(
    username: any,
    month: string
  ): Observable<Result<CustomerCountModel>> {
    return null;
  }

  @GET('/customerCounts/export/:username/:month')
  @RequestOptions({
    responseType: 'blob'
  })
  export(username: any, month: string): Observable<any> {
    return null;
  }
}
