import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';

import {
  GET,
  Path,
  POST,
  PUT,
  DELETE,
  Body,
  Query,
  RequestOptions,
  RebirthHttp
} from 'rebirth-http';

import { Result } from '../../../shared/models/response/result.model';
import { CustomerReq } from './customer-req.model';
import { CustomerRes } from './customer-res.model';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { VehicleRes } from '../vehicle-info/vehicle-res.model';
import { CustomerCountModel } from '../../history/models/customer-count.model';

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
  public getCustomerVehicles(
    @Query('page') page: PageReq,
    @Query('area') area: string,
    @Query('state') state: string,
    @Query('plateNumber') plateNumber?: string
  ): Observable<Result<PageRes<VehicleRes[]>>> {
    // TODO
    return null;
  }

  @GET('/customers')
  public getCustomerList(
    @Query('page') page: PageReq,
    @Query('params') params?: any
  ): Observable<Result<PageRes<CustomerRes[]>>> {
    // TODO
    return null;
  }

  /**
   * 创建收集点
   * @returns {null}
   */
  @POST('/customers')
  public addCustomer(
    @Body customer: CustomerReq
  ): Observable<Result<{ id: number }>> {
    return null;
  }

  /**
   * 更新收集点
   * @returns {null}
   */
  @PUT('/customers/:id')
  public updateCustomer(
    @Body customer: CustomerReq,
    @Path('id') id?: number
  ): Observable<Result<{ id: string }>> {
    return null;
  }

  /**
   * 根据ID查询收运单位信息
   */
  @GET('/customers/:id')
  public getCustomerById(
    @Path('id') id: number
  ): Observable<Result<CustomerRes>> {
    return null;
  }

  /**
   * 删除收集点
   * @returns {null}
   */
  @DELETE('/customers/:id')
  public delCustomer(
    @Path('id') id: number
  ): Observable<Result<{ status: string }>> {
    return null;
  }

  @GET('/reports/customers/:id')
  @RequestOptions({
    responseType: 'blob'
  })
  getCustomersReport(@Path('id') id: number): Observable<any> {
    return null;
  }

  @GET('/customerCounts/:id/:month')
  getCustomerCountsByIdAndMonth(
    @Path('id') id: number,
    @Path('month') month: string
  ): Observable<Result<CustomerCountModel>> {
    return null;
  }

  @GET('/customerCounts/export/:id/:month')
  @RequestOptions({
    responseType: 'blob'
  })
  getCustomerCountReport(
    @Path('id') id: number,
    @Path('month') month: string
  ): Observable<any> {
    return null;
  }
}
