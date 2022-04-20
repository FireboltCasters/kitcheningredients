"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_1 = require("@react-navigation/native");
const native_base_1 = require("native-base");
const EnviromentHelper_1 = __importDefault(require("../EnviromentHelper"));
const NavigatorHelper_1 = require("./NavigatorHelper");
const RegisteredRoutesMap_1 = require("./RegisteredRoutesMap");
const App_1 = __importDefault(require("../App"));
const Root = (props) => {
    const [lightBg, darkBg] = (0, native_base_1.useToken)('colors', [App_1.default.styleConfig.backgroundColor.light, App_1.default.styleConfig.backgroundColor.dark], 'blueGray.900');
    const bgColor = (0, native_base_1.useColorModeValue)(lightBg, darkBg);
    react_1.default.useEffect(() => {
        return () => {
            NavigatorHelper_1.isReadyRef.current = false;
        };
    }, []);
    let subroute = "myapp/app/";
    try {
        let basePath = EnviromentHelper_1.default.getBasePath();
        subroute = basePath;
    }
    catch (err) {
        console.log("Trying to get Basepath");
        console.log(err);
    }
    let prefixes = ["myapp:///"];
    const linking = RegisteredRoutesMap_1.RegisteredRoutesMap.getRouteLinkingConfig(subroute, prefixes);
    return (<native_1.NavigationContainer ref={NavigatorHelper_1.navigationRef} onReady={() => {
            NavigatorHelper_1.isReadyRef.current = true;
        }} 
    // @ts-ignore //this is correct
    linking={linking} theme={{
            // @ts-ignore
            colors: { background: bgColor },
        }}>
			<native_base_1.View style={{ flex: 1, width: "100%", backgroundColor: bgColor }}>
				{props.children}
			</native_base_1.View>
		</native_1.NavigationContainer>);
};
exports.Root = Root;
