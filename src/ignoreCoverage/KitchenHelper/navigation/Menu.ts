import {MenuItem} from "./MenuItem";
import {FunctionComponent} from "react";
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {RouteLink} from "./RouteLink";
import {BaseTemplate} from "../templates/BaseTemplate";

export class Menu {

    static ROLE_PUBLIC = "Public"
    static ROLE_UNAUTHENTICATED = "Unauthenticated";
    static ROLE_AUTHENTICATED = "Authenticated";
    static ROLE_ADMINISTRATOR = "Administrator";

    static menusForRolesByID = {
        [Menu.ROLE_ADMINISTRATOR]: [],
        [Menu.ROLE_PUBLIC]: [],
        [Menu.ROLE_UNAUTHENTICATED]: [],
        [Menu.ROLE_AUTHENTICATED]: [],
    };

    static menusForRolesByName = {

    };

    static registerRoute(component: FunctionComponent, template: FunctionComponent = null,title: string, route: string, params: any=null, override?){
      RegisteredRoutesMap.registerRoute(new RouteLink(component, template, title, route, params), override);
    }

    //TODO allow MenuItem to be shown for specific roles?
    //TODO create a shotcut for creating a menu item with children from registerRoutesAndGetDefaultMenuItems
        // createMenuItem("Name", [componentA, componentB, component C]) ?
          //What offers best for a tree structure?

    static registerRoutesAndGetDefaultMenuItems(...components: [FunctionComponent]){
      let menuItems = [];
      for(let component of components){
        menuItems.push(Menu.registerRouteAndGetDefaultMenuItem(component));
      }
      return menuItems;
    }

    static registerRouteAndGetDefaultMenuItem(component: FunctionComponent, title?: string, template?: FunctionComponent, route?: string, params?: any){
      title = !!title ? title : RegisteredRoutesMap.getNameOfComponent(component);
      template = !!template ? template : BaseTemplate;
      route = !!route ? route : title.toLowerCase();
      params = !!params ? params : null;
      RegisteredRoutesMap.registerRoute(new RouteLink(component, template, title, route, params));
      return Menu.getDefaultMenuItem(component, title, route);
    }

    static getDefaultMenuItem(component: FunctionComponent, title?: string, route?: string){
      title = !!title ? title : RegisteredRoutesMap.getNameOfComponent(component);
      route = !!route ? route : title.toLowerCase();
      return new MenuItem(route, title, component)
    }

    static setHome(component: FunctionComponent) {
      RegisteredRoutesMap.homeComponent = component;
    }

    /**
     * Safe method to register a menu for a Role
     * @param role_id
     * @param menuItem
     */
    static registerMenuForRoleId(role_id, menuItem){
        if(!Menu.menusForRolesByID[role_id]){
            Menu.menusForRolesByID[role_id] = []
        }
        Menu.menusForRolesByID[role_id].push(menuItem);
    }

    /**
     * @deprecated There can be multiple roles with same name. Consider using the correct role_id to be safe
     * @see registerMenuForRoleId
     * @sideEffects Multiple roles can have same name
     * @param role_name
     * @param menuItem
     */
    static registerUnsafeMenuForRoleByName(role_name, menuItem){
        if(!Menu.menusForRolesByName[role_name]){
            Menu.menusForRolesByName[role_name] = []
        }
        Menu.menusForRolesByName[role_name].push(menuItem);
    }

    static registerCommonMenu(menuItem: MenuItem){
        Menu.registerMenuForRoleId(Menu.ROLE_PUBLIC, menuItem);
    }

    static registerUnauthenticatedMenu(menuItem: MenuItem){
        Menu.registerMenuForRoleId(Menu.ROLE_UNAUTHENTICATED, menuItem);
    }

    static registerAuthenticatedMenu(menuItem: MenuItem){
        Menu.registerMenuForRoleId(Menu.ROLE_AUTHENTICATED, menuItem);
    }

}
