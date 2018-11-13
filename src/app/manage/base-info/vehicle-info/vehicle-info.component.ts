import { Component, OnInit, EventEmitter } from '@angular/core';

import { VehicleInfoFormComponent } from './vehicle-info-form/vehicle-info-form.component';
import { VehicleInfoService } from './vehicle-info.service';

import { DistrictsService } from '../../../shared/services/districts/districts.service';
import { MessageService } from '../../../shared/services/message/message.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { NzDrawerService } from 'ng-zorro-antd';

import { ModelConverter } from './model-converter';
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

    public pageReq = new PageReq();
    public params: any = {};// 分页查询参数
    public keywordType = 'plateNumber';
    public keyword: string;

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
        this.getListByPage(this.pageReq, this.params);
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
        });
    }

    onExp() {
    }

    onSelect(e: VehicleListModel) {
        this.itemCache = this.listCache.filter(item => item.id == this.list_options.selectedRows[ 0 ].id)[ 0 ];
        this.formCache = ModelConverter.vehicleResToFormModel(this.itemCache);
        console.log('选中的res-model', this.itemCache);
        console.log('转化的form-model', this.formCache);
    }

    onSelectFilter($e) {
        console.log($e);
    }

    onSelectEmitter($e) {
        let requestParams = ''; // 拼接过滤的条件
        switch ($e.type) {
            case '岗位':
                console.log($e.id);
                break;
            case '系统角色':
                break;
            default:
                break;
        }
    }

    onKeywordSearch($e, type?: string) {
        let key = this.keywordType;
        if (key && type.trim() && this.keyword) {
            this.params[ key ] = this.keyword.replace(/\s/g, '');
            this.getListByPage(this.pageReq, this.params);
        } else if (!key || !this.keyword) {
            this.messageService.create({
                type   : 'warning',
                content: '请先选择搜索类别,或关键字不能为空',
            });
        }
    }

    onPage(e) {
        this.updatePage(e);
        //this.getListByPage(this.pageReq, this.params);
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
        //this.getListByPage(this.pageReq);
        console.log(this.pageReq);
    }

    checkColumn(c) {
        console.log(c);
    }

    updatePage(pageInfo: { count: number, pageSize: number, limit: number, offset: number }): void {
        this.pageReq.page = pageInfo.offset + 1;
        this.pageReq.size = pageInfo.pageSize;
    }

    getListByPage(page, params?) {
        // 分页接口
        this.vehicleInfoService.getVehicleList(this.pageReq, this.params).subscribe((res: Result<PageRes<VehicleRes[]>>) => {
            if (res.data.content.length > 0) {
                this.listCache = res.data.content;
                let list = this.dataToTableRows(res.data.content);
                this.list_options.rows = list;
            }
        }, err => console.log(`分页查询失败!!!${err}`));
    }

    dataToTableRows(data: VehicleRes[]): VehicleListModel[] {
        return data.map((o: VehicleRes) => ModelConverter.vehicleResToListModel(o));
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
                this.getListByPage(this.pageReq, this.params);
            }
        });
    }
}
