import { Component, OnInit, ViewChild, EventEmitter, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { debounceTime, map, switchMap } from 'rxjs/operators';

import { NzDrawerService, NzModalService } from 'ng-zorro-antd';

import { CustomersInfoFormComponent } from './customers-info-form/customers-info-form.component';
import { CustomersInfoService } from './customers-info.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';

import { CustomerRes } from './customer-res.model';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { DateUtil } from '../../../shared/utils/date-utils';
import { ModelConverter } from './model-converter';
import { FormModel } from './form.model';
import { ListModel } from './list.model';
import { ZHANGZHOU_OPTIONS } from '../../../shared/components/cascader/cascader-zhangzhou.config';

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
            title: '收运单位管理',
        }
    ];

    // antd-table
    public drawerRef: any;
    public isSpinning = false;
    public isDelModalVisible = false;
    public isDelOkLoading = false;
    public sortMap = {
        createdDate: '',
    };   // 操作表格的排序参数
    public params = {
        name       : '',
        address    : '',
        username   : '',
        createdDate: '',
        contactName: '',
        mobilePhone: '',
        // TODO 添加所属区域字段
    };
    public districtsFilterList;

    public pageReq = new PageReq(1, 12);
    public pageRes = new PageRes(1, 12);

    /* 表格的缓存 */
    public listResCache: CustomerRes[];
    public listCache: ListModel[];
    public formCache: FormModel;
    public parentCache: ListModel;    // 选中子点时,存在值为聚类点,否则为null
    public selectedId: number;
    public images: { id: number, type: string, url: string }[];

    constructor(private customersInfoService: CustomersInfoService,
                private drawerService: NzDrawerService,
                private modalService: NzModalService,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.initFilterOption();
        this.getListByPage({ isResetReq: true });
    }

    initFilterOption() {
        const dis = ZHANGZHOU_OPTIONS
            .filter(item => item.label === '福建省')[ 0 ].children
            .filter(item => item.label === '漳州市')[ 0 ].children
            .map(item => {
                return { value: item.value, text: item.label };
            });
        this.districtsFilterList = [ ...dis ];
    }

    onAdd() {
        this.onOpenForm('add');
    }

    onEdit() {
        this.onOpenForm('edit');
    }

    onDel() {
        if (this.parentCache && this.parentCache.customerList.length === 1) {
            this.selectedId = this.parentCache.id;
        }
        this.isDelOkLoading = true;
        this.customersInfoService.delCustomer(this.selectedId).subscribe(
            res => {
                this.isDelOkLoading = false;
                this.isDelModalVisible = false;
                this.notificationService.create({
                    type   : 'success',
                    title  : '恭喜,删除成功',
                    content: '该提醒将自动消失',
                });
                this.getListByPage();
            }, err => {
                this.isDelOkLoading = false;
                this.isDelModalVisible = false;
                this.getListByPage();
            }
        );
    }

    onExp() {
        console.log('todo exp');
    }

    /**
     * 抽屉组件
     * form 表单
     */
    onOpenForm(type?: 'add' | 'edit'): void {
        this.drawerRef = this.drawerService.create<CustomersInfoFormComponent,
            { type: string, success: boolean, cache: FormModel, parentCache: ListModel },
            boolean>({
            nzTitle        : { add: '添加', edit: '编辑' }[ type ] || '请编辑表单',
            nzContent      : CustomersInfoFormComponent,
            nzWidth        : '60%',
            nzContentParams: {
                type       : type,
                success    : false,
                cache      : type === 'edit' ? this.formCache : null,
                parentCache: this.parentCache || null,
            }
        });

        this.drawerRef.afterOpen.subscribe(() => {
        });

        this.drawerRef.afterClose.subscribe((res: boolean) => {
            if (res) {
                // 重新调分页接口
                if (type === 'add') {
                    this.getListByPage({ isResetReq: true });
                } else {
                    this.getListByPage();
                }
            }
        });
    }

    /** antd table start **/
    /**
     * $event : true(打开) | false(闭合)
     * @param data
     * @param $event
     */
    onCollapse(data: ListModel, $event: boolean): void {
        if ($event === false) {
            if (data.customerList && data.customerList.length > 0) {
                data.customerList.forEach((d: ListModel) => {
                    if (d.id === data.id) {
                        d.expand = false;
                    }
                    // this.collapse(array, target, false);
                });
            } else {
                return;
            }
        }
    }

    /** checkable start **/

    onSelected(isChecked: boolean, target: ListModel) {
        if (!isChecked) {
            this.formCache = null;
            return;
        }
        // 用于重置,因为当选择子收集点时,该值为其父
        this.parentCache = null;
        // 用于删除
        this.selectedId = target.id;
        // 单选
        this.listCache.forEach((item: ListModel) => {
            item.checked = false;
            if (item.id === target.id) {    // 选中聚类点/普通收集点
                item.checked = true;
                this.formCache = ModelConverter.customerResToFormModel(this.listResCache.find(l => l.id === target.id));
            }
            if (item.customerList && item.customerList.length) {    // 选中子收集点
                item.customerList.forEach((l: ListModel) => {
                    l.checked = false;  // 所有子收集点改为 false
                    if (l.id === target.id) {
                        l.checked = true;
                        this.formCache = ModelConverter.customerResToFormModel(
                            this.listResCache
                                .find((customerResFirst: CustomerRes) => customerResFirst.id === item.id).customerList
                                .find((customerResSecond: CustomerRes) => customerResSecond.id === target.id),
                            item.name
                        );
                        this.parentCache = item;
                    }
                });
            }
        });
    }

    onSelectedTr(e, item) {
        e.stopPropagation(true);
        this.onSelected(true, item);
    }

    /** checkable end **/

    onShowImage($e, item: ListModel, tplImageModalContent?: TemplateRef<{}>) {
        this.onStopPropagation($e);
        console.log('onShowImage');
        this.images = null;
        const modal = this.modalService.create({
            nzTitle          : item.name,
            nzContent        : tplImageModalContent,
            nzFooter         : null,
        });
        modal.afterOpen.subscribe(() => {
            this.images = item.images;
        });
        modal.afterClose.subscribe(() => {
            modal.destroy();
        });
    }

    /**
     * @param type: this.sortMap 的值
     * @param e: descend | ascend
     */
    onSortTh(type: string, e) {
        if (!e) {
            return;
        }
        e = e.replace('end', '');
        this.pageReq.sort = `${type}.${e},`;
        this.pageReq.page = 1;
        this.getListByPage();
    }

    /**
     * @param e : string[] | string
     * @param type
     */
    onFilter(e, type?: string) {
        console.log(e);
        this.notificationService.create({ type: 'warning', title: '抱歉,区域筛选暂不支持' });
        return;
        /*switch (type) {
         case 'roleId':
         let result = (e && !e.length) ? '' : e.join(',');
         if (this.params[ type ] === result) return;
         this.params[ type ] = (e && !e.length) ? '' : e.join(',');
         break;
         case 'sex':
         case 'postId':
         if (!e && !this.params[ type ] || this.params[ type ] === e) return;
         this.params[ type ] = e || '';
         break;
         }
         this.getListByPage({ isResetReq: true });*/
    }

    onKeywordSearchTh(keywordType: string) {
        this.getListByPage({ isResetReq: true });
    }

    /**
     * 点击 登记时间 的关键字筛选框,会触发组件的排序,需要添加该方法
     * @param e
     */
    onStopPropagation(e) {
        e.stopPropagation();
    }

    onPageV2(e) {
        this.pageReq.page = e;
        this.getListByPage();
    }

    /** antd table end **/


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
        this.customersInfoService
            .getCustomerList(this.pageReq, paramsTemp)
            .subscribe(
                (res: Result<PageRes<CustomerRes[]>>) => {
                    if (res.data.content) {
                        /* 缓存（返回值类型的）列表 */
                        this.listResCache = res.data.content;
                        /* 组装（列表类型的）列表数据 */
                        this.listCache = this.dataToTableList(res.data.content);
                        /* 更新列表的信息（分页/排序） */
                        this.updatePageRes(res.data);
                        this.isSpinning = false;
                    }
                },
                err => {
                    this.listResCache = [];
                    this.listCache = [];
                    this.isSpinning = false;
                    console.error(`分页查询失败!!! message:${err.error.message}`);
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
    dataToTableList(data: CustomerRes[]): ListModel[] {
        if (!data.length) {
            return [];
        }
        return data.map((o: CustomerRes) => ModelConverter.customerResToListModel(o));
    }

    resetPageReq(): void {
        this.pageReq.page = 1;
        this.pageReq.size = this.pageRes.size;
        this.pageReq.sort = 'createdDate.desc';
    }

    updateParams() {
        const paramsTemp = {};
        for (const k in this.params) {
            if (!this.params[ k ]) {
                this.params[ k ] = null;
            } else {
                paramsTemp[ k ] = this.params[ k ];
            }
        }
        return paramsTemp;
    }

    /**
     * 目前只存储分页信息,不包括数据
     * @param data
     */
    updatePageRes(data: PageRes<CustomerRes[]>): void {
        this.pageRes = new PageRes(data.page, data.size, data.pages, data.total, data.last);
    }
}
