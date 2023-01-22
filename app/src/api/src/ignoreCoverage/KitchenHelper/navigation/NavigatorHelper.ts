import React, {Ref} from "react";
import {DrawerActions, NavigationContainerRef} from "@react-navigation/native";
import {NavigationQueueItem} from "./NavigationQueueItem";
import {RequiredSynchedStates} from "../synchedstate/RequiredSynchedStates";
import {useSynchedJSONState} from "../synchedstate/SynchedState";

// todo Update to newest ReactNavigation
// https://reactnavigation.org/docs/navigating-without-navigation-prop/

export const navigationRef: Ref<NavigationContainerRef> = React.createRef();

export const isReadyRef: Ref<NavigationContainerRef> = React.createRef();

export class NavigatorHelper {

    static navigationQueue: NavigationQueueItem[] = [];
    static setNavigationHistory: any;

    static setSetNavigationHistoryFunction(func){
      NavigatorHelper.setNavigationHistory = func;
    }

    static useNavigationHistory(){
      return useSynchedJSONState(RequiredSynchedStates.navigationHistory)
    }

    static getRouteParams(props){
        return props?.route?.params || {};
    }

    static getCurrentNavigation(){
        // @ts-ignore
        return navigationRef?.current;
    }

    static getState(){
      const nativeState = NavigatorHelper.getCurrentNavigation()?.getRootState();
      const webState = NavigatorHelper.getCurrentNavigation()?.dangerouslyGetState();
      let state = nativeState || webState;
      return state;
    }

    static getHistory(){
      let state = NavigatorHelper.getState();
      return state?.history || [];
    }

    static async navigateToRouteName(routeName: string, props= {}){
        // Perform navigation if the app has mounted
        if (NavigatorHelper.isNavigationLoaded()) {
              // @ts-ignore
              NavigatorHelper.getCurrentNavigation()?.dispatch(DrawerActions.jumpTo(routeName, {...props}));
              if(NavigatorHelper.setNavigationHistory){
                  NavigatorHelper.setNavigationHistory(NavigatorHelper.getHistory());
              }
        } else {
            let queueItem = new NavigationQueueItem(routeName, props);
            NavigatorHelper.navigationQueue.push(queueItem);
            // You can decide what to do if the app hasn't mounted
            // You can ignore this, or add these actions to a queue you can call later
        }
    }

    static handleNavigationQueue(){
       let queueCopy = JSON.parse(JSON.stringify(NavigatorHelper.navigationQueue));
       while(queueCopy.length>0){
           let nextNavigation = queueCopy.shift(); //get item from copy
           if(!!nextNavigation){
               NavigatorHelper.navigationQueue.shift(); // remove first item from real list
               NavigatorHelper.navigateToRouteName(nextNavigation.routeName, nextNavigation.props);
           }
       }
   }

    /**
     * https://reactnavigation.org/docs/5.x/navigating-without-navigation-prop/#handling-initialization
     */
    static isNavigationLoaded(){
        return !!isReadyRef.current && !!NavigatorHelper.getCurrentNavigation()
    }

}
