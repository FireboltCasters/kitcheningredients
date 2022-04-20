"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigatorHelper = exports.isReadyRef = exports.navigationRef = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_1 = require("@react-navigation/native");
const RegisteredRoutesMap_1 = require("./RegisteredRoutesMap");
const RouteRegisterer_1 = require("./RouteRegisterer");
const Home_1 = require("../screens/home/Home");
const App_1 = __importDefault(require("../App"));
const NavigationQueueItem_1 = require("./NavigationQueueItem");
// todo Update to newest ReactNavigation
// https://reactnavigation.org/docs/navigating-without-navigation-prop/
exports.navigationRef = react_1.default.createRef();
exports.isReadyRef = react_1.default.createRef();
class NavigatorHelper {
    static navigationQueue = [];
    static toggleDrawer() {
        NavigatorHelper.getCurrentNavigation()?.dispatch(native_1.DrawerActions.toggleDrawer());
    }
    static openDrawer() {
        NavigatorHelper.getCurrentNavigation()?.dispatch(native_1.DrawerActions.openDrawer());
    }
    static closeDrawer() {
        NavigatorHelper.getCurrentNavigation()?.dispatch(native_1.DrawerActions.closeDrawer());
    }
    static getRouteParams(props) {
        return props.route.params || {};
    }
    static getCurrentNavigation() {
        // @ts-ignore
        return exports.navigationRef?.current;
    }
    static async handleContinueAfterAuthenticated() {
        await NavigatorHelper.navigate(Home_1.Home);
        await App_1.default.setHideDrawer(false);
    }
    static async navigateHome() {
        let me = null;
        try {
            me = await App_1.default.loadUser();
        }
        catch (err) {
            console.log(err);
        }
        if (!!me) {
            NavigatorHelper.navigate(RouteRegisterer_1.RouteRegisterer.HOME_AUTHENTICATED);
        }
        else {
            NavigatorHelper.navigate(RouteRegisterer_1.RouteRegisterer.HOME_UNAUTHENTICATED);
        }
    }
    //https://github.com/react-navigation/react-navigation/issues/6674
    static getEmptyParams() {
        const nativeState = NavigatorHelper.getCurrentNavigation()?.getRootState();
        const webState = NavigatorHelper.getCurrentNavigation()?.dangerouslyGetState();
        let state = nativeState || webState;
        let keys = [];
        try {
            /**
            let routes = state?.routes;
            console.log("routes: ", routes);
            for(let route of routes){
                console.log("route: ", route);
                let routeParams = route?.params || {};
                console.log("routeParams: ", routeParams)
                let routeKeys = Object.keys(routeParams);
                console.log("routeKeys: ", routeKeys);
                keys = Array.prototype.concat(routeKeys);
            }
             */
            keys = Array.prototype.concat(...state?.routes?.map((route) => Object.keys(route?.params || {})));
        }
        catch (err) {
            console.log("getEmptyParams() error");
            console.log(err);
        }
        return keys.reduce((acc, k) => ({ ...acc, [k]: undefined }), {});
    }
    static getNavigationStateRoutes() {
        const state = NavigatorHelper.getCurrentNavigation()?.dangerouslyGetState();
        let routes = state?.routes || [];
        return routes;
    }
    static navigateWithoutParams(registeredComponent, resetHistory = false, newParams = null) {
        //NavigatorHelper.clearURLParams();
        let emptyProps = NavigatorHelper.getEmptyParams();
        if (!newParams) {
            newParams = {};
        }
        emptyProps = { ...emptyProps, ...newParams };
        NavigatorHelper.navigate(registeredComponent, emptyProps, resetHistory);
    }
    static navigate(registeredComponent, props = null, resetHistory = false) {
        let routeName = RegisteredRoutesMap_1.RegisteredRoutesMap.getRouteByComponent(registeredComponent);
        NavigatorHelper.navigateToRouteName(routeName, props, resetHistory);
    }
    //https://stackoverflow.com/questions/43090884/resetting-the-navigation-stack-for-the-home-screen-react-navigation-and-react-n
    static resetHistory(routeName, props = {}) {
        let route = { name: routeName, params: props };
        return NavigatorHelper.getCurrentNavigation()?.dispatch(native_1.CommonActions.reset({
            index: 0,
            routes: [
                route,
            ],
        }));
    }
    static navigateToRouteName(routeName, props = {}, resetHistory = false) {
        // Perform navigation if the app has mounted
        if (NavigatorHelper.isNavigationLoaded()) {
            if (resetHistory) {
                return NavigatorHelper.resetHistory(routeName, props);
            }
            else {
                // @ts-ignore
                NavigatorHelper.getCurrentNavigation()?.dispatch(native_1.DrawerActions.jumpTo(routeName, { ...props }));
            }
        }
        else {
            let queueItem = new NavigationQueueItem_1.NavigationQueueItem(routeName, props, resetHistory);
            NavigatorHelper.navigationQueue.push(queueItem);
            // You can decide what to do if the app hasn't mounted
            // You can ignore this, or add these actions to a queue you can call later
        }
    }
    static handleNavigationQueue() {
        let queueCopy = JSON.parse(JSON.stringify(NavigatorHelper.navigationQueue));
        while (queueCopy.length > 0) {
            let nextNavigation = NavigatorHelper.navigationQueue.shift(); //get item from copy
            if (!!nextNavigation) {
                console.log(nextNavigation);
                NavigatorHelper.navigationQueue.shift(); // remove first item from real list
                NavigatorHelper.navigateToRouteName(nextNavigation.routeName, nextNavigation.props, nextNavigation.resetHistory);
            }
        }
    }
    /**
     * https://reactnavigation.org/docs/5.x/navigating-without-navigation-prop/#handling-initialization
     */
    static isNavigationLoaded() {
        return !!exports.isReadyRef.current && !!NavigatorHelper.getCurrentNavigation();
    }
}
exports.NavigatorHelper = NavigatorHelper;
