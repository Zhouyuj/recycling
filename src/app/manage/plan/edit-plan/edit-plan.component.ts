import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { EditPlanService } from './edit-plan.service';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { RouteModel } from '../models/route.model';

@Component({
    selector   : 'app-edit-plan',
    templateUrl: './edit-plan.component.html',
    styleUrls  : [ './edit-plan.component.scss' ]
})
export class EditPlanComponent implements OnInit {
    /* 面包屑导航 */
    breadcrumbs = [
        {
            link : '/',
            title: '首页',
        },
        {
            link : '/manage/plan',
            title: '方案管理',
        },
        {
            link : '/manage/plan/edit',
            title: '编辑',
        },
    ];
    isRoutesSpinning = false;       // 表格加载图
    isDistributeSpinning = false;   // 表格加载图
    isDemandSpinning = false;       // 表格加载图
    pageReq = new PageReq();
    pageRes = new PageRes();

    planId: string; // 所编辑的方案id

    routeListCache: RouteModel[];        // 表格:路线数据
    distributedListCache: any;           // 表格:派发请求数据
    demandListCache: any;                // 表格:收运请求数据

    formDataRoute: any = { name: '' };          // 表单:新增路线
    isAddRouteFormVisible = false;

    constructor(private route: ActivatedRoute,
                private editPlanService: EditPlanService) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.planId = params.get('id'))
        );
        this.editPlanService.getRouteList('').subscribe(
            (res: Result<RouteModel[]>) => {
                this.routeListCache = res.data;
                console.log(this.routeListCache);
            }
        );

    }

    /** 路线 start **/
    onAddRoute() {

    }

    onDelRoutes() {
    }

    onCloseAddRouteForm() {
        this.isAddRouteFormVisible = false;
    }

    onSelectRoute($e, item: RouteModel) {

    }

    toTableData() {

    }

    /** 路线 end **/

    onPage(e) {
    }

    /** 已派发 **/

    onCancelDistribute() {
    }

    /** 收运请求 **/
    onDelDemand() {
    }

}
