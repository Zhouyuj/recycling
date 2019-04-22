import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import {
  RebirthHttp,
  Query,
  GET,
  Path,
  PUT,
  Body,
  RequestOptions
} from 'rebirth-http';

import { PageReq } from '../../shared/models/page/page-req.model';
import { PageRes } from '../../shared/models/page/page-res.model';
import { Result } from '../../shared/models/response/result.model';
import { TaskModel } from '../plan/models/task.model';

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
}
