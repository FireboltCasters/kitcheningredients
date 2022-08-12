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

<details>
<summary>Using App-Template</summary>
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

registerRootComponent(App);
```
</details>

<details>
<summary>Server-API - Get Directus Client</summary>
You can create, update or delete items in your collection of your directus server.
Therefore ServerAPI is neeeded. You will receive a directus instance. More informations can be found here: https://docs.directus.io/reference/sdk/#items

```tsx
import {ServerAPI} from "kitcheningredients";

export const TestDownload = (props) => {
  async function download(){
    let directus = ServerAPI.getClient();
    const articles = await directus.items('articles').readByQuery({});
  }
}
```
</details>


<details>
<summary>User and Role</summary>

To get the logged in user and corresponding role you can use:

```tsx
import {ConfigHolder} from "kitcheningredients";

let roleInstance = ConfigHolder.instance.getRole();
let userInstance = ConfigHolder.instance.getUser();
```
</details>

<details>
<summary>Register Routes and Menus</summary>

```tsx

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


A route with paramters can be registered like this:

```tsx
Menu.registerRoute(MealOfferList, EmptyTemplate, "Mealsoffers", "mealoffers", "/:canteenid/:date");
```

After that you can access your route params like this:

```tsx
let params = props?.route?.params;
```


Role specific menus can be also registered:

```tsx
import {MenuItem} from "kitcheningredients"
...
let menu = new MenuItem("ExampleItem", "ExampleItem", Example)

Menu.registerCommonMenu(menu); //Menu everyone can see
Menu.registerUnauthenticatedMenu(menu) //Menu unauthenticated users can see
Menu.registerAuthenticatedMenu(menu); //Menu authenticated users can see

Menu.registerMenuForRoleId("8cse873gbsbefu...", menu); //Menu only user with role id can see

//Attention! Multiple roles can have the same name
Menu.registerUnsafeMenuForRoleByName("Moderator", menu); //Menu only user with role which name is can see
```
</details>


<details>
<summary>MenuItem</summary>

```tsx
let menu = new MenuItem(
  key, // string: define a unique string for the menu item
  label, //string: The displayed label
  destination, //[default null] FunctionComponent: which was registered
  items=null, //[default null] sub menu list
  command=null, //[default null] function:  will be called on selection
  content=null, //[default null] JSX.Element: If no sub menus given, content will be shown
  expanded=false, //[default false] boolean: if sub menus will be shown directly
  customIcon //[can be null] string or function (string: MaterialCommunity Icon name) (function: (menu, hasChildren, expanded, props.level))
);
```

</details>


<details>
<summary>Route-Templates</summary>

During the registering of your screens/routes you can add a template. Typicly you will use the `BaseTemplate`.

```tsx
export default class Project implements PluginInterface {
    registerRoutes() {
      Menu.registerRoute(Example, <TEMPLATE>, "Example", "example");
    }
}
```

- `BaseTemplate`: Includes `BaseNoPaddingTemplate` and adds a `BasePadding`
  - Usecase: You want to show text or a standard component
  - `BasePadding`: Not a template but adds the base padding
- `BaseNoPaddingTemplate`: Includes `BaseNoPaddingTemplate` and a Scrollview with breakpoint layout for different screen sizes
  - Usecase: You want to scroll and use your own padding added but dont want to rerender for every screen change
- `BaseNoScrollTemplate`: Full width and height with basic title and drawer button without scrolling
  - Usecase: You want to implement a different scroll direction but want the drawer and title
- `EmptyTemplate`: Nothing but the props: `height` and `width` to all children
  - Usecase: You want to show a fullscreen map and dont want the drawer or title

</details>


<details>
<summary>Layout</summary>

Remember you can use `Route-Templates` as your basic "Layout" or template for you content.
If you want to get informations about the Layout of your screen you can use the following informations.

```tsx
import {Layout} from "kitcheningredients"

export const MyFunctionComponent = (props) => {

    //boolean: true if using a small device
    let isSmallDevice = Layout.usesSmallDevice(); //triggers rerendering on change

    //number|string get the witdh of the content (e. G. "100%" or 700, ...)
    let contentWidth = Layout.useBaseTemplateContentWidth(); //triggers rerendering on change

    //get a dict with the layout sizes for different screen sizes
    let rawWidthValues = Layout.getRawWidthValues()
}
```

If you want variables depending on the screen size you can use `useBreakpointValue`.
Get more informations at: https://docs.nativebase.io/3.4.x/use-breakpoint-value

Example from NativeBase, where you can get either a row or a column value depending on the screen size:
```tsx
import {useBreakpointValue} from "native-base";

export const MyFunctionComponent = (props) => {
  const flexDir = useBreakpointValue({
    base: "column",
    lg: "row"
  });

}
```


</details>

<details>
<summary>Navigation</summary>

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

TODO: navigateWithoutParams

TODO: toggleDrawer
TODO: openDrawer
TODO: closeDrawer
TODO: goBack
TODO: getRouteParams
TODO: navigateHome


</details>


# Auth

Authentication is done by the template. If you want to get the directus client, please read `Server-API` abouve.

<details>
<summary>Mail Register</summary>

In order to allow users self registration follow these steps:

1. Directus => Settings => Roles & Permissions => Role `Public` allow to create `Directus_users` (expand at bottom) atleast `email` and `password`
2. [Optional] Set desired default role (<YOUR_DEFAULT_ROLE_ID>): Directus => Settings => Roles & Permissions => Role `Public` => create `Directus_users`  => Field Presets => ```{"role": "<YOUR_DEFAULT_ROLE_ID>"}```
3. Enable in your frontend app the button (in the index.js / index.web.js)
```ts
ConfigHolder.showMailLogin = true; //has to be enabled
ConfigHolder.showMailRegister = true;
```
</details>



## Components



<details>
<summary>Icon</summary>
A wrapper for NativeBase Icons: https://docs.nativebase.io/3.4.x/icon
Default Icon will be MaterialCommunity. You can see all icons at: https://icons.expo.fyi/

Default Icons
```tsx
import {Icon} from "kitcheningredients";
return (<Icon name={"account"} />) //Default MaterialIcons
```

Color and size
```tsx
import {Icon} from "kitcheningredients";
return (<Icon name={"account"} color={"#FF0000"} size={"sm"} />) //Default MaterialIcons
```

More Icons
```tsx
import {Ionicons} from "@expo/vector-icons";
import {Icon} from "kitcheningredients";
return (<Icon name={"account"} as={Ionicons} />)
```
</details>


<details>
<summary>TextWithIcon</summary>

```tsx
import {TextWithIcon} from "kitcheningredients";
return (<TextWithIcon icon={"account"} content={"String"} />)
```
</details>


<details>
<summary>DirectusImage</summary>

If you want to display an image from directus, like a mealImage or a user uploaded picture.

```tsx
import {DirectusImage} from "kitcheningredients";

let myImageId = "sfsf6sef..."; //an image id you received
return (<DirectusImage assetId={myImageId} onPress={() => {console.log("Yeah!")}} />)
```

- assetId: string;
  - The string of the immage id
- alt?: string;
  - an alternative information if the image cant be shown
- url?: string;
  - optional you can provide an url of an image from a different host like google,...
- style?: any;
  - Styling object
- showLoading?: boolean
  - default: true (shows a loading skeleton)
- isPublic?: boolean
  - if the image resource is accessable for the public without authentication
- onPress?: () => {}
  - A function which will be called on press

</details>

TODO: CrossLottie


<details>
<summary>KitchenSkeleton</summary>

You can use the KitchenSkeleton to show loading content. It will occupy the used space. More information at: https://docs.nativebase.io/3.4.x/skeleton#page-title

```tsx
import {KitchenSkeleton} from "kitcheningredients";
return (<KitchenSkeleton flex={1} />)
```
</details>

TODO: ThemedMarkdown
TODO: DirectusMarkdown
TODO: DirectusSingletonMarkdown

TODO: MyThemedBox

TODO: CustomFloaters

### Created with

Builder Bob: https://github.com/callstack/react-native-builder-bob

## Contributors

The FireboltCasters

<a href="https://github.com/FireboltCasters/kitcheningredients"><img src="https://contrib.rocks/image?repo=FireboltCasters/kitcheningredients" alt="Contributors" /></a>
