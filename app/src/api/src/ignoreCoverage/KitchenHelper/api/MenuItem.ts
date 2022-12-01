import React from 'react';
import { NavigatorHelper } from '../navigation/NavigatorHelper';
import {RegisteredRoutesMap} from "../navigation/RegisteredRoutesMap";


export interface MenuItemConfig {
  key: string;
  label: string;
  content?: React.FC;
  command?: any;
  items?: MenuItem[];
  expanded?: boolean;
  customIcon?: any;
  position?: number;
}

export default class MenuItem {

  static createFromComponent(component: React.FC) {
    let config = RegisteredRoutesMap.getConfigForComponent(component);
    return new MenuItem(
      {
        key: config.route,
        label: config.title,
      },
      component
    );
  }

  // default config
  readonly config: MenuItemConfig = {
    key: '',
    label: '',
    content: null,
    command: null,
    items: [],
    expanded: false,
    customIcon: null,
    position: 0,
  };

  constructor(config: MenuItemConfig, destination?: React.FC) {
    this.config = config;
    if (!this.config.command && !!destination) {
      this.config.command = () => {
        NavigatorHelper.navigateWithoutParams(destination);
      };
    }
  }

  getChildItems(): MenuItem[] {
    return this.config.items;
  }

  handleOnPress(nextExpandState: boolean) {
    if (!!this.config.command) {
      this.config.command(nextExpandState);
    }
  }

  addChildrenFromComponents(...components: React.FC[]) {
    for (let component of components) {
      let subItem = MenuItem.createFromComponent(component);
      this.addChildMenuItems(subItem);
    }
  }

  addChildMenuItems(...items: MenuItem[]) {
    for (let item of items) {
      this.config.items.push(item);
    }
  }
}
