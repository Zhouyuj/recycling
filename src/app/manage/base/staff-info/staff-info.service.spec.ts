import { TestBed, inject } from '@angular/core/testing';

import { StaffInfoService } from './staff-info.service';

describe('StaffInfoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ StaffInfoService ]
        });
    });

    it('should be created', inject([ StaffInfoService ], (service: StaffInfoService) => {
        expect(service).toBeTruthy();
    }));
});
