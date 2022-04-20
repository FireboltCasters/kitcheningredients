"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
const RegisteredRoutesMap_1 = require("./RegisteredRoutesMap");
const NavigatorHelper_1 = require("./NavigatorHelper");
class MenuItem {
    key;
    label;
    content;
    command;
    items;
    expanded;
    constructor(key, label, destination = null, items = null, command = null, content = null, expanded = false) {
        if (!items) {
            items = [];
        }
        this.key = key;
        this.label = label;
        this.items = items;
        this.content = content;
        this.command = command;
        this.expanded = expanded;
        if (!command && !!destination) {
            this.command = () => { NavigatorHelper_1.NavigatorHelper.navigateWithoutParams(destination); };
        }
    }
    getChildItems() {
        return this.items;
    }
    handleOnPress() {
        if (!!this.command) {
            this.command();
        }
    }
    static getMenuItemFromComponent(component) {
        let config = RegisteredRoutesMap_1.RegisteredRoutesMap.getConfigForComponent(component);
        return new MenuItem(config.route, config.title, component, null);
    }
    addChildsFromFunctionComponents(...components) {
        for (let component of components) {
            let subItem = MenuItem.getMenuItemFromComponent(component);
            this.addChildMenuItems(subItem);
        }
    }
    addChildMenuItems(...items) {
        for (let item of items) {
            this.items.push(item);
        }
    }
}
exports.MenuItem = MenuItem;
