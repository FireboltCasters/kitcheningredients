import {FunctionComponent} from "react";
import {StringHelper} from "../helper/StringHelper";
import {Home} from "../screens/home/Home";
import {RouteLink} from "./RouteLink";

export class RegisteredRoutesMap {

    private static mapRouteToScreenItem: {} = {}
    private static mapFunctionComponentToRoute: {} = {}

    private static initialRoutename = "";

    static homeComponent: FunctionComponent = Home;

    static reset(){
        RegisteredRoutesMap.mapRouteToScreenItem = {};
    }

    static setInitialRouteName(initialRoutename: string){
        RegisteredRoutesMap.initialRoutename = initialRoutename;
    }

    static getInitialRouteName() {
        return RegisteredRoutesMap.initialRoutename;
    }

    static getHome(): FunctionComponent {
        return RegisteredRoutesMap.homeComponent;
    }

    static setHome(component: FunctionComponent) {
      RegisteredRoutesMap.homeComponent = component;
    }

    static registerRoute(routeLink: RouteLink){
      let component = routeLink.component;
      let template = routeLink.template;
      let title = routeLink.title;
      let route = routeLink.route;
      let params = routeLink.params;

        let componentName = route

        // https://reactnavigation.org/docs/configuring-links/#marking-params-as-optional
        if(!!params){
            route+=params;
        }

        let otherRegisteredRoute = RegisteredRoutesMap.mapRouteToScreenItem[route];
        if(!!otherRegisteredRoute){
            let otherComonentName = otherRegisteredRoute.screenName;
            let errorMsg = "The route: "+route+" resolved to both '"+componentName+"' and '"+otherComonentName+"'. Patterns must be unique and cannot resolve to more than one screen.";
            throw new Error("RegisteredRoutesMap.registerRoute: Found conflicting route which wants to be registered: "+errorMsg)
        }

        RegisteredRoutesMap.mapFunctionComponentToRoute[RegisteredRoutesMap.getNameOfComponent(component)] = route;
        RegisteredRoutesMap.mapRouteToScreenItem[route] = {
            screenName: route,
            component: component,
            route: route,
            template: template,
            title: title
        }
    }

    static getNameOfComponent(component: FunctionComponent){
      return component.displayName || component.name;
    }

    /**
     * Converts a CamelCase word into
     * @param screenName
     */
    static getRouteByComponent(component: FunctionComponent){
        let name = RegisteredRoutesMap.getNameOfComponent(component)
        return RegisteredRoutesMap.mapFunctionComponentToRoute[name];
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
