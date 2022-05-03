/**
 * This file handles iOS and Android Builds
 * If you want to adapt the Web-App Entryfile open: index.web.js
 */
import { registerRootComponent } from 'expo';
import codePush from "react-native-code-push";
import {CodePushWrapper} from "kitcheningredients";
import configIgnoreLogs from "./configIgnoreLogs.json";
import {App, ConfigHolder} from 'kitcheningredients'
import {Platform, LogBox} from "react-native";
import * as SplashScreen from 'expo-splash-screen';

import {MyDirectusStorageNative} from "kitcheningredients/lib/module/ignoreCoverage/KitchenHelper/storage/MyDirectusStorageNative";
import Project from "./src/project/Project";
import nativebaseConfig from "./nativebase.config";
import styleConfig from "./styleConfig.json";
import config from "./config.json";
import currentpackageJson from "./package.json";
import currentpackageJsonLock from "./package-lock.json";
import thirdpartyLicense from "./thirdpartyLicense.json"
import AppConfig from "./app.config"

ConfigHolder.storage = new MyDirectusStorageNative();
ConfigHolder.plugin = new Project();
ConfigHolder.nativebaseConfig = nativebaseConfig
ConfigHolder.styleConfig = styleConfig
ConfigHolder.config = config
ConfigHolder.currentpackageJson = currentpackageJson
ConfigHolder.currentpackageJsonLock = currentpackageJsonLock
ConfigHolder.thirdpartyLicense = thirdpartyLicense
ConfigHolder.AppConfig = AppConfig

async function main() {
    if (!!config.logs && config.logs.hideDefaultWarnings) {
        LogBox.ignoreLogs(configIgnoreLogs);
    }

    let isIOS = Platform.OS === "ios";
    console.log("Platform: " + Platform.OS);

    const codepushConfig = config.codepush || {};
    const codepushActive = codepushConfig.active || false;
    const deploymentType = codepushConfig.deploymentType || null;
    const deploymentKeys = codepushConfig.keys || {};
    let deploymentKeysForOS = isIOS ? deploymentKeys["ios"] : deploymentKeys["android"];
    if (!deploymentKeysForOS) {
        deploymentKeysForOS = {};
    }
    let deploymentKey = null;
    if (!!deploymentType) {
        deploymentKey = deploymentKeysForOS[deploymentType];
    }

    console.log("codepushActive: " + codepushActive);
    console.log("deploymentType: " + deploymentType);
    console.log("deploymentKey: " + deploymentKey);

    if (!!codepushActive && !!deploymentType && !!deploymentKey) { //if codepush is used
        const FREQUENCY = codePush.CheckFrequency.ON_APP_RESUME
        const codePushOptions = {
            deploymentKey: deploymentKey,
            checkFrequency: FREQUENCY,
            installMode: codePush.InstallMode.ON_NEXT_RESUME,
        }

        // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
        // It also ensures that whether you load the app in the Expo client or in a native build,
        // the environment is set up appropriately
        SplashScreen.preventAutoHideAsync();
        registerRootComponent(codePush(codePushOptions)(CodePushWrapper));
    } else {
        // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
        // It also ensures that whether you load the app in the Expo client or in a native build,
        // the environment is set up appropriately
        registerRootComponent(App);
    }
}
main();