import { TestBed, inject } from '@angular/core/testing';

import { CustomersInfoService } from './customers-info.service';

describe('CustomersInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomersInfoService]
    });
  });

  it('should be created', inject([CustomersInfoService], (service: CustomersInfoService) => {
    expect(service).toBeTruthy();
  }));
});
