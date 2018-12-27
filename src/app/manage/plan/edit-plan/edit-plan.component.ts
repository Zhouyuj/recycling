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
    pageReq = new PageReq();
    pageRes = new PageRes();
    params = {  // 查询参数
        route     : {},
        distribute: {},
        demand    : {
            name       : '',
            createdDate: '',
        },
    };

    planId: number; // 所编辑的方案id
    routeId: number;

    routeListCache: RouteModel[];        // 表格:路线数据
    distributedListCache: any;           // 表格:派发请求数据
    demandListCache: DemandModel[];      // 表格:收运请求数据

    selectedRoutesCache: RouteModel;      // 选中的路线
    selectedDistributeCache: any;         // 选中的派发
    selectedDemandCache: DemandModel[];   // 选中的请求

    formDataRoute: any = { name: '' };   // 表单:新增路线
    isAddRouteFormVisible = false;

    constructor(private route: ActivatedRoute,
                private editPlanService: EditPlanService,
                private notificationService: NotificationService,
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
        this.editPlanService.getRouteList('').subscribe(
            (res: Result<RouteModel[]>) => {
                this.routeListCache = res.data.map((item: RouteModel) => {
                    return {
                        ...item,
                        checked: false,
                    };
                });
            }
        );
        return this;
    }

    initDemandList() {
        this.getDemandList();
        return this;
    }

    /** 路线 start **/
    onAddRoute() {
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

    getRouteList() {
        this.route.paramMap
            .pipe(switchMap((params: ParamMap) => params.get('id')))
            .subscribe((planId: string) => this.planId = parseInt(planId));
        this.editPlanService.getRouteList('').subscribe(
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

    onDrop(event: CdkDragDrop<any>) {
        console.log(event);
        moveItemInArray(this.routeListCache, event.previousIndex, event.currentIndex);
        console.log(this.routeListCache);
    }

    onCancelDistribute() {
    }

    /** 已派发 start **/

    /** 收运请求 **/
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
    onCollapse(data: DemandModel, $event: boolean): void {
        this.demandListCache.forEach((d: DemandModel) => {
            if (d.id === data.id) {
                d.expand = $event;
                return;
            }
        });
    }

    onCollapseStopPro($e) {
        $e.stopPropagation();
    }

    onSelectDemand($e, item: DemandModel, parent?: DemandModel) {
        this.demandListCache.forEach((r: DemandModel) => {
            if (parent && r.id === parent.id) {   // 选中的为子
                r.subTaskList.forEach((sub: SubDemandModel) => {
                    if (sub.id === item.id) sub.checked = !item.checked;
                })
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

    getDemandList() {
        // 分页查询参数 TODO
        let paramsTemp = this.updateParams('demand');
        this.editPlanService.getDemandList(new PageReq(), '').subscribe((res: Result<PageRes<DemandModel[]>>) => {
            if (res.data) {
                this.demandListCache = this.demandResToTableRows(res.data.content);
            }
        });
    }

    // TODO 当需求增加级层后需要改为递归
    demandResToTableRows(list: DemandModel[]): DemandModel[] {
        return list.map((item: DemandModel) => {
            if (item.subTaskList && item.subTaskList.length > 0) {
                item.subTaskList = item.subTaskList.map((sub: SubDemandModel) => {
                    return {
                        ...sub, checked: false,
                    };
                });
            }
            return {
                ...item, checked: false, expand: false,
            };
        });
    }

    updateParams(type: string) {
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
