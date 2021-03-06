// @ts-nocheck
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {Root} from './navigation/RootComponent';
import ColorCodeHelper from "./theme/ColorCodeHelper";
import BaseThemeGenerator from "./theme";
import {RootStack} from "./navigation/rootNavigator";
import {ColorStatusBar} from "./components/ColorStatusBar";
//import {MyDirectusStorage} from "./storage/MyDirectusStorage";
import ServerAPI from "./ServerAPI";
import {RouteRegisterer} from "./navigation/RouteRegisterer";
import {Linking} from "react-native";
import * as ExpoLinking from "expo-linking";
import {URL_Helper} from "./helper/URL_Helper";
import {NavigatorHelper} from "./navigation/NavigatorHelper";
import UserHelper from "./utils/UserHelper";
import {StoreProvider} from "easy-peasy";
import SynchedState from "./synchedstate/SynchedState";
import {ConfigHolder} from "./ConfigHolder";
import {RequiredStorageKeys} from "./storage/RequiredStorageKeys";

export default class App extends React.Component<any, any>{

	constructor(props) {
		super(props);
		console.log(props);

		ConfigHolder.instance = this;
		if(!!ConfigHolder.storage){
 //     ConfigHolder.storage = new MyDirectusStorage();
    }

    RouteRegisterer.register();
    RouteRegisterer.loadDrawerScreens();
		this.subscribe(( url ) => {
			let baseurl = ExpoLinking.createURL("");
			let screenURL = url.substr(baseurl.length);
			let urlSplit = screenURL.split("?");
			let route = urlSplit[0];
			let params = URL_Helper.getAllUrlParams(url);
			//console.log("URL Subscribe: "+route);
			NavigatorHelper.navigateToRouteName(route, params);
		})
		this.state = {
			user: undefined,
      role: undefined,
      permissions: undefined,
			loadedUser: false,
			redirectToLogin: false,
			reloadNumber: 0,
			hideDrawer: false,
		}
	}


// Custom function to subscribe to incoming links
	subscribe(listener) {
		// First, you may want to do the default deep link handling
		const onReceiveURL = ({url}) => {
			listener(url);
		};

		// Listen to incoming links from deep linking
		Linking.addEventListener('url', onReceiveURL);
		return () => {
			// Clean up the event listeners
			Linking.removeEventListener('url', onReceiveURL);
		};
	}

	async loadServerInfo(){
		try{
			let serverInfoRemote = await ServerAPI.getServerInfo();
		} catch (err){
			console.log("Error at get Server Info: ",err);
		}
	}

	async loadRole(role_id){
		return await ServerAPI.loadRole(role_id);
	}

  async loadPermissions(role_id){
    return await ServerAPI.loadPermissions(role_id);
  }

	shouldRedirectToLogin(){
		return ConfigHolder.instance.state.redirectToLogin;
	}

	shouldHideDrawer(){
		return ConfigHolder.instance.state.hideDrawer;
	}

	async reload(){
    await ConfigHolder.instance.setState({
      reloadNumber: ConfigHolder.instance.state.reloadNumber+1,
    });
  }

	async setHideDrawer(visible){
		if(ConfigHolder.instance.state.hideDrawer!==visible){
			await ConfigHolder.instance.setState({
				hideDrawer: visible,
				reloadNumber: ConfigHolder.instance.state.reloadNumber+1,
			});
		}
	}

	async setRedirectToLogin(redirect){
		if(ConfigHolder.instance.state.redirectToLogin!==redirect){
			await ConfigHolder.instance.setState({
				redirectToLogin: redirect,
				reloadNumber: ConfigHolder.instance.state.reloadNumber+1,
			});
		}
	}

	async setUserAsGuest(){
		ConfigHolder.storage.set_is_guest(true);
		await ConfigHolder.instance.setUser(UserHelper.getGuestUser());
	}

	async setUser(user, callback?){
    if(!!user){
      user.isGuest = UserHelper.isGuest(user);
    }
    let role_id = user?.role;

		let role = await this.loadRole(role_id);
    let permissions = await this.loadPermissions(role_id);

    if(!callback && !!ConfigHolder.plugin.onLogin){
      callback = () => ConfigHolder.plugin.onLogin(user, role, permissions);
    }

		await this.setState({
			reloadNumber: this.state.reloadNumber+1,
			loadedUser: true,
			user: user,
			role: role,
      permissions: permissions,
		}, callback)
	}

	getRole(){
		return ConfigHolder.instance.state?.role;
	}

	getUser(){
		return ConfigHolder.instance.state?.user;
	}

  getPermissions(){
    return ConfigHolder.instance.state?.permissions;
  }

	async loadUser(){
		try{
			if(ServerAPI.areCredentialsSaved()){
				let directus = ServerAPI.getClient();
				let user = await ServerAPI.getMe(directus);
				return user;
			} else if(ConfigHolder.storage.is_guest()){
				return UserHelper.getGuestUser();
			}
		} catch (err){
			console.log("Error at load User");
			console.log(err);
		}
		return null;
	}

	async loadSynchedVariables(){
    SynchedState.registerSynchedStates(RequiredStorageKeys.THEME, ColorCodeHelper.VALUE_THEME_DEFAULT, null, null, false);
		await ConfigHolder.storage.init(); //before ConfigHolder.storage.initContextStores();
		await ConfigHolder.storage.initContextStores(SynchedState); //before SynchedState.initContextStores();
		await SynchedState.initSynchedKeys();
		await SynchedState.initContextStores(); //after ConfigHolder.storage.initContextStores();
	}

	async componentDidMount() {
		await this.loadSynchedVariables();
		if(!!ConfigHolder.plugin && !!ConfigHolder.plugin.initApp){
			ConfigHolder.plugin.initApp();
		}
		await this.loadServerInfo();
		let user = await ConfigHolder.instance.loadUser();
		await this.setUser(user);
	}

	getBaseTheme(){
		let initialColorMode = this.props.initialColorMode || ColorCodeHelper.VALUE_THEME_LIGHT;
		return BaseThemeGenerator.getBaseTheme(initialColorMode);
	}

	render() {

		const theme = this.getBaseTheme();
		let content = <RootStack hideDrawer={this.state.hideDrawer+this.state.redirectToLogin} />
		if(!!this.props.children){
			content = this.props.children;
		}

		if(this.state.reloadNumber===0 || !this.state.loadedUser){
			return null;
		}

		console.log("App:");
		console.log(this.props);

		return (
			<StoreProvider store={SynchedState.getContextStore()}>
				<NativeBaseProvider reloadNumber={this.state.reloadNumber+""+this.state.hideDrawer+this.state.redirectToLogin} theme={theme} colorModeManager={ColorCodeHelper.getManager()} config={ConfigHolder.nativebaseConfig}>
					<Root key={this.state.reloadNumber+""+this.state.hideDrawer+this.state.redirectToLogin}>{content}</Root>
					<ColorStatusBar />
				</NativeBaseProvider>
			</StoreProvider>
		);
	}
}
