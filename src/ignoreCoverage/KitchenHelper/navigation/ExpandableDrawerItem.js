"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandableDrawerItem = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const drawer_1 = require("@react-navigation/drawer");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const MyThemedBox_1 = require("../helper/MyThemedBox");
const vector_icons_1 = require("@expo/vector-icons");
const ExpandableDrawerItem = (props) => {
    const handlePress = props.onPress;
    const [expanded, setExpanded] = (0, react_1.useState)(props.expanded);
    function renderExpandIcon() {
        if (!props.hasChildren) {
            return <native_base_1.Icon as={vector_icons_1.MaterialCommunityIcons} name={"circle-small"}/>;
        }
        if (expanded) {
            return <native_base_1.Icon as={vector_icons_1.MaterialCommunityIcons} name={"chevron-down"}/>;
        }
        else {
            return <native_base_1.Icon as={vector_icons_1.MaterialCommunityIcons} name={"chevron-right"}/>;
        }
    }
    async function handleOnPress() {
        setExpanded(!expanded);
        if (!!handlePress) {
            await handlePress(!expanded);
        }
    }
    function renderContent() {
        if (!expanded) {
            return null;
        }
        return (<native_base_1.View style={{ paddingLeft: 15 }}>
                <drawer_1.DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }}>
                    {props.children}
                </drawer_1.DrawerContentScrollView>
            </native_base_1.View>);
    }
    return (<native_base_1.View style={{ width: "100%" }}>
            <MyThemedBox_1.MyThemedBox _shadeLevel={props.level} style={{ width: "100%" }}>
                <react_native_1.TouchableOpacity onPress={handleOnPress} style={{ padding: 8 }}>
                    <native_base_1.View style={{ flexDirection: "row", alignItems: "center" }}>
                        {renderExpandIcon()}
                        {props.label()}
                    </native_base_1.View>
                </react_native_1.TouchableOpacity>
                {renderContent()}
            </MyThemedBox_1.MyThemedBox>
        </native_base_1.View>);
};
exports.ExpandableDrawerItem = ExpandableDrawerItem;
