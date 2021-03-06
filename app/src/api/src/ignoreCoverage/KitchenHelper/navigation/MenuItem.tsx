// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {NavigatorHelper} from "./NavigatorHelper";
import {Text, View} from "native-base";

export class MenuItem{
    key: string;
    label: string;
    content: JSX.Element;
    command: any;
    items: [MenuItem];
    expanded?: boolean;
    customIcon?: any;

    constructor(key, label, destination=null, items=null, command=null, content=null, expanded=false, customIcon?) {
        if(!items){
            items=[];
        }

        this.key = key;
        this.label = label;
        this.items = items;
        this.content = content;
        this.command = command;
        this.expanded = expanded;
        this.customIcon = customIcon;

        if(!command && !!destination){
            this.command = () => {NavigatorHelper.navigateWithoutParams(destination)};
        }
    }

    getChildItems(){
        return this.items;
    }

  handleOnPress(nextExpandState: boolean){
        if(!!this.command){
            this.command(nextExpandState);
        }
    }

    static getMenuItemFromComponent(component: FunctionComponent){
        let config = RegisteredRoutesMap.getConfigForComponent(component);
        return new MenuItem(config.route, config.title, component, null);
    }

    addChildsFromFunctionComponents(...components){
        for(let component of components){
            let subItem = MenuItem.getMenuItemFromComponent(component);
            this.addChildMenuItems(subItem);
        }
    }

    addChildMenuItems(...items){
        for(let item of items){
            this.items.push(item);
        }
    }

}
