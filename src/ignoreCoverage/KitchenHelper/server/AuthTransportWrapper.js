"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@directus/sdk");
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
class AuthTransportWrapper extends sdk_1.Transport {
    customErrorHandleCallback = null;
    async request(method, path, data, options) {
        try {
            return await super.request(method, path, data, options);
        }
        catch (error) {
            if (!error || error instanceof Error === false) {
                throw error;
            }
            const status = error.response?.status;
            const code = error.errors?.[0]?.extensions?.code;
            console.log("");
            console.log("AuthTransportWrapper error");
            console.log("path: ", path);
            console.log("status: ", status);
            console.log("code: ", code);
            if (status === 401 &&
                code === 'INVALID_CREDENTIALS'
            /**
            &&
            error.request.responseURL.includes('refresh') === false &&
            error.request.responseURL.includes('login') === false &&
            error.request.responseURL.includes('tfa') === false
             */
            ) {
                await ServerAPI_1.default.handleLogout(error);
                return Promise.reject(error);
            }
            console.log("-------");
            //console.log("No idea what error caused neither what to do");
            return Promise.reject(error);
        }
    }
}
exports.default = AuthTransportWrapper;
