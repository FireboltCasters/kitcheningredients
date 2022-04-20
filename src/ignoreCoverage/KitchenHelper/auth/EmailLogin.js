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
exports.EmailLogin = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const NavigatorHelper_1 = require("../navigation/NavigatorHelper");
const Login_1 = require("./Login");
const EnviromentHelper_1 = __importDefault(require("../EnviromentHelper"));
const native_base_1 = require("native-base");
const InternalLink_1 = require("../navigation/InternalLink");
const ResetPassword_1 = require("./ResetPassword");
const FormButton_1 = require("../buttons/FormButton");
const showResetPassword = false;
const showEmailLogin = true;
const EmailLogin = (props) => {
    const markerRef = react_1.default.createRef();
    const [reloadnumber, setReloadnumber] = (0, react_1.useState)(0);
    const [loginInitiated, setLoginInitiated] = (0, react_1.useState)(false);
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    async function handleLoginWithEmail() {
        await setLoginInitiated(true);
        try {
            let directus = ServerAPI_1.default.getPublicClient();
            let response = await directus.auth.login({
                email: email,
                password: password //'d1r3ctu5',
            });
            let token = response.refresh_token;
            NavigatorHelper_1.NavigatorHelper.navigate(Login_1.Login, { [EnviromentHelper_1.default.getDirectusAccessTokenName()]: token });
        }
        catch (err) {
            console.log(err);
            setLoginInitiated(false);
        }
        finally {
        }
    }
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
    }, []);
    function renderInvisibleForm() {
        let output = [];
        output.push(<input className='form-control' name={"email"} value={email}/>);
        output.push(<input className='form-control' name={"password"} value={password}/>);
        return (<div key={reloadnumber} style={{ display: "none" }}>
				<form ref={markerRef} action={"/"} method="post">
					{output}
					<input type='submit' className='btn btn-success'/>
				</form>
			</div>);
    }
    function renderResetPasswordButton() {
        if (showResetPassword) {
            return (<InternalLink_1.InternalLink destination={ResetPassword_1.ResetPassword}>{"Forgot Password"}</InternalLink_1.InternalLink>);
        }
        return null;
    }
    function renderEmailLogin() {
        if (showEmailLogin) {
            return (<>
					<native_base_1.FormControl isRequired>
						<native_base_1.View style={{ marginVertical: 10 }}>
							<native_base_1.Input isDisabled={loginInitiated} nativeID={"username"} type={"email"} 
            //TODO extract the on change method to an extra class to call the callback
            onChange={async (event) => {
                    setEmail(event.nativeEvent.text);
                }} placeholder="Email" size="lg"/>
						</native_base_1.View>
					</native_base_1.FormControl>
					<native_base_1.FormControl isRequired>
						<native_base_1.View style={{ marginVertical: 10 }}>
							<native_base_1.Input isDisabled={loginInitiated} nativeID={"password"} type={"password"} onChange={(event) => {
                    setPassword(event.nativeEvent.text);
                }} placeholder="Password" size="lg"/>
						</native_base_1.View>
					</native_base_1.FormControl>
					<native_base_1.Flex direction={"row"} justify={"space-between"}>
						<FormButton_1.FormButton loading={loginInitiated} disabled={loginInitiated} onPress={() => { handleLoginWithEmail(); }}>
							{"Sign In"}
						</FormButton_1.FormButton>
						{renderResetPasswordButton()}
					</native_base_1.Flex>
				</>);
        }
        return null;
    }
    return (renderEmailLogin());
};
exports.EmailLogin = EmailLogin;
