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
import { DemandRes } from '../models/demand.model';
import { AddDemandComponent } from './add-demand/add-demand.component';

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

    planId: number; // 所编辑的方案id
    routeId: number;

    routeListCache: RouteModel[];        // 表格:路线数据
    distributedListCache: any;           // 表格:派发请求数据
    demandListCache: DemandListModel[];  // 表格:收运请求数据

    selectedRouteCache: RouteModel;      // 选中的路线
    selectedDistributedCache: any;       // 选中的派发
    selectedDemandCache: DemandListModel;// 选中的请求

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
        //this.editPlanService.delRoute(this.selectedRouteCache.id)
    }

    needSelectRoute(): boolean {
        if (!this.selectedRouteCache) {
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
                this.selectedRouteCache = r;
                this.selectedRouteCache = r.checked ? r : null;
            } else {
                r.checked = false;
            }
        });
        console.log(this.selectedRouteCache);
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

    /** 已派发 **/

    onDrop(event: CdkDragDrop<any>) {
        console.log(event);
        moveItemInArray(this.routeListCache, event.previousIndex, event.currentIndex);
        console.log(this.routeListCache);
    }

    onCancelDistribute() {
    }

    /** 收运请求 **/
    onAddDemand() {
        const drawerRef = this.drawerService
            .create<AddDemandComponent>(
                {
                    nzTitle        : '新增收运请求',
                    nzContent      : AddDemandComponent,
                    nzWidth        : '50%',
                    nzPlacement    : 'right',
                }
            );
    }

    onDelDemand() {
        console.log('onDelDemand');
    }

    onSelectDemand($e, item: DemandListModel) {
        this.demandListCache.forEach((r: DemandListModel) => {
            if (r.id === item.id) {
                r.checked = !item.checked;
            }
        });
        console.log(this.demandListCache);
    }

    getDemandList() {
        this.editPlanService.getDemandList(new PageReq(), '').subscribe((res: Result<PageRes<DemandRes[]>>) => {
            if (res.data) {
                //this.demandListCache = this.demandResToTableRows(res.data.content);
            }
        });
    }

    demandResToTableRows(list: DemandRes[]): DemandListModel[] {
        let result: DemandListModel[] = list.map(item => {
            return {
                ...item, checked: false,
            };
        });
        return result;
    }

}
