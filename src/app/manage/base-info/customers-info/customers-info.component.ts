import { Component, OnInit, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

import { NzDrawerService } from 'ng-zorro-antd';
import { EChartOption } from 'echarts';

import { CustomersInfoFormComponent } from './customers-info-form/customers-info-form.component';
import { CustomersInfoService } from './customers-info.service';
import { DistrictsService } from '../../../shared/services/districts/districts.service';
import { MessageService } from '../../../shared/services/message/message.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { CustomerRes } from './customer-res.model';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { DateUtil } from '../../../shared/utils/date-utils';
import { ModelConverter } from './model-converter';
import { FormModel } from './customers-info-form/form.model';
import { ListModel } from './list.model';
import { Mock } from './mock';

@Component({
    selector   : 'app-customers-info',
    templateUrl: './customers-info.component.html',
    styleUrls  : [ './customers-info.component.scss' ]
})
export class CustomersInfoComponent implements OnInit {
    /* 面包屑导航 */
    public breadcrumbs = [
        {
            link : '/',
            title: '首页',
        },
        {
            link : '',
            title: '基础信息',
        },
        {
            link : '/manage/baseInfo/customers',
            title: '收集点管理',
        }
    ];
    public countyNames: [{ code: string, name: string }];
    public drawerRef: any;
    public list_options = {
        rows               : [],
        selectedRows       : [],
        localizationMessage: {
            emptyMessage   : '很抱歉, 未找到任何数据！',
            totalMessage   : '条记录(共)',
            selectedMessage: '已选中',
        },
    };
    public pageReq = new PageReq();
    public params: any = {};// 分页查询参数
    public keywordType: 'name';
    public keyword: string;
    /* 列表的缓存 */
    public listCache: CustomerRes[];
    public itemCache: CustomerRes;
    public formCache: FormModel;

    constructor(private customersInfoService: CustomersInfoService,
                private districtsService: DistrictsService,
                private drawerService: NzDrawerService,
                private messageService: MessageService,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        let mock = Mock;
        this.districtsService.getDistricts('350600', 1).subscribe((res: any) => {
            this.countyNames = res.data.districts;
            //this.getListByPage(this.pageReq, this.params);
            this.listCache = mock.data.content as any;
            this.list_options.rows = this.dataToTableRows(mock.data.content as any);
        });
    }

    /**
     * 统一分页获取列表方法
     * @param page
     * @param params
     */
    getListByPage(page: PageReq, params?: any) {
        this.customersInfoService
            .getCustomerList(page, params)
            .subscribe((res: Result<PageRes<CustomerRes[]>>) => {
                this.listCache = res.data.content;
                let list = this.dataToTableRows(res.data.content);
                this.list_options.rows = list;
            }, err => console.log(`分页查询失败!!!${err}`));
    }

    updatePage(pageInfo: { count: number, pageSize: number, limit: number, offset: number }): void {
        this.pageReq.page = pageInfo.offset + 1;
        this.pageReq.size = pageInfo.pageSize;
    }

    /**
     * 将接口获取的数据转化成table rows data
     * rows = [{
     *  lngLat, images, name, countyCode, duration,
     *  detailAddress, username, totalDustbins,
     *  createTime, contactName, mobilePhone,
     * }]
     */
    dataToTableRows(data: CustomerRes[]): ListModel[] {
        return data.map((o: CustomerRes) => ModelConverter.customerResToListModel(o, this.countyNames));
    }

    onAdd() {
        this.onOpenForm('add');
    }

    onEdit() {
        this.onOpenForm('edit');
    }

    onDel() {
        console.log('del', this.list_options.selectedRows);
        this.customersInfoService.delCustomer(this.itemCache.id).subscribe(res => {
            this.notificationService.create({
                type: 'success',
                title: '',
                content: '恭喜,更新成功',
            });
        })
    }

    onExp() {
        console.log('exp');
    }

    onSelect(e: ListModel) {
        this.itemCache = this.listCache.filter(item => item.id == this.list_options.selectedRows[ 0 ].id)[ 0 ];
        this.formCache = ModelConverter.customerResToFormModel(this.itemCache);
        console.log('选中的res-model', this.itemCache);
        console.log('转化的form-model', this.formCache);
    }

    onSelectFilter(e) {
        console.log(e);
    }

    onSelectEmitter(e) {
        console.log(e);
    }

    onKeywordSearch(e, type?: string) {
        let key = this.keywordType;
        if (key && type.trim()) {
            this.params[key] = this.keyword.replace(/\s/g, '');
            this.getListByPage(this.pageReq, this.params);
        } else {
            this.messageService.create({
                type: 'warning',
                content: '请先选择搜索类别',
            });
        }
    }

    /**
     * TODO limit通过双向绑定来实现
     * e == {count: 0, pageSize: 12, limit: 12, offset: 1}
     * @param e
     */
    onPage(e) {
        this.updatePage(e);
        this.getListByPage(this.pageReq, this.params);
        console.log(this.pageReq);
    }

    /**
     * e.sorts[0] = { dir: 'asc'|'desc', prop: '列名' }
     * @param e
     */
    onSort(e) {
        let columnName = e.sorts[ 0 ].prop,
            columnSort = e.sorts[ 0 ].dir,
            sort = `${columnName}.${columnSort},`;
        this.pageReq.sort = sort;
        this.getListByPage(this.pageReq);
    }

    /**
     * 抽屉组件
     * form 表单
     */
    onOpenForm(type?: 'add' | 'edit'): void {
        this.drawerRef = this.drawerService.create<CustomersInfoFormComponent, { type: string, success: boolean, cache: FormModel }, boolean>({
            nzTitle        : { add: '添加', edit: '编辑' }[ type ] || '请编辑表单',
            nzContent      : CustomersInfoFormComponent,
            nzWidth        : '55%',
            nzContentParams: {
                type: type,
                success: false,
                cache  : type === 'edit' ? this.formCache : null,
            }
        });

        this.drawerRef.afterOpen.subscribe(() => {
        });

        this.drawerRef.afterClose.subscribe((res: boolean) => {
            if (res) {
                // 重新调分页接口
                this.getListByPage(this.pageReq, this.params);
            }
        });
    }
}
