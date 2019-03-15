import { Injectable } from '@angular/core';
import { StorageType } from './storage-type.enum';
import { VerifyUtil } from '../../../shared/utils/verify-utils';
import { ObjectUtils } from '../../../shared/utils/object-utils';

/** 该文件提供 3 个操作存储服务: MemoryStorage, WebStorage, StorageService. **/

export const DEFAULT_STORAGE_POOL_KEY = 'fjzz-storage:default';

/**
 * 存储服务的抽象类
 */
interface IStorage {
  getAll(pool: string): any;
  get(options: { pool?: string; key: string }): Object;
  put(options: { pool?: string; key: string }, value: Object): any;
  remove(options: { pool?: string; key?: string });
  removeAll();
}

export class MemoryStorage implements IStorage {
  private storages: Map<string, Map<string, Object>>;

  constructor() {
    this.storages = new Map<string, Map<string, Object>>();
  }

  getAll(pool: string): any {
    return this.storages.has(pool)
      ? this.storages.get(pool)
      : new Map<string, Object>();
  }

  get({
    pool = DEFAULT_STORAGE_POOL_KEY,
    key
  }: {
    pool?: string;
    key: string;
  }): Object {
    const storage = this.getAll(pool);
    return storage.has(key) ? storage.get(key) : null;
  }

  put(
    { pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string; key: string },
    value: Object
  ): any {
    if (!this.storages.has(pool)) {
      this.storages.set(pool, new Map<string, Object>());
    }
    this.storages.get(pool).set(key, ObjectUtils.extend(value));
  }

  remove({
    pool = DEFAULT_STORAGE_POOL_KEY,
    key
  }: {
    pool?: string;
    key: string;
  }) {
    if (VerifyUtil.isEmpty(key)) {
      this.storages.delete(pool);
      return;
    }
    const storage = this.storages.get(pool);
    if (storage) {
      storage.delete(key);
    }
  }

  removeAll() {
    this.storages.clear();
  }
}

export class WebStorage implements IStorage {
  constructor(private webStorage: Storage) {}

  saveAll(pool: string, storage) {
    this.webStorage.setItem(pool, JSON.stringify(storage));
  }

  getAll(pool: string): any {
    const json = this.webStorage.getItem(pool);
    return json ? JSON.parse(json) : {};
  }

  get({
    pool = DEFAULT_STORAGE_POOL_KEY,
    key
  }: {
    pool?: string;
    key: string;
  }): Object {
    const storage = this.getAll(pool);
    return storage[key];
  }

  put(
    { pool = DEFAULT_STORAGE_POOL_KEY, key }: { pool?: string; key: string },
    value: Object
  ): any {
    const storage = this.getAll(pool);
    storage[key] = value;
    return this.saveAll(pool, storage);
  }

  remove({
    pool = DEFAULT_STORAGE_POOL_KEY,
    key
  }: {
    pool?: string;
    key: string;
  }) {
    if (VerifyUtil.isEmpty(key)) {
      this.webStorage.removeItem(pool);
      return;
    }
    this.put({ pool, key }, null);
  }

  removeAll() {
    this.webStorage.clear();
  }
}

@Injectable()
export class StorageService {
  sessionStorage: Storage;
  localStorage: Storage;
  memoryStorage: MemoryStorage;
  storages: Map<Object, IStorage>;

  private defaultStorageType: StorageType = StorageType.memory;

  constructor() {
    this.setupStorage();
  }

  setDefaultStorageType(type: StorageType): void {
    this.defaultStorageType = type;
  }

  getAll(pool: string, storageType?: StorageType): any {
    const storage: IStorage = <IStorage>(
      this.storages.get(storageType || this.defaultStorageType)
    );
    return storage.getAll(pool);
  }

  get({
    pool,
    key,
    storageType
  }: {
    pool: string;
    key: string;
    storageType?: StorageType;
  }): Object {
    const storage: IStorage = <IStorage>(
      this.storages.get(storageType || this.defaultStorageType)
    );
    return storage.get({ pool, key });
  }

  put(
    {
      pool,
      key,
      storageType
    }: { pool?: string; key: string; storageType?: StorageType },
    value: Object
  ): void {
    const storage: IStorage = <IStorage>(
      this.storages.get(storageType || this.defaultStorageType)
    );
    storage.put({ pool, key }, value);
  }

  remove({
    pool,
    key,
    storageType
  }: {
    pool?: string;
    key: string;
    storageType?: StorageType;
  }) {
    return this.storages
      .get(storageType || this.defaultStorageType)
      .remove({ pool, key });
  }

  removeAll({ storageType }: { storageType?: StorageType }) {
    return this.storages
      .get(storageType || this.defaultStorageType)
      .removeAll();
  }

  private setupStorage() {
    this.storages = new Map<string, IStorage>();
    this.memoryStorage = new MemoryStorage();
    if (window) {
      console.log('window:', window);
      this.localStorage = window.localStorage;
      this.sessionStorage = window.sessionStorage;
      this.storages
        .set(StorageType.memory, this.memoryStorage)
        .set(StorageType.localStorage, new WebStorage(this.localStorage))
        .set(StorageType.sessionStorage, new WebStorage(this.sessionStorage));
      return;
    }
    this.storages
      .set(StorageType.memory, this.memoryStorage)
      .set(StorageType.localStorage, this.memoryStorage)
      .set(StorageType.sessionStorage, this.memoryStorage);
  }
}
