import {UserItem} from "@directus/sdk";
import {ColorMode} from 'native-base';
import {DefaultTranslator} from "./translations/DefaultTranslator";
import {CookieDefaultComponents} from "./screens/legalRequirements/CookieDefaultComponents";
import {CookieDetails, CookieGroupEnum, CookieStorageTypeEnum} from "./screens/legalRequirements/CookieHelper";
import {TranslationKeys} from "./translations/TranslationKeys";
import {SynchedState} from "./synchedstate/SynchedState";
import {RequiredStorageKeys} from "./storage/RequiredStorageKeys";

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

    getCookieDetails(cookieName: string): CookieDetails{
      let translationWe = DefaultTranslator.useTranslation(TranslationKeys.cookie_policy_provider_we);

      let requiredCookiesNames = SynchedState.getRequiredStorageKeys();
      let defaultDetails = {
        name: cookieName,
        provider: translationWe,
        provider_url: undefined,
        purpose: DefaultTranslator.useRequiredStorageKeysPurpose(undefined),
        expiry: DefaultTranslator.useTranslation(TranslationKeys.cookie_policy_details_expiry_persistent),
        type: CookieGroupEnum.Necessary,
        storageType: CookieStorageTypeEnum.LocalStorage,
      }

      for(let requiredCookieName of requiredCookiesNames){
        if(requiredCookieName === cookieName){
          defaultDetails.purpose = DefaultTranslator.useRequiredStorageKeysPurpose(requiredCookieName as RequiredStorageKeys);
          break;
        }
      }
      // Default case
      return defaultDetails;
    }

    getCookieGroupName(cookieGroup: string): string{
      if(cookieGroup === CookieGroupEnum.Necessary){
        return DefaultTranslator.useTranslation(TranslationKeys.cookie_policy_group_necessary);
      }
      return cookieGroup+" (Missing description)";
    }

    getCookieAdditionalGroups(){
      return [];
    }

    getCookieComponentConsent(){
      return CookieDefaultComponents.getCookieComponentConsent()
    }

    getCookieComponentAbout(){
      return CookieDefaultComponents.getCookieComponentAbout()
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
