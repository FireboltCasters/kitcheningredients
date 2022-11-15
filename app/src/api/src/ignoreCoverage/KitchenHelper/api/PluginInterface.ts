import { UserItem, RoleItem, PermissionItem } from '@directus/sdk';
import { ColorMode } from 'native-base';
import React from 'react';
import Routes from './Routes';

export abstract class PluginInterface {
  /**
   * This function is called when the app has just initialized and started.
   * At this point, the user is not necessarily logged in.
   */
  initApp() {}

  /**
   * This function is called when a user has just logged in. Use this callback
   * to handle user specific stuff
   *
   * @param user current user
   * @param role current user role
   * @param permissions all permissions
   */
  onLogin(user: UserItem, role: RoleItem, permissions: PermissionItem[]) {}

  /**
   * The returned component is called once after a user has logged in. Use this
   * callback to load resources from a server that need authentication to access
   */
  getSyncComponent(setSyncFinished: () => void): React.FC | null {
    return null;
  }

  /**
   * The returned component is called after loading all resources (syncComponent)
   * and before the app is eventually displayed. Use this callback to register
   * all routes and menu items of the app
   */
  getRouteLoaderComponent(setFinished: () => void, routes: Routes): React.FC | null {
    return null;
  }

  /**
   * Specify a custom component to be shown when the application is loading
   */
  getLoadingComponent(): React.FC | null {
    return null;
  }

  /**
   * This component is called every render cycle to check if the data model is
   * still valid. If not, an appropriate action such as rerouting should be taken
   *
   * @param props optional props to pass on
   */
  getRootComponent(props: any): React.FC | null {
    return null;
  }

  onLogout(error) {

  }

  getSyncedStateKeysClass() {
    return null;
  }

  getStorageKeysClass() {
    return null;
  }

  getAboutUsComponent() {
    return null;
  }

  getPrivacyPolicyComponent() {
    return null;
  }

  getTermsAndConditionsComponent() {
    return null;
  }

  getHomeComponent() {
    return null;
  }

  getSettingsComponent() {
    return null;
  }

  renderCustomAuthProviders(serverInfo): [] {
    return null;
  }

  renderCustomUserAvatar(user: UserItem): JSX.Element {
    return null;
  }

  getOverwriteTheme(): ColorMode {
    return null;
  }
}
