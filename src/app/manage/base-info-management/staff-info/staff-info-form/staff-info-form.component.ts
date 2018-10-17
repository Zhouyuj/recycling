import { Component, EventEmitter, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import { NzDrawerRef } from 'ng-zorro-antd';


@Component({
    selector   : 'app-staff-info-form',
    templateUrl: './staff-info-form.component.html',
    styleUrls  : [ './staff-info-form.component.scss' ]
})
export class StaffInfoFormComponent implements OnInit {

    validateForm: FormGroup;

    constructor(private fb: FormBuilder,
                private drawerRef: NzDrawerRef<string>) {
    }

    ngOnInit(): void {
        /** form config **/
        this.validateForm = this.fb.group({
            username        : [ null, [ Validators.required ] ],
            gender          : [ null, [ Validators.required ] ],
            statusId        : [ null, [ Validators.required ] ],
            password        : [ null, [ Validators.required ] ],
            position        : [ null, [ Validators.required ] ],
            hireDate        : [ null, [ Validators.required ] ],
            systemRole      : [ null, [ Validators.required ] ],
            personalId      : [ null, [ Validators.required ] ],
            mobile          : [ null, [ Validators.required ] ],
            phoneNumber     : [ null ],
            address         : this.fb.group({
                province: [ null ],
                city    : [ null ],
                region  : [ null ],
            }),
            homeAddress     : [ null ],
            emergencyPerson : [ null ],
            emergencyContact: [ null ],
            email           : [ null, [ Validators.email ] ],
            remark          : [ null ],
        });
    }

    onSubmitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[ i ].markAsDirty();
            this.validateForm.controls[ i ].updateValueAndValidity();
        }
        console.log(this.validateForm.value);
    }

    updateConfirmValidator(): void {
        /** wait for refresh value */
        //Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
    }

    /**
     * 日期选择器 change 事件
     * @param result
     */
    onHireDateChange(result: Date): void {
        console.log(result);
    }

    /**
     * 级联组件
     * @param $e
     */
    onAddressChange($e: any): void {
        console.log($e);
        this.validateForm.patchValue({
            address: {
                province: $e[ 0 ] || '',    // 省
                city    : $e[ 1 ] || '',    // 市
                region  : $e[ 2 ] || '',    // 区
            }
        });
    }
}
