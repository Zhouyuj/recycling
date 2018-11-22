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
import { FormModel } from './form.model';
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
    public isSpinning = false;

    public pageReq = new PageReq(1, 2);
    public pageRes = new PageRes();
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
            this.getListByPage();
            //this.listCache = mock.data.content as any;
            //this.list_options.rows = this.dataToTableRows(mock.data.content as any);
        });
    }

    onAdd() {
        this.onOpenForm('add');
    }

    onEdit() {
        this.onOpenForm('edit');
    }

    onDel() {
        this.customersInfoService.delCustomer(this.itemCache.id).subscribe(res => {
            this.notificationService.create({
                type   : 'success',
                title  : '恭喜,删除成功',
                content: '该提醒将自动消失',
            });
            this.getListByPage();
        })
    }

    onExp() {
        console.log('exp');
    }

    onSelect(e: ListModel) {
        this.itemCache = this.listCache.filter(item => item.id == this.list_options.selectedRows[ 0 ].id)[ 0 ];
        this.formCache = ModelConverter.customerResToFormModel(this.itemCache);
    }

    onKeywordSearch(e, type?: string) {
        let key = this.keywordType;
        if (key && type.trim() && this.keyword) {
            this.params[ key ] = this.keyword.replace(/\s/g, '');
            this.getListByPage();
        } else {
            this.messageService.create({
                type   : 'warning',
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
        this.updatePageReq(e);
        this.getListByPage();
    }

    /**
     * e.sorts = [{ dir: 'asc'|'desc', prop: '列名' }]
     * @param e
     */
    onSort(e) {
        let sorts = e.sorts
            .map(sort => `${sort.prop}.${sort.dir},`)
            .join('');
        this.pageReq.sort = sorts;
        this.pageReq.page = 1;
        this.getListByPage();
    }

    /**
     * 抽屉组件
     * form 表单
     */
    onOpenForm(type?: 'add' | 'edit'): void {
        this.drawerRef = this.drawerService.create<CustomersInfoFormComponent, { type: string, success: boolean, cache: FormModel, countyNames: [{ code: string, name: string }] }, boolean>({
            nzTitle        : { add: '添加', edit: '编辑' }[ type ] || '请编辑表单',
            nzContent      : CustomersInfoFormComponent,
            nzWidth        : '55%',
            nzContentParams: {
                type       : type,
                success    : false,
                cache      : type === 'edit' ? this.formCache : null,
                countyNames: this.countyNames,
            }
        });

        this.drawerRef.afterOpen.subscribe(() => {
        });

        this.drawerRef.afterClose.subscribe((res: boolean) => {
            if (res) {
                // 重新调分页接口
                this.getListByPage();
            }
        });
    }

    /**
     * 统一分页获取列表方法
     * @param page
     * @param params
     */
    getListByPage() {
        this.isSpinning = true;
        this.customersInfoService
            .getCustomerList(this.pageReq, this.params)
            .subscribe(
                (res: Result<PageRes<CustomerRes[]>>) => {
                    if (res.data.content.length > 0) {
                        /* 缓存（返回值类型的）列表 */
                        this.listCache = res.data.content;
                        /* 组装（列表类型的）列表数据 */
                        this.list_options.rows = this.dataToTableRows(res.data.content);
                        /* 更新列表的信息（分页/排序） */
                        this.updatePageRes(res.data);
                    }
                },
                err => {
                    console.error(`分页查询失败!!!${err}`);
                    this.isSpinning = false;
                },
                () => this.isSpinning = false
            );
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

    // 只存储分页信息,不包括数据
    updatePageRes(data: PageRes<CustomerRes[]>): void {
        this.pageRes = new PageRes(data.page - 1, data.size, data.pages, data.total, data.last);
    }

    updatePageReq(pageInfo: { count: number, pageSize: number, limit: number, offset: number }): void {
        this.pageReq.page = pageInfo.offset + 1;
        this.pageReq.size = pageInfo.pageSize;
    }
}
