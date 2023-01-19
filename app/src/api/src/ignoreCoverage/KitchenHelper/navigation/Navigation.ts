import {RequiredSynchedStates} from "../synchedstate/RequiredSynchedStates";
import {useSynchedJSONState} from "../synchedstate/SynchedState";
import {MenuItem} from "kitcheningredients";
import {FunctionComponent} from "react";

// todo Update to newest ReactNavigation
// https://reactnavigation.org/docs/navigating-without-navigation-prop/

export interface Route {
  path?: string;
  name?: string;
  params?: string;
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
        component: route.component,
      };

    }

//    static routeUnregister(){} // also unregisteres menu?

    static registerMenu(){}

    static navigateBack(){}

    static navigateHome(){}

    static navigateTo(){}

}
