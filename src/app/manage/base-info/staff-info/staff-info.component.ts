import { Component, OnInit, EventEmitter } from '@angular/core';

import { StaffInfoService } from './staff-info.service';
import { StaffInfoFormComponent } from './staff-info-form/staff-info-form.component';

import { NzDrawerService } from 'ng-zorro-antd';

import { DistrictsService } from '../../../shared/services/districts/districts.service';
import { MessageService } from '../../../shared/services/message/message.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { StaffRes } from './staff-res.model';
import { StaffFormModel } from './staff-form.model';
import { StaffListModel } from './staff-list.model';
import { ModelConverter } from '../staff-info/model-converter';
import {ObjectUtils} from '../../../shared/utils/object-utils';

@Component({
    selector   : 'app-staff-info',
    templateUrl: './staff-info.component.html',
    styleUrls  : [ './staff-info.component.scss' ]
})
export class StaffInfoComponent implements OnInit {
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
            link : '/manage/baseInfo/staffs',
            title: '人员信息',
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

    public staffResCache: StaffRes[];   // 分页接口获取的表格数据
    public itemCache: StaffRes;
    public formCache: StaffFormModel;

    constructor(private staffInfoService: StaffInfoService,
                private districtsService: DistrictsService,
                private messageService: MessageService,
                private notificationService: NotificationService,
                private drawerService: NzDrawerService) {
    }

    ngOnInit() {
        this.districtsService.getDistricts('350600', 1).subscribe(res => {
            this.getListByPage();
        });
    }

    onAdd() {
        console.log('add');
        this.onOpenForm('add');
    }

    onEdit() {
        this.onOpenForm('edit');
    }

    onDel() {
        this.staffInfoService.delStaff(this.itemCache.id).subscribe(
            res => {
                this.notificationService.create({
                    type   : 'success',
                    title  : '恭喜,删除成功',
                    content: '该提醒将自动消失',
                });
                this.getListByPage();
            }, err => {
                this.notificationService.create({
                    type   : 'error',
                    title  : '抱歉,删除失败',
                    content: err ? err.message : '',
                });
                console.warn(err);
                this.getListByPage();
            });
    }

    // TODO
    onExp() {
        console.log('exp');
    }

    onSelect(e: StaffListModel) {
        this.itemCache = this.staffResCache.filter(item => item.id == this.list_options.selectedRows[ 0 ].id)[ 0 ];
        this.formCache = ModelConverter.staffResToFormModel(this.itemCache);
    }

    onKeywordSearch($e, type?: string) {
        let key = this.keywordType;
        if (key) {
            let o = {};
            o[ key ] = this.keyword.replace(/\s/g, '');
            this.params = o;
            this.getListByPage();
        } else if (!key) {
            this.messageService.create({
                type   : 'warning',
                content: '请先选择搜索类别',
            });
        }
    }

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
    onOpenForm(type: string): void {
        const drawerRef = this.drawerService
            .create<StaffInfoFormComponent, { type: string, success: boolean, cache: StaffFormModel }, boolean>({
                nzTitle        : { add: '添加', edit: '编辑' }[ type ] || '请编辑表单',
                nzContent      : StaffInfoFormComponent,
                nzWidth        : '65%',
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
        this.staffInfoService
            .getStaffList(this.pageReq, this.params)
            .subscribe(
                (res: Result<PageRes<StaffRes[]>>) => {
                    if (res.data.content.length > 0) {
                        /* 缓存（返回值类型的）列表 */
                        this.staffResCache = res.data.content;
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
                () => {
                    console.log('complete');
                    this.isSpinning = false;
                }
            );
    }

    // 只存储分页信息,不包括数据
    updatePageRes(data: PageRes<StaffRes[]>): void {
        this.pageRes = new PageRes(data.page - 1, data.size, data.pages, data.total, data.last);
    }

    updatePageReq(pageInfo: { count: number, pageSize: number, limit: number, offset: number }): void {
        this.pageReq.page = pageInfo.offset + 1;
    }

    dataToTableRows(data: StaffRes[]): StaffListModel[] {
        return data.map((o: StaffRes) => ModelConverter.staffResToListModel(o));
    }
}
