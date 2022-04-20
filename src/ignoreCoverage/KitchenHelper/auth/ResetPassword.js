"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPassword = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const RequestResetPasswordForm_1 = require("./RequestResetPasswordForm");
const ResetPasswordForm_1 = require("./ResetPasswordForm");
const ResetPassword = (props) => {
    const params = props.route.params;
    let token = params?.token;
    let content = <RequestResetPasswordForm_1.RequestResetPasswordForm navigation={props.navigation}/>;
    if (!!token) {
        content = <ResetPasswordForm_1.ResetPasswordForm navigation={props.navigation} token={token}/>;
    }
    return (content);
};
exports.ResetPassword = ResetPassword;
