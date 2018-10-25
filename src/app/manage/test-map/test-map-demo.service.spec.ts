import { TestBed, inject } from '@angular/core/testing';

import { TestMapDemoService } from './test-map-demo.service';

describe('TestMapDemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestMapDemoService]
    });
  });

  it('should be created', inject([TestMapDemoService], (service: TestMapDemoService) => {
    expect(service).toBeTruthy();
  }));
});
