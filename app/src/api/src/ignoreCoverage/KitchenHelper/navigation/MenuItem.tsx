// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {NavigatorHelper} from "./NavigatorHelper";
import {Text, View} from "native-base";
import {Navigation, RouteProps} from "./Navigation";

export interface MenuItemProps {
  key: string;
  customRender?: ((MenuItem) => any),
  label?: string | ((MenuItem) => any),
  route?: RouteProps,
  command?: Function,
  position?: number,
  icon?: string,
  customIcon?: ((MenuItem) => any),
  expanded?: boolean,
}
export class MenuItem implements MenuItemProps {
    key: string;
    private items: MenuItem[];

    static fromRoutes(routes: RouteProps[]){
      console.log("MenuItem: fromRoutes: routes: ", routes);
        let items = [];
        for(let route of routes){
            items.push(MenuItem.fromRoute(route));
        }
        console.log("MenuItem: fromRoutes: items: ", items);
        return items;
    }

    static fromRoute(route: RouteProps){
      return new MenuItem({
        key: route.path,
        label: route.title,
        route: route,
      });
    }

    constructor(props: MenuItemProps) {
      this.items = [];
         this.key = props?.key;
        this.label = props?.label;
        this.route = props?.route;
        this.content = props?.content;
        this.command = props?.command;
        this.expanded = props?.expanded;
        this.icon = props?.icon;
        this.position = props?.position;

        if(!this?.command && !!this?.route){
            this.command = () => {Navigation.navigateTo(this?.route?.component)};
        }
    }

    getChildItems(){
        return this.items || [];
    }

  handleOnPress(nextExpandState: boolean){
        if(!!this.command){
            this.command(nextExpandState);
        }
    }

    addChildMenuItems(childItems: MenuItem[]){
      console.log("MenuItem: addChildMenuItems: childItems: ", childItems);
        for(let item of childItems){
          if(!!item){
            this.items.push(item);
          }
        }
    }

}
