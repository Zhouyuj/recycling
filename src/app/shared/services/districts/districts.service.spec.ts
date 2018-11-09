import { TestBed, inject } from '@angular/core/testing';

import { DistrictsService } from './districts.service';

describe('DistrictsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistrictsService]
    });
  });

  it('should be created', inject([DistrictsService], (service: DistrictsService) => {
    expect(service).toBeTruthy();
  }));
});
