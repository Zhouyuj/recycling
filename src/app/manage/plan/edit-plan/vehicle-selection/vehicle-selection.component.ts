import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { PageReq } from '../../../../shared/models/page/page-req.model';
import { PageRes } from '../../../../shared/models/page/page-res.model';
import { VehicleCategoryEnum } from '../../../base/vehicle-info/models/vehicle-category.enum';
import { VehicleInfoService } from '../../../base/vehicle-info/vehicle-info.service';
import { VehicleSelectionModel } from './vehicle-selection.model';
import { Result } from '../../../../shared/models/response/result.model';
import { VehicleRes } from '../../../base/vehicle-info/vehicle-res.model';
import { StaffRes } from '../../../../manage/base/staff-info/staff-res.model';
import { ModelConverter } from './model-converter';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { EditPlanService } from '../edit-plan.service';
import { StaffInfoService } from '../../../../manage/base/staff-info/staff-info.service';
import { TableBasicComponent } from 'src/app/manage/table-basic.component';
import { StaffSelectionModel } from '../../../../manage/base/staff-info/staff-selection.model';

@Component({
  selector: 'app-vehicle-selection',
  templateUrl: './vehicle-selection.component.html',
  styleUrls: ['./vehicle-selection.component.scss']
})
export class VehicleSelectionComponent extends TableBasicComponent
  implements OnInit {
  @Input() success: boolean;
  @Input() planId: number;
  @Input() routeId: number;
  params = {
    postId: 1,
    name: ''
  }; // 分页查询参数
  public sortMap = {
    buyDate: ''
  }; // 操作表格的排序参数
  vehicleCategoryFilterList; // 表格中筛选项
  listCache: StaffSelectionModel[];
  selectedItemCache: StaffSelectionModel;

  constructor(
    private drawerRef: NzDrawerRef<any>,
    private vehicleInfoService: VehicleInfoService,
    private editPlanService: EditPlanService,
    private notificationService: NotificationService,
    private staffInfoService: StaffInfoService
  ) {
    super();
  }

  ngOnInit() {
    this.calcTableScrollY(30);
    this.initFilterOptions();
    this.initVehicles();
  }

  initFilterOptions() {
    this.vehicleCategoryFilterList = [
      {
        text: VehicleCategoryEnum.food5,
        value: VehicleCategoryEnum.food5Index
      },
      {
        text: VehicleCategoryEnum.food8,
        value: VehicleCategoryEnum.food8Index
      },
      { text: VehicleCategoryEnum.oil1, value: VehicleCategoryEnum.oil1Index }
    ];
  }

  initVehicles() {
    this.getListByPage({ isResetReq: true });
  }

  onClose(b: boolean) {
    this.drawerRef.close(b);
  }

  onFilter(e, type: string) {
    if ((!e && !this.params[type]) || this.params[type] === e) {
      return;
    }
    this.params[type] = e;
    console.log(this.params);
    this.getListByPage({ isResetReq: true });
  }

  onSelect(e: boolean, item: StaffSelectionModel) {
    if (!e) {
      this.selectedItemCache = null;
      return;
    }
    this.listCache.forEach((l: StaffSelectionModel) => {
      if (l.id === item.id) {
        l.checked = e;
      } else {
        l.checked = false;
      }
    });
    this.selectedItemCache = this.listCache.find(
      (o: StaffSelectionModel) => o.id === item.id
    );
  }

  onSelectTr($e, item: StaffSelectionModel) {
    this.listCache.forEach((l: StaffSelectionModel) => {
      if (l.id === item.id) {
        l.checked = !item.checked;
        this.selectedItemCache = l.checked ? l : null;
      } else {
        l.checked = false;
      }
    });
    console.log(this.selectedItemCache);
  }

  /**
   * 关键字搜索
   * 双向绑定 params
   * @param type
   */
  onKeywordSearch() {
    this.getListByPage({ isResetReq: true });
  }

  onPage(e) {
    this.pageReq.page = e;
    this.getListByPage();
  }

  onSubmit() {
    if (!this.selectedItemCache) {
      this.notificationService.create({
        type: 'warning',
        title: '抱歉,请至少选择一辆车'
      });
      return;
    }
    if (this.planId && this.routeId) {
      this.editPlanService
        .updateRoute(
          { driver: this.selectedItemCache.username },
          this.planId,
          this.routeId
        )
        .subscribe(
          (res: Result<number>) => {
            this.onClose(true);
          },
          err => {}
        );
    }
  }

  getListByPage(option?: { isResetReq: boolean }) {
    if (option && option.isResetReq) {
      this.resetPageReq();
    }
    this.isSpinning = true;
    // 分页接口
    const paramsTemp = this.updateParams();
    this.staffInfoService.getStaffList(this.pageReq, paramsTemp).subscribe(
      (res: Result<PageRes<StaffRes[]>>) => {
        if (res.data.content) {
          /* 组装（列表类型的）列表数据 */
          this.listCache = this.dataToTableRows(
            res.data.content.filter(d => d.post.id === 1)
          );
          /* 更新列表的信息（分页/排序） */
          this.updatePageRes(res.data);
        }
      },
      err => {
        this.listCache = [];
        this.isSpinning = false;
      },
      () => (this.isSpinning = false)
    );
  }

  dataToTableRows(data: StaffRes[]): StaffSelectionModel[] {
    if (!data.length) {
      return [];
    }
    return data.map((o: StaffRes) => ModelConverter.driverResToListModel(o));
  }

  resetPageReq(): void {
    this.pageReq.page = 1;
    this.pageReq.size = this.pageRes.size;
    this.pageReq.sort = 'buyDate.desc';
  }

  updateParams() {
    const paramsTemp = {};
    for (const k in this.params) {
      if (!this.params[k]) {
        this.params[k] = null;
      } else {
        paramsTemp[k] = this.params[k];
      }
    }
    return paramsTemp;
  }

  // 只存储分页信息,不包括数据
  updatePageRes(data: PageRes<StaffRes[]>): void {
    this.pageRes = new PageRes(
      data.page,
      data.size,
      data.pages,
      data.total,
      data.last
    );
  }
}
