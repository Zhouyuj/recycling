import { TestBed, inject } from '@angular/core/testing';

import { AuthRoutingGuardService } from './auth-routing-guard.service';

describe('AuthRoutingGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRoutingGuardService]
    });
  });

  it('should be created', inject([AuthRoutingGuardService], (service: AuthRoutingGuardService) => {
    expect(service).toBeTruthy();
  }));
});
