import { Component, EventEmitter, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-customers-info-form',
  templateUrl: './customers-info-form.component.html',
  styleUrls: ['./customers-info-form.component.scss']
})
export class CustomersInfoFormComponent implements OnInit {

    constructor(private fb: FormBuilder,
                private drawerRef: NzDrawerRef<string>) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            email            : [ null, [ Validators.email ] ],
            password         : [ null, [ Validators.required ] ],
            checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
            nickname         : [ null, [ Validators.required ] ],
            phoneNumberPrefix: [ '+86' ],
            phoneNumber      : [ null, [ Validators.required ] ],
            website          : [ null, [ Validators.required ] ],
            captcha          : [ null, [ Validators.required ] ],
            agree            : [ false ]
        });
    }

    close(): void {
        this.drawerRef.close(this.value);
    }

    validateForm: FormGroup;

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

    getCaptcha(e: MouseEvent): void {
        e.preventDefault();
    }
}
