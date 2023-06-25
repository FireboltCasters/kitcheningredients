import {UserItem} from "@directus/sdk";
import { ColorMode } from 'native-base';
import {DefaultTranslator} from "./translations/DefaultTranslator";

export abstract class PluginInterface{
    initApp(){

    }
    async registerRoutes(user: UserItem | null, role: any | undefined, permissions: any | undefined){
      return null;
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

    getLoadingComponent(){
      return null;
    }

    getSyncComponent(){
        return null;
    }

    getAboutUsComponent(){
      return null;
    }
    getPrivacyPolicyComponent(){
      return null;
    }

    getHomeComponent(){
      return null;
    }

    getSettingsComponent(){
      return null;
    }

    getRootComponent(props){
      return null;
    }

    getUseTranslationFunction(){
      return DefaultTranslator.useTranslation;
    }

    getBottomNavbarComponent(){
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

    renderCustomProjectLogo({
                              serverInfo,
                              height,
                              width,
                              backgroundColor,
                              borderRadius
                            }): JSX.Element{
      return null;
    }
}
