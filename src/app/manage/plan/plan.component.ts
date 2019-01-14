import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/internal/operators/map';
import { NzModalService, NzDrawerService } from 'ng-zorro-antd';

import { AddPlanComponent } from './add-plan/add-plan.component';
import { ModelConverter } from './models/model-converter';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { PlanListModel } from './models/plan-list.model';
import { PageRes } from '../../shared/models/page/page-res.model';
import { PageReq } from '../../shared/models/page/page-req.model';
import { PlanOperationEnum } from './models/plan.enum';
import { PlanRes } from './models/plan-res.model';
import { PlanService } from './plan.service';
import { PlanStateEnum, PlanStateEnumChinese } from './models/plan.enum';
import { Result } from '../../shared/models/response/result.model';
import { RouteModel } from './models/route.model';

@Component({
    selector   : 'app-plan',
    templateUrl: './plan.component.html',
    styleUrls  : [ './plan.component.scss' ]
})
export class PlanComponent implements OnInit {
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
    ];
    isSpinning = false;
    drawerRef: any;
    /* 新建空白方案 子抽屉 */
    childrenVisible: boolean;

    pageReq = new PageReq();
    pageRes = new PageRes();

    params = {
        name  : '',
        status: '',
    };
    planStateList = [
        { text: PlanStateEnumChinese.Completed, value: PlanStateEnum.Completed },
        { text: PlanStateEnumChinese.Executing, value: PlanStateEnum.Executing },
        { text: PlanStateEnumChinese.Stopped, value: PlanStateEnum.Stopped },
        { text: PlanStateEnumChinese.UnExecuted, value: PlanStateEnum.UnExecuted },
    ];

    resCache: PlanRes[];
    selectedItem: PlanListModel;
    listCache: PlanListModel[];
    formCache: any;
    routesListCache: RouteModel[];

    constructor(private router: Router,
                private planService: PlanService,
                private drawerService: NzDrawerService,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.getListByPage();
    }

    onSelected(e: boolean, item: PlanListModel) {
        this.listCache.forEach((r: PlanListModel) => {
            if (r.id === item.id) {
                r.checked = !item.checked;
                this.selectedItem = r;
                this.selectedItem = r.checked ? r : null;
            } else {
                r.checked = false;
            }
        });
    }

    onClickListItem(e, item: PlanListModel) {
        this.onSelected(true, item);
    }

    onPage(e) {
        this.pageReq.page = e;
        this.getListByPage();
    }

    onKeywordSearch(keywordType: string) {
        this.getListByPage({ isResetReq: true });
    }

    onKeywordFilter(e: string[]) {
        if (!e.length) {
            if (!this.params.status) return;
            this.params.status = '';
        } else {
            let result = e.join(',');
            if (this.params.status === result) return;
            this.params.status = e.join(',');
        }
        this.getListByPage({ isResetReq: true });
    }

    onAdd(): void {
        this.drawerRef = this.drawerService.create<AddPlanComponent, {title: string}, boolean>({
            nzContent      : AddPlanComponent,
            nzWidth        : '80%',
            nzPlacement    : 'left',
            nzContentParams: {
                title: 'title',
            }
        });

        this.drawerRef.afterOpen.subscribe(() => {
        });

        this.drawerRef.afterClose.subscribe((res: boolean) => {
            if (res) {
                // 重新调分页接口
                this.getListByPage({ isResetReq: true });
            }
        });
    }

    onNavigateToEdit() {
        this.planService.operatingPlan(this.selectedItem.id, PlanOperationEnum.EDIT).subscribe(
            (res: Result<{ status: number }>) => {
                this.router.navigateByUrl('/manage/plan/edit/' + this.selectedItem.id);
            },
            (err) => {
                if (err.error.status === 0) {
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,编辑失败',
                        content: err.error.message,
                    })
                }
            }
        );
    }

    getListByPage(option?: { isResetReq: boolean }) {
        if (option && option.isResetReq) {
            this.resetPageReq();
        }
        this.isSpinning = true;
        let paramsTemp = this.updateParams();
        this.planService.getPlanList(this.pageReq, paramsTemp).subscribe(
            (res: Result<PageRes<PlanRes[]>>) => {
                if (res.data.content) {
                    this.isSpinning = false;
                    this.resCache = res.data.content;
                    this.listCache = this.dataToTableList(res.data.content);
                    this.updatePageRes(res.data);
                }
            },
            err => {
                console.warn(`分页查询失败!!! message:${err.error.message}`);
                this.isSpinning = false;
            },
            () => this.isSpinning = false
        );
    }

    updatePageRes(data: PageRes<PlanRes[]>): void {
        this.pageRes = new PageRes(data.page, data.size, data.pages, data.total, data.last);
    }

    resetPageReq(): void {
        this.pageReq.page = 1;
        this.pageReq.size = this.pageRes.size;
        this.pageReq.sort = 'entryTime.desc';
    }

    updateParams() {
        let paramsTemp = {};
        for (let k in this.params) {
            if (!this.params[ k ]) {
                this.params[ k ] = null;
            } else {
                paramsTemp[ k ] = this.params[ k ];
            }
        }
        return paramsTemp;
    }

    dataToTableList(data: PlanRes[]): PlanListModel[] {
        return data.map(item => ModelConverter.planResToPlanListModel(item));
    }

    getRouteList(name?: string, planId?: number, plateNumber?: string) {
        this.planService
            .getRouteList(name || null, planId || null, plateNumber || null)
            .subscribe((res: Result<RouteModel[]>) => {
                if (res.data) {
                    this.routesListCache = res.data;
                }
            });
    }
}
