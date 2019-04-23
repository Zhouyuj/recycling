import { OnInit, Component } from '@angular/core';
import { TableBasicComponent } from '../../table-basic.component';
import { DateUtil } from 'src/app/shared/utils/date-utils';
import { PageRes } from 'src/app/shared/models/page/page-res.model';
import { VehicleManageService } from '../vehicle-manage.service';

@Component({
  selector: 'app-vehiclemanage-fixrecord',
  templateUrl: './fixrecord.component.html',
  styleUrls: []
})
export class FixRecordComponent extends TableBasicComponent implements OnInit {
  /* 面包屑导航 */
  breadcrumbs = [
    {
      link: '/',
      title: '首页'
    },
    {
      link: '/manage/vehiclemanage/fixrecord',
      title: '车队管理'
    },
    {
      title: '维修记录'
    }
  ];
  address = [];
  street: number;
  isSpinning = false;
  date: string;
  params = {
    plateNumber: '',
    reason: '',
    content: ''
  };
  formCache: any;
  dataSet: any[] = [];

  constructor(private vehicleManageService: VehicleManageService) {
    super();
  }

  ngOnInit() {
    this.date = DateUtil.dateFormat(new Date(), 'yyyy-MM');
  }

  onChangeDate(date) {
    this.date = DateUtil.dateFormat(date, 'yyyy-MM');
  }

  onKeywordSearchTh(keywordType: string) {
    const hasKeywordValue: boolean = Boolean(
      Object.values(this.params).find(param => !!param)
    );
    if (keywordType && hasKeywordValue) {
      this.pageRes.size = 500;
    } else {
      this.pageRes.size = 12;
    }
    this.getListByPage({ isResetReq: true });
  }

  /**
   * 统一分页获取列表方法
   */
  getListByPage(option?: { isResetReq: boolean }) {
    if (option && option.isResetReq) {
      this.resetPageReq();
    }
    this.isSpinning = true;
    // 分页接口
    const paramsTemp = this.updateParams();
    this.vehicleManageService.getFixRecordList(this.date).subscribe(
      res => {
        console.log(res);
      },
      err => {
        // this.listResCache = [];
        // this.listCache = [];
        this.isSpinning = false;
        console.error(`分页查询失败!!! message:${err.error.message}`);
      },
      () => (this.isSpinning = false)
    );
  }

  resetPageReq(): void {
    this.pageReq.page = 1;
    this.pageReq.size = this.pageRes.size;
    this.pageReq.sort = 'createdDate.desc';
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

  /**
   * 目前只存储分页信息,不包括数据
   * @param data
   */
  updatePageRes(data: PageRes<any>): void {
    this.pageRes = new PageRes(
      data.page,
      data.size,
      data.pages,
      data.total,
      data.last
    );
  }

  onSelected(isChecked: boolean, target: any) {
    if (!isChecked) {
      this.formCache = null;
      return;
    }
    // 用于重置,因为当选择子收集点时,该值为其父
    // this.parentCache = null;
    // // 用于删除
    // this.selectedId = target.id;
    // // 单选
    // this.listCache.forEach((item: ListModel) => {
    //   item.checked = false;
    //   if (item.id === target.id) {
    //     // 选中聚类点/普通收集点
    //     item.checked = true;
    //     this.formCache = ModelConverter.customerResToFormModel(
    //       this.listResCache.find(l => l.id === target.id)
    //     );
    //   }
    //   if (item.customerList && item.customerList.length) {
    //     // 选中子收集点

    //   }
    // });
  }

  onSelectedTr(e, item) {
    e.stopPropagation(true);
    this.onSelected(true, item);
  }

  onSearch() {}

  onAdd() {}

  onEdit() {}

  onExp() {}

  onPageV2(data) {}
}
