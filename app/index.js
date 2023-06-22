/**
 * This file handles Web-App Builds
 * If you want to adapt the iOS and Android Entryfile open: index.js
 */

import * as SplashScreen from 'expo-splash-screen';
import {Platform} from "react-native";
import codePush from "react-native-code-push";

import { registerRootComponent } from 'expo';
import {App, ConfigHolder, MyDirectusStorage} from 'kitcheningredients'
import Project from "./src/project/Project";
import nativebaseConfig from "./nativebase.config";
import styleConfig from "./styleConfig.json";
import config from "./config.json";
import currentpackageJson from "./package.json";
import currentpackageJsonLock from "./package-lock.json";
import thirdpartyLicense from "./thirdpartyLicense.json"
import AppConfig from "./app.config"

ConfigHolder.storage = new MyDirectusStorage();
ConfigHolder.plugin = new Project()
ConfigHolder.nativebaseConfig = nativebaseConfig
ConfigHolder.styleConfig = styleConfig
ConfigHolder.config = config
ConfigHolder.currentpackageJson = currentpackageJson
ConfigHolder.currentpackageJsonLock = currentpackageJsonLock
ConfigHolder.thirdpartyLicense = thirdpartyLicense
ConfigHolder.AppConfig = AppConfig

ConfigHolder.displayThemeFloater = true;
ConfigHolder.showMailLogin = true;
ConfigHolder.showMailRegister = true;
ConfigHolder.showExternalLogins = true;
ConfigHolder.showGuestLogin = true;
ConfigHolder.autoLogin = true;

async function main() {
  registerRootComponent(App);
}

main();

//registerRootComponent(App);
