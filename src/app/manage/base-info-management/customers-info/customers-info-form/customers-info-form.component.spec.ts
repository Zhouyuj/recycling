import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersInfoFormComponent } from './customers-info-form.component';

describe('CustomersInfoFormComponent', () => {
  let component: CustomersInfoFormComponent;
  let fixture: ComponentFixture<CustomersInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
