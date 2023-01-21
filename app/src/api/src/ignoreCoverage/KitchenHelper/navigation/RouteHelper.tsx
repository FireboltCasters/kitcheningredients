import {Navigation} from "../../../../../api/src";
import React, {FunctionComponent} from "react";

export class RouteHelper {

  static getNameOfComponent(component: FunctionComponent): string{
    let bestName = component.displayName || component.name;
    return bestName+"";
  }

  static getInitialRouteName(initialURL: string){
    // initialURL = "https://kitchenhelper.app/#/app/recipes";
    // get everything after the # and the prefix
    let hash = RouteHelper.getHashRouteWithSearchParams(initialURL);
    let search = RouteHelper.getSearchParamString(initialURL);
    let routeName = hash.replace("?"+search, "");
    if(!routeName || routeName === ""){
      routeName = Navigation.DEFAULT_ROUTE_HOME;
    }

    return routeName;
  }

  static getHashRouteWithSearchParams(initialURL){
    let hash = initialURL?.split("#")[1] || "";
    if(hash.startsWith(Navigation.ROUTE_PATH_PREFIX)){
      hash = hash.substr(1);
    }
    return hash;
  }

  static getSearchParamString(initialURL){
    let search = initialURL?.split("?")[1] || "";
    // parse for search params in url to dict
    return search;
  }

}
