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
exports.WebViewLogin = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const NavigatorHelper_1 = require("../navigation/NavigatorHelper");
const native_base_1 = require("native-base");
const FormButton_1 = require("../buttons/FormButton");
const SignOutButton_1 = require("./SignOutButton");
const App_1 = __importDefault(require("../App"));
const EmailLogin_1 = require("./EmailLogin");
const AuthProvidersLoginOptions_1 = require("./AuthProvidersLoginOptions");
const RegisteredRoutesMap_1 = require("../navigation/RegisteredRoutesMap");
const WebViewLogin = (props) => {
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
    }, []);
    function renderSignIn() {
        return (<native_base_1.View>
				<native_base_1.Text fontSize="4xl" fontWeight={800}>
					{"Sign in"}
				</native_base_1.Text>
			</native_base_1.View>);
    }
    function renderLoginOptions() {
        let user = props.user;
        if (!props.loaded) {
            return (<native_base_1.View style={{ flex: 1 }}>
					<native_base_1.View style={{ marginVertical: 20 }}></native_base_1.View>
					<native_base_1.Spinner />
					<native_base_1.View style={{ marginVertical: 20 }}></native_base_1.View>
				</native_base_1.View>);
        }
        if (!!user) {
            let identifier = user.email || user.first_name;
            return (<native_base_1.View style={{ flex: 1 }}>
					<native_base_1.View style={{ marginVertical: 20 }}></native_base_1.View>
					<native_base_1.Text><native_base_1.Text bold={true}>{identifier}</native_base_1.Text> is currentrly authenticated. If you recognize this account, press continue.</native_base_1.Text>
					<native_base_1.View style={{ marginVertical: 20 }}></native_base_1.View>
					<native_base_1.Flex direction={"row"} justify={"space-between"}>
						<SignOutButton_1.SignOutButton />
						<FormButton_1.FormButton onPress={async () => {
                    await NavigatorHelper_1.NavigatorHelper.navigate(RegisteredRoutesMap_1.RegisteredRoutesMap.getHome());
                    await App_1.default.setHideDrawer(false);
                    //
                }}>
							{"Continue"}
						</FormButton_1.FormButton>
					</native_base_1.Flex>
				</native_base_1.View>);
        }
        else {
            return (<>
					<EmailLogin_1.EmailLogin />
					<native_base_1.View style={{ marginVertical: 20 }}>
						<native_base_1.Divider />
					</native_base_1.View>
					<AuthProvidersLoginOptions_1.AuthProvidersLoginOptions />
				</>);
        }
    }
    return (<>
			{renderSignIn()}
			{renderLoginOptions()}
		</>);
};
exports.WebViewLogin = WebViewLogin;
