import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSelectionComponent } from './vehicle-selection.component';

describe('VehicleSelectionComponent', () => {
  let component: VehicleSelectionComponent;
  let fixture: ComponentFixture<VehicleSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
