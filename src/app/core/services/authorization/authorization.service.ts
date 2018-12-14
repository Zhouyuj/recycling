import { Injectable } from '@angular/core';
import { StorageType } from '../storage/storage-type.enum';
import { StorageService } from '../storage/storage.service';
import { VerifyUtil } from '../../../shared/utils/verify-utils';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    private static STORAGE_POOL_KEY = 'fjzz-authorization';
    private static STORAGE_KEY = 'current-user';
    private storageType: StorageType;
    private currentUser: any;   // TODO

    constructor(private storageService: StorageService) {
        this.storageType = VerifyUtil.isEmpty(this.storageType) ? StorageType.localStorage : this.storageType;
    }

    setCurrentUser(currentUser: any): void {
        this.storageService.put({
            pool       : AuthorizationService.STORAGE_POOL_KEY,
            key        : AuthorizationService.STORAGE_KEY,
            storageType: this.storageType
        }, currentUser);
        this.currentUser = currentUser;
    }

    getCurrentUser(): any {
        if (this.currentUser) {
            return this.currentUser;
        }
        this.currentUser = this.storageService.get({
            pool: AuthorizationService.STORAGE_POOL_KEY,
            key: AuthorizationService.STORAGE_KEY,
            storageType: this.storageType
        });
        return this.currentUser;
    }

    logout() {
        this.currentUser = null;
        this.storageService.remove({
            pool: AuthorizationService.STORAGE_POOL_KEY,
            key: AuthorizationService.STORAGE_KEY,
            storageType: this.storageType
        });
    }

    isLogin() {
        return !!this.getCurrentUser();
    }
}
