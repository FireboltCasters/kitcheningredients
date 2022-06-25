import {UserItem} from "@directus/sdk";
import { ColorMode } from 'native-base';

export abstract class PluginInterface{
    initApp(){

    }
    registerRoutes(){

    }
    onLogout(error){

    }
    onLogin(user, role, permissions){

    }
    getSynchedStateKeysClass(){
      return null;
    }
    getStorageKeysClass(){
      return null;
    }
    getAboutUsComponent(){
      return null;
    }
    getPrivacyPolicyComponent(){
      return null;
    }
    getTermsAndConditionsComponent(){
      return null;
    }
    getHomeComponent(){
      return null;
    }

    getSettingsComponent(){
      return null;
    }

    getRootComponent(){
      return null;
    }

    renderCustomAuthProviders(serverInfo): []{
      return null;
    }

    renderCustomUserAvatar(user: UserItem): JSX.Element{
      return null;
    }

    getOverwriteTheme(): ColorMode {
      return null;
    }
}
