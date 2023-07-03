export interface MyDirectusStorageInterface{
    get(key: string);
    set(key: string, value: string);
    getAllKeys(): string[];
    delete(key: string);
    init();
    initContextStores(SynchedState: any);
    has_credentials_saved(): boolean;
}
