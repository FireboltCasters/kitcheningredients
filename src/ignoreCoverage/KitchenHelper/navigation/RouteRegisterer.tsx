import {ResetPassword} from "../auth/ResetPassword";
import {Home} from "../screens/home/Home";
import {Debug} from "../screens/debug/Debug";
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {Login} from "../auth/Login";
import {PrivacyPolicy} from "../screens/legalRequirements/PrivacyPolicy";
import {AboutUs} from "../screens/legalRequirements/AboutUs";
import {License} from "../screens/legalRequirements/License";
import {TermsAndConditions} from "../screens/legalRequirements/TermsAndConditions";
import {BaseTemplate} from "../templates/BaseTemplate";
import {LoginTemplate} from "../templates/LoginTemplate";
// @ts-nocheck
import React from "react";
import {Menu} from "./Menu";
import {MenuItem} from "./MenuItem";
import {Users} from "../screens/user/Users";
import {ConfigHolder} from "../ConfigHolder";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Settings} from "../screens/settings/Settings";
import {DeveloperSettings} from "../screens/settings/DeveloperSettings";

const Drawer = createDrawerNavigator();

export class RouteRegisterer {

    static routeLogin = "login";

    static screens = null;
    static loginScreens = null;

    static HOME_AUTHENTICATED = Home;
    static HOME_UNAUTHENTICATED = Login;

    // this is here since we also get the drawer from here, if you have a better place for this feel free to move it
    private static drawerBorderColor: string | null = null;
    private static drawerBackgroundColor: string | null = null;

    static setDrawerBorderColor(color: string) {
        RouteRegisterer.drawerBorderColor = color;
    }

    static getDrawerBorderColor(): string {
        return RouteRegisterer.drawerBorderColor;
    }

    static setDrawerBackgroundColor(color: string) {
        RouteRegisterer.drawerBackgroundColor = color;
    }

    static getDrawerBackgroundColor(): string {
        return RouteRegisterer.drawerBackgroundColor;
    }

    static registerLegalRequirements(){
        // Legal Requirements
        Menu.registerRoute(AboutUs, BaseTemplate, "About us", "about-us");
        Menu.registerRoute(License, BaseTemplate, "License", "license");
        Menu.registerRoute(PrivacyPolicy, BaseTemplate, "Privacy Policy", "privacy-policy");
        Menu.registerRoute(TermsAndConditions, BaseTemplate, "Terms and Conditions", "terms-and-conditions");

        let legalRequirements = new MenuItem("LegalRequirements", "Legal Requirements", null);
        legalRequirements.addChildsFromFunctionComponents(AboutUs, License, PrivacyPolicy, TermsAndConditions);
        Menu.registerCommonMenu(legalRequirements);
    }

    static register(){
        RegisteredRoutesMap.reset();
        RegisteredRoutesMap.setInitialRouteName(RouteRegisterer.routeLogin);

        RouteRegisterer.registerLegalRequirements();

        Menu.registerRoute(Login, LoginTemplate, "Login", RouteRegisterer.routeLogin);
        Menu.registerRoute(ResetPassword, LoginTemplate, "Reset Password", "reset-password");
        Menu.registerUnauthenticatedMenu(MenuItem.getMenuItemFromComponent(Login));

        Menu.registerRoute(Home, BaseTemplate, "Home", "home");

        Menu.registerRoute(Debug, BaseTemplate, "Debug", "debug");
        Menu.registerUnsafeMenuForRoleByName(Menu.ROLE_ADMINISTRATOR, MenuItem.getMenuItemFromComponent(Debug))

        Menu.registerRoute(Users, BaseTemplate, "Users", "users", "/:id?");
        Menu.registerRoute(Settings, BaseTemplate, "Settings", "settings");
        Menu.registerRoute(DeveloperSettings, BaseTemplate, "Developer Settings", "settings/developer", "/:id?");


        if(!!ConfigHolder.plugin){
            ConfigHolder.plugin.registerRoutes();
        }
    }

    static getDrawer(){
        return Drawer;
    }

    static loadDrawerScreens(){
        RouteRegisterer.screens = RouteRegisterer.getDrawerScreens();
        RouteRegisterer.loginScreens = RouteRegisterer.getOnlyLoginDrawerScreens()
    }

    static getOnlyLoginDrawerScreens(){
        let output = [];

        let route = RouteRegisterer.routeLogin;
        let routeConfig = RegisteredRoutesMap.getConfigForRoute(route);
        let screenName = routeConfig.screenName;
        let component = routeConfig.component;
        let template = routeConfig.template;
        let title = routeConfig.title;
        let key="RootStack:"+screenName;

        let content = (props) => {
            return React.createElement(component, props)
        };
        if(!!template){
            content = (props) => {
                let customProps = {title: title};
                let renderedComponent = React.createElement(component, {...props, ...customProps})
                return React.createElement(template, {...props, ...customProps, children: renderedComponent})
            };
        }

        output.push(
            <Drawer.Screen
                key={key}
                name={screenName}
                component={content}
                options={{
                    title: title,
                    headerLeft: null,
                }}
            />
        )
        return output;
    }

    static getDrawerScreens(){
        let output = [];

        let routes = RegisteredRoutesMap.getRouteList();
        for(let route of routes){
            let routeConfig = RegisteredRoutesMap.getConfigForRoute(route);
            let screenName = routeConfig.screenName;
            let component = routeConfig.component;
            let template = routeConfig.template;
            let title = routeConfig.title;
            let key="RootStack:"+screenName;

            let content = (props) => {
                return React.createElement(component, props)
            };
            if(!!template){
                content = (props) => {
                    let customProps = {title: title};
                    let renderedComponent = React.createElement(component, {...props, ...customProps})
                    return React.createElement(template, {...props, ...customProps, children: renderedComponent})
                };
            }

            output.push(
                <Drawer.Screen
                    key={key}
                    name={screenName}
                    component={content}
                    options={{
                        title: title,
                        headerLeft: null,
                    }}
                />
            )
        }
        return output;
    }

}
