import { OnInit, Component } from '@angular/core';
import { PageReq } from 'src/app/shared/models/page/page-req.model';
import { PageRes } from 'src/app/shared/models/page/page-res.model';
import { Result } from 'src/app/shared/models/response/result.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { TableBasicComponent } from 'src/app/manage/table-basic.component';
import { PlanRes } from 'src/app/manage/plan/models/plan-res.model';
import { PlanListModel } from 'src/app/manage/plan/models/plan-list.model';
import { PlanService } from '../../../plan/plan.service';
import { ModelConverter } from 'src/app/manage/plan/models/model-converter';
import { Route, ActivatedRoute, Router } from '@angular/router';
import {
  RouteListModel,
  RouteModel
} from 'src/app/manage/plan/models/route.model';

@Component({
  selector: 'app-history-scheme-routes',
  templateUrl: './scheme-routes.component.html',
  styleUrls: ['./scheme-routes.component.scss']
})
export class SchemeRoutesComponent extends TableBasicComponent
  implements OnInit {
  /* 面包屑导航 */
  breadcrumbs = [
    {
      link: '/',
      title: '首页'
    },
    {
      link: '',
      title: '历史记录'
    },
    {
      link: '/manage/history/scheme',
      title: '历史方案'
    }
  ];
  listCache: RouteModel[];
  selectedItem: RouteListModel;
  planId: number;
  planName: string;
  planDate: string;

  constructor(
    private planService: PlanService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.calcTableScrollY();

    this.planId = +this.route.snapshot.paramMap.get('id');
    this.planName = this.route.snapshot.paramMap.get('name');
    this.planDate = this.route.snapshot.paramMap.get('date');

    this.getList();
  }

  onDetail() {
    const {
      id,
      name,
      driver,
      collectionQuantity,
      weighedQuantity,
      startTime,
      endTime
    } = this.selectedItem;
    const { plateNumber, lat, lng } = this.selectedItem.vehicle;
    const url = `/manage/history/scheme/${this.planId}/routes/${id}/route`;
    this.router.navigate([
      url,
      {
        id,
        name,
        plateNumber,
        driver,
        collectionQuantity,
        weighedQuantity,
        lat,
        lng,
        startTime,
        endTime,
        vehicleId: this.selectedItem.vehicle.id,
        date: this.planDate,
        mileage: this.selectedItem.mileage
      }
    ]);
  }

  onSelected(event: Event, item: RouteListModel) {
    this.listCache.forEach((r: RouteListModel) => {
      if (r.id === item.id) {
        r.checked = !item.checked;
        this.selectedItem = r;
        this.selectedItem = r.checked ? r : null;
      } else {
        r.checked = false;
      }
    });
  }

  onClickListItem(event: Event, item: RouteListModel) {
    this.onSelected(event, item);
  }

  getList() {
    this.isSpinning = true;
    this.getRoutesListByPlanId(this.planId).subscribe(
      (res: Result<RouteModel[]>) => {
        if (res.data) {
          this.isSpinning = false;
          this.listCache = res.data;
          this.breadcrumbs.push({
            link: '',
            title: this.planName
          });
          this.selectedItem = null;
        }
      },
      () => (this.isSpinning = false),
      () => (this.isSpinning = false)
    );
  }

  /**
   * 根据planId获取routes列表
   */
  getRoutesListByPlanId(planId: number): Observable<Result<RouteModel[]>> {
    return this.planService.getRouteList(null, null, [planId], null);
  }
}
