import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NzDrawerService } from 'ng-zorro-antd';

import { EditPlanService } from './edit-plan.service';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { PlanService } from '../plan.service';

import { AddDemandComponent } from './add-demand/add-demand.component';

import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { RouteModel } from '../models/route.model';
import { RouteListModel } from '../models/route.model';
import { DemandRes, DemandListModel, DemandModel, SubDemandModel, CollectionPeriod } from '../models/demand.model';
import { PlanOperationEnum } from '../models/plan.enum';
import { TaskModel } from '../models/task.model';
import { VehicleSelectionComponent } from './vehicle-selection/vehicle-selection.component';
import { TaskEnum } from '../models/task.enum';

@Component({
    selector   : 'app-edit-plan',
    templateUrl: './edit-plan.component.html',
    styleUrls  : [ './edit-plan.component.scss' ]
})
export class EditPlanComponent implements OnInit {
    /* 面包屑导航 */
    breadcrumbs: any;
    isRoutesSpinning = false;       // 表格加载图
    isDistributeSpinning = false;   // 表格加载图
    isDemandSpinning = false;       // 表格加载图
    canCancelDistribute = false;    // 取消派发按钮 TODO

    allSelectedDemands = false;
    indeterminateDemands = false;

    pageReq = new PageReq(1, 12, 'createdDate.desc');    // 只有收运请求存在分页
    pageRes = new PageRes();    // 只有收运请求存在分页
    params = {  // 查询参数
        route     : {
            name       : '',
            plateNumber: '',
        },
        distribute: {
            name: '',
        },
        demand    : {
            name       : '',
            createdDate: '',
        },
    };

    planId = ''; // 所编辑的方案id
    planName = ''; // 所编辑的方案name
    routeId: string;

    routeListCache: RouteListModel[];    // 表格:路线数据
    distributedListCache: TaskModel[];   // 表格:派发请求数据
    demandListCache: DemandListModel[];  // 表格:收运请求数据

    selectedRoutesCache: RouteModel;      // 选中的路线

    formDataRoute = { name: '' };   // 表单:新增路线
    isAddRouteFormVisible = false;

    // 同一车辆的路线
    sameVehicleRoutes = {};

    constructor(private route: ActivatedRoute,
                private router: Router,
                private editPlanService: EditPlanService,
                private planService: PlanService,
                private notificationService: NotificationService,
                private modalService: ModalService,
                private drawerService: NzDrawerService) {
    }

    ngOnInit() {
        this.initRouteList()
            .initDemandList();
    }

    initBreadcrumbs() {
        this.breadcrumbs = [
            {
                link : '/',
                title: '首页',
            },
            {
                link : '/manage/plan',
                title: '方案管理',
            },
            {
                link : '',
                title: this.planName,
            },
            {
                link : `/manage/plan/edit/${this.planId}`,
                title: '编辑',
            },
        ];
        return this;
    }

    initRouteList() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.planId = params.get('id');
            this.planName = params.get('name');
            this.initBreadcrumbs()
                .getRouteList();
        });
        return this;
    }

    initDemandList() {
        // TODO
        this.getDemandList();
        return this;
    }

    /**
     * 保存方案
     */
    onSavePlan() {
        console.log('onSavePlan');
        this.editPlanService.editPlan(this.planId, PlanOperationEnum.SAVE).subscribe((res: Result<any>) => {
            this.notificationService.create({
                type : 'success',
                title: '保存成功'
            });
            this.router.navigateByUrl('/manage/plan');
        });
    }

    /**
     * 方案预测
     */
    onPredictPlan() {
        console.log('onPredictPlan');
        this.notificationService.create({
            type : 'info',
            title: '功能实现中',
        });
    }

    onPlanning() {
        this.planService.operatingPlan(this.planId, PlanOperationEnum.PLANNING).subscribe(
            (res) => {
                // TODO
                this.notificationService.create({
                    type: 'success',
                    title: '规划成功',
                });
                this.initRouteList().initDemandList();
            },
            err => {
            }
        );
    }

    /** 路线 start **/
    onAddRoute() {
        this.editPlanService.addRoute(this.formDataRoute, this.planId).subscribe(
            (res) => {
                this.isAddRouteFormVisible = false;
                this.notificationService.create({
                    type : 'success',
                    title: '恭喜,路线添加成功',
                });
                this.getRouteList();
            }
        );
    }

    onDelRoute() {
        if (this.needSelectRoute()) {
            this.notificationService.create({ type: 'warning', title: '抱歉,请先选择一条路线再进行操作' });
            return;
        }
        this.modalService.createDeleteConfirm({
            onOk    : () => {
                this.editPlanService.delRoute(this.planId, this.selectedRoutesCache.id).subscribe(
                    (res) => {
                        this.selectedRoutesCache = null;
                        this.notificationService.create({ type: 'success', title: '恭喜,删除成功', });
                        this.getRouteList();
                    },
                    err => {
                        this.notificationService.create({
                            type   : 'warning',
                            title  : '抱歉,删除失败',
                            content: err.error.message || '',
                        });
                    }
                );
            },
            onCancel: () => console.log('cancel delete'),
        });

    }

    onSelectVehicle() {
        const drawerRef = this.drawerService
            .create<VehicleSelectionComponent, { success: boolean, planId: string, routeId: string }, boolean>(
                {
                    nzTitle        : '请为线路选择车辆',
                    nzContent      : VehicleSelectionComponent,
                    nzWidth        : '40%',
                    nzPlacement    : 'left',
                    nzContentParams: {
                        success: false,
                        planId : this.planId,
                        routeId: this.selectedRoutesCache.id,
                    }
                }
            );
        drawerRef.afterClose.subscribe((res: boolean) => {
            if (res) {
                this.getRouteList();
            }
        });

    }

    onCloseAddRouteForm() {
        this.isAddRouteFormVisible = false;
    }

    onSelectRoute($e, item: RouteListModel) {
        this.routeListCache.forEach((r: RouteListModel) => {
            if (r.id === item.id) {
                r.checked = !item.checked;
                this.selectedRoutesCache = r;
                this.selectedRoutesCache = r.checked ? r : null;
            } else {
                r.checked = false;
            }
        });
        if (!item.checked) {
            this.distributedListCache = [];
        } else {
            this.getDistributeList();
        }
    }

    // 锁定/解锁
    onChangeRouteStatus($e, item: RouteListModel) {
        this.isRoutesSpinning = true;
        this.onStopPro($e);
        //item.lock = !item.lock;
        const status = !item.lock ? 'LOCK' : 'UNLOCK';
        this.editPlanService.changeRouteStatus(this.planId, item.id, status).subscribe(
            (res: Result<any>) => {
                this.getRouteList();
            },
            err => {
                console.error('锁定/解锁失败');
                this.getRouteList();
            }
        );
    }


    onChangeRoutePriority($e, item: RouteListModel) {
        this.editPlanService.updateRoute(
            { name: item.name, priority: item.priority, vehicle: item.plateNumber },
            this.planId,
            item.id
        ).subscribe((res) => {
            this.getRouteList();
        });
    }

    /**
     * 根据 planId
     */
    getRouteList() {
        this.isRoutesSpinning = true;
        let paramsTemp = this.updateParams('route');
        this.editPlanService.getRouteList(this.planId, paramsTemp).subscribe(
            (res: Result<RouteModel[]>) => {
                this.routeListCache = res.data.map((item: RouteModel) => {
                    return {
                        ...item,
                        checked: false,
                    };
                });
                this.isRoutesSpinning = false;
                this.distributedListCache = [];
                this.classifySameVehicleRoutes(this.routeListCache);
            },
            err => {
                this.isRoutesSpinning = false;
                this.distributedListCache = [];
            }
        );
    }

    // 统计同一车辆的路线
    // sameVehicleRoutes = { '闽Y11111': [ RouteListModel ], }
    classifySameVehicleRoutes(routes: RouteListModel[]) {
        this.sameVehicleRoutes = {};
        routes.forEach((r: RouteListModel) => {
            if (r.plateNumber) {
                if (this.sameVehicleRoutes[ r.plateNumber ]) {
                    this.sameVehicleRoutes[ r.plateNumber ].push(r);
                } else {
                    this.sameVehicleRoutes[ r.plateNumber ] = [ r ];
                }
            }
        });
    }

    needSelectRoute(): boolean {
        if (!this.selectedRoutesCache) {
            return true;
        } else return false;
    }

    /** 路线 end **/

    /** 已派发 start **/

    onSelectDistribute($e, item) {
        this.onStopPro($e);
        item.checked = !item.checked;
    }

    onDrop(event: CdkDragDrop<any>) {
        if (event.previousIndex !== event.currentIndex) {
            moveItemInArray(this.distributedListCache, event.previousIndex, event.currentIndex);
            const requestBody = this.distributedListCache.map((d: TaskModel, i: number) => {
                return {
                    id      : d.id,
                    priority: i + 1,
                };
            });
            this.editPlanService.updateTasksPriorityOnRoute(this.selectedRoutesCache.id, requestBody).subscribe(
                (res: Result<any>) => {
                    console.log(res);
                },
                err => {
                    this.getDistributeList();
                }
            );
        }
    }

    onCancelDistribute() {
        if (this.distributedListCache && this.distributedListCache.every((d: TaskModel) => !d.checked)) {
            this.notificationService.create({
                type : 'warning',
                title: '抱歉,请选择至少一个已派发收运任务'
            });
            return;
        }
        const ids = this.distributedListCache
            .filter((d: TaskModel) => d.checked)
            .map((d: TaskModel) => {
                return d.id;
            })
            .join(',');
        this.editPlanService
            .delTasksOnRoute(this.selectedRoutesCache.id, ids)
            .subscribe(
                (res) => {
                    this.getDistributeList();
                    this.getDemandList();
                },
                err => {
                    this.getDistributeList();
                    this.getDemandList();
                }
            );

    }

    getDistributeList() {
        if (!this.selectedRoutesCache) {
            return;
        }
        this.isDistributeSpinning = true;
        // 分页查询参数 TODO
        let paramsTemp = this.updateParams('demand');
        let routeId = this.selectedRoutesCache.id;
        this.editPlanService.getDistributeList(routeId).subscribe(
            res => {
                this.distributedListCache = res.data.map((item) => {
                    return {
                        ...item,
                        checked: false,
                    }
                });
                this.isDistributeSpinning = false;
            }, err => {
                this.isDistributeSpinning = false;
            }
        );
    }

    /** 已派发 end **/

    /** 收运请求 start **/
    onAddDemand() {
        const drawerRef = this.drawerService
            .create<AddDemandComponent, any, boolean>(
                {
                    nzTitle    : '新增收运请求',
                    nzContent  : AddDemandComponent,
                    nzWidth    : '70%',
                    nzPlacement: 'right',
                }
            );

        drawerRef.afterClose.subscribe((res: boolean) => {
            if (res) {
                this.getDemandList();
            }
        });
    }

    onDelDemand() {
        this.modalService.createDeleteConfirm({
            onOk    : () => {
                let ids = this.getIdsBySelection().join(',');
                this.editPlanService.delDemand(ids).subscribe(
                    (res: Result<any>) => {
                        this.getDemandList();
                        this.notificationService.create({
                            type : 'success',
                            title: '删除成功',
                        });
                    },
                    err => {
                        this.getDemandList();
                    }
                );
            },
            onCancel: () => console.log('cancel delete'),
        });
    }

    onDistribute() {
        if (!this.selectedRoutesCache) {
            this.notificationService.create({
                type : 'warning',
                title: '请先选择一条线路',
            });
            return;
        } else if (this.selectedRoutesCache
            && (!this.indeterminateDemands && !this.allSelectedDemands)) {
            this.notificationService.create({
                type : 'warning',
                title: '请选择至少一个收运请求',
            });
            return;
        }
        let ids = this.getIdsBySelection();
        this.editPlanService.addTasksOnRoute(this.selectedRoutesCache.id, ids.join(',')).subscribe(
            (res: Result<any>) => {
                this.getDistributeList();
                this.getDemandList();
            },
            err => {
            }
        );
    }

    /**
     * $event : true(打开) | false(闭合)
     * @param data
     * @param $event
     */
    onCollapse(data: DemandListModel, $event: boolean): void {
        this.demandListCache.forEach((d: DemandListModel) => {
            if (d.id === data.id) {
                d.expand = $event;
                return;
            }
        });
    }

    onSelectDemand($e, item: DemandListModel, parent?: DemandListModel) {
        this.demandListCache.forEach((r: DemandModel) => {
            if (parent && r.id === parent.id) {   // 选中的为子
                let selectParent = false;
                r.taskList.forEach((sub: SubDemandModel) => {
                    if (sub.id === item.id) sub.checked = !item.checked;
                    if (sub.checked) selectParent = true;
                });
                parent.checked = selectParent;
            } else if (r.id === item.id) {           // 选中的为普通/父(所有子跟随父)
                r.checked = !item.checked;
                r.taskList
                && r.taskList.length > 0
                && r.taskList.forEach((sub: SubDemandModel) => {
                    sub.checked = r.checked;
                });
            }
        });
        this.refreshSelectStatus();
    }

    onSelectAllDemands(e: boolean) {
        this.demandListCache.forEach((item: DemandListModel) => {
            item.checked = e;
            if (item.taskList && item.taskList.length > 0) {
                item.taskList.forEach((sub: SubDemandModel) => {
                    sub.checked = e;
                });
            }
        });
        this.refreshSelectStatus();
    }

    onStartEditDemand($e, item: DemandListModel) {
        this.onStopPro($e);
        // 判断其他是否在编辑状态
        let canEdit = this.demandListCache.every((d: DemandListModel) => d.editable === false);
        if (canEdit) {
            item.editable = true;

        } else {
            this.notificationService.create({
                type   : 'warning',
                title  : '抱歉,您正在编辑状态中',
                content: '请先保存其他数据再进行编辑',
            });
            return;
        }
    }

    onFinishEditDemand($e, item: DemandListModel) {
        this.onStopPro($e);
        this.editPlanService
            .updateDemand(item.id, {
                amountOfGarbage   : item.amountOfGarbage,
                collectionPeriodId: item.selectedPeriod.id
            })
            .subscribe(
                (res: Result<any>) => {
                    item.editable = false;
                    this.notificationService.create({
                        type : 'success',
                        title: '更新' + item.name + '成功',
                    });
                },
                err => {
                    this.getDemandList();
                }
            );
    }

    onCancelEditDemand($e, item: DemandListModel) {
        this.onStopPro($e);
        item.editable = false;
        this.getDemandList();
    }

    onChangeDuration(e, item: DemandListModel) {
        if (e !== null) {
            item.selectedPeriod = item.collectionPeriods.find((p: CollectionPeriod) => p.id == e);
        } else {
            item.selectedPeriod = null;
        }
    }

    onGarbageAmountChange(e, parent?: DemandListModel) {
        if (parent) {   // 修改子,需要累加
            parent.amountOfGarbage = Number(parent.taskList.map((sub: SubDemandModel) => sub.amountOfGarbage).reduce((a, b) => a + b).toFixed(1));
        }
    }

    onPage(e) {
        this.pageReq.page = e;
        this.getDemandList();
    }

    onStopPro($e) {
        $e.stopPropagation();
    }

    getDemandList() {
        this.isDemandSpinning = true;
        // 分页查询参数 TODO
        let paramsTemp = this.updateParams('demand');
        this.editPlanService.getDemandList(this.pageReq, paramsTemp).subscribe(
            (res: Result<PageRes<DemandRes[]>>) => {
                if (res.data) {
                    this.demandListCache = this.demandResToTableRows(res.data.content);
                    this.isDemandSpinning = false;
                    this.updatePageRes(res.data);
                    this.refreshSelectStatus();
                }
            },
            err => {
                this.isDemandSpinning = false;
            }
        );
    }

    // 当需求增加级层后需要改为递归
    demandResToTableRows(list: DemandRes[]): DemandListModel[] {
        return list.map((item: DemandRes) => {
            if (item.taskList && item.taskList.length > 0) {
                item.taskList = item.taskList.map((sub: SubDemandModel) => {
                    return {
                        ...sub,
                        checked       : false,
                        editable      : false,
                        selectedPeriod: item.collectionPeriods.find((p) => p.id === item.collectionPeriodId),
                    };
                });
            }
            return {
                ...item,
                checked       : false,
                expand        : false,
                editable      : false,
                selectedPeriod: item.collectionPeriods.find((p) => p.id === item.collectionPeriodId),
            };
        });
    }

    updateParams(type: string): any {
        let paramsTemp = {};
        for (let k in this.params[ type ]) {
            if (!this.params[ type ][ k ]) {
                this.params[ type ][ k ] = null;
            } else {
                paramsTemp[ k ] = this.params[ type ][ k ];
            }
        }
        return paramsTemp;
    }

    updatePageRes(data: PageRes<DemandRes[]>): void {
        this.pageRes = new PageRes(data.page, data.size, data.pages, data.total, data.last);
    }

    getIdsBySelection(): number[] {
        let ids = [];
        this.demandListCache.filter((d: DemandListModel) => d.checked).forEach((d: DemandListModel) => {
            if (d.taskList && d.taskList.length > 0) {
                let subIds = d.taskList.filter((sub: SubDemandModel) => sub.checked).map((sub: SubDemandModel) => sub.id);
                if (subIds.length === d.taskList.length) { // 子全删除
                    ids = [ ...ids, d.id ];
                } else {
                    ids = [ ...ids, ...subIds ];
                }
            } else {
                ids = [ ...ids, d.id ];
            }
        });
        return ids;
    }

    refreshSelectStatus(): void {
        const allSelectedSubs = this.demandListCache
            .filter((value: DemandListModel) => value.taskList && value.taskList.length)
            .every((value: DemandListModel) => value.taskList.every((sub: SubDemandModel) => sub.checked === true));
        const allSelectedDemands = this.demandListCache.every(value => value.checked === true);
        const allUnSelected = this.demandListCache.every(value => !value.checked);
        this.allSelectedDemands = allSelectedDemands && allSelectedSubs;
        this.indeterminateDemands = (!(allSelectedDemands && allSelectedSubs)) && (!allUnSelected);
    }
}
