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
        this.validateForm = this.fb.group({
            username         : [ null, [ Validators.required ] ],
            gender           : [ null, [ Validators.required ] ],
            statusId         : [ null, [ Validators.required ] ],
            password         : [ null, [ Validators.required ] ],
            position         : [ null, [ Validators.required ] ],
            hireDate         : [ null, [ Validators.required ] ],
            systemRole       : [ null, [ Validators.required ] ],
            personalId       : [ null, [ Validators.required ] ],
            phoneNumberPrefix: [ '+86' ],
            phoneNumber      : [ null, [ Validators.required ] ],
            mobile           : [ null, [ Validators.required ] ],
            email            : [ null, [ Validators.email ] ],
            checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
            nickname         : [ null, [ Validators.required ] ],
        });
    }

    submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[ i ].markAsDirty();
            this.validateForm.controls[ i ].updateValueAndValidity();
        }
    }

    updateConfirmValidator(): void {
        /** wait for refresh value */
        Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
            return { confirm: true, error: true };
        }
    }

    /**
     * 日期选择器 change 事件
     * @param result
     */
    onHireDateChange(result: Date): void {
        console.log(result);
    }
}
