// @ts-nocheck
import SyncStorage from 'sync-storage';
import {RequiredStorageKeys} from "./RequiredStorageKeys";
import {DefaultStorage} from "./DefaultStorage";

export class MyDirectusStorage extends DefaultStorage/** extends Storage */{

    constructor() {
        super();
    }

    async init(){
        const data = await SyncStorage.init();
    }

    getStorageImplementation(){
        return SyncStorage;
    }

    get_cookie_config(){
        let sessionStorageConfig = null;
        let localStorageConfig = SyncStorage.get(RequiredStorageKeys.KEY_COOKIE_CONFIG);

        let usedCookieConfig = !!localStorageConfig ? localStorageConfig : sessionStorageConfig
        if(!!usedCookieConfig){
            try{
                return JSON.parse(usedCookieConfig);
            } catch (err){
                console.log(err);
            }
        }
        return null;
    }

    getAllKeys(){
        return SyncStorage.getAllKeys()
    }

    has_cookie_config(): boolean{
       return !!this.get_cookie_config();
    }

    set_cookie_config(config){
        SyncStorage.set(RequiredStorageKeys.KEY_COOKIE_CONFIG, JSON.stringify(config));
    }
}
