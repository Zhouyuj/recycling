import { Component, OnInit } from '@angular/core';

import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
    selector   : 'app-customers-info-form',
    templateUrl: './customers-info-form.component.html',
    styleUrls  : [ './customers-info-form.component.scss' ]
})
export class CustomersInfoFormComponent implements OnInit {

    public formData: any = {
        collectionName   : null,
        isPlaza          : null,
        address          : null,
        detailAddress    : null,
        contactPersonName: null,
        mobile           : null,
        dustbinCounts    : null,
        collectionType   : null,
        tel              : null,
        hasKey           : null,
    };

    public duration = [];

    constructor(private drawerRef: NzDrawerRef<any>) {
    }

    ngOnInit(): void {
    }

    onClose(): void {
        this.drawerRef.close();
    }

    onSubmitForm(): void {
        console.log('submit');
        console.log(this.formData);
    }

    onAddressChange($e): void {
        this.formData.address = $e;
    }

    onShowMap() {
        console.log('onShowMap');
    }

    onAddDuration(type: string): void {
        console.log(type);
        this.duration.push(1);
    }

    onRemoveDuration(id) {
        console.log(id);
    }

    onAddChildCollection(): void {
        console.log('onAddChildCollection');
    }

    onRemoveChildCollections(id) {
        console.log(id);
    }
}
