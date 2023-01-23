// @ts-nocheck
import {BaseTemplate, ConfigHolder, MenuItem, Navigation} from "../../../../../api/src";
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

  static async registerRoutesAndMenus(user, role, permissions){
    Navigation.menusResetRegistered();
    Navigation.routesResetRegistered();

    DefaultNavigation.registerDefaultRoutes(user, role, permissions);
    DefaultNavigation.registerLegalRequirements();
    if(!!ConfigHolder.plugin){
      await ConfigHolder.plugin.registerRoutes(user, role, permissions);
    }
  }

  static registerDefaultRoutes(user, role, permissions){
    let loginRoute = Navigation.routeRegister({
      component: Login,
      template: LoginTemplate,
    })

    let homeRoute = Navigation.routeRegister({
      component: Home,
      template: BaseTemplate,
    })

    if(!user){
      let loginMenu = MenuItem.fromRoute(loginRoute)
      loginMenu.position = 1000;
      Navigation.menuRegister(MenuItem.fromRoute(loginRoute))
    } else {
      //Navigation.menuRegister(MenuItem.fromRoute(homeRoute))
    }
  }

  static registerLegalRequirements(){

    let routes = Navigation.routesRegisterMultipleFromComponents(
      [
        AboutUs,
        License,
        PrivacyPolicy,
        TermsAndConditions
      ],
      BaseTemplate
    )

    let legalRequirementsMenu = new MenuItem({
      key: Navigation.DEFAULT_MENU_KEY_LEGAL_REQUIREMENTS,
      label: "Legal Requirements",
      position: -1000
    });
    legalRequirementsMenu.addChildMenuItems(MenuItem.fromRoutes(routes));
    console.log("legalRequirementsMenu", legalRequirementsMenu);
    Navigation.menuRegister(legalRequirementsMenu);
  }



  static getAllScreens(initialSearch){
    let registeredRoutes = Navigation.routeGetRegistered();
    return DefaultNavigation.getScreensFor(registeredRoutes, initialSearch);
  }

  private static getRegisteredRouteForScreenByComponent(component){
    return(
      {
        [RouteHelper.getNameOfComponent(component)]: Navigation.routeGetRegistered()[RouteHelper.getNameOfComponent(component)]
      }
    )
  }

  private static getRegisteredRoutesForScreenByComonents(...components){
    let registeredRoutes = {};
    for(let i = 0; i < components.length; i++){
      registeredRoutes = {
        ...registeredRoutes,
        ...DefaultNavigation.getRegisteredRouteForScreenByComponent(components[i])
      }
    }
    return registeredRoutes;
  }

  static getAnonymUserScreens(initialSearch){
    let loginScreens = DefaultNavigation.getScreensFor(
      {
        [Navigation.DEFAULT_ROUTE_LOGIN]: Navigation.routeGetRegistered()[Navigation.DEFAULT_ROUTE_LOGIN],
        ...DefaultNavigation.getRegisteredRoutesForScreenByComonents(AboutUs, License, PrivacyPolicy, TermsAndConditions)
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
            <Drawer.Screen key={routeInfo?.path} name={routeInfo?.path} params={routeInfo?.params} initialParams={initialSearch}>
            {screenContent}
            </Drawer.Screen>
        );
      }}
    return renderedScreens;
  }

}
