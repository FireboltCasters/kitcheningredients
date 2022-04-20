"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteRegisterer = void 0;
const ResetPassword_1 = require("../auth/ResetPassword");
const Home_1 = require("../screens/home/Home");
const Debug_1 = require("../screens/debug/Debug");
const RegisteredRoutesMap_1 = require("./RegisteredRoutesMap");
const Login_1 = require("../auth/Login");
const PrivacyPolicy_1 = require("../screens/legalRequirements/PrivacyPolicy");
const AboutUs_1 = require("../screens/legalRequirements/AboutUs");
const License_1 = require("../screens/legalRequirements/License");
const TermsAndConditions_1 = require("../screens/legalRequirements/TermsAndConditions");
const BaseTemplate_1 = require("../templates/BaseTemplate");
const LoginTemplate_1 = require("../templates/LoginTemplate");
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const MyMenuRegisterer_1 = require("./MyMenuRegisterer");
const MenuItem_1 = require("./MenuItem");
const Users_1 = require("../screens/user/Users");
const App_1 = __importDefault(require("../App"));
const drawer_1 = require("@react-navigation/drawer");
const Settings_1 = require("../screens/settings/Settings");
const DeveloperSettings_1 = require("../screens/settings/DeveloperSettings");
const Drawer = (0, drawer_1.createDrawerNavigator)();
class RouteRegisterer {
    static routeLogin = "login";
    static screens = null;
    static loginScreens = null;
    static HOME_AUTHENTICATED = Home_1.Home;
    static HOME_UNAUTHENTICATED = Login_1.Login;
    // this is here since we also get the drawer from here, if you have a better place for this feel free to move it
    static drawerBorderColor = null;
    static drawerBackgroundColor = null;
    static setDrawerBorderColor(color) {
        RouteRegisterer.drawerBorderColor = color;
    }
    static getDrawerBorderColor() {
        return RouteRegisterer.drawerBorderColor;
    }
    static setDrawerBackgroundColor(color) {
        RouteRegisterer.drawerBackgroundColor = color;
    }
    static getDrawerBackgroundColor() {
        return RouteRegisterer.drawerBackgroundColor;
    }
    static registerLegalRequirements() {
        // Legal Requirements
        RegisteredRoutesMap_1.RegisteredRoutesMap.registerRoute(AboutUs_1.AboutUs, BaseTemplate_1.BaseTemplate, "About us", "about-us");
        RegisteredRoutesMap_1.RegisteredRoutesMap.registerRoute(License_1.License, BaseTemplate_1.BaseTemplate, "License", "license");
        RegisteredRoutesMap_1.RegisteredRoutesMap.registerRoute(PrivacyPolicy_1.PrivacyPolicy, BaseTemplate_1.BaseTemplate, "Privacy Policy", "privacy-policy");
        RegisteredRoutesMap_1.RegisteredRoutesMap.registerRoute(TermsAndConditions_1.TermsAndConditions, BaseTemplate_1.BaseTemplate, "Terms and Conditions", "terms-and-conditions");
        let legalRequirements = new MenuItem_1.MenuItem("LegalRequirements", "Legal Requirements", null);
        legalRequirements.addChildsFromFunctionComponents(AboutUs_1.AboutUs, License_1.License, PrivacyPolicy_1.PrivacyPolicy, TermsAndConditions_1.TermsAndConditions);
        MyMenuRegisterer_1.MyMenuRegisterer.registerCommonMenu(legalRequirements);
    }
    static register() {
        RegisteredRoutesMap_1.RegisteredRoutesMap.reset();
        RegisteredRoutesMap_1.RegisteredRoutesMap.setInitialRouteName(RouteRegisterer.routeLogin);
        RouteRegisterer.registerLegalRequirements();
        RegisteredRoutesMap_1.RegisteredRoutesMap.registerRoute(Login_1.Login, LoginTemplate_1.LoginTemplate, "Login", RouteRegisterer.routeLogin);
        RegisteredRoutesMap_1.RegisteredRoutesMap.registerRoute(ResetPassword_1.ResetPassword, LoginTemplate_1.LoginTemplate, "Reset Password", "reset-password");
        MyMenuRegisterer_1.MyMenuRegisterer.registerUnauthenticatedMenu(MenuItem_1.MenuItem.getMenuItemFromComponent(Login_1.Login));
        RegisteredRoutesMap_1.RegisteredRoutesMap.registerRoute(Home_1.Home, BaseTemplate_1.BaseTemplate, "Home", "home");
        RegisteredRoutesMap_1.RegisteredRoutesMap.registerRoute(Debug_1.Debug, BaseTemplate_1.BaseTemplate, "Debug", "debug");
        MyMenuRegisterer_1.MyMenuRegisterer.registerUnsafeMenuForRoleByName(MyMenuRegisterer_1.MyMenuRegisterer.ROLE_ADMINISTRATOR, MenuItem_1.MenuItem.getMenuItemFromComponent(Debug_1.Debug));
        RegisteredRoutesMap_1.RegisteredRoutesMap.registerRoute(Users_1.Users, BaseTemplate_1.BaseTemplate, "Users", "users", "/:id?");
        RegisteredRoutesMap_1.RegisteredRoutesMap.registerRoute(Settings_1.Settings, BaseTemplate_1.BaseTemplate, "Settings", "settings");
        RegisteredRoutesMap_1.RegisteredRoutesMap.registerRoute(DeveloperSettings_1.DeveloperSettings, BaseTemplate_1.BaseTemplate, "Developer Settings", "settings/developer", "/:id?");
        if (!!App_1.default.plugin) {
            App_1.default.plugin.registerRoutes();
        }
    }
    static getDrawer() {
        return Drawer;
    }
    static loadDrawerScreens() {
        RouteRegisterer.screens = RouteRegisterer.getDrawerScreens();
        RouteRegisterer.loginScreens = RouteRegisterer.getOnlyLoginDrawerScreens();
    }
    static getOnlyLoginDrawerScreens() {
        let output = [];
        let route = RouteRegisterer.routeLogin;
        let routeConfig = RegisteredRoutesMap_1.RegisteredRoutesMap.getConfigForRoute(route);
        let screenName = routeConfig.screenName;
        let component = routeConfig.component;
        let template = routeConfig.template;
        let title = routeConfig.title;
        let key = "RootStack:" + screenName;
        let content = (props) => {
            return react_1.default.createElement(component, props);
        };
        if (!!template) {
            content = (props) => {
                let customProps = { title: title };
                let renderedComponent = react_1.default.createElement(component, { ...props, ...customProps });
                return react_1.default.createElement(template, { ...props, ...customProps, children: renderedComponent });
            };
        }
        output.push(<Drawer.Screen key={key} name={screenName} component={content} options={{
                title: title,
                headerLeft: null,
            }}/>);
        return output;
    }
    static getDrawerScreens() {
        let output = [];
        let routes = RegisteredRoutesMap_1.RegisteredRoutesMap.getRouteList();
        for (let route of routes) {
            let routeConfig = RegisteredRoutesMap_1.RegisteredRoutesMap.getConfigForRoute(route);
            let screenName = routeConfig.screenName;
            let component = routeConfig.component;
            let template = routeConfig.template;
            let title = routeConfig.title;
            let key = "RootStack:" + screenName;
            let content = (props) => {
                return react_1.default.createElement(component, props);
            };
            if (!!template) {
                content = (props) => {
                    let customProps = { title: title };
                    let renderedComponent = react_1.default.createElement(component, { ...props, ...customProps });
                    return react_1.default.createElement(template, { ...props, ...customProps, children: renderedComponent });
                };
            }
            output.push(<Drawer.Screen key={key} name={screenName} component={content} options={{
                    title: title,
                    headerLeft: null,
                }}/>);
        }
        return output;
    }
}
exports.RouteRegisterer = RouteRegisterer;
