"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const vector_icons_1 = require("@expo/vector-icons");
class ShowMoreGradientPlaceholder extends react_1.default.Component {
    render() {
        return (<native_base_1.View style={{ opacity: 0 }}>
					<native_base_1.Box style={{ padding: 12 }}>
						<native_base_1.Icon as={vector_icons_1.Ionicons} _dark={{ name: 'sunny', color: 'orange.400' }} _light={{ name: 'moon', color: 'blueGray.100' }} size="md"/>
						<native_base_1.Icon as={vector_icons_1.Ionicons} _dark={{ name: 'sunny', color: 'orange.400' }} _light={{ name: 'moon', color: 'blueGray.100' }} size="md"/>
					</native_base_1.Box>
			</native_base_1.View>);
    }
}
exports.default = ShowMoreGradientPlaceholder;
