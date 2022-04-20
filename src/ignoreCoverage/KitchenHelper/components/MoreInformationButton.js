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
exports.MoreInformationButton = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const vector_icons_1 = require("@expo/vector-icons");
const react_native_1 = require("react-native");
const MyAlertDialog_1 = require("../helper/MyAlertDialog");
const MoreInformationButton = (props) => {
    const [showmore, setShowmore] = (0, react_1.useState)(props.showmore || false);
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
    }, []);
    function renderAdvancedInformations() {
        let content = <native_base_1.TextArea h={"500px"} value={JSON.stringify(props.content, null, 4)} w={{
                base: "100%",
            }}/>;
        return (<native_base_1.View key={"" + showmore + props.key}>
				<react_native_1.TouchableOpacity onPress={() => {
                setShowmore(true);
            }}>
					<native_base_1.Text><native_base_1.Icon as={vector_icons_1.MaterialCommunityIcons} name={props.icon || "dots-horizontal"}/></native_base_1.Text>
				</react_native_1.TouchableOpacity>
				<MyAlertDialog_1.MyAlertDialog size={"full"} accept={"OK"} title={"More Informations"} content={content} onClose={() => { setShowmore(false); return false; }} onAccept={() => { setShowmore(false); return false; }} isOpen={showmore}/>
			</native_base_1.View>);
    }
    return renderAdvancedInformations();
};
exports.MoreInformationButton = MoreInformationButton;
