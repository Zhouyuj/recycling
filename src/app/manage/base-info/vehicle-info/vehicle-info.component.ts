import { Component, OnInit, EventEmitter } from '@angular/core';

import { VehicleInfoFormComponent } from './vehicle-info-form/vehicle-info-form.component';
import { VehicleInfoService } from './vehicle-info.service';

import { DistrictsService } from '../../../shared/services/districts/districts.service';
import { MessageService } from '../../../shared/services/message/message.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { NzDrawerService } from 'ng-zorro-antd';

import { ModelConverter } from './model-converter';
import { ObjectUtils } from '../../../shared/utils/object-utils';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { VehicleFormModel } from './vehicle-form.model';
import { VehicleRes } from './vehicle-res.model';
import { VehicleListModel } from './vehicle-list.model';

@Component({
    selector   : 'app-vehicle-info',
    templateUrl: './vehicle-info.component.html',
    styleUrls  : [ './vehicle-info.component.scss' ]
})
export class VehicleInfoComponent implements OnInit {
    /* 面包屑导航 */
    breadcrumbs = [
        {
            link : '/',
            title: '首页',
        },
        {
            link : '',
            title: '基础信息',
        },
        {
            link : '/manage/baseInfo/vehicles',
            title: '车辆信息',
        }
    ];

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

    public pageReq = new PageReq();
    public pageRes = new PageRes();
    public params: any = {};// 分页查询参数
    public keywordType: string;
    public keyword = '';

    public listCache: VehicleRes[];
    public itemCache: VehicleRes;
    public formCache: VehicleFormModel;

    constructor(private vehicleInfoService: VehicleInfoService,
                private districtsService: DistrictsService,
                private messageService: MessageService,
                private notificationService: NotificationService,
                private drawerService: NzDrawerService) {
    }

    ngOnInit() {
        this.getListByPage();
    }

    onAdd() {
        this.onOpenForm('add');
    }

    onEdit($e) {
        this.onOpenForm('edit');
    }

    onDel($e) {
        this.vehicleInfoService.delCustomer(this.itemCache.id).subscribe(res => {
            this.notificationService.create({
                type   : 'success',
                title  : '恭喜,删除成功',
                content: '该提醒将自动消失',
            });
            this.getListByPage();
        });
    }

    onExp() {
    }

    onSelect(e: VehicleListModel) {
        this.itemCache = this.listCache.filter(item => item.id == this.list_options.selectedRows[ 0 ].id)[ 0 ];
        this.formCache = ModelConverter.vehicleResToFormModel(this.itemCache);
    }

    onKeywordSearch($e, type?: string) {
        let key = this.keywordType;
        if (key) {
            let o = {};
            o[ key ] = this.keyword.replace(/\s/g, '');
            this.params = ObjectUtils.extend(o);
            this.getListByPage();
        } else if (!key) {
            this.messageService.create({
                type   : 'warning',
                content: '请先选择搜索类别',
            });
        }
    }

    onPage(e) {
        this.updatePage(e);
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
        const drawerRef = this.drawerService
            .create<VehicleInfoFormComponent, { type: string, success: boolean, cache: VehicleFormModel }, boolean>({
                nzTitle        : { add: '添加', edit: '编辑' }[ type ] || '请编辑表单',
                nzContent      : VehicleInfoFormComponent,
                nzWidth        : '55%',
                nzContentParams: {
                    type   : type,
                    success: false,
                    cache  : type === 'edit' ? this.formCache : null,
                }
            });

        drawerRef.afterOpen.subscribe(() => {
        });

        drawerRef.afterClose.subscribe(res => {
            console.log('Drawer(Component) close');
            if (res) {
                // 重新调分页接口
                this.getListByPage();
            }
        });
    }

    getListByPage() {
        this.isSpinning = true;
        // 分页接口
        this.vehicleInfoService
            .getVehicleList(this.pageReq, this.params)
            .subscribe(
                (res: Result<PageRes<VehicleRes[]>>) => {
                    if (res.data.content.length > 0) {
                        /* 缓存（返回值类型的）列表 */
                        this.listCache = res.data.content;
                        /* 组装（列表类型的）列表数据 */
                        this.list_options.rows = this.dataToTableRows(res.data.content);
                        /* 更新列表的信息（分页/排序） */
                        this.updatePageRes(res.data);
                    }
                    this.isSpinning = false;
                },
                err => console.warn(`分页查询失败!!!${err}`),
                () => this.isSpinning = false
            );
    }

    dataToTableRows(data: VehicleRes[]): VehicleListModel[] {
        return data.map((o: VehicleRes) => ModelConverter.vehicleResToListModel(o));
    }

    updatePage(pageInfo: { count: number, pageSize: number, limit: number, offset: number }): void {
        this.pageReq.page = pageInfo.offset + 1;
        this.pageReq.size = pageInfo.pageSize;
    }

    // 只存储分页信息,不包括数据
    updatePageRes(data: PageRes<VehicleRes[]>): void {
        this.pageRes = new PageRes(data.page - 1, data.size, data.pages, data.total, data.last);
    }

}
