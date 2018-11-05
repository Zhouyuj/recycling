import { Injectable } from '@angular/core';

/** 该文件提供 3 个操作存储服务: MemoryStorage, WebStorage, StorageService. **/

/**
 * 存储服务的抽象类
 */
interface IStorage {
    /*getAll(pool: string): any;
    get(options: { pool?: string, key: string }): Object;
    put(options: { pool?: string, key: string }, value: Object): any;
    remove(options: { pool?: string, key?: string });
    removeAll();*/
}


@Injectable({
    providedIn: 'root'
})
export class MemoryStorage implements IStorage {

    constructor() { }
}

@Injectable({
    providedIn: 'root'
})
export class WebStorage implements IStorage {

    constructor() { }
}

@Injectable({
  providedIn: 'root'
})
export class StorageService implements IStorage {

  constructor() { }
}
