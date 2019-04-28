import { TableBasicComponent } from '../../table-basic.component';
import { Component, OnInit } from '@angular/core';
import { DateUtil } from 'src/app/shared/utils/date-utils';
import { VehicleRes } from '../../base/vehicle-info/vehicle-res.model';
import { StaffRes } from '../../base/staff-info/staff-res.model';
import { VehicleInfoService } from '../../../manage/base/vehicle-info/vehicle-info.service';
import { StaffInfoService } from '../../../manage/base/staff-info/staff-info.service';
import { HistoryService } from '../history.service';
import { PageReq } from 'src/app/shared/models/page/page-req.model';
import { PageRes } from 'src/app/shared/models/page/page-res.model';
import { Result } from 'src/app/shared/models/response/result.model';
import { equalParamsAndUrlSegments } from '@angular/router/src/router_state';
import { StatisticRes } from './statistic-res.module';
import { DownloadReportsService } from 'src/app/core/services/reports/downloadReports.service';

@Component({
  selector: 'app-history-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent extends TableBasicComponent implements OnInit {
  /* 面包屑导航 */
  breadcrumbs = [
    {
      link: '/',
      title: '首页'
    },
    {
      link: '/manage/history/scheme',
      title: '历史记录'
    },
    {
      title: '业务统计'
    }
  ];
  dataSet: any[];
  isSpinning = false;
  vehicleOptions: VehicleRes[];
  cacheVehicles: VehicleRes[];
  driverOptions: StaffRes[];
  cacheDrivers: StaffRes[];
  params= {
    month: '',
    vehicleId: '',
    driverId: ''
  };
  constructor(
    private vehicleInfoService: VehicleInfoService,
    private staffInfoService: StaffInfoService,
    private historyService: HistoryService
  ) {
    super();
  }

  ngOnInit() {
    this.calcTableScrollY(30);
    // 查询所有车辆
    let page = new PageReq();
    this.params.month = DateUtil.dateFormat(new Date(), 'yyyy-MM');
    this.getListByPage({ isResetReq: true} );
    this.isSpinning = true;
    this.vehicleInfoService.getVehicleList(page, {}).subscribe(
      (res: Result<PageRes<VehicleRes[]>>) => {
        this.isSpinning = false;
        if (res.data.content) {
          /* 缓存（返回值类型的）列表 */
          this.vehicleOptions = res.data.content;
          this.cacheVehicles = res.data.content;
        }
      },
      err => {
        this.isSpinning = false;
        this.vehicleOptions = [];
        this.cacheVehicles = [];
        console.error(`查询车辆失败!!! message:${err.error.message}`);
      }
    );
    //查询所有司机
    this.staffInfoService.getStaffList(page, {roleId: 3}).subscribe(
      (res: Result<PageRes<StaffRes[]>>) => {
        if (res.data.content) {
          /* 缓存（返回值类型的）列表 */
          this.driverOptions = res.data.content;
          this.cacheDrivers = res.data.content;
        }
      },
      err => {
        this.driverOptions = [];
        this.cacheDrivers = [];
        console.error(`查询司机失败!!! message:${err.error.message}`);
      }
    );
  }

  getListByPage(option?: { isResetReq: boolean }){
    if (option && option.isResetReq) {
        this.resetPageReq();
    }
    this.isSpinning = true;
    const paramsTemp = this.updateParams();
    let pageTemp = {
      pageNum: this.pageReq.page,
      pageSize: this.pageReq.size
    }
    this.historyService.getRoutesCountFuel(pageTemp, paramsTemp)
    .subscribe(
        res => {
            if (res.data) {
                this.dataSet = res.data;
            }
            this.updatePageRes(res.data);
            this.isSpinning = false;
        },
        err => {
            this.isSpinning = false;
            console.error(`查询保养记录失败！！！ messages:${err.error.message}`);
        },
        () => (this.isSpinning = false)
    );
  }

  onExport() {
    const paramsTemp = this.updateParams();
      this.historyService
      .exportRoutesCountFuelReport(paramsTemp)
      .subscribe(res => {
        DownloadReportsService.download(res, `业务统计.xls`);
      });
  }

  onPageV2(e) {
    this.pageReq.page = e;
    this.getListByPage();
  }

  onChangeDate(date) {
    this.params.month = DateUtil.dateFormat(date, 'yyyy-MM');
  }
  onSearchVehicle(value) {
    this.vehicleOptions = this.cacheVehicles.filter((item: VehicleRes) => {
      if (item.plateNumber.includes(value)) {
        return true;
      } else {
        return false;
      }
    });
  }
  onSearchDriver(value) {
    this.driverOptions = this.cacheDrivers.filter((item: StaffRes) => {
      if (item.name.includes(value)) {
        return true;
      } else {
        return false;
      }
    });
  }
  onSearchData() {
    this.getListByPage({ isResetReq: true });
  }

  updateParams() {
    const paramsTemp =  {};
    for (const k in this.params) {
        if (!this.params[k]) {
            this.params[k] = null;
        } else {
            paramsTemp[k] = this.params[k];
        }
    }
    return paramsTemp;
  }
  resetPageReq(): void {
    this.pageReq.page = 1;
    this.pageReq.size = this.pageRes.size;
  }
  /**
   * 目前只存储分页信息,不包括数据
   * @param data
   */
  updatePageRes(data: PageRes<StatisticRes[]>): void {
    this.pageRes = new PageRes(
      data.page,
      data.size,
      data.pages,
      data.total,
      data.last
    );
  }
}
