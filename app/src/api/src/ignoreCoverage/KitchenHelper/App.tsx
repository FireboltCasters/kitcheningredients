// @ts-nocheck
import React, {Ref} from 'react';
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
import UserHelper from "./utils/UserHelper";
import {StoreProvider} from "easy-peasy";
import {SynchedState} from "./synchedstate/SynchedState";
import {ConfigHolder} from "./ConfigHolder";
import {RequiredStorageKeys} from "./storage/RequiredStorageKeys";
import {ViewWithBackgroundColor} from "./templates/ViewWithBackgroundColor";
import {DefaultNavigation} from "./navigation/DefaultNavigation";
import {Navigation} from "./navigation/Navigation";
import EnviromentHelper from "./EnviromentHelper";
import {UserInitLoader} from "./utils/UserInitLoader";
import {DefaultStorage} from "./storage/DefaultStorage";
import {MyDirectusStorage} from "./storage/MyDirectusStorage";
import {MyDirectusStorageInterface} from "./storage/MyDirectusStorageInterface";
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from "./screens/test/testHome";
import ProfileScreen from "./screens/test/testProfileScreen";
import SettingsScreen from "./screens/test/testSettingsScreen";
import {NavigationContainer, NavigationContainerRef} from "@react-navigation/native";
import {Login} from "./auth/Login";
import {Settings} from "./screens/settings/Settings";
import {PlatformHelper} from "../KitchenHelper/helper/PlatformHelper";
import {ExampleHeavyScreen} from "./screens/test/ExampleHeavyScreen";

const Drawer = createDrawerNavigator();

const navigationRef: Ref<NavigationContainerRef> = React.createRef();
const isReadyRef: Ref<NavigationContainerRef> = React.createRef();
const routeNameRef: Ref<NavigationContainerRef> = React.createRef();

let ignoreNextHashChange = false;

export default class App extends React.Component<any, any>{
  storage: MyDirectusStorageInterface;

  constructor(props) {
    super(props);

    this.storage = new DefaultStorage(new MyDirectusStorage());

    if (!props?.ignoreInstance) {
      ConfigHolder.instance = this;
    }
    this.subscribe((url) => {
      let baseurl = ExpoLinking.createURL("");
      let screenURL = url.substr(baseurl.length);
      let urlSplit = screenURL.split("?");
      let route = urlSplit[0];
      let params = URL_Helper.getAllUrlParams(url);
      //console.log("URL Subscribe: "+route);
      //NavigatorHelper.navigateToRouteName(route, params);
    })
    this.state = {
      syncFinished: false,
      startURL: undefined,
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

  async loadRole(role_id) {
    return await ServerAPI.loadRole(role_id);
  }

  async loadPermissions(role_id) {
    return await ServerAPI.loadPermissions(role_id);
  }

  isDrawerHidden() {
    return ConfigHolder.instance.state.hideDrawer;
  }

  async reload() {
    await ConfigHolder.instance.setState({
      reloadNumber: 0, //ConfigHolder.instance.state.reloadNumber+1,
      syncFinished: false,

    });
  }

  async setStartURL(startURL) {
    await ConfigHolder.instance.setState({
      startURL: startURL,
    });
  }

  async setHideDrawer(hideDrawer, nextRouteName?) {
    let currentRouteName = Navigation.getCurrentRouteName();
    if (ConfigHolder.instance.state.hideDrawer !== hideDrawer) {
      let useRouteName = !!nextRouteName ? nextRouteName : currentRouteName;
      useRouteName = useRouteName || ConfigHolder.instance.startURL;

      await ConfigHolder.instance.setState({
        hideDrawer: hideDrawer,
        reloadNumber: ConfigHolder.instance.state.reloadNumber + 1,
        startURL: Navigation.ROUTE_HASH_PREFIX + useRouteName,
      });
    }
  }

  async setRedirectToLogin() {
    await ConfigHolder.instance.setHideDrawer(true, Navigation.DEFAULT_ROUTE_LOGIN);
  }

  async setUserAsGuest() {
    ConfigHolder.instance.storage.set_is_guest(true);
    await ConfigHolder.instance.setUser(UserHelper.getGuestUser());
  }

  async setSyncFinished(syncFinished) {
    await this.setState({
      syncFinished: syncFinished,
    })
  }

  isOffline() {
    return ConfigHolder.instance.state?.offline;
  }

  async setUser(user, callback?) {
    console.log("App.setUser: ", user);

    if (!!user) {
      user.isGuest = UserHelper.isGuest(user);
    }
    let role_id = user?.role;

    console.log("App.setUser: role_id: ", role_id);
    let role = await this.loadRole(role_id);
    console.log("App.setUser: role: ", role);
    let permissions = await this.loadPermissions(role_id);
    console.log("App.setUser: permissions: ", permissions);

    if (!callback && !!ConfigHolder.plugin.onLogin) {
      await ConfigHolder.plugin.onLogin(user, role, permissions);
      callback = () => {
      };
    }
    await DefaultNavigation.registerRoutesAndMenus(user, role, permissions);

    await ConfigHolder.instance.setState({
      reloadNumber: this.state.reloadNumber + 1,
      loadedUser: true,
      syncFinished: false,
      user: user,
      role: role,
      permissions: permissions,
    }, callback)
  }

  getRole() {
    return ConfigHolder.instance.state?.role;
  }

  getUser() {
    return ConfigHolder.instance.state?.user;
  }

  getPermissions() {
    return ConfigHolder.instance.state?.permissions;
  }

  async loadUser() {
    console.log("App. Load User");
    try {
      console.log("App. Load User. Try");
      if (ServerAPI.areCredentialsSaved()) {
        console.log("-- Load User: Credentials saved");
        let directus = ServerAPI.getClient();
        let user = await ServerAPI.getMe(directus);
        console.log("-- Load User: User loaded");
        console.log(user);
        return user;
      } else if (ConfigHolder.instance.storage.is_guest()) {
        console.log("-- Load User: Guest");
        return UserHelper.getGuestUser();
      } else if (ConfigHolder.startAsGuest) {
        ConfigHolder.instance.storage.set_is_guest(true);
        return UserHelper.getGuestUser();
      } else {
        console.log("-- Load User: No Credentials");
        return null;
      }
    } catch (err) {
      console.log("-- Error at load User");
      console.log(err);
    }
    return null;
  }

  async loadSynchedVariables() {
    SynchedState.registerSynchedStates(RequiredStorageKeys.CACHED_THEME, ColorCodeHelper.VALUE_THEME_DEFAULT, null, null, false);
    await ConfigHolder.instance.storage.init(); //before ConfigHolder.instance.storage.initContextStores();
    await ConfigHolder.instance.storage.initContextStores(SynchedState); //before SynchedState.initContextStores();
    await SynchedState.initSynchedKeys();
    await SynchedState.initContextStores(); //after ConfigHolder.instance.storage.initContextStores();
  }

  async componentDidMount() {
    await ConfigHolder.instance.initialize();
  }

  async initialize() {
    await this.loadSynchedVariables();
    if (!!ConfigHolder.plugin && !!ConfigHolder.plugin.initApp) {
      await ConfigHolder.plugin.initApp();
    }

    let startURL = await Linking.getInitialURL() || ""
    console.log("Initial URL before checking if token: ", startURL);

    let directusAccessTokenSplit = "?" + EnviromentHelper.getDirectusAccessTokenName() + "="
    let directusAutTokenIncluded = startURL.includes(directusAccessTokenSplit);
    if (directusAutTokenIncluded) {
      let realInitialURL = startURL.split(directusAccessTokenSplit)[0];
      let directusAccessToken = startURL.split(directusAccessTokenSplit)[1];
      startURL = realInitialURL + "#" + Navigation.ROUTE_PATH_PREFIX + Navigation.DEFAULT_ROUTE_LOGIN + "?" + EnviromentHelper.getDirectusAccessTokenName() + "=" + directusAccessToken;
    }
    console.log("Initial URL after checking if token: ", startURL);

    await ConfigHolder.instance.setState({
      startURL: startURL,
      loadedUser: false,
    })
  }

  getBaseTheme() {
    let initialColorMode = this.props.initialColorMode || ColorCodeHelper.VALUE_THEME_LIGHT;
    return BaseThemeGenerator.getBaseTheme(initialColorMode);
  }

  getLoadingScreen(additionalContent?) {
    let loadingContent = null;
    if (!!ConfigHolder.plugin && !!ConfigHolder.plugin.getLoadingComponent) {
      loadingContent = ConfigHolder.plugin.getLoadingComponent();
    }
//    return <ViewWithBackgroundColor><View style={{width: "100%", height: "100%", backgroundColor: "red", justifyContent: "center", alignItems: "center"}}><Text>{JSON.stringify(ConfigHolder.instance.state.startURL, null, 2)}</Text></View></ViewWithBackgroundColor>
    return (
      <ViewWithBackgroundColor>
        {loadingContent}
        {additionalContent}
      </ViewWithBackgroundColor>
    )
  }

  getSynchScreen() {
    let syncContent = null;
    if (!!ConfigHolder.plugin && !!ConfigHolder.plugin.getSyncComponent) {
      syncContent = ConfigHolder.plugin.getSyncComponent();
    }

    if (!syncContent) {
      ConfigHolder.instance.setSyncFinished(true)
    }
    return <ViewWithBackgroundColor>{syncContent}</ViewWithBackgroundColor>
  }

  getNormalContent() {
    let content = <RootStack
      reloadNumber={this.state.reloadNumber + "" + this.state.hideDrawer + this.state.startURL + this.state.syncFinished}
      startURL={this.state.startURL}/>
    if (!!this.props.children) {
      content = this.props.children;
    }

    return (
      <>
        <Root
          key={this.state.reloadNumber + "" + this.state.hideDrawer + this.state.startURL + this.state.syncFinished}>{content}</Root>
        <ColorStatusBar/>
      </>
    )
  }

  static isNavigationLoaded(){
    return !!isReadyRef.current && !!App.getCurrentNavigation()
  }

  static getCurrentNavigation(){
    // @ts-ignore
    return navigationRef?.current;
  }

  static paramsToURLSearch(params?){
    let navigateSearch = "";
    if(params){
      let keys = Object.keys(params);
      for(let i=0; i<keys.length; i++){
        let key = keys[i];
        let value = params[key];
        if(value!==undefined && value!==null){
          if(i>0){
            navigateSearch += "&";
          }
          navigateSearch += key+"="+value;
        }
      }
    }
    return navigateSearch;
  }

    render()
    {
      let root = null;

      if(this.state.startURL===undefined){
        console.log("Loading screen");
        root = this.getLoadingScreen();
      } else if(this.state.reloadNumber===0 || !this.state.loadedUser || this.state.offline===undefined){
        root = this.getLoadingScreen(
          <UserInitLoader key={JSON.stringify(this.getUser())} />
        )
      } else if(!this.state.syncFinished) {
        console.log("Sync screen");
        root = this.getSynchScreen();
      } else {
        console.log("Normal screen");
        root = this.getNormalContent();
        root = (
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              isReadyRef.current = true;
              const currentNavigation = navigationRef?.current;
              if(currentNavigation){
                if(currentNavigation.getCurrentRoute){
                  const name = currentNavigation.getCurrentRoute()?.name;
                  routeNameRef.current = name
                }
              }
            }}
            onStateChange={async () => {
              console.log("RootComponent onStateChange")

              let trackScreenView = () => {}

              if(App.isNavigationLoaded()){
                const previousRouteName = routeNameRef?.current+"";
                const currentNavigation = App.getCurrentNavigation();
                if(!!currentNavigation && !!currentNavigation.getCurrentRoute){
                  const currentRoute = currentNavigation.getCurrentRoute()
                  const currentRouteName = currentRoute?.name || "";
                  const currentRouteParams = currentRoute?.params || {};
                  trackScreenView = () => {
                    if(PlatformHelper.isWeb()){
                      let navigateSearch;
                      let navigateSearchParams = App.paramsToURLSearch(currentRouteParams);
                      if(navigateSearchParams){
                        navigateSearch = "?"+navigateSearchParams;
                      } else {
                        navigateSearch = "";
                      }
                      //console.log("After changing the hash, the hook will be called again, so we do not need to call navigateTo again");
                      //@ts-ignore

                      // This handle goBack and goForward in the browser, since the hashchange event is not triggered
                      let nextHash = Navigation.ROUTE_PATH_PREFIX+currentRouteName+navigateSearch;
                      console.log("nextHash: "+nextHash);
                      let sameHash = Navigation.ROUTE_HASH_PREFIX+nextHash === window.location.hash;
                      if(sameHash){ // since goBack can triggers in handleHashChange (see above) we need to check if the hash is the same
                        // do nothing
                        console.log("Same Hash")
                      } else {
                        ignoreNextHashChange = true;
                        console.log("Different Hash")
                        window.location.hash = nextHash;
                      }
                    }
                    // Your implementation of analytics goes here!

                  };
                  routeNameRef.current = currentRouteName;
                }
              }

              await trackScreenView();

              // Save the current route name for later comparison
            }}
          >
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: false,
              unmountOnBlur: true
              // preload screens
            }}
            drawerType={"front"}
            initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Profile" component={ProfileScreen}/>
            <Drawer.Screen name="SettingsSmall" component={SettingsScreen}/>
            <Drawer.Screen name="Login" component={Login}/>
            <Drawer.Screen name="Settings" component={Settings}/>
            <Drawer.Screen name="ExampleHeavyScreen" component={ExampleHeavyScreen}/>
          </Drawer.Navigator>
          </NavigationContainer>
        )
      }

      const theme = this.getBaseTheme();

      console.log("App. Render");



      return (
        <StoreProvider store={SynchedState.getContextStore()}>
          <NativeBaseProvider reloadNumber={this.state.syncFinished+this.state.reloadNumber+""+this.state.hideDrawer+this.state.startURL} theme={theme} colorModeManager={ColorCodeHelper.getManager()} config={ConfigHolder.nativebaseConfig}>
            <ViewWithBackgroundColor>
              {root}
            </ViewWithBackgroundColor>
          </NativeBaseProvider>
        </StoreProvider>
      )
    }
  }
