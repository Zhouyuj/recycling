import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { RebirthHttp, GET, Query, POST, Body, DELETE, Path, PATCH, PUT } from 'rebirth-http';
/* models, enums */
import { Result, ResultError } from '../../../shared/models/response/result.model';
import { RouteModel } from '../models/route.model';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { DemandModel, DemandReq } from '../models/demand.model';
import { TaskModel } from '../models/task.model';
import { PlanOperationEnum } from '../models/plan.enum';

@Injectable({
    providedIn: 'root'
})
export class EditPlanService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    /** start of routes **/

    @GET('/routes')
    getRouteList(@Query('planId') planId: string, /* 编辑方案的id,必填 */
                 @Query('param') param?: { name?: string, plateNumber?: string }): Observable<Result<RouteModel[]>> {
        return null;
    }

    @POST('/plans/:id/routes')
    addRoute(@Body routeDTO: any, @Path('id') id: string): Observable<Result<number>> {
        return null;
    }

    @PATCH('/plans/:id/routes/:routeId')
    updateRoute(@Body routeDTO: { name?: string, priority?: number, vehicle?: string},
                @Path('id') id: string,
                @Path('routeId') routeId: string): Observable<Result<any>> {
        return null;
    }

    @DELETE('/plans/:id/routes/:routeId')
    delRoute(@Path('id') id: string, @Path('routeId') routeId: string): Observable<Result<any>> {
        return null;
    }

    @POST('/plans/:id/routes/:routeId/operations')
    changeRouteStatus(@Path('id') id: string,
                      @Path('routeId') routeId: string,
                      @Query('operate') operate: string): Observable<Result<any>> {
        return null;
    }

    /**
     * 为线路添加任务
     * @param id
     * @param taskIds
     * @returns {null}
     */
    @POST('/routes/:id/tasks')
    addTasksOnRoute(@Path('id') id: string, @Query('taskIds') taskIds: string): Observable<Result<any>> {
        return null;
    }

    /**
     * 为线路删除任务
     * @param id
     * @param taskIds
     * @returns {null}
     */
    @DELETE('/routes/:id/tasks')
    delTasksOnRoute(@Path('id') id: string, @Query('taskIds') taskIds: string): Observable<Result<any>> {
        return null;
    }

    /**
     * 修改任务优先级
     */
    @PATCH('/routes/:id/tasks')
    updateTasksPriorityOnRoute(@Path('id') id: string,
                               @Body taskPriorityList: { id: number, priority: number }[]): Observable<Result<any>> {
        return null;
    }

    /** end of routes **/






    /** start of tasks/demands **/

    /**
     * 获取线路的收运任务
     * @param id
     * @returns {null}
     */
    @GET('/routes/:id/tasks')
    getDistributeList(@Path('id') id: string): Observable<Result<TaskModel[]>> {
        return null;
    }

    /**
     * 分页获取收运请求
     * @param page
     * @param params
     * @returns {null}
     */
    @GET('/tasks')
    getDemandList(@Query('page') page: PageReq, @Query('params') params?: any): Observable<Result<PageRes<DemandModel[]>>> {
        return null;
    }

    /**
     * 新增收运请求
     * @param tasks
     * @returns {null}
     */
    @POST('/tasks')
    addDemands(@Body tasks: DemandReq[]): Observable<Result<{ id: number }>> {
        return null;
    }

    /**
     * 删除收运请求
     * @param id
     * @returns {null}
     */
    @DELETE('/tasks/:id')
    delDemand(@Path('id') id: string): Observable<Result<any>> {
        return null;
    }

    @PUT('/tasks/:id')
    updateDemand(@Path('id') id: number,
                 @Body demandDTO: { amountOfGarbage: number, collectionPeriodId: number }): Observable<Result<any>> {
        return null;
    }

    /** end of tasks/demands **/

    /**
     * 保存方案-修改该人员对于该方案的状态
     * @param id
     * @param operate
     * @returns {null}
     */
    @POST('plans/:id/operations')
    editPlan(@Path('id') id: string, @Query('operate') operate: PlanOperationEnum) {
        return null;
    }

    // TODO
    predictPlan() {
        return null;
    }
}
