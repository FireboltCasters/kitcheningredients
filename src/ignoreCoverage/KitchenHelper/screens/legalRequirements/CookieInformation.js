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
exports.CookieInformation = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const App_1 = __importDefault(require("../../App"));
const react_native_1 = require("react-native");
const CookieInformation = (props) => {
    if (react_native_1.Platform.OS !== "web") {
        return null;
    }
    function hasCookieConfig() {
        return App_1.default.storage.has_cookie_config();
    }
    const [isOpen, setIsOpen] = react_1.default.useState(!hasCookieConfig());
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
    }, []);
    function denyCookies() {
        let cookie_config = { necessary: false };
        handleDecision(cookie_config);
    }
    function acceptCookies() {
        let cookie_config = { necessary: true };
        handleDecision(cookie_config);
    }
    function handleDecision(cookie_config) {
        App_1.default.storage.set_cookie_config(cookie_config);
        setIsOpen(!hasCookieConfig());
    }
    const cancelRef = react_1.default.useRef(null);
    return (<native_base_1.AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={denyCookies}>
				<native_base_1.AlertDialog.Content>
					<native_base_1.AlertDialog.CloseButton />
					<native_base_1.AlertDialog.Header>Deine Privatsphäre</native_base_1.AlertDialog.Header>
					<native_base_1.AlertDialog.Body>
						<native_base_1.Text> </native_base_1.Text>
						<native_base_1.Divider />
						<native_base_1.Text> </native_base_1.Text>
						<native_base_1.Text>Wir verwenden Cookies, um dir ein optimales Webseiten-Erlebnis zu bieten, die Webseite technisch zu betreiben und die Nutzung der Webseite statistisch auszuwerten. Mit „Alle Cookies akzeptieren“ willigst du in die Verwendung von Cookies ein. Weitere Informationen findest du in unserer Datenschutzerklärung.</native_base_1.Text>
					</native_base_1.AlertDialog.Body>
					<native_base_1.AlertDialog.Footer>
						<native_base_1.Button.Group space={2}>
							<native_base_1.Button onPress={acceptCookies}>
								Alle Cookies akzeptieren
							</native_base_1.Button>
						</native_base_1.Button.Group>
					</native_base_1.AlertDialog.Footer>
				</native_base_1.AlertDialog.Content>
			</native_base_1.AlertDialog>);
};
exports.CookieInformation = CookieInformation;
