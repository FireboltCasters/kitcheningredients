import { registerRootComponent } from 'expo';

import {ConfigHolder} from "kitcheningredients";
import App from './src/App';

ConfigHolder.setTest({"a": "Works"});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
