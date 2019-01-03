import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { NzDrawerService } from 'ng-zorro-antd';

import { EditPlanService } from './edit-plan.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { RouteModel } from '../models/route.model';
import { RouteListModel } from '../models/route.model';
import { VehicleSelectionComponent } from './vehicle-selection/vehicle-selection.component';
import { DemandListModel } from '../models/demand.model';
import { AddDemandComponent } from './add-demand/add-demand.component';
import { DemandModel } from '../models/demand.model';
import {SubDemandModel} from '../models/demand.model';
import {CollectionPeriod} from '../models/demand.model';

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

    pageReq = new PageReq();
    pageRes = new PageRes();
    params = {  // 查询参数
        route     : {
            name: '',
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

    planId: number; // 所编辑的方案id
    routeId: number;

    routeListCache: RouteModel[];        // 表格:路线数据
    distributedListCache: any;           // 表格:派发请求数据
    demandListCache: DemandListModel[];  // 表格:收运请求数据

    selectedRoutesCache: RouteModel;      // 选中的路线
    selectedDistributeCache: any;         // 选中的派发
    selectedDemandCache: DemandModel[];   // 选中的请求
    selectedDemandsCache: DemandModel[];   // 选中的请求（多个)

    formDataRoute = { name: '' };   // 表单:新增路线
    isAddRouteFormVisible = false;

    constructor(private route: ActivatedRoute,
                private editPlanService: EditPlanService,
                private notificationService: NotificationService,
                private drawerService: NzDrawerService) {
    }

    ngOnInit() {
        this.initRouteList()
            .initDemandList()
            .initDistributeList();
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
                link : `/manage/plan/edit/${this.planId}`,
                title: '编辑',
            },
        ];
    }

    initRouteList() {
        this.route.paramMap
            .pipe(switchMap((params: ParamMap) => params.get('id')))
            .subscribe((planId: string) => {
                this.planId = parseInt(planId);
                this.initBreadcrumbs();
            });
        this.getRouteList();
        return this;
    }

    initDemandList() {
        this.getDemandList();
        return this;
    }

    initDistributeList() {
        this.getDistributeList();
    }

    /** 路线 start **/
    onAddRoute() {
        this.editPlanService.addRoute(this.formDataRoute, this.planId).subscribe((res: Result<number>) => {
            console.log(res);
        });
    }

    onDelRoute() {
        if (this.needSelectRoute()) {
            this.notificationService.create({ type: 'warning', title: '抱歉,请先选择一条路线再进行操作' });
            return;
        }
        // TODO
        //this.editPlanService.delRoute(this.selectedRoutesCache.id)
    }

    needSelectRoute(): boolean {
        if (!this.selectedRoutesCache) {
            return true;
        } else return false;
    }

    onSelectVehicle() {
        const drawerRef = this.drawerService
            .create<VehicleSelectionComponent, { success: boolean, planId: number, routeId: number }, boolean>(
                {
                    nzTitle        : '请为线路选择车辆',
                    nzContent      : VehicleSelectionComponent,
                    nzWidth        : '40%',
                    nzPlacement    : 'left',
                    nzContentParams: {
                        success: false,
                        planId : 1,
                        routeId: 11,
                    }
                }
            );

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
        console.log(this.selectedRoutesCache);
    }

    onRouteStatusChange($e, item: RouteListModel) {
        this.onStopPro($e);
    }

    /**
     * 根据 planId
     */
    getRouteList() {
        // 分页查询参数 TODO
        let paramsTemp = this.updateParams('route');
        this.editPlanService.getRouteList(this.planId).subscribe(
            (res: Result<RouteModel[]>) => {
                this.routeListCache = res.data.map((item: RouteModel) => {
                    return {
                        ...item,
                        checked: false,
                    };
                });
            }
        );
    }

    /** 路线 end **/

    onPage(e) {
    }

    /** 已派发 start **/

    onSelectDistribute($e, item) {
        this.onStopPro($e);
        item.checked = !item.checked;
    }

    onDrop(event: CdkDragDrop<any>) {
        moveItemInArray(this.distributedListCache, event.previousIndex, event.currentIndex);
        console.log(this.distributedListCache);
    }

    onCancelDistribute() {
    }

    getDistributeList() {
        // 分页查询参数 TODO
        let paramsTemp = this.updateParams('demand');
        let routeId = '1';
        this.editPlanService.getDistributeList(routeId).subscribe(res => {
            this.distributedListCache = res.data.map((item) => {
                return {
                    ...item,
                    checked: false,
                }
            });
        });
    }
    /** 已派发 start **/

    /** 收运请求 start **/
    onAddDemand() {
        const drawerRef = this.drawerService
            .create<AddDemandComponent>(
                {
                    nzTitle    : '新增收运请求',
                    nzContent  : AddDemandComponent,
                    nzWidth    : '70%',
                    nzPlacement: 'right',
                }
            );
    }

    onDelDemand() {
        console.log('onDelDemand');
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
                r.subTaskList.forEach((sub: SubDemandModel) => {
                    if (sub.id === item.id) sub.checked = !item.checked;
                    if (sub.checked) selectParent = true;
                });
                parent.checked = selectParent;
            } else if (r.id === item.id) {           // 选中的为普通/父(所有子跟随父)
                r.checked = !item.checked;
                r.subTaskList
                && r.subTaskList.length > 0
                && r.subTaskList.forEach((sub: SubDemandModel) => {
                    sub.checked = r.checked;
                });
            }
        });
        console.log(this.demandListCache);
    }

    onChangeDuration(e, item: DemandListModel) {
        console.log(e, item);
        if (e !== null) {
            item.selectedPeriod = item.collectionPeriods.find((p: CollectionPeriod) => p.id == e);
        } else {
            item.selectedPeriod = null;
        }
    }

    onGarbageAmountChange(e, parent?: DemandListModel) {
        if (parent) {   // 修改子,需要累加
            parent.amountOfGarbage = Number(parent.subTaskList.map((sub: SubDemandModel) => sub.amountOfGarbage).reduce((a, b) => a + b).toFixed(1));
        }
    }

    onStopPro($e) {
        $e.stopPropagation();
    }

    getDemandList() {
        // 分页查询参数 TODO
        let paramsTemp = this.updateParams('demand');
        this.editPlanService.getDemandList(new PageReq(), '').subscribe((res: Result<PageRes<DemandModel[]>>) => {
            if (res.data) {
                this.demandListCache = this.demandResToTableRows(res.data.content);
                console.log(this.demandListCache);
            }
        });
    }

    // TODO 当需求增加级层后需要改为递归
    demandResToTableRows(list: DemandModel[]): DemandListModel[] {
        return list.map((item: DemandModel) => {
            if (item.subTaskList && item.subTaskList.length > 0) {
                item.subTaskList = item.subTaskList.map((sub: SubDemandModel) => {
                    return {
                        ...sub,
                        checked: false,
                        selectedPeriod: item.collectionPeriods.find((p) => p.id === item.collectionPeriodId),
                    };
                });
            }
            return {
                ...item,
                checked: false,
                expand: false,
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

}
