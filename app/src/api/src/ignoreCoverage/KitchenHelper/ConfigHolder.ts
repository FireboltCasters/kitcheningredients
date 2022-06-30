// @ts-nocheck

import type {PluginInterface} from "./PluginInterface";
import {DefaultStorage} from "./storage/DefaultStorage";
import App from "./App";

export class ConfigHolder{

  static storage: DefaultStorage = null;
  static displayThemeFloater: boolean = true;
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
  static autoLogin: boolean = false;

}
