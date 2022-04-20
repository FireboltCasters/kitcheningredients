"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floaters = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const vector_icons_1 = require("@expo/vector-icons");
const ThemeChanger_1 = require("../theme/ThemeChanger");
const CustomFloaters_1 = __importDefault(require("./CustomFloaters"));
//TODO: https://docs.nativebase.io/stagger
const Floaters = () => {
    const { colorMode, toggleColorMode } = (0, native_base_1.useColorMode)();
    const renderedFab = <native_base_1.View key={"themeChangerFloater"} style={{
            position: "absolute",
            bottom: 16,
            right: 16
        }}>
			<ThemeChanger_1.ThemeChanger key={"FabKey"}>
				<native_base_1.View style={{
            padding: 16,
            borderRadius: 32
        }} _dark={{
            bg: 'orange.50',
        }} _light={{
            bg: 'blueGray.900',
        }} shadow={7}>
					<native_base_1.Icon as={vector_icons_1.Ionicons} _dark={{ name: 'sunny', color: 'orange.400' }} _light={{ name: 'moon', color: 'blueGray.100' }} size="md"/>
				</native_base_1.View>
			</ThemeChanger_1.ThemeChanger>
		</native_base_1.View>;
    const renderedContent = [
        renderedFab,
        ...CustomFloaters_1.default.getFloaters()
    ];
    return (<>
			{renderedContent}
		</>);
};
exports.Floaters = Floaters;
