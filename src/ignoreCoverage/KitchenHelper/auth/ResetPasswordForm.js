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
exports.ResetPasswordForm = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const slider_1 = require("primereact/slider");
const Login_1 = require("./Login");
const FormButton_1 = require("../buttons/FormButton");
const InternalLink_1 = require("../navigation/InternalLink");
const ResetPasswordForm = (props) => {
    const token = props.token;
    let email = "yourEmail";
    const [resetInitiated, setResetInitiated] = (0, react_1.useState)(false);
    const [password, setPassword] = (0, react_1.useState)("");
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
    }, [p]);
    function resetPassword() {
    }
    return (<native_base_1.View>
			<native_base_1.Text fontSize="4xl" fontWeight={800}>
				{"Reset Password"}
			</native_base_1.Text>
			<native_base_1.FormControl isRequired>
				<native_base_1.View style={{ marginVertical: 10 }}>
					<native_base_1.Input isDisabled={true} value={email} size="lg"/>
				</native_base_1.View>
			</native_base_1.FormControl>
			<native_base_1.FormControl isRequired>
				<native_base_1.View style={{ marginVertical: 10 }}>
					<native_base_1.Input isDisabled={resetInitiated} onChange={(event) => {
            setPassword(event.target.value);
        }} type="password" value={password} placeholder="Password" size="lg"/>
				</native_base_1.View>
			</native_base_1.FormControl>
			<native_base_1.Flex direction={"row"} justify={"space-between"}>
				<FormButton_1.FormButton loading={resetInitiated} disabled={resetInitiated} onPress={() => { resetPassword(); }}>
					{"Reset"}
				</FormButton_1.FormButton>
				<slider_1.Slider onChange={(e) => { }}/>
				<InternalLink_1.InternalLink destination={Login_1.Login}>{"Sign In"}</InternalLink_1.InternalLink>
			</native_base_1.Flex>
		</native_base_1.View>);
};
exports.ResetPasswordForm = ResetPasswordForm;
