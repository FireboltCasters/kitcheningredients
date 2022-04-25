export class KeyExtractorHelper{

    static getListOfStaticKeyValues(Class): string[]{
        let synchedKeys = [];

        if(!!Class){
          let classKeys = Object.keys(Class);
          for(let classKey of classKeys){
            let synchedKey = Class[classKey];
            synchedKeys.push(synchedKey)
          }
        }
        return synchedKeys;
    }
}
