import React from 'react';

import {
  PluginInterface,
} from './../api/src/index';

import { SynchedStateKeys } from './helper/SynchedStateKeys';
import { StorageKeys } from './helper/StorageKeys';
import { MySync } from './MySync';
import { MyLoading } from './MyLoading';
import { MyRoot } from './MyRoot';

export default class Project extends PluginInterface {

  constructor() {
    super();
  }

  async initApp() {
    console.log('Project init');
  }

  getSynchedStateKeysClass() {
    return SynchedStateKeys;
  }

  getStorageKeysClass() {
    return StorageKeys;
  }

  async registerRoutes(user, role, permissions) {
    /**
     console.log("registerRoutes");
     console.log(user);
     Menu.registerRoute(ExampleScreen, EmptyTemplate, "Example", "example");
     Menu.registerCommonMenu(new MenuItem("Example", "Example"+user?.role, ExampleScreen))
     */
  }

  async onLogin(user, role) {

  }

  async onLogout(error) {
    if (!error) {
      //normal logout
    } else {
      //logout on error
    }
  }

  getAboutUsComponent() {
    return null;
  }

  getPrivacyPolicyComponent() {
    return null;
  }

  getTermsAndConditionsComponent() {
    return null;
  }

  getHomeComponent(): any {
    return null;
  }

  getLoadingComponent() {
    return <MyLoading />;
  }

  getSyncComponent(): any {
    return <MySync />;
  }

  getRootComponent() {
    return <MyRoot />;
  }

  renderCustomAuthProviders(serverInfo): [] {
    //@ts-ignore
    return null;
  }

  getSettingsComponent(): any {
    //return null // we have overwritten it
  }

  getCustomProjectLogoComponent(): any {

  }

}
