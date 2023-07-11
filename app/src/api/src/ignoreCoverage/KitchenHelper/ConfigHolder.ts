// @ts-nocheck

import type {PluginInterface} from "./PluginInterface";
import App from "./App";

export class ConfigHolder{

  static advancedSettings: any;
  // loadedHeaderInitialState;
  // loadedContentInitialState;


  static useCookiePolicy: boolean = true;
  static displayThemeFloater: boolean = false;
  static instance: App = null;
  static plugin: PluginInterface = null;
  static nativebaseConfig = null;
  static styleConfig = null;
  static config = null;
  static currentpackageJson = null;
  static currentpackageJsonLock = null;
  static thirdpartyLicense = null;
  static AppConfig = null;
  static CustomDirectusTypes: any = null;

  static showMailLogin: boolean = true;
  static showMailRegister: boolean = false;
  static showExternalLogins: boolean = true;
  static showGuestLogin: boolean = false;
  static startAsGuest: boolean = false;
  static autoLogin: boolean = false;

  static prefixes: string[] = [];

}
