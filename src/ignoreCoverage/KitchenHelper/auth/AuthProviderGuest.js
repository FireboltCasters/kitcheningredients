"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProviderGuest = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const AuthProvider_1 = require("./AuthProvider");
const App_1 = __importDefault(require("../App"));
const NavigatorHelper_1 = require("../navigation/NavigatorHelper");
const Home_1 = require("../screens/home/Home");
const AuthProviderGuest = ({ serverInfo }) => {
    let provider = {
        name: "Guest",
        icon: "incognito-circle"
    };
    async function handleOpened() {
        await App_1.default.setUserAsGuest();
        await NavigatorHelper_1.NavigatorHelper.navigate(Home_1.Home);
        await App_1.default.setHideDrawer(false);
    }
    return (<AuthProvider_1.AuthProvider serverInfo={serverInfo} provider={provider} buttonText={"Continue in as Guest"} callback={handleOpened}/>);
};
exports.AuthProviderGuest = AuthProviderGuest;
