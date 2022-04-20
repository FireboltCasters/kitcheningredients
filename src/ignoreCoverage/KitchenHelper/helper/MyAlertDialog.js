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
exports.MyAlertDialog = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const BreakPointLayout_1 = require("../templates/BreakPointLayout");
const MyAlertDialog = (props) => {
    const [isOpen, setIsOpen] = react_1.default.useState(props.isOpen);
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
    }, []);
    const onClose = async () => {
        let allowAction = true;
        if (props.onClose) {
            allowAction = await props.onClose();
        }
        if (allowAction) {
            setIsOpen(false);
        }
    };
    const onAccept = async () => {
        let allowAction = true;
        if (props.onAccept) {
            allowAction = await props.onAccept();
        }
        if (allowAction) {
            setIsOpen(false);
        }
    };
    const cancelRef = react_1.default.useRef(null);
    return (<native_base_1.AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose} size={props.size}>
				<BreakPointLayout_1.BreakPointLayout>
						<native_base_1.AlertDialog.Content>
							<native_base_1.AlertDialog.CloseButton />
							<native_base_1.AlertDialog.Header>{props.title}</native_base_1.AlertDialog.Header>
							<native_base_1.AlertDialog.Body>
								<native_base_1.Text> </native_base_1.Text>
								<native_base_1.Divider />
								<native_base_1.Text> </native_base_1.Text>
								<native_base_1.Text>{props.content}</native_base_1.Text>
							</native_base_1.AlertDialog.Body>
							<native_base_1.AlertDialog.Footer>
								<native_base_1.Button.Group space={2}>
									<native_base_1.Button onPress={onAccept}>
										{props.accept}
									</native_base_1.Button>
								</native_base_1.Button.Group>
							</native_base_1.AlertDialog.Footer>
						</native_base_1.AlertDialog.Content>
				</BreakPointLayout_1.BreakPointLayout>
			</native_base_1.AlertDialog>);
};
exports.MyAlertDialog = MyAlertDialog;
