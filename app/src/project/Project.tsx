import React from "react";

import {
  PluginInterface,
} from "kitcheningredients";

import {SynchedStateKeys} from "./helper/SynchedStateKeys";
import {StorageKeys} from "./helper/StorageKeys";

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

	registerRoutes(){

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

	getRootComponent(){
		return null
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
