import {RequiredSynchedStates} from "../synchedstate/RequiredSynchedStates";
import {useSynchedJSONState} from "../synchedstate/SynchedState";
import {NavigatorHelper} from "./NavigatorHelper";
import {FunctionComponent} from "react";
import {PlatformHelper} from "../helper/PlatformHelper";
import {Home} from "../screens/home/Home";
import {Login} from "../auth/Login";
import {DrawerActions} from "@react-navigation/native";
import {RouteHelper} from "./RouteHelper";

// todo Update to newest ReactNavigation
// https://reactnavigation.org/docs/navigating-without-navigation-prop/

export interface RouteProps {
  path?: string;
  title?: string;
  // params are a dictionary of key: string /value: any pairs that will be sent to the screen
  params?: {[key: string]: any};
  component: FunctionComponent;
  template?: FunctionComponent;
}

export interface MenuItemProps {
  name: string;
  route?: RouteProps,
  command?: Function,
  position?: number,
  icon?: string,
  customIcon?: FunctionComponent,
  children?: MenuItemProps[],
  expanded?: boolean,
}

export class Navigation {

    static DEFAULT_ROUTE_HOME = RouteHelper.getNameOfComponent(Home);
    static DEFAULT_ROUTE_LOGIN = RouteHelper.getNameOfComponent(Login);

    static ROUTE_PATH_PREFIX = "/";

    // a dict with string to Route
    private static registeredComponents : {[key: string]: RouteProps} = {};

    private static registeredMenuItems : {[key: string]: MenuItemProps} = {};
    static registeredRequiredMenuItems : {[key: string]: MenuItemProps} = {};

    static useNavigationHistory(){
      return useSynchedJSONState(RequiredSynchedStates.navigationHistory)
    }

    static drawerToggle(){
      NavigatorHelper.getCurrentNavigation()?.dispatch(DrawerActions.toggleDrawer());
    }
    static drawerOpen(){
      NavigatorHelper.getCurrentNavigation()?.dispatch(DrawerActions.openDrawer());
    }
    static drawerClose(){
      NavigatorHelper.getCurrentNavigation()?.dispatch(DrawerActions.closeDrawer());
    }

    static routeGetRegistered(){
      return Navigation.registeredComponents;
    }

    static routeRegister(route: RouteProps): RouteProps{
      let path = route.path;
      if(!path){
        path = RouteHelper.getNameOfComponent(route.component);
      }
      let componentName = RouteHelper.getNameOfComponent(route.component);
      let newRoute = {
        path: path,
        title: route?.title || componentName,
        component: route?.component,
        template: route?.template
      };
      Navigation.registeredComponents[componentName] = newRoute
      return newRoute;
    }

//    static routeUnregister(){} // also unregisteres menu?

    static menuRegister(menuItem: MenuItemProps){
      console.log("Navigation.registerMenu: ");
      console.log(menuItem);
      Navigation.registeredMenuItems[menuItem.name] = menuItem;
    }

    static navigateBack(){}

    static navigateHome(){
      Navigation.navigateTo(Navigation.DEFAULT_ROUTE_HOME);
    }

    static getCurrentRouteName(){
      let history = NavigatorHelper.getHistory();
      console.log("++++++++++++ getCurrentRouteName: ");
      console.log(history);
      if(history && history.length>0){
        return history[history.length-1].name;
      }
      return null;
    }

    static navigateTo(routePathOrComponent, params?, hashChanged?){
      let routeName = "Home";
      if(typeof routePathOrComponent === "string"){
        routeName = routePathOrComponent;
      } else if(typeof routePathOrComponent === "function"){
        routeName = RouteHelper.getNameOfComponent(routePathOrComponent);
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
