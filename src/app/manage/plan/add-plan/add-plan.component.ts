import { Component, OnInit, Input } from '@angular/core';

import { NzDrawerRef } from 'ng-zorro-antd';

import { NotificationService } from '../../../shared/services/notification/notification.service';
import { PlanService } from '../plan.service';
import { ModelConverter } from '../models/model-converter';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { PlanReq } from '../models/plan-req.model';
import { PlanRes } from '../models/plan-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { PlanListModel } from '../models/plan-list.model';

@Component({
    selector   : 'app-add-plan',
    templateUrl: './add-plan.component.html',
    styleUrls  : [ './add-plan.component.scss' ]
})
export class AddPlanComponent implements OnInit {
    @Input() title: string;
    @Input() id: string;    // 已有的方案的id

    isTableSpinning = false;
    isFormSpinning = false;
    isFormChildSpinning = false;
    childrenVisible = false;

    pageReq = new PageReq();
    pageRes = new PageRes();
    params = {
        name: '',
        status: [
            'Stopped',
            'Completed',
        ],
    };

    planNameKeyword: string;
    formDataExist = {
        category: 'Formal', // Formal | Demo
        name    : '',
        id      : null,
    };
    formDataBlank = {
        category: 'Formal', // Formal | Demo
        name    : '',
    };
    resCache: PlanRes[];
    listCache: PlanListModel[];
    selectedItem: PlanRes;

    constructor(private drawerRef: NzDrawerRef<boolean>,
                private planService: PlanService,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.getListByPage();
    }

    getListByPage() {
        this.isTableSpinning = true;
        let paramsTemp = this.updateParams();
        this.planService.getPlanList(this.pageReq, paramsTemp).subscribe((res: Result<PageRes<PlanRes[]>>) => {
            if (res.data.content) {
                this.resCache = res.data.content;
                this.listCache = res.data.content.map(item => ModelConverter.planResToPlanListModel(item));
                this.isTableSpinning = false;
                this.selectedItem = null;
                this.updatePageRes(res.data);
            }
        })
    }

    updateParams(): any {
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

    updatePageRes(data: PageRes<PlanRes[]>): void {
        this.pageRes = new PageRes(data.page, data.size, data.pages, data.total, data.last);
    }

    onPage(e) {
        this.pageReq.page = e;
        this.getListByPage();
    }

    /**
     * 复制已有方案
     */
    onSubmitExistPlan() {
        if (!this.selectedItem) {
            return;
        }
        this.isFormSpinning = true;
        this.planService.addPlan(this.formDataExist, `${this.selectedItem.id}`).subscribe(
            res => {
                this.isFormSpinning = false;
                this.drawerRef.close(true);
                this.notificationService.create({
                    type   : 'success',
                    title  : '恭喜,复制方案成功',
                });
            },
            err => {
                this.isFormSpinning = false;
            },
            () => this.isFormSpinning = false
        );
    }

    /**
     * 新建空白方案
     */
    onSubmitBlankPlan() {
        this.isFormChildSpinning = true;
        this.planService.addPlan(this.formDataBlank).subscribe(
            res => {
                this.isFormChildSpinning = false;
                this.childrenVisible = false;
                this.drawerRef.close(true);
                this.notificationService.create({
                    type   : 'success',
                    title  : '恭喜,新建空白方案成功',
                    content: '该提醒将自动消失',
                });
            },
            err => {
                this.isFormChildSpinning = false;
            },
            () => this.isFormChildSpinning = false
        );
    }

    onCheckedChange(e?: boolean, item?: PlanListModel) {
        if (!e) {
            this.selectedItem = null;
            return;
        }
        this.selectedItem = this.resCache.filter((o: PlanRes) => o.id === item.id)[ 0 ];
        this.formDataExist.name = this.selectedItem.name;
        this.formDataExist.category = this.selectedItem.category;
        this.formDataExist.id = this.selectedItem.id;
        this.listCache.forEach((l: PlanListModel) => {
            if (l.id === item.id) {
                l.checked = true;
            } else {
                l.checked = false;
            }
        });
    }

    onClickListItem(e, item: PlanListModel) {
        this.onCheckedChange(true, item);
    }

    onKeywordSearch() {
        this.getListByPage();
    }

    /**
     * 打开空白方案 抽屉
     */
    onOpenChildren(): void {
        this.childrenVisible = true;
    }

    /**
     * 关闭空白方案 抽屉
     */
    onCloseChildren(): void {
        this.childrenVisible = false;
    }
}
