import { TestBed, inject } from '@angular/core/testing';

import { EditPlanService } from './edit-plan.service';

describe('EditPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditPlanService]
    });
  });

  it('should be created', inject([EditPlanService], (service: EditPlanService) => {
    expect(service).toBeTruthy();
  }));
});
