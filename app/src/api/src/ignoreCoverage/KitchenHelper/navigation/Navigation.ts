import {RequiredSynchedStates} from "../synchedstate/RequiredSynchedStates";
import {useSynchedJSONState} from "../synchedstate/SynchedState";
import {NavigatorHelper} from "./NavigatorHelper";
import {FunctionComponent} from "react";
import {PlatformHelper} from "../helper/PlatformHelper";

// todo Update to newest ReactNavigation
// https://reactnavigation.org/docs/navigating-without-navigation-prop/

export interface Route {
  path?: string;
  name?: string;
  // params are a dictionary of key: string /value: any pairs that will be sent to the screen
  params?: {[key: string]: any};
  component: FunctionComponent;
  template?: FunctionComponent;
}

function getNameOfComponent(component: FunctionComponent): string{
  let bestName = component.displayName || component.name;
  return bestName+"";
}

export class Navigation {

    static ROUTE_PATH_PREFIX = "/";

    // a dict with string to Route
    private static registeredComponents : {[key: string]: Route} = {};

    static useNavigationHistory(){
      return useSynchedJSONState(RequiredSynchedStates.navigationHistory)
    }

    static drawerToggle(){}
    static drawerOpen(){}
    static drawerClose(){}

    static routeGetRegistered(){
      return Navigation.registeredComponents;
    }

    static routeRegister(route: Route){
      console.log("Navigation.routeRegister: ");
      console.log(route);
      let path = route.path;
      if(!path){
        path = getNameOfComponent(route.component);
      }
      let componentName = getNameOfComponent(route.component);
      Navigation.registeredComponents[componentName] = {
        path: path,
        name: componentName,
        component: route?.component,
        template: route?.template
      };

    }

//    static routeUnregister(){} // also unregisteres menu?

    static registerMenu(){}

    static navigateBack(){}

    static navigateHome(){}

    static navigateTo(routeNameOrComponent, params?, hashChanged?){
      let routeName = "Home";
      if(typeof routeNameOrComponent === "string"){
        routeName = routeNameOrComponent;
      } else if(typeof routeNameOrComponent === "function"){
        routeName = getNameOfComponent(routeNameOrComponent);
      }

      console.log("navigateAndSetHash: "+routeName);
      if(PlatformHelper.isWeb() && !hashChanged){
          console.log("-- isWeb but the hash is not changed, so we do it now");
          let navigateSearch = "";
          if(params){
            navigateSearch = "?";
            let keys = Object.keys(params);
            for(let i=0; i<keys.length; i++){
              let key = keys[i];
              let value = params[key];
              if(i>0){
                navigateSearch += "&";
              }
              navigateSearch += key+"="+value;
            }
          }
          console.log("After changing the hash, the hook will be called again, so we do not need to call navigateTo again");
          window.location.hash = Navigation.ROUTE_PATH_PREFIX+routeName+navigateSearch;
          return; // we do not need to call navigateTo again, because the hash change will trigger the hook
      } else {
        NavigatorHelper.navigateToRouteName(routeName, params)
      }
    }

}
