<h2 align="center">
    kitcheningredients
</h2>

<p align="center">
  <a href="https://badge.fury.io/js/kitcheningredients.svg"><img src="https://badge.fury.io/js/kitcheningredients.svg" alt="npm package" /></a>
  <a href="https://img.shields.io/github/license/FireboltCasters/kitcheningredients"><img src="https://img.shields.io/github/license/FireboltCasters/kitcheningredients" alt="MIT" /></a>
  <a href="https://img.shields.io/github/last-commit/FireboltCasters/kitcheningredients?logo=git"><img src="https://img.shields.io/github/last-commit/FireboltCasters/kitcheningredients?logo=git" alt="last commit" /></a>
  <a href="https://www.npmjs.com/package/kitcheningredients"><img src="https://img.shields.io/npm/dm/kitcheningredients.svg" alt="downloads week" /></a>
  <a href="https://www.npmjs.com/package/kitcheningredients"><img src="https://img.shields.io/npm/dt/kitcheningredients.svg" alt="downloads total" /></a>
  <a href="https://github.com/FireboltCasters/kitcheningredients"><img src="https://shields.io/github/languages/code-size/FireboltCasters/kitcheningredients" alt="size" /></a>
  <a href="https://david-dm.org/FireboltCasters/kitcheningredients"><img src="https://david-dm.org/FireboltCasters/kitcheningredients/status.svg" alt="dependencies" /></a>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FFireboltCasters%2Fkitcheningredients?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FFireboltCasters%2Fkitcheningredients.svg?type=shield"/></a>
  <a href="https://github.com/google/gts" alt="Google TypeScript Style"><img src="https://img.shields.io/badge/code%20style-google-blueviolet.svg"/></a>
  <a href="https://shields.io/" alt="Google TypeScript Style"><img src="https://img.shields.io/badge/uses-TypeScript-blue.svg"/></a>
  <a href="https://github.com/marketplace/actions/lint-action"><img src="https://img.shields.io/badge/uses-Lint%20Action-blue.svg"/></a>
</p>

<p align="center">
  <a href="https://github.com/FireboltCasters/kitcheningredients/actions/workflows/npmPublish.yml"><img src="https://github.com/FireboltCasters/kitcheningredients/actions/workflows/npmPublish.yml/badge.svg" alt="Npm publish" /></a>
  <a href="https://github.com/FireboltCasters/kitcheningredients/actions/workflows/linter.yml"><img src="https://github.com/FireboltCasters/kitcheningredients/actions/workflows/linter.yml/badge.svg" alt="Build status" /></a>
<!--
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_kitcheningredients"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_kitcheningredients&metric=alert_status" alt="Quality Gate" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_kitcheningredients"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_kitcheningredients&metric=bugs" alt="Bugs" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_kitcheningredients"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_kitcheningredients&metric=coverage" alt="Coverage" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_kitcheningredients"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_kitcheningredients&metric=code_smells" alt="Code Smells" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_kitcheningredients"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_kitcheningredients&metric=duplicated_lines_density" alt="Duplicated Lines (%)" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_kitcheningredients"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_kitcheningredients&metric=sqale_rating" alt="Maintainability Rating" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_kitcheningredients"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_kitcheningredients&metric=reliability_rating" alt="Reliability Rating" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_kitcheningredients"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_kitcheningredients&metric=security_rating" alt="Security Rating" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_kitcheningredients"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_kitcheningredients&metric=sqale_index" alt="Technical Debt" /></a>
  <a href="https://sonarcloud.io/dashboard?id=FireboltCasters_kitcheningredients"><img src="https://sonarcloud.io/api/project_badges/measure?project=FireboltCasters_kitcheningredients&metric=vulnerabilities" alt="Vulnerabilities" /></a>
-->
</p>

## About

Helper for a base app template with a Directus Backend based on NativeBase. Written for React Web & React Native. Designed for an expo app.

- Login System to Directus
- React & React Native (expo)
- Based on NativeBase
- Synchronised States
- Synchronised Storage
- Easy Routing
- Lottie Files

## Installation

```sh
npm install kitcheningredients
```

## Usage

Adapt the index.web.js from your expo web project. Register your Plugin.
```js
import { registerRootComponent } from 'expo';
import {App, ConfigHolder} from 'kitcheningredients'
import {MyDirectusStorage} from "kitcheningredients/lib/module/ignoreCoverage/KitchenHelper/storage/MyDirectusStorage";
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

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
```

## Register Routes

```ts

import {Example} from "./screens/example/Example";
import {BaseTemplate, PluginInterface, Menu, MenuItem} from "kitcheningredients";

export default class Project implements PluginInterface {

    //...

  registerRoutes() {
      //Register your screen with the BaseTemplate or any other you like
      Menu.registerRoute(Example, BaseTemplate, "Example", "example");
      let myMenu = new MenuItem("ExampleMenu", "ExampleMenu", null, null, null, null, true);
      Menu.registerCommonMenu(myMenu);
      myMenu.addChildMenuItems(new MenuItem("ExampleItem", "ExampleItem", Example));
  }

}
```

## Get Directus Client

```ts

import {ServerAPI} from "kitcheningredients";

export const Example = (props) => {

    let directus = ServerAPI.getClient();
    // you can use your directus instance now
}
```

## Navigation

```ts

import {NavigatorHelper} from "kitcheningredients";
import {Example} from "./screens/example/Example";

export const Tutorial = (props) => {

    // on button press
    function onPress(){
      // navigate to registered component
      NavigatorHelper.navigate(Example, newProps, resetHistory);

      // or navigate to a route
      NavigatorHelper.navigateToRouteName(routeName, newProps, resetHistory)
    }

}
```

# Auth

## Mail Register

In order to allow users self registration follow these steps:

1. Directus => Settings => Roles & Permissions => Role `Public` allow to create `Directus_users` (expand at bottom) atleast `email` and `password`
2. [Optional] Set desired default role (<YOUR_DEFAULT_ROLE_ID>): Directus => Settings => Roles & Permissions => Role `Public` => create `Directus_users`  => Field Presets => ```{"role": "<YOUR_DEFAULT_ROLE_ID>"}```
3. Enable in your frontend app the button (in the index.js / index.web.js)
```ts
ConfigHolder.showMailLogin = true; //has to be enabled
ConfigHolder.showMailRegister = true;
```



### Created with

Builder Bob: https://github.com/callstack/react-native-builder-bob

## Contributors

The FireboltCasters

<a href="https://github.com/FireboltCasters/kitcheningredients"><img src="https://contrib.rocks/image?repo=FireboltCasters/kitcheningredients" alt="Contributors" /></a>
