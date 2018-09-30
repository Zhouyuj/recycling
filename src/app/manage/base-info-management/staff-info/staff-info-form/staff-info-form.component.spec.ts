import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffInfoFormComponent } from './staff-info-form.component';

describe('StaffInfoFormComponent', () => {
    let component: StaffInfoFormComponent;
    let fixture: ComponentFixture<StaffInfoFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [ StaffInfoFormComponent ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StaffInfoFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
