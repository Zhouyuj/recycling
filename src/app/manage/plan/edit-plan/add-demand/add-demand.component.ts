import { Component, OnInit } from '@angular/core';

import { NzDrawerRef } from 'ng-zorro-antd';

import { EditPlanService } from '../edit-plan.service';
import { DemandRes } from '../../models/demand.model';
import { PageReq } from '../../../../shared/models/page/page-req.model';
import { PageRes } from '../../../../shared/models/page/page-res.model';
import { Result } from '../../../../shared/models/response/result.model';
import { DemandModel, DemandListModel, SubDemandModel, CollectionPeriod } from '../../models/demand.model';
import { ModelConverter } from '../../models/model-converter';
import { DemandReq } from '../../models/demand.model';
import { VerifyUtil } from '../../../../shared/utils/verify-utils';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { CustomersInfoService } from '../../../base/customers-info/customers-info.service';
import { CustomerRes } from '../../../base/customers-info/customer-res.model';

@Component({
    selector   : 'app-add-demand',
    templateUrl: './add-demand.component.html',
    styleUrls  : [ './add-demand.component.scss' ]
})
export class AddDemandComponent implements OnInit {
    isDemandSpinning = false;
    isShowSub = false;
    allSelected = false;
    allSelectedSub = false;
    indeterminate = false;
    indeterminateSub = false;

    pageReq = new PageReq(1, 12);
    pageRes = new PageRes(1, 12);
    params = {
        name: '',
    };

    selectedCluster: DemandListModel;   // 选中聚类请求
    demandListCache: DemandListModel[];

    constructor(private drawerRef: NzDrawerRef<any>,
                private editPlanService: EditPlanService,
                private customersInfoService: CustomersInfoService,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.getCustomerList({ isResetReq: true });
    }

    /**
     * 关键字搜索 TODO
     */
    onSearch() {
        this.getCustomerList({ isResetReq: true });
    }

    /**
     * 选中请求
     * @param $e
     * @param item
     */
    onSelectDemand($e, item: DemandListModel) {
        item.checked = !item.checked;
        this.refreshSelectStatus(1);
    }

    /**
     * 显示该聚类下的子请求
     * @param item
     */
    onShowSub(item: DemandListModel) {
        this.isShowSub = true;
        this.demandListCache.forEach((d: DemandListModel) => {
            d.checked = false;
        });
        this.selectedCluster = item;
        if (item.subTaskList && item.subTaskList.length > 0) {
            // 获取选中的请求信息
            this.selectedCluster = item;
        }
    }

    onHideSub() {
        // 与 onShowCluster 互斥
        this.isShowSub = false;
        this.demandListCache.forEach((item: DemandListModel) => {   // 撤销选中的子请求
            if (item.id === this.selectedCluster.id) {
                item.checked = false;
                item.subTaskList.forEach((child: SubDemandModel) => {
                    child.checked = false;
                });
            }
        });
        this.refreshSelectStatus(2);
        this.selectedCluster = null;
        //this.getCustomerList();
        console.log(this.demandListCache);
    }

    /**
     * 普通点请求选择时间段
     * 注意 e: id,从组件传进来为string
     * @param e
     * @param item
     */
    onChangeTime(e, item: DemandListModel) {
        if (e !== null) {
            item.selectedPeriod = item.collectionPeriods.find((p: CollectionPeriod) => p.id == e);
        } else {
            item.selectedPeriod = null;
        }
    }

    /**
     * 聚类点请求选择时间段
     * e: id,从组件中传进来是string
     * @param e
     */
    onChangeClusterTime(e) {
        if (e !== null) {
            this.selectedCluster.selectedPeriod = this.selectedCluster.collectionPeriods.find((p: CollectionPeriod) => p.id == e);
        } else {
            this.selectedCluster.selectedPeriod = null;
        }
    }

    /**
     * 当前页全选
     */
    onSelectAll(e: boolean) {
        this.demandListCache.forEach((item: DemandListModel) => {
            item.checked = e;
            if (item.subTaskList && item.subTaskList.length > 0) {
                item.checked = false;
                item.subTaskList.forEach((sub: SubDemandModel) => {
                    sub.checked = false;
                });
            }
        });
        this.refreshSelectStatus(1);
    }

    /**
     * 选中聚类点下的子请求
     * @param $e
     * @param item
     * @param parentId
     */
    onSelectDemandSub($e, item: DemandListModel, parentId: number) {
        item.checked = !item.checked;
        this.demandListCache.forEach((d: DemandListModel) => {  // 子点选中,该聚类必选中
            if (d.id === parentId) {
                if (d.subTaskList.find((s: SubDemandModel) => s.checked)) {
                    d.checked = true;
                } else d.checked = false;
            }
        });
        this.refreshSelectStatus(2);
    }

    /**
     * 当前聚类下的子请求全选
     * @param e
     */
    onSelectSubAll(e: boolean, parent: DemandListModel) {
        parent.checked = e;
        parent.subTaskList.forEach((sub: SubDemandModel) => {
            sub.checked = e;
        });
        this.allSelectedSub = e;
        this.refreshSelectStatus(2);
    }

    onPage(e) {
        this.pageReq.page = e;
        this.getCustomerList();
    }

    onSubmit() {
        if (!this.isValid()) {
            this.notificationService.create({
                type   : 'warning',
                title  : '抱歉,添加失败',
                content: '请至少选择一项, 检查所选项是否已经选择时间段与填写收运量',
            });
            return;
        }

        this.isDemandSpinning = true;
        // 筛选出checked==true的父/子,保存时间段/收运量,组装req
        let selections: DemandListModel[] = this.demandListCache.filter((item: DemandListModel) => item.checked);
        let req: DemandReq[] = selections.map((item: DemandListModel) => ModelConverter.demandListModelToReq(item));
        this.editPlanService.addDemands(req).subscribe(
            (res: Result<{ id: number }>) => {
                this.onClose(true);
                this.isDemandSpinning = false;
            },
            err => {
                this.isDemandSpinning = false;
                this.notificationService.create({
                    type   : 'error',
                    title  : '添加失败',
                    content: err.error.message || '请联系系统管理员',
                })
            }
        );
    }

    onClose(b: boolean) {
        this.drawerRef.close(b);
    }

    onStopPro($e) {
        $e.stopPropagation();
    }

    /**
     * 刷新全选radio状态
     * 是否模糊/全选/全不选
     * 1-普通/聚类  2-子类
     */
    refreshSelectStatus(type: number): void {
        switch (type) {
            case 1:
                const allSelected = this.demandListCache.every(value => value.checked === true);
                const allUnSelected = this.demandListCache.every(value => !value.checked);
                this.allSelected = allSelected;
                this.indeterminate = (!allSelected) && (!allUnSelected);
                break;
            case 2:
                const allSelectedSub = this.selectedCluster.subTaskList.every(value => value.checked === true);
                const allUnSelectedSub = this.selectedCluster.subTaskList.every(value => !value.checked);
                this.allSelectedSub = allSelectedSub;
                this.indeterminateSub = (!allSelectedSub) && (!allUnSelectedSub);
                break;
        }
    }

    getCustomerList(option?: { isResetReq: boolean }) {
        this.isDemandSpinning = true;
        if (option && option.isResetReq) {
            this.resetPageReq();
        }
        let paramsTemp = this.updateParams();
        this.customersInfoService.getCustomerList(this.pageReq, paramsTemp).subscribe(
            (res: Result<PageRes<CustomerRes[]>>) => {
                if (res.data) {
                    this.demandListCache = this.customerResToTableRows(res.data.content);
                }
                this.isDemandSpinning = false;
            },
            err => {
                this.isDemandSpinning = false;
            }
        );
    }

    customerResToTableRows(res: CustomerRes[]): DemandListModel[] {
        return res.map((item: CustomerRes) => ModelConverter.customerResToListModel(item));
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

    updatePageRes(data: PageRes<DemandRes[]>): void {
        this.pageRes = new PageRes(data.page, data.size, data.pages, data.total, data.last);
    }

    resetPageReq(): void {
        this.pageReq.page = 1;
        this.pageReq.size = this.pageRes.size;
        this.pageReq.sort = 'createdDate.desc';
    }

    /**
     * 检查所选项: 1.时间段; 2.收运量
     */
    isValid(): boolean {
        let valid: boolean;
        let tempList = this.demandListCache.filter((item: DemandListModel) => item.checked);
        if (tempList.length === 0) {
            return valid = false;
        }
        tempList.forEach((item: DemandListModel) => {
            if (!item.collectionPeriodId) { // 无选中时间段
                valid = false;
                return;
            } else if (item.subTaskList && item.subTaskList.length > 0) { // 存在子请求时
                item.subTaskList.forEach((child: SubDemandModel) => {
                    if (child.checked && VerifyUtil.isEmpty(child.amountOfGarbage)) { // 子请求无输入收运量
                        valid = false;
                        return;
                    } else valid = true;
                });
            } else if ((!item.subTaskList || item.subTaskList.length === 0) && VerifyUtil.isEmpty(item.amountOfGarbage)) { // 非聚类请求无输入收运量
                valid = false;
                return;
            } else valid = true;
        });

        return valid;
    }
}
