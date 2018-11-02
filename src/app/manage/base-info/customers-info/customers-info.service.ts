import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class CustomersInfoService {

    constructor() {
    }

    mockListData(): Observable<[object]> {
        return null;
    }
}
