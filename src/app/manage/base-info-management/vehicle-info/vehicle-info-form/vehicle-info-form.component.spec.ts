import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInfoFormComponent } from './vehicle-info-form.component.ts';

describe('VehicleInfoFormComponent', () => {
  let component: VehicleInfoFormComponent;
  let fixture: ComponentFixture<VehicleInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
