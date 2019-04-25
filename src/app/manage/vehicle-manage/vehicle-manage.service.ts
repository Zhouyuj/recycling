import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import {
  RebirthHttp,
  Query,
  GET,
  DELETE,
  Path,
  POST,
  PUT,
  Body,
  RequestOptions
} from 'rebirth-http';

import { PageReq } from '../../shared/models/page/page-req.model';
import { PageRes } from '../../shared/models/page/page-res.model';
import { Result } from '../../shared/models/response/result.model';
import { UpkeepRecordReq } from './model/upkeep-record-req.model';
import { UpkeepRecordRes } from './model/upkeep-record-res.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleManageService extends RebirthHttp {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET('/locations/:vehicleId/:startTime/:endTime')
  getFixRecordList(
    @Path('month') vehicleId: string
  ): Observable<Result<any[]>> {
    return null;
  }
  /**
   * 获取保养记录数据信息，分页、查询
   * 
   * @param page 
   * @param param 
   */
  @GET('vehicleUpkeep')
  getUpkeepRecordList(
    @Query('page') page: PageReq,
    @Query('param') param?: any
  ): Observable<Result<PageRes<UpkeepRecordRes[]>>> {
    return null;
  }
  /**
   * 创建保养记录
   * @param upkeepRecord 
   */
  @POST('/vehicleUpkeep')
  public addUpkeepRecord(
    @Body upkeepRecord: UpkeepRecordReq
  ): Observable<Result<{ id: string }>> {
    return null;
  }
   /**
   * 修改保养记录
   * @returns {null}
   */
  @PUT('/vehicleUpkeep/:id')
  public updateUpkeepRecord(
    @Body upkeepRecord: UpkeepRecordReq,
    @Path('id') id?: number
  ): Observable<Result<{ id: string }>> {
    return null;
  }
  /**
   * 删除保养记录
   * @param id 
   */
  @DELETE('/vehicleUpkeep/:id')
  delUpkeepRecord(@Path('id') id: number): Observable<any> {
    return null;
  }
  /**
   * 导出保养记录报表
   * @param page 
   * @param param 
   */
  @GET('/vehicleUpkeep/export')
  @RequestOptions({
    responseType: 'blob'
  })
  getUpkeepRecordReportData(    
    @Query('page') page: PageReq,
    @Query('param') param?: any): Observable<any> {
    return null;
  }
}
