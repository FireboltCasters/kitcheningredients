"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const RootComponent_1 = require("./navigation/RootComponent");
const ColorCodeHelper_1 = __importDefault(require("./theme/ColorCodeHelper"));
const theme_1 = __importDefault(require("./theme"));
const rootNavigator_1 = require("./navigation/rootNavigator");
const ColorStatusBar_1 = require("./components/ColorStatusBar");
const MyDirectusStorage_1 = require("./storage/MyDirectusStorage");
const ServerAPI_1 = __importDefault(require("./ServerAPI"));
const RouteRegisterer_1 = require("./navigation/RouteRegisterer");
const react_native_1 = require("react-native");
const ExpoLinking = __importStar(require("expo-linking"));
const URL_Helper_1 = require("./helper/URL_Helper");
const NavigatorHelper_1 = require("./navigation/NavigatorHelper");
const LogIgnorer_1 = __importDefault(require("./helper/LogIgnorer"));
const UserHelper_1 = __importDefault(require("./utils/UserHelper"));
const easy_peasy_1 = require("easy-peasy");
const SynchedState_1 = __importDefault(require("./synchedstate/SynchedState"));
const EnviromentHelper_1 = __importDefault(require("./EnviromentHelper"));
LogIgnorer_1.default.ignoreLogs(undefined);
class App extends react_1.default.Component {
    static storage = null;
    static instance = null;
    static plugin = null;
    static nativebaseConfig = null;
    static styleConfig = null;
    static config = null;
    static currentpackageJson = null;
    static currentpackageJsonLock = null;
    static thirdpartyLicense = null;
    constructor(props) {
        super(props);
        App.instance = this;
        App.plugin = props.project || App.plugin;
        App.nativebaseConfig = props.nativebaseConfig || App.nativebaseConfig;
        EnviromentHelper_1.default.AppConfig = props.AppConfig || EnviromentHelper_1.default.AppConfig;
        App.styleConfig = props.styleConfig || App.styleConfig;
        App.config = props.config || App.config;
        App.currentpackageJson = props.currentpackageJson || App.currentpackageJson;
        App.currentpackageJsonLock = props.currentpackageJsonLock || App.currentpackageJsonLock;
        App.thirdpartyLicense = props.thirdpartyLicense || App.thirdpartyLicense;
        App.storage = new MyDirectusStorage_1.MyDirectusStorage();
        RouteRegisterer_1.RouteRegisterer.register();
        RouteRegisterer_1.RouteRegisterer.loadDrawerScreens();
        this.subscribe((url) => {
            let baseurl = ExpoLinking.createURL("");
            let screenURL = url.substr(baseurl.length);
            let urlSplit = screenURL.split("?");
            let route = urlSplit[0];
            let params = URL_Helper_1.URL_Helper.getAllUrlParams(url);
            //console.log("URL Subscribe: "+route);
            NavigatorHelper_1.NavigatorHelper.navigateToRouteName(route, params);
        });
        this.state = {
            user: undefined,
            loadedUser: false,
            redirectToLogin: false,
            reloadNumber: 0,
            hideDrawer: false,
        };
    }
    // Custom function to subscribe to incoming links
    subscribe(listener) {
        // First, you may want to do the default deep link handling
        const onReceiveURL = ({ url }) => {
            listener(url);
        };
        // Listen to incoming links from deep linking
        react_native_1.Linking.addEventListener('url', onReceiveURL);
        return () => {
            // Clean up the event listeners
            react_native_1.Linking.removeEventListener('url', onReceiveURL);
        };
    }
    async loadServerInfo() {
        try {
            let serverInfoRemote = await ServerAPI_1.default.getServerInfo();
        }
        catch (err) {
            console.log("Error at get Server Info: ", err);
        }
    }
    async loadRole(user) {
        return await ServerAPI_1.default.getRole(user);
    }
    static shouldRedirectToLogin() {
        return App.instance.state.redirectToLogin;
    }
    static shouldHideDrawer() {
        return App.instance.state.hideDrawer;
    }
    static async setHideDrawer(visible) {
        if (App.instance.state.hideDrawer !== visible) {
            await App.instance.setState({
                hideDrawer: visible,
                reloadNumber: App.instance.state.reloadNumber + 1,
            });
        }
    }
    static async setRedirectToLogin(redirect) {
        if (App.instance.state.redirectToLogin !== redirect) {
            await App.instance.setState({
                redirectToLogin: redirect,
                reloadNumber: App.instance.state.reloadNumber + 1,
            });
        }
    }
    static async setUser(user) {
        if (!!user) {
            user.isGuest = UserHelper_1.default.isGuest(user);
        }
        App.instance.setUser(user);
    }
    static async setUserAsGuest() {
        App.storage.set_is_guest(true);
        await App.setUser(UserHelper_1.default.getGuestUser());
    }
    async setUser(user, callback = () => { }) {
        let role = await this.loadRole(user);
        await this.setState({
            reloadNumber: this.state.reloadNumber + 1,
            loadedUser: true,
            user: user,
            role: role,
        }, callback);
    }
    static getRole() {
        return App.instance.state?.role;
    }
    static getUser() {
        return App.instance.getUser();
    }
    getUser() {
        return this.state.user;
    }
    static async loadUser() {
        try {
            if (ServerAPI_1.default.areCredentialsSaved()) {
                let directus = ServerAPI_1.default.getClient();
                let user = await ServerAPI_1.default.getMe(directus);
                return user;
            }
            else if (App.storage.is_guest()) {
                return UserHelper_1.default.getGuestUser();
            }
        }
        catch (err) {
            console.log("Error at load User");
            console.log(err);
        }
        return null;
    }
    async loadSynchedVariables() {
        await MyDirectusStorage_1.MyDirectusStorage.init(); //before App.storage.initContextStores();
        await App.storage.initContextStores(); //before SynchedState.initContextStores();
        SynchedState_1.default.initSynchedKeys();
        await SynchedState_1.default.initContextStores(); //after App.storage.initContextStores();
    }
    async componentDidMount() {
        await this.loadSynchedVariables();
        if (!!App.plugin && !!App.plugin.initApp) {
            App.plugin.initApp();
        }
        await this.loadServerInfo();
        let user = await App.loadUser();
        await this.setUser(user);
    }
    getBaseTheme() {
        let initialColorMode = this.props.initialColorMode || ColorCodeHelper_1.default.VALUE_THEME_LIGHT;
        return theme_1.default.getBaseTheme(initialColorMode);
    }
    render() {
        const theme = this.getBaseTheme();
        let content = <rootNavigator_1.RootStack hideDrawer={this.state.hideDrawer + this.state.redirectToLogin}/>;
        if (!!this.props.children) {
            content = this.props.children;
        }
        if (this.state.reloadNumber === 0 || !this.state.loadedUser) {
            return null;
        }
        return (<easy_peasy_1.StoreProvider store={SynchedState_1.default.getContextStore()}>
				<native_base_1.NativeBaseProvider reloadNumber={this.state.reloadNumber + "" + this.state.hideDrawer + this.state.redirectToLogin} theme={theme} colorModeManager={ColorCodeHelper_1.default.getManager()} config={App.nativebaseConfig}>
					<RootComponent_1.Root key={this.state.reloadNumber + "" + this.state.hideDrawer + this.state.redirectToLogin}>{content}</RootComponent_1.Root>
					<ColorStatusBar_1.ColorStatusBar />
				</native_base_1.NativeBaseProvider>
			</easy_peasy_1.StoreProvider>);
    }
}
exports.default = App;
