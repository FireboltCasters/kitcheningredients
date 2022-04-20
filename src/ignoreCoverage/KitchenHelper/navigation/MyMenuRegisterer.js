"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyMenuRegisterer = void 0;
class MyMenuRegisterer {
    static ROLE_PUBLIC = "Public";
    static ROLE_UNAUTHENTICATED = "Unauthenticated";
    static ROLE_AUTHENTICATED = "Authenticated";
    static ROLE_ADMINISTRATOR = "Administrator";
    static menusForRolesByID = {
        [MyMenuRegisterer.ROLE_ADMINISTRATOR]: [],
        [MyMenuRegisterer.ROLE_PUBLIC]: [],
        [MyMenuRegisterer.ROLE_UNAUTHENTICATED]: [],
        [MyMenuRegisterer.ROLE_AUTHENTICATED]: [],
    };
    static menusForRolesByName = {};
    /**
     * Safe method to register a menu for a Role
     * @param role_id
     * @param menuItem
     */
    static registerMenuForRoleId(role_id, menuItem) {
        if (!MyMenuRegisterer.menusForRolesByID[role_id]) {
            MyMenuRegisterer.menusForRolesByID[role_id] = [];
        }
        MyMenuRegisterer.menusForRolesByID[role_id].push(menuItem);
    }
    /**
     * @deprecated There can be multiple roles with same name. Consider using the correct role_id to be safe
     * @see registerMenuForRoleId
     * @sideEffects Multiple roles can have same name
     * @param role_name
     * @param menuItem
     */
    static registerUnsafeMenuForRoleByName(role_name, menuItem) {
        if (!MyMenuRegisterer.menusForRolesByName[role_name]) {
            MyMenuRegisterer.menusForRolesByName[role_name] = [];
        }
        MyMenuRegisterer.menusForRolesByName[role_name].push(menuItem);
    }
    static registerCommonMenu(menuItem) {
        MyMenuRegisterer.registerMenuForRoleId(MyMenuRegisterer.ROLE_PUBLIC, menuItem);
    }
    static registerUnauthenticatedMenu(menuItem) {
        MyMenuRegisterer.registerMenuForRoleId(MyMenuRegisterer.ROLE_UNAUTHENTICATED, menuItem);
    }
    static registerAuthenticatedMenu(menuItem) {
        MyMenuRegisterer.registerMenuForRoleId(MyMenuRegisterer.ROLE_AUTHENTICATED, menuItem);
    }
}
exports.MyMenuRegisterer = MyMenuRegisterer;
