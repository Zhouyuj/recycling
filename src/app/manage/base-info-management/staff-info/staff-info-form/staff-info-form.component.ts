import { Component, EventEmitter, ComponentFactoryResolver, OnInit } from '@angular/core';

import { Modal, ModalService } from 'rebirth-ng';


@Component({
    selector: 'app-staff-info-form',
    templateUrl: './staff-info-form.component.html',
    styleUrls: [ './staff-info-form.component.scss' ]
})
export class StaffInfoFormComponent implements OnInit, Modal {

    context: { text: string };
    dismiss: EventEmitter<string>;

    constructor(private modalService: ModalService,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
    }

    show() {
        this.modalService.open<string>({
                component: StaffInfoFormComponent,
                componentFactoryResolver: this.componentFactoryResolver,
                resolve: {
                    text: 'inner modal'
                },
                size: 'sm'
            })
            .subscribe(data => {
                console.log('Rebirth Modal -> Get ok with result:', data);
            }, error => {
                console.error('Rebirth Modal -> Get cancel with result:', error);
            });
    }

    onSubmit() {
        this.dismiss.emit(this.context.text);
    }

    onCancel() {
        this.dismiss.error(this.context.text);
    }

}
