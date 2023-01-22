import {ResetPassword} from "../auth/ResetPassword";
import {Home} from "../screens/home/Home";
import {Debug} from "../screens/debug/Debug";
import {Login} from "../auth/Login";
import {PrivacyPolicy} from "../screens/legalRequirements/PrivacyPolicy";
import {AboutUs} from "../screens/legalRequirements/AboutUs";
import {License} from "../screens/legalRequirements/License";
import {TermsAndConditions} from "../screens/legalRequirements/TermsAndConditions";
import {BaseTemplate} from "../templates/BaseTemplate";
import {LoginTemplate} from "../templates/LoginTemplate";
// @ts-nocheck
import React from "react";
import {MenuItem} from "./MenuItem";
import {Users} from "../screens/user/Users";
import {ConfigHolder} from "../ConfigHolder";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Settings} from "../screens/settings/Settings";
import {DeveloperSettings} from "../screens/settings/DeveloperSettings";
import {BaseNoPaddingTemplate} from "./../templates/BaseNoPaddingTemplate";
import {Register} from "../auth/Register";

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

    }

    static async register(user, role, permissions){

    }

    // @ts-ignore
    static getDrawer(){
        return Drawer;
    }

    static async loadDrawerScreens(){
        RouteRegisterer.screens = RouteRegisterer.getDrawerScreens();
        RouteRegisterer.loginScreens = RouteRegisterer.getOnlyLoginDrawerScreens()
    }

    static getOnlyLoginDrawerScreens(){

    }

    static getDrawerScreens(){

    }

}
