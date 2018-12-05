import { Component, OnInit } from '@angular/core';
import { PlanListModel } from './../models/plan-list.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PlanService } from './../plan.service';
import { PlanRes } from './../models/plan-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { ModelConverter } from './../models/model-converter';
import { NzModalService, NzDrawerService } from 'ng-zorro-antd';
import { AddPlanComponent } from '../add-plan/add-plan.component';

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
    params = {};

    planNameKeyword: string;    // 方案名称搜索

    resCache: PlanRes[];
    listCache: PlanListModel[];
    selectedItem: PlanRes;
    formCache: any;

    constructor(private planService: PlanService,
                private drawerService: NzDrawerService) {
    }

    ngOnInit() {
        this.getListByPage();
    }

    getListByPage() {
        this.isSpinning = true;
        this.planService.getPlanList(this.pageReq, this.params).subscribe((res: Result<PageRes<PlanRes[]>>) => {
            if (res.data.content) {
                this.resCache = res.data.content;
                this.listCache = res.data.content.map(item => ModelConverter.planResToPlanListModel(item));
                this.isSpinning = false;
            }
        })
    }

    onSelected(e?: boolean, item?: PlanListModel) {
        if (!e) {
            this.selectedItem = null;
            return;
        }
        this.selectedItem = this.resCache.filter((o: PlanRes) => o.id === item.id)[0];
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

    onEdit() {
        // 路由跳转
    }
}
