import {FunctionComponent} from "react";
import {StringHelper} from "../helper/StringHelper";
import {Home} from "../screens/home/Home";
import {Route} from "./Route";

export class RegisteredRoutesMap {

    private static mapRouteToScreenItem: {} = {}
    private static mapFunctionComponentToRoute: {} = {}

    private static initialRoutename = "";

    private static homeComponent: FunctionComponent = Home;

    static reset(){
        RegisteredRoutesMap.mapRouteToScreenItem = {};
    }

    static setInitialRouteName(initialRoutename: string){
        RegisteredRoutesMap.initialRoutename = initialRoutename;
    }

    static getInitialRouteName() {
        return RegisteredRoutesMap.initialRoutename;
    }

    static setHome(component: FunctionComponent) {
        RegisteredRoutesMap.homeComponent = component;
    }

    static getHome(): FunctionComponent {
        return RegisteredRoutesMap.homeComponent;
    }

  static registerRoute(routeItem: Route){
    let componentName = routeItem.route+""

    // https://reactnavigation.org/docs/configuring-links/#marking-params-as-optional
    if(!!routeItem.params){
      routeItem.route+=routeItem.params;
    }

    let otherRegisteredRoute = RegisteredRoutesMap.mapRouteToScreenItem[routeItem.route];
    if(!!otherRegisteredRoute){
      let otherComonentName = otherRegisteredRoute.screenName+"";
      let errorMsg = "The route: "+routeItem.route+" resolved to both '"+componentName+"' and '"+otherComonentName+"'. Patterns must be unique and cannot resolve to more than one screen.";
      throw new Error("Menu.registerRoute: Found conflicting route which wants to be registered: "+errorMsg)
    }

    RegisteredRoutesMap.mapFunctionComponentToRoute[routeItem.component.name] = routeItem.route+"";
    RegisteredRoutesMap.mapRouteToScreenItem[routeItem.route] = {
      screenName: routeItem.route+"",
      component: routeItem.component+"",
      route: routeItem.route+"",
      template: routeItem.template+"",
      title: routeItem.title+""
    }
  }

    /**
     * Converts a CamelCase word into
     * @param screenName
     */
    static getRouteByComponent(component: FunctionComponent){
        return RegisteredRoutesMap.mapFunctionComponentToRoute[component.name];
    }

    /**
     * Converts a CamelCase word into words with spaces
     * @param screenName
     */
    static getScreenNameByComponentName(componentName){
        let screenName = ""+componentName; //ExampleName
        return StringHelper.toCapitalizedWords(screenName);
    }

    static getRegisteredRoutes(){
        return RegisteredRoutesMap.mapRouteToScreenItem;
    }

    static getRouteList(){
        return Object.keys(RegisteredRoutesMap.mapRouteToScreenItem);
    }

    static getConfigForComponent(component: FunctionComponent){
        let route = RegisteredRoutesMap.getRouteByComponent(component);
        return RegisteredRoutesMap.getConfigForRoute(route);
    }

    static getConfigForRoute(route){
        return RegisteredRoutesMap.mapRouteToScreenItem[route];
    }

    static getRouteLinkingConfig(subroute, prefixes){
        let config = {
           screens: {},
        };
        let routes = RegisteredRoutesMap.getRouteList();
        for(let route of routes){
            let routeConfig = RegisteredRoutesMap.getConfigForRoute(route);
            let screenName = routeConfig.screenName
            config.screens[screenName] = {
                path: subroute+routeConfig.route,
            };
        }

        let linking = {
            prefixes: prefixes, // i think this is needed, test in production !
            config: config,
        };

        return linking;
    }

}
