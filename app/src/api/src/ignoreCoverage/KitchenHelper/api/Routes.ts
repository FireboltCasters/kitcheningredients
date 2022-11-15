import React from 'react';
import MenuItem from './MenuItem';

export interface RouteLink {
  component: React.FC;        // top level component of route screen
  template?: React.FC;        // template to use for the route screen
  route: string;              // full route, for example 'contracts/timesheets'
  params: string;             // optional route parameters
  title: string | React.FC;   // title of the route to be displayed
}

export interface NavigateOptions {
  additionalParams?: { [key: string]: any };
  keepOldParams?: boolean;
  resetHistory?: boolean;
}

export default class Routes {

  /**
   * Navigate to a different top level component that has been registered with
   * a route
   *
   * @param registeredComponent top level component to be routed to
   * @param options optional routing options
   */
  static navigate(registeredComponent: React.FC, options?: NavigateOptions) {

  }

  /**
   * Register a new route for the application
   *
   * @param link route to be registered
   */
  registerRoute(link: RouteLink) {

  }

  /**
   * Register a new sidebar menu item for the application
   *
   * @param menu menu item to be registered
   */
  registerMenu(menu: MenuItem) {

  }

  /**
   * Register a default template that is used if no template is specified when
   * registering a route
   *
   * @param component default template component
   */
  registerDefaultTemplate(component: React.FC) {

  }
}
