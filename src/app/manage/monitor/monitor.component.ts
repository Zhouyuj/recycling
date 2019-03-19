import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import {
  Observable,
  interval,
  Subject,
  of,
  Subscribable,
  Subscription,
  timer
} from 'rxjs/index';
import { map } from 'rxjs/internal/operators/map';
import { HistoryService } from '../history/history.service';
import { PlanService } from '../plan/plan.service';
import { ModelConverter } from './models/model-converter';
import { PageReq } from '../../shared/models/page/page-req.model';
import { PageRes } from '../../shared/models/page/page-res.model';
import { PlanRes } from '../plan/models/plan-res.model';
import { Result } from '../../shared/models/response/result.model';
import { RouteModel } from '../plan/models/route.model';
import { RouteListModel } from '../plan/models/route.model';
import { TaskModel, TaskState } from '../plan/models/task.model';
import { Marker, MarkerType } from '../../shared/services/map/marker.model';
import { TableBasicComponent } from '../table-basic.component';
import { Map, ILngLat } from 'src/app/shared/services/map/map.model';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent extends TableBasicComponent
  implements OnInit, OnDestroy {
  /* 面包屑导航 */
  breadcrumbs = [
    {
      link: '/',
      title: '实时监控'
    }
  ];
  isShowSideBarLabel = true;
  isShowSideBar = false;
  isShowCity = false;
  isShowGasStation = false;
  isShowTaskTable = false;

  routeListCache: RouteListModel[];
  taskListCache: TaskModel[];
  interval$: Subscription;
  runRouteLines = [];
  mapHeight: string;

  vehicleMarkerType: MarkerType = MarkerType.VEHICLE;
  stationMarkerType: MarkerType = MarkerType.STATION;

  private onStationMarkerRemove$ = new Subject<boolean>();
  private onVehicleMarkerRemove$ = new Subject<boolean>();
  private onDrawPlanRoute$ = new Subject<boolean>();
  private onClearPlanRoute$ = new Subject<boolean>();
  private onSetCenter$ = new Subject<ILngLat>();

  constructor(
    private historyService: HistoryService,
    private planService: PlanService
  ) {
    super();
  }

  ngOnInit() {
    this.calcTableScrollY(-60);
    this.calcMapHeight();

    this.autoUpdateVehicleMarkers();
  }

  ngOnDestroy() {
    this.interval$.unsubscribe();
  }

  calcMapHeight(): void {
    this.mapHeight = +this.tableScrollY.replace('px', '') + 75 + 'px';
  }

  autoUpdateVehicleMarkers() {
    // 每10秒刷新车辆位置
    this.interval$ = timer(1000, 1000 * 10)
      .pipe(
        map(() => {
          this.executePlanWithRoute();
        })
      )
      .subscribe(() => {
        this.onVehicleMarkerRemove$.next(true);
      });
  }

  onToggleSideBar(e: boolean) {
    // console.log(e);
  }

  onToggleCity(e: boolean) {
    // console.log(e);
  }

  onToggleGasStation(e: boolean) {
    // console.log(e);
  }

  onSelectRoute($event: Event, item: RouteListModel) {
    this.onStopPro($event);
    if (item.checked) {
      item.checked = false;
      this.taskListCache = [];
      this.isShowTaskTable = false;
    } else {
      this.routeListCache.forEach((routeItem: RouteListModel) => {
        routeItem.checked = false;
      });
      item.checked = true;
      this.isShowTaskTable = true;
      this.getTaskList(item.id);
    }
  }

  onStopPro($event: Event): void {
    $event.stopPropagation();
  }

  onClickTask($event: Event, item: TaskModel) {
    this.onStopPro($event);
    if (item.lng && item.lat) {
      this.setCenter([item.lng, item.lat]);
    }
  }

  onCollapseTask(data: TaskModel, e: boolean) {
    this.taskListCache.forEach((d: TaskModel) => {
      if (d.id === data.id) {
        d.expand = e;
        return;
      }
    });
  }

  /**
   * 获取“执行中”的方案
   */
  getPlanList(): Observable<number[]> {
    return this.planService
      .getPlanList(new PageReq(1, 50), { status: 'Executing' })
      .pipe(
        map((res: Result<PageRes<PlanRes[]>>) => res.data.content),
        map((res: PlanRes[]) => res.map((p: PlanRes) => p.id))
      );
  }

  /**
   * 获取‘执行中方案’的所有线路
   */
  getRouteList(planIds: number[]): Observable<Result<RouteModel[]>> {
    return this.planService.getRouteList(null, null, planIds, null);
  }

  /**
   * 获取‘选中线路’的任务
   *
   * 收运任务状态
   * ToDo：待收集-绿色
   * Going：正在前往-蓝色
   * Collecting：收集中-蓝色
   * Delay：延缓（挂起）-黄色
   * Skipped：跳过-红色
   * Completed：完成收集-灰色
   */
  getTaskList(routeId: number) {
    this.historyService
      .getTaskList(routeId)
      .subscribe((res: Result<TaskModel[]>) => {
        this.taskListCache = res.data.map((t: TaskModel) =>
          ModelConverter.taskResToListModel(t, routeId)
        );

        this.onStationMarkerRemove$.next(true);
        this.onClearPlanRoute$.next(true);
        this.onDrawPlanRoute$.next(true);
      });
  }

  drawPlanRouteWaypoints(event: Function) {
    this.onDrawPlanRoute$.subscribe(() => {
      if (this.taskListCache && this.taskListCache.length) {
        const lngLatList: ILngLat[] = this.taskListCache.map(
          (model: TaskModel) => {
            return {
              lng: model.lng,
              lat: model.lat
            };
          }
        );
        const firstTaskModel = this.taskListCache[0];
        const matchRoute = this.routeListCache.find(
          (route: RouteModel) => route.id === firstTaskModel.routeId
        );
        event(
          { lng: matchRoute.vehicle.lng, lat: matchRoute.vehicle.lat },
          lngLatList
        );
      }
    });
  }

  /**
   * 根据执行中的方案，获取所属的所有线路数据
   */
  executePlanWithRoute(): void {
    const planList = this.getPlanList();
    planList.subscribe((planRes: number[]) => {
      if (planRes.length) {
        const routeList = this.getRouteList(planRes);
        routeList.subscribe((routeRes: Result<RouteModel[]>) => {
          if (routeRes.data) {
            this.routeListCache = routeRes.data.map((r: RouteModel) =>
              ModelConverter.routeResToListModel(r)
            );
          }
        });
      } else {
        this.routeListCache = [];
      }
    });
  }

  stationMarkerRemove(event: Function) {
    this.onStationMarkerRemove$.subscribe(() => {
      event();
    });
  }

  vehicleMarkerRemove(event: Function) {
    this.onVehicleMarkerRemove$.subscribe(() => {
      event();
    });
  }

  setCenterFunction(event: Function) {
    this.onSetCenter$.subscribe((lngLat: ILngLat) => {
      event([lngLat.lng, lngLat.lat]);
    });
  }

  clearPlanRouteWaypoints(event: Function) {
    this.onClearPlanRoute$.subscribe(() => {
      event();
    });
  }

  setCenter(lngLat: number[]): void {
    this.onSetCenter$.next({ lng: lngLat[0], lat: lngLat[1] });
  }

  convertTaskStateToColor(state: string): string {
    let color: string;
    switch (state) {
      case TaskState.ToDo:
        color = '#79cf6b'; // green
        break;
      case TaskState.Going:
      case TaskState.Collecting:
        color = '#42b4fc'; // blue
        break;
      case TaskState.Delay:
        color = '#fdc034'; // yellow
        break;
      case TaskState.Skipped:
        color = '#ce4544'; // red
        break;
      case TaskState.Completed:
        color = '#9d9d9d'; // gray
        break;
    }
    return color;
  }
}
