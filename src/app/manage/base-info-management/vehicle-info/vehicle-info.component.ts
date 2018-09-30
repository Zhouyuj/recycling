import { Component, OnInit, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { Modal, ModalService } from 'rebirth-ng';

import { VehicleInfoFormComponent } from './vehicle-info-form/vehicle-info-form.component';
import { VehicleInfoService } from './vehicle-info.service';

@Component({
    selector: 'app-vehicle-info',
    templateUrl: './vehicle-info.component.html',
    styleUrls: [ './vehicle-info.component.scss' ]
})
export class VehicleInfoComponent implements OnInit {

    public list_options = {
        rows: [],
        selectedRows: [],
        localizationMessage: {
            emptyMessage: '未找到任何数据！',
            totalMessage: '条记录',
            selectedMessage: '已选中',
        },
    };

    constructor(private vehicleInfoService: VehicleInfoService,
                private modalService: ModalService,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.vehicleInfoService.mockListData().subscribe(res => {
            this.list_options.rows = res;
        });
    }

    onAdd() {
        console.log('add');
        this.openModal();
    }

    onEdit() {
        console.log('edit');
        this.openModal();
    }

    onDel() {
        console.log('del');
    }

    onExp() {
        console.log('exp');
    }

    openModal() {
        this.modalService.open<string>({
                component: VehicleInfoFormComponent,
                componentFactoryResolver: this.componentFactoryResolver,
                resolve: {
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
