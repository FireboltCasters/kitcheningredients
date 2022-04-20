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
exports.AuthenticatedBaseTemplate = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const BaseTemplate_1 = require("./BaseTemplate");
const AuthenticatedBaseTemplate = ({ children, navigation, title, navigateTo, serverInfo, _status, _hStack, ...props }) => {
    const [authenticated, setAuthenticated] = (0, react_1.useState)(undefined);
    async function loadServerInfo() {
        try {
            let directus = ServerAPI_1.default.getClient();
        }
        catch (err) {
            console.log("Error at get Server Info");
            console.log(err);
        }
    }
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
        if (!serverInfo) {
            loadServerInfo();
        }
    }, [props.route.params]);
    return (<BaseTemplate_1.BaseTemplate>
			{children}
		</BaseTemplate_1.BaseTemplate>);
};
exports.AuthenticatedBaseTemplate = AuthenticatedBaseTemplate;
