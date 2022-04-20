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
exports.SignOutButton = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const native_base_1 = require("native-base");
const TransparentTextButton_1 = require("../buttons/TransparentTextButton");
const vector_icons_1 = require("@expo/vector-icons");
const SignOutButton = (props) => {
    const cancelRef = react_1.default.useRef(null);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    async function handleLogout() {
        await setIsOpen(false);
        try {
            await ServerAPI_1.default.handleLogout();
        }
        catch (err) {
            console.log(err);
        }
    }
    function openConfirmBox() {
        setIsOpen(true);
    }
    function renderAlertBox() {
        return (<native_base_1.AlertDialog key={"SignOutAlertBox"} leastDestructiveRef={cancelRef} style={{ maxWidth: 600, alignSelf: "center" }} isOpen={isOpen} onClose={() => { setIsOpen(false); }}>
				<native_base_1.AlertDialog.Content>
					<native_base_1.AlertDialog.CloseButton />
					<native_base_1.AlertDialog.Header>Abmelden</native_base_1.AlertDialog.Header>
					<native_base_1.AlertDialog.Body>
						<native_base_1.Text key={"a"}> </native_base_1.Text>
						<native_base_1.Divider />
						<native_base_1.Text key={"b"}> </native_base_1.Text>
						<native_base_1.Text key={"c"}>Sind Sie sicher, dass Sie sich abmelden möchten?</native_base_1.Text>
					</native_base_1.AlertDialog.Body>
					<native_base_1.AlertDialog.Footer>
						<native_base_1.Button.Group space={2}>
							<native_base_1.Button onPress={handleLogout}>
								Abmelden
							</native_base_1.Button>
						</native_base_1.Button.Group>
					</native_base_1.AlertDialog.Footer>
				</native_base_1.AlertDialog.Content>
			</native_base_1.AlertDialog>);
    }
    function renderOnlyIcon() {
        return (<native_base_1.Button key={"LogoutIcon"} style={{ backgroundColor: "transparent" }} onPress={openConfirmBox}>
				<native_base_1.Icon as={vector_icons_1.MaterialCommunityIcons} name={"logout"}/>
			</native_base_1.Button>);
    }
    function renderLogoutText() {
        return (<TransparentTextButton_1.TransparentTextButton key={"logoutTextButton"} onPress={openConfirmBox}>
				<native_base_1.Text>{"Sign Out"}</native_base_1.Text>
			</TransparentTextButton_1.TransparentTextButton>);
    }
    let content = [renderAlertBox()];
    if (props.onlyIcon) {
        content.push(renderOnlyIcon());
    }
    else {
        content.push(renderLogoutText());
    }
    return content;
};
exports.SignOutButton = SignOutButton;
