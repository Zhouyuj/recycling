import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanListModel } from './../models/plan-list.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PlanService } from './../plan.service';
import { PlanRes } from './../models/plan-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { ModelConverter } from './../models/model-converter';
import { NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { AddPlanComponent } from '../add-plan/add-plan.component';
import { PlanStateEnum,PlanStateEnumChinese } from '../models/plan.enum';
import { RouteRes } from '../models/route-res.model';

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
    selectedItem: PlanRes;
    listCache: PlanListModel[];
    formCache: any;
    routesListCache: RouteRes[];

    constructor(private router: Router,
                private planService: PlanService,
                private drawerService: NzDrawerService) {
    }

    ngOnInit() {
        this.getListByPage();
    }

    getListByPage() {
        this.isSpinning = true;
        this.planService.getPlanList(this.pageReq, this.params).subscribe((res: Result<PageRes<PlanRes[]>>) => {
            if (res.data.content) {
                this.isSpinning = false;
                this.resCache = res.data.content;
                this.listCache = this.dataToTableList(res.data.content);
                this.updatePageRes(res.data);
            }
        })
    }

    dataToTableList(data: PlanRes[]): PlanListModel[] {
        return data.map(item => ModelConverter.planResToPlanListModel(item));
    }

    updatePageRes(data: PageRes<PlanRes[]>): void {
        this.pageRes = new PageRes(data.page, data.size, data.pages, data.total, data.last);
    }

    getRouteList(name?: string, planId?: number, lateNumber?: string) {
        this.planService.getRouteList(name || null, planId || null, lateNumber || null).subscribe((res: Result<RouteRes[]>) => {
            if (res.data) {
                this.routesListCache = res.data;
            }
        });
    }

    onSelected(e?: boolean, item?: PlanListModel) {
        if (!e) {
            this.selectedItem = null;
            return;
        }
        this.selectedItem = this.resCache.filter((o: PlanRes) => o.id === item.id)[ 0 ];
        this.listCache.forEach((l: PlanListModel) => {
            if (l.id === item.id) {
                l.checked = true;
            } else {
                l.checked = false;
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
        this.getListByPage();
    }

    onkeywordFilter(e: string[]) {
        if (!e.length) {
            this.params.status = '';
        } else {
            this.params.status = e.join(',');
        }
        this.getListByPage();
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
                this.getListByPage();
            }
        });
    }

    onNavigateToEdit() {
        // 判断是否被锁定

        //this.router.navigateByUrl('/manage/plan/edit');
    }
}
