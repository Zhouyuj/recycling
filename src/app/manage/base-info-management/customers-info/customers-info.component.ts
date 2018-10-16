import { Component, OnInit, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { Modal, ModalService } from 'rebirth-ng';

import { CustomersInfoService } from './customers-info.service';
import { CustomersInfoFormComponent } from './customers-info-form/customers-info-form.component';

@Component({
    selector   : 'app-customers-info',
    templateUrl: './customers-info.component.html',
    styleUrls  : [ './customers-info.component.scss' ]
})
export class CustomersInfoComponent implements OnInit {

    public list_options = {
        rows               : [],
        selectedRows       : [],
        localizationMessage: {
            emptyMessage   : '未找到任何数据！',
            totalMessage   : '条记录  可配合使用CTRL与SHIFT进行多选',
            selectedMessage: '已选中',
        },
    };

    public selected_system_role = null;
    public selected_system_roles_options = [
        {
            id  : 0,
            name: '全选',
        },
        {
            id  : 1,
            name: '系统管理员',
        },
        {
            id  : 2,
            name: '司机',
        },
        {
            id  : 3,
            name: '中控',
        },
    ];
    public selected_system_position = null;
    public selected_system_positions_options = [
        {
            id: 0,
            name: '全选',
        },
        {
            id: 1,
            name: '司机',
        },
        {
            id: 2,
            name: '辅助工',
        },
    ];

    constructor(private customersInfoService: CustomersInfoService,
                private modalService: ModalService,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.customersInfoService.mockListData().subscribe(res => {
            this.list_options.rows = res;
        });
    }

    onAdd() {
        console.log('add');
        this.openModal();
    }

    onEdit($e) {
        console.log('edit', this.list_options.selectedRows);
        this.openModal();
    }

    onDel($e) {
        console.log('del', this.list_options.selectedRows);
    }

    onExp() {
        console.log('exp');
    }

    onSelect($e) {
        console.log($e, this.list_options.selectedRows);
    }

    onSelectFilter($e) {
        console.log($e);
    }

    onSelectEmitter($e) {
        let requestParams = ''; // 拼接过滤的条件
        switch ($e.type) {
            case '岗位':
                console.log($e.type);
                console.log($e.id);
                break;
            case '系统角色':
                console.log($e.type);
                break;
            default:
                break;
        }
    }

    onUpdateFilter($e) {
        console.log($e);
    }

    onPage($e) {
        console.log($e);
    }

    asyncGetDataByPage() {
        // 分页接口
    }


    openModal() {
        this.modalService.open<string>({
                component               : CustomersInfoFormComponent,
                componentFactoryResolver: this.componentFactoryResolver,
                resolve                 : {
                    text: 'I am from resolve data!'
                }
            })
            .subscribe(data => {
                console.log('Rebirth Modal -> Get ok with result:', data);
            }, error => {
                console.error('Rebirth Modal -> Get cancel with result:', error);
            });
    }

}
