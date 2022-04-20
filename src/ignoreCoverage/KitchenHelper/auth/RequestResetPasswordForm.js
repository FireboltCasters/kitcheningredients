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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestResetPasswordForm = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const Login_1 = require("./Login");
const FormButton_1 = require("../buttons/FormButton");
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const URL_Helper_1 = require("../helper/URL_Helper");
const InternalLink_1 = require("../navigation/InternalLink");
const RequestResetPasswordForm = (props) => {
    const [email, setEmail] = (0, react_1.useState)("");
    const [validEmail, setValidEmail] = (0, react_1.useState)(undefined);
    const [resetInitiated, setResetInitiated] = (0, react_1.useState)(false);
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
    }, []);
    async function requestPasswordReset() {
        console.log("requestPasswordReset");
        if (!resetInitiated) {
            await setResetInitiated(true);
            try {
                console.log("Send reset request");
                let directus = ServerAPI_1.default.getPublicClient();
                let url = URL_Helper_1.URL_Helper.getCurrentLocationWithoutQueryParams();
                url = "https://localhost:19006/myapp/app/reset-password";
                let answer = await directus.auth.password.request(email, url // In this case, the link will be https://myapp.com?token=FEE0A...
                );
            }
            catch (err) {
                console.log(err);
            }
            finally {
                await setResetInitiated(false);
            }
        }
    }
    return (<native_base_1.View>
			<native_base_1.Text fontSize="4xl" fontWeight={800}>
				{"Reset Password"}
			</native_base_1.Text>
			<native_base_1.FormControl isRequired>
				<native_base_1.View style={{ marginVertical: 10 }}>
					<native_base_1.Input onChange={(event) => {
            setEmail(event.target.value);
        }} type="email" value={email} placeholder="Email" size="lg"/>
				</native_base_1.View>
			</native_base_1.FormControl>
			<native_base_1.Flex direction={"row"} justify={"space-between"}>
				<FormButton_1.FormButton disabled={resetInitiated} onPress={() => { requestPasswordReset(); }}>
					{"Reset"}
				</FormButton_1.FormButton>
				<InternalLink_1.InternalLink destination={Login_1.Login}>{"Sign In"}</InternalLink_1.InternalLink>
			</native_base_1.Flex>
		</native_base_1.View>);
};
exports.RequestResetPasswordForm = RequestResetPasswordForm;
