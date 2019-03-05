import { OnInit, Component } from '@angular/core';
import { HistoryService } from '../history.service';
import { PageReq } from 'src/app/shared/models/page/page-req.model';
import { PageRes } from 'src/app/shared/models/page/page-res.model';
import { PlanRes } from '../../plan/models/plan-res.model';
import { Result } from 'src/app/shared/models/response/result.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlanModule } from '../../plan/plan.module';
import { PlanListModel } from '../../plan/models/plan-list.model';
import { ModelConverter } from '../../plan/models/model-converter';
import { TableBasicComponent } from '../../table-basic.component';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { Route, Router } from '@angular/router';
import { DownloadReportsService } from '../../../core/services/reports/downloadReports.service';

@Component({
  selector: 'app-history-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.scss']
})
export class SchemeComponent extends TableBasicComponent implements OnInit {
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
  resCache: PlanRes[];
  listCache: PlanListModel[];
  selectedItem: PlanListModel;

  constructor(
    private historyService: HistoryService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    private router: Router,
    private downloadReportsService: DownloadReportsService
  ) {
    super();
  }

  ngOnInit() {
    this.calcTableScrollY();
    this.getListByPage();
  }

  onDel() {
    if (!this.selectedItem) {
      this.notificationService.create({
        type: 'warning',
        title: '请选择要删除的方案'
      });
      return;
    }
    this.modalService.createDeleteConfirm({
      onOk: () => {
        this.historyService.delPlan(this.selectedItem.id).subscribe(
          (res: Result<any>) => {
            this.notificationService.create({
              type: 'success',
              title: '删除成功'
            });
            this.getListByPage();
          },
          err => {
            this.getListByPage();
          }
        );
      }
    });
  }

  onExport() {
    if (!this.selectedItem) {
      this.notificationService.create({
        type: 'warning',
        title: '请选择要导出的方案'
      });
      return;
    }
    this.historyService.getPlanReport(this.selectedItem.id).subscribe(
      res => {
        this.downloadReportsService.download(res, this.selectedItem.name);
      },
      err => {
        this.getListByPage();
      }
    );
  }

  onClickRoutes(event: Event, item: PlanListModel) {
    this.router.navigate([
      `/manage/history/scheme/${item.id}/routes`,
      {
        name: item.name,
        date: item.createdDate
      }
    ]);
  }

  onSelected(event: Event, item: PlanListModel) {
    this.listCache.forEach((r: PlanListModel) => {
      if (r.id === item.id) {
        r.checked = !item.checked;
        this.selectedItem = r;
        this.selectedItem = r.checked ? r : null;
      } else {
        r.checked = false;
      }
    });
  }

  onClickListItem(event: Event, item: PlanListModel) {
    this.onSelected(event, item);
  }

  onPage(page: number) {
    this.pageReq.page = page;
    this.getListByPage();
  }

  getListByPage(option?: { isResetReq: boolean }) {
    if (option && option.isResetReq) {
      this.resetPageReq();
    }
    this.isSpinning = true;
    this.getPlanList(this.pageReq).subscribe(
      (res: Result<PageRes<PlanRes[]>>) => {
        if (res.data.content) {
          this.isSpinning = false;
          this.resCache = res.data.content;
          this.listCache = this.dataToTableList(res.data.content);
          this.updatePageRes(res.data);
          this.selectedItem = null;
        }
      },
      () => (this.isSpinning = false),
      () => (this.isSpinning = false)
    );
  }

  dataToTableList(data: PlanRes[]): PlanListModel[] {
    return data.map(item => ModelConverter.planResToPlanListModel(item));
  }

  resetPageReq(): void {
    this.pageReq.page = 1;
    this.pageReq.size = this.pageRes.size;
    this.pageReq.sort = 'createdDate.desc';
  }

  updatePageRes(data: PageRes<PlanRes[]>): void {
    this.pageRes = new PageRes(
      data.page,
      data.size,
      data.pages,
      data.total,
      data.last
    );
  }

  /**
   * 获取`已完成，中止`的方案
   */
  getPlanList(pageReq: PageReq): Observable<Result<PageRes<PlanRes[]>>> {
    const status: string[] = ['Completed', 'Stopped'];
    return this.historyService.getPlanList(pageReq, { status });
  }
}
