import {Example} from "./screens/example/Example";
import {BaseTemplate, PluginInterface, Menu, MenuItem} from "kitcheningredients";
import {SynchedVariableText} from "./screens/example/SynchedVariableText";
import {SynchedStateKeys} from "./helper/SynchedStateKeys";
import {Tutorial} from "./screens/example/Tutorial";
import {StorageKeys} from "./helper/StorageKeys";
import {LottieExample} from "./screens/example/LottieExample";

export default class Project implements PluginInterface{

	constructor() {

	}

	getSynchedStateKeysClass(){
		return SynchedStateKeys;
	}

	getStorageKeysClass(){
		return StorageKeys;
	}

	registerRoutes(){
		console.log("Register Synched States for MySynchedStates");

		// Resource detail
		Menu.registerRoute(Example, BaseTemplate, "Example", "example");
		Menu.registerRoute(LottieExample, BaseTemplate, "LottieExample", "lottieExample");
		Menu.registerRoute(SynchedVariableText, BaseTemplate, "SynchedVariableText", "synchedVariableText");
		Menu.registerRoute(Tutorial, BaseTemplate, "Tutorial", "tutorial");

		// Side Menu for User
		let userMenu = new MenuItem("topExample", "TopExample", null, null, null, null, false);
		Menu.registerCommonMenu(userMenu);
		userMenu.addChildMenuItems(new MenuItem("example", "Example", Example));
		userMenu.addChildMenuItems(new MenuItem("lottieExample", "LottieExample", LottieExample));
		userMenu.addChildMenuItems(new MenuItem("synchedVariableText", "SynchedVariableText", SynchedVariableText));
		userMenu.addChildMenuItems(new MenuItem("tutorial", "Tutorial", Tutorial));


	}

	async initApp() {
		console.log("Project init")
	}

	async onLogout(error){
		if(!error){
			//normal logout
		} else {
			//logout on error
		}
	}

	onLogin(user, role){

  }

	getAboutUsComponent() {
		//return component with informations
	}

	getPrivacyPolicyComponent() {
		//return component with informations
	}

	getTermsAndConditionsComponent() {
		//return component with informations
	}

	getHomeComponent(): any {
	}

	getSettingsComponent(): any {

	}

	getCustomProjectLogoComponent(): any {
	}

}
