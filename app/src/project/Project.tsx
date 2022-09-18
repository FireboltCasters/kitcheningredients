import React from "react";

import {
  PluginInterface,
} from "./../api/src/index";

import {SynchedStateKeys} from "./helper/SynchedStateKeys";
import {StorageKeys} from "./helper/StorageKeys";
import {ExampleScreen} from "./ExampleScreen";
import {Menu} from "./../api/src/ignoreCoverage/KitchenHelper/navigation/Menu";
import {MenuItem} from "./../api/src/ignoreCoverage/KitchenHelper/navigation/MenuItem";
import {EmptyTemplate} from "./../api/src/ignoreCoverage/KitchenHelper/templates/EmptyTemplate";
import {MyRoot} from "./MyRoot";
import {MyLoading} from "./MyLoading";

export default class Project extends PluginInterface{

	constructor() {
		super();
	}

	getSynchedStateKeysClass(){
		return SynchedStateKeys;
	}

	getStorageKeysClass(){
		return StorageKeys;
	}

  async registerRoutes(user, role, permissions){
	  	  console.log("registerRoutes");
	  	  console.log(user);
	  Menu.registerRoute(ExampleScreen, EmptyTemplate, "Example", "example");
    Menu.registerCommonMenu(new MenuItem("Example", "Example"+user?.role, ExampleScreen))
	}

	async initApp() {
		console.log("Project init")
	}

	async onLogin(user, role){

	}

	async onLogout(error){
		if(!error){
			//normal logout
		} else {
			//logout on error
		}
	}

	getAboutUsComponent() {
    return null
	}

	getPrivacyPolicyComponent() {
    return null
	}

	getTermsAndConditionsComponent() {
    return null
	}

	getHomeComponent(): any {
    return null
	}

  getLoadingComponent(){
	  return <MyLoading />;
  }

  getSynchComponent(): any {
    return <MyRoot />
  }

	getRootComponent(){
	}

	renderCustomAuthProviders(serverInfo): []{
		//@ts-ignore
		return null;
	}

	getSettingsComponent(): any {
		//return null // we have overwritten it
	}

	getCustomProjectLogoComponent(): any {

	}

}
