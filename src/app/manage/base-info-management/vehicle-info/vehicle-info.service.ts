import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class VehicleInfoService {

    constructor() {
    }

    mockListData(): Observable<[object]> {
        return null;
    }

}
