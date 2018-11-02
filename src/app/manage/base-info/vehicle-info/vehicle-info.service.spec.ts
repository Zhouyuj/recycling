import { TestBed, inject } from '@angular/core/testing';

import { VehicleInfoService } from './vehicle-info.service';

describe('VehicleInfoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ VehicleInfoService ]
        });
    });

    it('should be created', inject([ VehicleInfoService ], (service: VehicleInfoService) => {
        expect(service).toBeTruthy();
    }));
});
