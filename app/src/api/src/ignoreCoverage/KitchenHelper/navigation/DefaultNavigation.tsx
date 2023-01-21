import {BaseTemplate, ConfigHolder, Menu, Navigation} from "../../../../../api/src";
import {Login} from "../auth/Login";
import {LoginTemplate} from "../templates/LoginTemplate";
import {Home} from "../screens/home/Home";
import {RouteProps} from "./Navigation";
import React from "react";
import {RouteRegisterer} from "./RouteRegisterer";
import {AboutUs} from "../screens/legalRequirements/AboutUs";
import {License} from "../screens/legalRequirements/License";
import {PrivacyPolicy} from "../screens/legalRequirements/PrivacyPolicy";
import {TermsAndConditions} from "../screens/legalRequirements/TermsAndConditions";
import {RouteHelper} from "./RouteHelper";

export class DefaultNavigation {

  static async registerRoutes(user, role, permissions){
    DefaultNavigation.registerDefaultRoutes();
    if(!!ConfigHolder.plugin){
      await ConfigHolder.plugin.registerRoutes(user, role, permissions);
    }
  }

  static registerDefaultRoutes(){
    console.log("Registering default routes");

    console.log("--Registering login route");
    Navigation.routeRegister({
      component: Login,
      template: LoginTemplate,
    })

    console.log("--Registering home route");
    Navigation.routeRegister({
      component: Home,
      template: BaseTemplate,
    })

    Navigation.routeRegister({
      component: AboutUs,
      template: BaseTemplate,
    })
    Navigation.routeRegister({
      component: License,
      template: BaseTemplate,
    })
    Navigation.routeRegister({
      component: PrivacyPolicy,
      template: BaseTemplate,
    })
    Navigation.routeRegister({
      component: TermsAndConditions,
      template: BaseTemplate,
    })

    /**
    RegisteredRoutesMap.reset();
    RegisteredRoutesMap.setInitialRouteName(RouteRegisterer.routeLogin);

    Menu.registerRoute(Login, LoginTemplate, "Login", RouteRegisterer.routeLogin);
    Menu.registerRoute(ResetPassword, LoginTemplate, "Reset Password", "reset-password");
    Menu.registerRoute(Register, LoginTemplate, "Register", "register");
    Menu.registerUnauthenticatedMenu(MenuItem.getMenuItemFromComponent(Login));

    Menu.registerRoute(Home, BaseTemplate, "Home", "home");

    //Menu.registerRoute(Debug, BaseTemplate, "Debug", "debug");
    //Menu.registerUnsafeMenuForRoleByName(Menu.ROLE_ADMINISTRATOR, MenuItem.getMenuItemFromComponent(Debug))

    Menu.registerRoute(Users, BaseTemplate, "Users", "users", "/:id?");
    Menu.registerRoute(Settings, BaseNoPaddingTemplate, "Settings", "settings");
    //Menu.registerRoute(DeveloperSettings, BaseTemplate, "Developer Settings", "settings/developer", "/:id?");

    RouteRegisterer.registerLegalRequirements();
     */
  }



  static getAllScreens(initialSearch){
    let registeredRoutes = Navigation.routeGetRegistered();
    return DefaultNavigation.getScreensFor(registeredRoutes, initialSearch);
  }

  static getAnonymUserScreens(initialSearch){
    let loginScreens = DefaultNavigation.getScreensFor(
      {
        [Navigation.DEFAULT_ROUTE_LOGIN]: Navigation.routeGetRegistered()[Navigation.DEFAULT_ROUTE_LOGIN],
        [RouteHelper.getNameOfComponent(AboutUs)]: Navigation.routeGetRegistered()[RouteHelper.getNameOfComponent(AboutUs)],
        [RouteHelper.getNameOfComponent(License)]: Navigation.routeGetRegistered()[RouteHelper.getNameOfComponent(License)],
        [RouteHelper.getNameOfComponent(PrivacyPolicy)]: Navigation.routeGetRegistered()[RouteHelper.getNameOfComponent(PrivacyPolicy)],
        [RouteHelper.getNameOfComponent(TermsAndConditions)]: Navigation.routeGetRegistered()[RouteHelper.getNameOfComponent(TermsAndConditions)],
      },
      initialSearch
    );
    return loginScreens;
  }

  static isAnonymUserRoute(routeName){
    let anonymScreens = DefaultNavigation.getAnonymUserScreens({});
    for(let i = 0; i < anonymScreens.length; i++){
      if(anonymScreens[i].routeName === routeName){
        return true;
      }
    }
    return false;
  }

  static getScreensFor(registeredRoutes, initialSearch){
    let Drawer = RouteRegisterer.getDrawer();
    let renderedScreens = [];
    for(let routeKey in registeredRoutes){
      let routeInfo: RouteProps = registeredRoutes[routeKey];
      let component = routeInfo?.component;
      if(component){
        let template = routeInfo?.template;
        let screenContent = (props) => {
          return React.createElement(component, props)
        };
        if(!!template){
          screenContent = (props) => {
            let customProps = {};
            let renderedComponent = React.createElement(component, {...props, ...customProps})
            return React.createElement(template, {...props, ...customProps, children: renderedComponent})
          };
        }

        renderedScreens.push(
            <Drawer.Screen key={routeInfo?.path} name={routeInfo?.path} params={routeInfo?.params} initialParams={initialSearch} >
            {screenContent}
            </Drawer.Screen>
        );
      }}
    return renderedScreens;
  }

}
