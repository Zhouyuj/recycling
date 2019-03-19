import { OnInit, Component } from '@angular/core';
import { DateUtil } from '../../../shared/utils/date-utils';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { TableBasicComponent } from '../../../manage/table-basic.component';
import { HistoryService } from '../history.service';
import { DownloadReportsService } from '../../../core/services/reports/downloadReports.service';
import { WeighBridgesModel } from './weigh-bridges.model';
import { PageRes } from '../../../shared/models/page/page-res.model';

@Component({
  selector: 'app-history-weightbridges',
  templateUrl: './weigh-bridges.component.html',
  styleUrls: ['./weigh-bridges.component.scss']
})
export class WeighBridgesComponent extends TableBasicComponent
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
      link: '/manage/history/weighbridges',
      title: '地磅明细'
    }
  ];
  date: string;
  dataSet: any[];
  isSpinning: boolean = true;

  constructor(
    private notificationService: NotificationService,
    private historyService: HistoryService
  ) {
    super();
  }

  ngOnInit() {
    this.calcTableScrollY(30);
    this.date = DateUtil.dateFormat(new Date(), 'yyyy-MM');
    this.historyService
      .getWeighBridgesList(this.pageReq, { month: this.date })
      .subscribe(
        res => {
          this.isSpinning = false;
          /* 更新列表的信息（分页/排序） */
          this.updatePageRes(res.data);
          if (res.data.content) {
            this.dataSet = res.data.content.map(d => {
              d.grossDateTime = DateUtil.dateFormat(
                new Date(d.grossDateTime),
                'yyyy-MM-dd hh:mm:ss'
              );
              d.tareDateTime = DateUtil.dateFormat(
                new Date(d.tareDateTime),
                'yyyy-MM-dd hh:mm:ss'
              );
              return d;
            });
          }
        },
        err => {
          this.isSpinning = false;
        }
      );
  }

  onChangeDate(date: Date) {
    this.isSpinning = true;
    this.date = DateUtil.dateFormat(date, 'yyyy-MM');
    this.historyService
      .getWeighBridgesList(this.pageReq, { month: this.date })
      .subscribe(
        res => {
          this.isSpinning = false;
          /* 更新列表的信息（分页/排序） */
          this.updatePageRes(res.data);
          if (res.data.content) {
            this.dataSet = res.data.content.map(d => {
              d.grossDateTime = DateUtil.dateFormat(
                new Date(d.grossDateTime),
                'yyyy-MM-dd hh:mm:ss'
              );
              d.tareDateTime = DateUtil.dateFormat(
                new Date(d.tareDateTime),
                'yyyy-MM-dd hh:mm:ss'
              );
              return d;
            });
          }
        },
        err => {
          this.isSpinning = false;
        }
      );
  }

  onPageV2(e) {
    this.pageReq.page = e;
    this.getListByPage();
  }

  /**
   * 统一分页获取列表方法
   */
  getListByPage(option?: { isResetReq: boolean }) {
    // if (option && option.isResetReq) {
    //   this.resetPageReq();
    // }
    this.isSpinning = true;
    // 分页接口
    // const paramsTemp = this.updateParams();

    this.historyService
      .getWeighBridgesList(this.pageReq, { month: this.date })
      .subscribe(
        res => {
          if (res.data.content) {
            /* 缓存（返回值类型的）列表 */
            this.dataSet = res.data.content.map(d => {
              d.grossDateTime = DateUtil.dateFormat(
                new Date(d.grossDateTime),
                'yyyy-MM-dd hh:mm:ss'
              );
              d.tareDateTime = DateUtil.dateFormat(
                new Date(d.tareDateTime),
                'yyyy-MM-dd hh:mm:ss'
              );
              return d;
            });
            /* 更新列表的信息（分页/排序） */
            this.updatePageRes(res.data);
            this.isSpinning = false;
          }
        },
        err => {
          this.isSpinning = false;
          console.error(`分页查询失败!!! message:${err.error.message}`);
        },
        () => (this.isSpinning = false)
      );
  }

  onSearch() {
    if (!this.date) {
      this.notificationService.create({
        type: 'warning',
        content: '请输入日期'
      });
      return;
    }
  }

  onExport() {
    this.historyService.getWeighBridgesReport(this.date).subscribe(res => {
      DownloadReportsService.download(res, `地磅明细.xls`);
    });
  }

  /**
   * 目前只存储分页信息,不包括数据
   * @param data
   */
  updatePageRes(data: PageRes<WeighBridgesModel[]>): void {
    this.pageRes = new PageRes(
      data.page,
      data.size,
      data.pages,
      data.total,
      data.last
    );
  }
}
