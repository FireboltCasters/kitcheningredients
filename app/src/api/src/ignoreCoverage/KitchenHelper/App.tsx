// @ts-nocheck
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {Root} from './navigation/RootComponent';
import ColorCodeHelper from "./theme/ColorCodeHelper";
import BaseThemeGenerator from "./theme";
import {RootStack} from "./navigation/rootNavigator";
import {ColorStatusBar} from "./components/ColorStatusBar";
import ServerAPI from "./ServerAPI";
import {Linking} from "react-native";
import * as ExpoLinking from "expo-linking";
import {URL_Helper} from "./helper/URL_Helper";
import {NavigatorHelper} from "./navigation/NavigatorHelper";
import UserHelper from "./utils/UserHelper";
import {StoreProvider} from "easy-peasy";
import {SynchedState} from "./synchedstate/SynchedState";
import {ConfigHolder} from "./ConfigHolder";
import {RequiredStorageKeys} from "./storage/RequiredStorageKeys";
import {ViewWithBackgroundColor} from "./templates/ViewWithBackgroundColor";
import {DefaultNavigation} from "./navigation/DefaultNavigation";
import {Navigation} from "./navigation/Navigation";

export default class App extends React.Component<any, any>{

	constructor(props) {
		super(props);

		if(!props?.ignoreInstance){
      ConfigHolder.instance = this;
    }

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
		  syncFinished: false,
      initialURL: undefined,
			user: undefined,
      role: undefined,
      offline: undefined,
      permissions: undefined,
			loadedUser: false,
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
			return await ServerAPI.getServerInfo();
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

	isDrawerHidden(){
		return ConfigHolder.instance.state.hideDrawer;
	}

	async reload(){
    await ConfigHolder.instance.setState({
      reloadNumber: ConfigHolder.instance.state.reloadNumber+1,
    });
  }

	async setHideDrawer(hideDrawer, nextRouteName?){
    let currentRouteName = Navigation.getCurrentRouteName();
		if(ConfigHolder.instance.state.hideDrawer!==hideDrawer){
		  let useRouteName = !!nextRouteName ? nextRouteName : currentRouteName;
		  useRouteName = useRouteName || ConfigHolder.instance.initialURL;

			await ConfigHolder.instance.setState({
				hideDrawer: hideDrawer,
				reloadNumber: ConfigHolder.instance.state.reloadNumber+1,
        initialURL: "#"+useRouteName,
			});
		}
	}

	async setRedirectToLogin(){
	  await ConfigHolder.instance.setHideDrawer(true, Navigation.DEFAULT_ROUTE_LOGIN);
	}

	async setUserAsGuest(){
		ConfigHolder.storage.set_is_guest(true);
		await ConfigHolder.instance.setUser(UserHelper.getGuestUser());
	}

	async setSyncFinished(syncFinished){
    await this.setState({
      syncFinished: syncFinished,
    })
  }

  isOffline(){
	   return ConfigHolder.instance.state?.offline;
  }

	async setUser(user, callback?){
	  console.log("App.setUser: ",user);

    if(!!user){
      user.isGuest = UserHelper.isGuest(user);
    }
    let role_id = user?.role;

    console.log("App.setUser: role_id: ",role_id);
		let role = await this.loadRole(role_id);
		console.log("App.setUser: role: ",role);
    let permissions = await this.loadPermissions(role_id);
    console.log("App.setUser: permissions: ",permissions);

    if(!callback && !!ConfigHolder.plugin.onLogin){
      await ConfigHolder.plugin.onLogin(user, role, permissions);
      callback = () => {};
    }
    await DefaultNavigation.registerRoutesAndMenus(user, role, permissions);

		await ConfigHolder.instance.setState({
			reloadNumber: this.state.reloadNumber+1,
			loadedUser: true,
      syncFinished: false,
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
	  console.log("App. Load User");
		try{
		  console.log("App. Load User. Try");
			if(ServerAPI.areCredentialsSaved()){
			  console.log("-- Load User: Credentials saved");
				let directus = ServerAPI.getClient();
				let user = await ServerAPI.getMe(directus);
				console.log("-- Load User: User loaded");
				console.log(user);
				return user;
			} else if(ConfigHolder.storage.is_guest()){
			  console.log("-- Load User: Guest");
				return UserHelper.getGuestUser();
			} else {
			  console.log("-- Load User: No Credentials");
        return null;
      }
		} catch (err){
			console.log("-- Error at load User");
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
	  await ConfigHolder.instance.initialize();
	}

	async initialize(){
	  await this.loadSynchedVariables();
    if(!!ConfigHolder.plugin && !!ConfigHolder.plugin.initApp){
      await ConfigHolder.plugin.initApp();
    }
    let initialURL = await Linking.getInitialURL() || "";
    await ConfigHolder.instance.setState({
      initialURL: initialURL,
    })
    let serverStatus = await this.loadServerInfo();
    await ConfigHolder.instance.setState({offline: !serverStatus});
    let user = await ConfigHolder.instance.loadUser();
    await ConfigHolder.instance.setUser(user, null);
    if(!user){
      //let isAllowedInitialRoute = await DefaultNavigation.isAnonymUserRoute(initialURL);
      //if(!isAllowedInitialRoute){
      //  await ConfigHolder.instance.setRedirectToLogin();
      //}
    }
  }

	getBaseTheme(){
		let initialColorMode = this.props.initialColorMode || ColorCodeHelper.VALUE_THEME_LIGHT;
		return BaseThemeGenerator.getBaseTheme(initialColorMode);
	}

	getLoadingScreen(){
    let loadingContent = null;
    if(!!ConfigHolder.plugin && !!ConfigHolder.plugin.getLoadingComponent){
      loadingContent = ConfigHolder.plugin.getLoadingComponent();
    }
//    return <ViewWithBackgroundColor><View style={{width: "100%", height: "100%", backgroundColor: "red", justifyContent: "center", alignItems: "center"}}><Text>{JSON.stringify(ConfigHolder.instance.state.initialURL, null, 2)}</Text></View></ViewWithBackgroundColor>
    return <ViewWithBackgroundColor>{loadingContent}</ViewWithBackgroundColor>
  }

  getSynchScreen(){
    let syncContent = null;
    if(!!ConfigHolder.plugin && !!ConfigHolder.plugin.getSyncComponent){
      syncContent = ConfigHolder.plugin.getSyncComponent();
    }

    if(!syncContent) {
      ConfigHolder.instance.setSyncFinished(true)
    }
    return <ViewWithBackgroundColor>{syncContent}</ViewWithBackgroundColor>
  }

  getNormalContent(){
    let content = <RootStack reloadNumber={this.state.reloadNumber+""+this.state.hideDrawer+this.state.initialURL+this.state.syncFinished} initialURL={this.state.initialURL} />
    if(!!this.props.children){
      content = this.props.children;
    }

    return (
      <>
        <Root key={this.state.reloadNumber+""+this.state.hideDrawer+this.state.initialURL+this.state.syncFinished}>{content}</Root>
        <ColorStatusBar />
      </>
    )
  }

	render() {
		let root = null;

		if(this.state.reloadNumber===0 || !this.state.loadedUser || this.state.offline===undefined || this.state.initialURL===undefined){
		  console.log("Loading screen");
		  root = this.getLoadingScreen();
		} else if(!this.state.syncFinished) {
      console.log("Sync screen");
		  root = this.getSynchScreen();
    } else {
      console.log("Normal screen");
		  root = this.getNormalContent();
    }

    const theme = this.getBaseTheme();

		return (
			<StoreProvider store={SynchedState.getContextStore()}>
				<NativeBaseProvider reloadNumber={this.state.syncFinished+this.state.reloadNumber+""+this.state.hideDrawer+this.state.initialURL} theme={theme} colorModeManager={ColorCodeHelper.getManager()} config={ConfigHolder.nativebaseConfig}>
          <ViewWithBackgroundColor>
          {root}
          </ViewWithBackgroundColor>
				</NativeBaseProvider>
			</StoreProvider>
		);
	}
}
