import {MenuItem} from "./MenuItem";
import {FunctionComponent} from "react";
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {RouteLink} from "./RouteLink";

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

    static registerRoute(component: FunctionComponent, template: FunctionComponent = null,title: string, route: string, params: any=null){
      RegisteredRoutesMap.registerRoute(new RouteLink(component, template, title, route, params));
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
