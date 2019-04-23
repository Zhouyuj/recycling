import { Component, OnInit } from '@angular/core';
import { fromEvent, forkJoin } from 'rxjs';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import { DateUtil } from '../../../shared/utils/date-utils';
import { CustomersInfoService } from '../../base/customers-info/customers-info.service';
import { StaffInfoService } from '../../base/staff-info/staff-info.service';
import { VehicleInfoService } from '../../base/vehicle-info/vehicle-info.service';
import { TableBasicComponent } from '../../../manage/table-basic.component';
import { CustomerRes } from '../../../manage/base/customers-info/customer-res.model';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { DownloadReportsService } from '../../../core/services/reports/downloadReports.service';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { VehicleRes } from '../../base/vehicle-info/vehicle-res.model';
import { StaffRes} from '../../base/staff-info/staff-res.model';
import { CollectionPatch } from '../models/collection-patch.model';

@Component({
  selector: 'app-history-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent extends TableBasicComponent implements OnInit {
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
      link: '/manage/history/collection',
      title: '收运台账'
    }
  ];

  data: [];
  dataSet: any[];
  vehicleList: any[];
  optionsOfVehicle: any[];
  driverList: any[];
  optionsOfDriver: any[];
  editCache: {[key: string]: any} = {};
  searchVal: any;
  date: string;
  optionGroups: CustomerRes[];
  searchVal$: any;
  customer: CustomerRes;
  isSpinning: boolean;
  constructor(
    private customersInfoService: CustomersInfoService,
    private vehicleInfoService: VehicleInfoService,
    private staffInfoService: StaffInfoService,
    private notificationService: NotificationService
  ) {
    super();
    this.dataSet = [];
    this.vehicleList = [];
    this.driverList = [];
  }

  ngOnInit() {
    this.calcTableScrollY(-80);
    let pageReq = new PageReq();
    pageReq.size = 30000;
    // 查询所有车辆
    this.vehicleInfoService.getVehicleList(pageReq, {}).subscribe(
      (res: Result<PageRes<VehicleRes[]>>) => {
        if (res.data.content) {
          /* 缓存（返回值类型的）列表 */
          this.vehicleList = res.data.content;
        }
      },
      err => {
        this.vehicleList = [];
        console.error(`查询车辆失败!!! message:${err.error.message}`);
      }
    );
    //查询所有司机
    this.staffInfoService.getStaffList(pageReq, {roleId: 3}).subscribe(
      (res: Result<PageRes<StaffRes[]>>) => {
        if (res.data.content) {
          /* 缓存（返回值类型的）列表 */
          this.driverList = res.data.content;
        }
      },
      err => {
        this.driverList = [];
        console.error(`查询司机失败!!! message:${err.error.message}`);
      }
    );
  }

  showWarning() {
    if (!this.customer || !this.customer.id) {
      this.notificationService.create({
        type: 'warning',
        content: '请输入收运单位'
      });
      return true;
    }
    if (!this.date) {
      this.notificationService.create({
        type: 'warning',
        content: '请输入日期'
      });
      return true;
    }
  }

  onSearch() {
    if (this.showWarning()) return;
    this.isSpinning = true;
    this.customersInfoService
      .getCustomerCountsByIdAndMonth(
        this.customer && this.customer.id,
        this.date
      )
      .subscribe(
        res => {
          this.isSpinning = false;
          if (res.data) {
            this.dataSet = res.data.dateList;
            this.updateEditCache();
          }
        },
        err => {
          this.isSpinning = false;
        }
      );
  }

  onExport() {
    if (this.showWarning()) return;
    this.customersInfoService
      .getCustomerCountReport(this.customer && this.customer.id, this.date)
      .subscribe(res => {
        DownloadReportsService.download(
          res,
          `漳州市餐饮单位餐厨垃圾台账联单记录表.pdf`
        );
      });
  }

  onChangeDate(result: Date): void {
    this.date = DateUtil.dateFormat(result, 'yyyy-MM');
  }

  onSearchCustomer(value: string): void {
    this.pageReq.size = 30;
    fromEvent(document.getElementById('customer'), 'input')
      .pipe(
        map(event => (<HTMLInputElement>event.target).value),
        debounceTime(500),
        mergeMap(v =>
          this.customersInfoService.getCustomerList(this.pageReq, {
            name: v
          })
        )
      )
      .subscribe(res => {
        let subList = [];
        if (res.data.content) {
          res.data.content.forEach(d => {
            if (d.customerList && d.customerList.length > 0) {
              subList = subList.concat(d.customerList);
            }
          });
        }
        this.optionGroups = res.data.content.concat(subList);
      });
  }
  onSearchPlateNumber(value: string):void {
      let subVehicles = [];
      this.vehicleList.forEach(vehicle => {
        if(vehicle.plateNumber.includes(value)) {
          subVehicles.push(vehicle);
        }
      });
      this.optionsOfVehicle = subVehicles;
  }
  onSearchDriver(value: string):void {
     let subDrivers = [];
     this.driverList.forEach(driver => {
        if (driver.name.includes(value)) {
          subDrivers.push(driver);
        }
     });
     this.optionsOfDriver = subDrivers;
  }
  updateEditCache(): void {
    this.dataSet.forEach(item => {
        this.editCache[item.date] = {
          edit: false,
          data: {...item}
        }
    });
  }
  startEdit(key: string): void {
      if (this.editCache[key].data.detailList.length > 0) {
        this.editCache[key].edit = true;
      }
  }
  enterEvent(data: any):void {
    let oldCollection = data;
    let newCollection = this.editCache[data.date].data;
    let updateCollections: CollectionPatch[] = [];

    newCollection.detailList.forEach(function(item, index) {
        let temp: CollectionPatch = new CollectionPatch();
        temp.taskId = item.id;
        if (index == 0) {
          if(newCollection.totalQuantity !== oldCollection.totalQuantity) {
            temp.quantity = item.quantity + (newCollection.totalQuantity - oldCollection.totalQuantity);
          }
        }
        if (item.plateNumber && item.plateNumber.id) {
          temp.vehicleId = item.plateNumber.id;
        }
        if (item.driver && item.driver.id) {
          temp.driverId = item.driver.id;
        }
        if (temp.quantity || temp.driverId || temp.vehicleId) {
          updateCollections.push(temp);
        }
    });
    let observableBatch = [];
    for (let patchData of updateCollections) {
        observableBatch.push(this.customersInfoService.updateCollection(patchData));
    }
    forkJoin(observableBatch).subscribe((res=> {
      this.onSearch();
    }),
    (err => {
      console.error(`更新失败!!! message:${err.error.message}`);
    })
    );
  }
}
