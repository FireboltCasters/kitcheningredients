import {Cookie} from "../screens/legalRequirements/CookieHelper";

export interface MyDirectusStorageInterface{
    get(key: string);
    set(key: string, value: string);
    getAllKeys(): string[];
    delete(key: string);
    init();
    initContextStores(SynchedState: any);
    has_credentials_saved(): boolean;
    getCookieFromStorageString(storageString: string): Cookie;
    getNewCookieFromKeyValue(key: string, value: string): Cookie
    getStorageStringFromCookie(cookie: Cookie): string
}
