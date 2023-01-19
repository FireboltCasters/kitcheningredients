import {FunctionComponent} from "react";
import {Home} from "../screens/home/Home";
import {RouteLink} from "./RouteLink";
import {Menu} from "./Menu";
import EnviromentHelper from "../EnviromentHelper";

export class RegisteredRoutesMap {

    private static mapRouteToScreenItem: {} = {}
    private static mapFunctionComponentToRoute: {} = {}

    private static initialRoutename = "";

    static homeComponent: FunctionComponent = Home;

    static reset(){
        RegisteredRoutesMap.mapRouteToScreenItem = {};
        Menu.reset();
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

    static registerRoute(routeLink: RouteLink, override?){
      let component = routeLink.component;
      let template = routeLink.template;
      let title = routeLink.title;
      let route = routeLink.route;
      let params = routeLink.params;
      if(override===undefined){
        override = true;
      }

        let componentName = route

        // https://reactnavigation.org/docs/configuring-links/#marking-params-as-optional
        if(!!params){
            route+=params;
        }

        let otherRegisteredRoute = RegisteredRoutesMap.mapRouteToScreenItem[route];
        if(!!otherRegisteredRoute && !override){
            let otherComonentName = otherRegisteredRoute.screenName;
            let errorMsg = "The route: "+route+" resolved to both '"+componentName+"' and '"+otherComonentName+"'. Patterns must be unique and cannot resolve to more than one screen.";
            console.error(errorMsg);
            throw new Error("RegisteredRoutesMap.registerRoute: Found conflicting route which wants to be registered: "+errorMsg)
        }

        RegisteredRoutesMap.mapFunctionComponentToRoute[RegisteredRoutesMap.getNameOfComponent(component)] = route;
        RegisteredRoutesMap.mapRouteToScreenItem[route] = {
            screenName: route,
            component: component,
            route: EnviromentHelper.getBasePath()+route,
            template: template,
            title: title
        }
    }

    static getNameOfComponent(component: FunctionComponent): string{
      let bestName = component.displayName || component.name;
      return bestName+"";
    }

    /**
     * Converts a CamelCase word into
     * @param screenName
     */
    static getRouteByComponent(component: FunctionComponent){
        let name = RegisteredRoutesMap.getNameOfComponent(component)
        return RegisteredRoutesMap.mapFunctionComponentToRoute[name];
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
                path: routeConfig.route,
            };
        }

        let linking = {
            prefixes: prefixes, // i think this is needed, test in production !
            config: config,
        };

        return linking;
    }

}
