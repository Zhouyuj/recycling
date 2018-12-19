import { Component, OnInit, EventEmitter } from '@angular/core';

import { StaffInfoService } from './staff-info.service';
import { StaffInfoFormComponent } from './staff-info-form/staff-info-form.component';

import { NzDrawerService } from 'ng-zorro-antd';

import { NotificationService } from '../../../shared/services/notification/notification.service';
import { PageReq } from '../../../shared/models/page/page-req.model';
import { PageRes } from '../../../shared/models/page/page-res.model';
import { Result } from '../../../shared/models/response/result.model';
import { StaffRes } from './staff-res.model';
import { StaffFormModel } from './staff-form.model';
import { StaffListModel } from './staff-list.model';
import { ModelConverter } from '../staff-info/model-converter';
import { ObjectUtils } from '../../../shared/utils/object-utils';
import { RoleEnum } from './models/role.enum';
import { PostEnum } from './models/post.enum';

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

    public isSpinning = false;

    public resCache: StaffRes[];   // 分页接口获取的表格数据
    public selectedItemCache: StaffRes;
    public listCache: StaffListModel[];
    public formCache: StaffFormModel;

    public params = {
        username             : '',
        name                 : '',
        sex                  : '',
        roleId               : '',
        postId               : '',
        mobilePhone          : '',
        emergencyContactPhone: '',
        emergencyContact     : '',
        email                : '',
        detailedAddress      : '',
        homeAddress          : '',
        identity             : '',
    };// 分页查询参数
    public roleList = [
        { text: RoleEnum.aministrator, value: 1 },
        { text: RoleEnum.surviellant, value: 2 },
        { text: RoleEnum.driver, value: 3 },
        { text: RoleEnum.specialist, value: 4 },
        { text: RoleEnum.manager, value: 5 },
        { text: RoleEnum.attendant, value: 6 },
    ];
    public postList = [
        { text: PostEnum.driver, value: 1 },
        { text: PostEnum.specialist, value: 2 },
        { text: PostEnum.attendant, value: 3 },
        { text: PostEnum.captain, value: 4 },
        { text: PostEnum.supervisor, value: 5 },
        { text: PostEnum.generalManager, value: 6 },
        { text: PostEnum.surviellant, value: 7 },
    ];
    public sortMap = {
        entryTime: '',
    };   // 操作表格的排序参数
    public pageReq = new PageReq();
    public pageRes = new PageRes();

    constructor(private staffInfoService: StaffInfoService,
                private notificationService: NotificationService,
                private drawerService: NzDrawerService) {
    }

    ngOnInit() {
        this.getListByPage({ isResetReq: true });
    }

    onAdd() {
        this.onOpenForm('add');
    }

    onEdit() {
        this.onOpenForm('edit');
    }

    onDel() {
        this.staffInfoService.delStaff(this.selectedItemCache.id).subscribe(
            res => {
                this.notificationService.create({
                    type   : 'success',
                    title  : '恭喜,删除成功',
                    content: '该提醒将自动消失',
                });
                this.getListByPage({ isResetReq: true });
            }, err => {
                this.notificationService.create({
                    type   : 'error',
                    title  : '抱歉,删除失败',
                    content: err ? err.error.message : '',
                });
                this.getListByPage({ isResetReq: true });
            }
        );
    }

    // TODO
    onExp() {
        console.log('exp');
    }

    onSelect(e: boolean, item: StaffListModel) {
        if (!e) {
            this.selectedItemCache = null;
            return;
        }
        this.listCache.forEach((l: StaffListModel) => {
            if (l.id === item.id) {
                l.checked = true;
            } else {
                l.checked = false;
            }
        });
        this.selectedItemCache = this.resCache.filter((o: StaffRes) => o.id === item.id)[ 0 ];
        this.formCache = ModelConverter.staffResToFormModel(this.selectedItemCache);
    }

    onSelectTr(e, item: StaffListModel) {
        this.onSelect(true, item);
    }

    onPage(e) {
        //this.updatePageReq(e);
        this.pageReq.page = e;
        this.getListByPage();
    }

    /**
     * 排序
     * 双向绑定 sortMap
     * @param e
     * @param type
     */
    onSort(e, type: string) {
        if (!e) return;
        e = e.replace('end', '');
        this.pageReq.sort = `${type}.${e},`;
        this.pageReq.page = 1;
        this.getListByPage();
    }

    /**
     * @param e : string[] | string
     * @param type
     */
    onFilter(e, type: string) {
        switch (type) {
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
        this.getListByPage({ isResetReq: true });
    }

    /**
     * 关键字搜索
     * 双向绑定 params
     * @param type
     */
    onKeywordSearch() {
        this.getListByPage({ isResetReq: true });
    }

    /**
     * 点击 入职时间 的关键字筛选框,会触发组件的排序,需要添加该方法
     * @param e
     */
    onStopPropagation(e) {
        console.log(e);
        //e.stopPropagation();
        e.stopImmediatePropagation();
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
                if (type === 'add') {
                    this.getListByPage({ isResetReq: true });
                } else {
                    this.getListByPage();
                }
            }
        });
    }

    getListByPage(option?: { isResetReq: boolean }) {
        if (option && option.isResetReq) {
            this.resetPageReq();
        }
        this.isSpinning = true;
        // 分页接口
        let paramsTemp = this.updateParams();
        this.staffInfoService
            .getStaffList(this.pageReq, paramsTemp)
            .subscribe(
                (res: Result<PageRes<StaffRes[]>>) => {
                    if (res.data.content) {
                        /* 缓存（返回值类型的）列表 */
                        this.resCache = res.data.content;
                        /* 组装（列表类型的）列表数据 */
                        this.listCache = this.dataToTableRows(res.data.content);
                        /* 更新列表的信息（分页/排序） */
                        this.updatePageRes(res.data);
                    }
                },
                err => {
                    this.resCache = [];
                    this.resCache = [];
                    this.listCache = [];
                    this.isSpinning = false;
                    console.error(`分页查询失败!!! message:${err.error.message}`);
                    this.notificationService.create({
                        type   : 'error',
                        title  : '抱歉,数据查询(分页)失败',
                        content: err ? err.error.message : '',
                    });
                },
                () => this.isSpinning = false
            );
    }

    // 只存储分页信息,不包括数据
    updatePageRes(data: PageRes<StaffRes[]>): void {
        this.pageRes = new PageRes(data.page, data.size, data.pages, data.total, data.last);
    }

    resetPageReq(): void {
        this.pageReq.page = 1;
        this.pageReq.size = this.pageRes.size;
        this.pageReq.sort = 'entryTime.desc';
    }

    updateParams() {
        let paramsTemp = {};
        for (let k in this.params) {
            if (!this.params[ k ]) {
                this.params[ k ] = null;
            } else {
                paramsTemp[ k ] = this.params[ k ];
            }
        }
        return paramsTemp;
    }

    dataToTableRows(data: StaffRes[]): StaffListModel[] {
        if (!data.length) return [];
        return data.map((o: StaffRes) => ModelConverter.staffResToListModel(o));
    }

}
