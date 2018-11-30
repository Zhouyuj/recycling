import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
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
import {Mock} from './mock';

@Component({
    selector   : 'app-customers-info',
    templateUrl: './customers-info.component.html',
    styleUrls  : [ './customers-info.component.scss' ]
})
export class CustomersInfoComponent implements OnInit {
    // ngx-datatable
    @ViewChild('dataTable') dataTable: any;
    public expanded: any = {};
    // antd-table
    expandDataCache = {};
    allChecked = false;
    indeterminate = false;
    selectedItemRes: CustomerRes;
    selectedItemId: number;
    sortMap = {
        createTime: '',
    };   // 操作表格的排序参数

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

    public pageReq = new PageReq(1, 12);
    public pageRes = new PageRes(1, 12, 1, 1);
    public params: any = {};// 分页查询参数
    public keywordType: 'name';
    public keyword = {
        name       : '',
        address    : '',
        username   : '',
        createTime : '',
        contactName: '',
        mobilePhone: '',
    };
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
        //let mock = Mock;
        this.districtsService.getDistricts('350600', 1).subscribe((res: any) => {
            this.countyNames = res.data.districts;
            this.getListByPage();
            //this.listCache = mock.data.content as any;
            //this.list_options.rows = this.dataToTableRows(mock.data.content as any);
            //this.list_options.rows.forEach(item => {
            //    this.expandDataCache[ item.id ] = this.convertTreeToList(item);
            //});
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

    onKeywordSearch(e, type?: string) {
        /*let key = this.keywordType;
        if (key && type.trim() && this.keyword) {
            this.params[ key ] = this.keyword.replace(/\s/g, '');
            this.getListByPage();
        } else {
            this.messageService.create({
                type   : 'warning',
                content: '请先选择搜索类别',
            });
        }*/
    }

    onSelect(e: ListModel) {
        this.itemCache = this.listCache.filter(item => item.id == this.list_options.selectedRows[ 0 ].id)[ 0 ];
        this.formCache = ModelConverter.customerResToFormModel(this.itemCache);
    }

    /**
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
                        this.list_options.rows.forEach(item => this.expandDataCache[ item.id ] = this.convertTreeToList(item));
                        //this.list_options.rows = this.list_options.rows.map(item => this.convertTreeToList(item));
                        /* 更新列表的信息（分页/排序） */
                        this.updatePageRes(res.data);
                    } else {
                        this.list_options.rows = [];
                        this.expandDataCache = {};
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
        return data.map((o: CustomerRes) => ModelConverter.customerResToListModel(o));
    }

    /**
     * 目前只存储分页信息,不包括数据
     * @param data
     */
    updatePageRes(data: PageRes<CustomerRes[]>): void {
        this.pageRes = new PageRes(data.page - 1 || 0, data.size || 12, data.pages || 1, data.total || 1, data.last || false);
    }

    updatePageReq(pageInfo: { count: number, pageSize: number, limit: number, offset: number }): void {
        this.pageReq.page = pageInfo.offset + 1;
        this.pageReq.size = pageInfo.pageSize;
    }


    /** ngx table start **/
    toggleExpandRow(row) {
        this.dataTable.rowDetail.toggleExpandRow(row);

    }

    onDetailToggle(e: {type: string, value: ListModel}) {
    }

    getHeight(row, index) {
        console.log('getHeight:', row, index);
        return 200;
    }

    /** ngx table end **/


    /** antd table start **/
    // $event : true(打开) | false(闭合)
    collapse(array: ListModel[], data: ListModel, $event: boolean): void {
        console.log($event);
        if ($event === false) {
            if (data.customerList && data.customerList.length > 0) {
                data.customerList.forEach(d => {
                    const target = array.find(a => a.id === d.id);
                    target.expand = false;
                    this.collapse(array, target, false);
                });
            } else {
                return;
            }
        }
    }

    convertTreeToList(root: object): ListModel[] {
        const stack = [];
        const array = [];
        const hashMap = {};
        stack.push({ ...root }); // TODO 修改 list.model.ts(增加列表操作所需的所有字段)

        while (stack.length !== 0) {
            const node = stack.pop();
            this.visitNode(node, hashMap, array);
            if (node.customerList) {
                for (let i = node.customerList.length - 1; i >= 0; i--) {
                    stack.push({ ...node.customerList[ i ], parent: node }); // TODO 修改
                    // list.model.ts(增加列表操作所需的所有字段)
                }
            }
        }
        return array;
    }

    visitNode(node: ListModel, hashMap: object, array: ListModel[]): void {
        if (!hashMap[ node.id ]) {
            hashMap[ node.id ] = true;
            array.push(node);
        }
    }

    /** checkable start **/
    /**
     * 由于组装为树状功能的数据复杂
     * this.expandDataCache: {
     *  聚类点_id: [{聚类点}, {子收集点}]
     *  普通点_id: [{普通点}]
     * }
     * 修改为单选!!
     * e: boolean
     * item: expandDataCache 中
     * 点击多选框时,当修改普通点/聚类点时,直接获取
     **/
    refreshStatus(e?, item?): void {
        if (!item) return;
        // 改成单选, 修改 this.expandDataCache
        // 保存选中的id,将其他项均改为false,再修改id的项
        this.selectedItemId = item.parent ? item.parent.id : item.id;
        // 全部去除选择
        for (let k in this.expandDataCache) {
            this.expandDataCache[ k ].forEach(c => {
                c.checked = false;
            });
        }
        if (item.parent) {
            this.expandDataCache[ item.parent.id ].forEach(c => {
                if (c.id === item.id) {
                    c.checked = true;
                    this.selectedItemRes = this.listCache.find(l => l.id === item.parent.id)
                        .customerList.find(cl => cl.id === item.id);
                }
            })
        } else {
            this.expandDataCache[ item.id ][ 0 ].checked = true;
            this.selectedItemRes = this.listCache.find(l => l.id === item.id);
        }
        console.log(this.expandDataCache);
        this.formCache = ModelConverter.customerResToFormModel(this.selectedItemRes);
        console.log(this.formCache);
    }

    /** checkable end **/

    onClickTr(e, item) {
        e.stopPropagation(true);
        this.refreshStatus(e, item);
    }

    /**
     * @param type: this.sortMap 的值
     * @param e: descend | ascend
     */
    onSortTh(type: string, e) {
        if (!e) return;
        e = e.replace('end', '');
        this.pageReq.sort = `${type}.${e},`;
        this.pageReq.page = 1;
        console.log(this.pageReq);
        this.getListByPage();
    }

    onKeywordSearchTh(keyType: string) {
        this.params[ keyType ] = this.keyword[keyType].replace(/\s/g, '');
        if (!this.params[ keyType ]) {
        }
        this.getListByPage();
    }

    /** antd table end **/
}
