"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const EnviromentHelper_1 = __importDefault(require("./EnviromentHelper"));
const sdk_1 = require("@directus/sdk");
const App_1 = __importDefault(require("./App"));
const axios_1 = __importDefault(require("axios"));
const NavigatorHelper_1 = require("./navigation/NavigatorHelper");
const Login_1 = require("./auth/Login");
const TransportWrapper_1 = __importDefault(require("./server/TransportWrapper"));
const AuthTransportWrapper_1 = __importDefault(require("./server/AuthTransportWrapper"));
class ServerAPI {
    static directus = null;
    static tempStore = {
        serverInfo: undefined
    };
    static getAxiosInstance() {
        return axios_1.default.create();
    }
    /**
     * We want a public client to get dont interfere with broken permissions and other stuff
     */
    static getPublicClient() {
        let storage = new sdk_1.MemoryStorage();
        return ServerAPI.getDirectus(storage);
    }
    static getDirectus(storage, customErrorHandleCallback = null) {
        let url = EnviromentHelper_1.default.getBackendURL();
        let transport = ServerAPI.getTransport(url, storage, null);
        let auth = ServerAPI.getAuth(url, storage, customErrorHandleCallback);
        return new sdk_1.Directus(url, { transport: transport, storage: storage, auth: auth });
    }
    static areCredentialsSaved() {
        return App_1.default.storage.has_credentials_saved();
    }
    static async handleLogoutError() {
        let storage = App_1.default.storage;
        storage.clear_credentials();
    }
    static async handleLogout(error = null) {
        console.log("handleLogout");
        if (!!App_1.default.plugin && !!App_1.default.plugin.onLogout) {
            App_1.default.plugin.onLogout(error);
        }
        try {
            let directus = ServerAPI.getDirectus(App_1.default.storage, ServerAPI.handleLogoutError);
            let response = await directus.auth.logout();
            await ServerAPI.handleLogoutError(); // we better make sure to reset variables in storage
        }
        catch (err) {
            console.log("Error at: handleLogout");
            console.log(err);
            await ServerAPI.handleLogoutError(); // we better make sure to reset variables in storage
        }
        console.log("navigate to login");
        NavigatorHelper_1.NavigatorHelper.navigate(Login_1.Login, null, false);
        await App_1.default.setRedirectToLogin(true);
        await App_1.default.setUser(null);
    }
    static getClient() {
        if (ServerAPI.directus) {
            return ServerAPI.directus;
        }
        let errorHandler = ServerAPI.handleLogoutError; //use default error handler
        if (App_1.default.storage.is_guest()) {
            errorHandler = () => { }; //as guest we ignore errors
        }
        const directus = ServerAPI.getDirectus(App_1.default.storage, errorHandler);
        // api.interceptors.response.use(onResponse, onError);
        ServerAPI.directus = directus;
        return directus;
    }
    static async getRole(user) {
        let role_id = user?.role;
        if (!!role_id) {
            try {
                let directus = ServerAPI.getClient();
                let role = await directus.roles.readOne(role_id);
                return role;
            }
            catch (err) {
                console.log("Error at get Server Info: ", err);
            }
        }
    }
    static async loginWithAccessDirectusAccessToken(directus_access_token) {
        let data = await ServerAPI.refreshWithDirectusAccessToken(directus_access_token);
        console.log(data);
        let storage = App_1.default.storage;
        let access_token = data.access_token;
        let refresh_token = data.refresh_token;
        let expires = data.expires || "" + 0;
        console.log("expires: ", expires);
        //https://github.com/directus/directus/blob/main/api/src/services/authentication.ts
        //let expiresIn = new Date(Date.now() + ms(expires as string));
        //console.log("expiresIn: ",expiresIn);
        storage.set_auth_expires(expires);
        storage.set_refresh_token(refresh_token);
        storage.set_access_token(access_token);
        return data;
    }
    static getAuth(url, storage, customErrorHandleCallback = null) {
        let transport = ServerAPI.getAuthTransport(url, storage, customErrorHandleCallback);
        const modeForAuth = "json";
        //const modeForAuth: AuthMode = "cookie";
        let auth = new sdk_1.Auth({
            transport: transport,
            storage: storage,
            autoRefresh: true,
            mode: modeForAuth
        });
        return auth;
    }
    static getAuthorizationHeader(storage = App_1.default.storage) {
        const token = storage.auth_token;
        const bearer = token
            ? token.startsWith(`Bearer `)
                ? String(storage.auth_token)
                : `Bearer ${storage.auth_token}`
            : '';
        return {
            Authorization: bearer
        };
    }
    static getTransport(url, storage, customErrorHandleCallback = null) {
        let myTransport = new TransportWrapper_1.default({
            url: url,
            beforeRequest: (config) => {
                const token = storage.auth_token;
                const bearer = token
                    ? token.startsWith(`Bearer `)
                        ? String(storage.auth_token)
                        : `Bearer ${storage.auth_token}`
                    : '';
                return {
                    ...config,
                    headers: {
                        Authorization: bearer,
                        ...config.headers,
                    },
                };
            }
        });
        myTransport.customErrorHandleCallback = customErrorHandleCallback;
        return myTransport;
    }
    static getAuthTransport(url, storage, customErrorHandleCallback = null) {
        let myTransport = new AuthTransportWrapper_1.default({
            url: url,
            beforeRequest: (config) => {
                const token = storage.auth_token;
                const bearer = token
                    ? token.startsWith(`Bearer `)
                        ? String(storage.auth_token)
                        : `Bearer ${storage.auth_token}`
                    : '';
                return {
                    ...config,
                    headers: {
                        Authorization: bearer,
                        ...config.headers,
                    },
                };
            }
        });
        myTransport.customErrorHandleCallback = customErrorHandleCallback;
        return myTransport;
    }
    static getAPIUrl() {
        let directus = ServerAPI.getPublicClient();
        // @ts-ignore
        return directus.transport.url;
    }
    static async getServerInfo() {
        try {
            let directus = ServerAPI.getPublicClient();
            //TODO we could add caching here
            let serverInfo = await directus.server.info();
            ServerAPI.tempStore.serverInfo = serverInfo;
            return serverInfo;
        }
        catch (err) {
            console.log("ServerAPI.getServerInfo()");
            console.log(err);
        }
        return null;
    }
    static getAssetImageURL(imageID) {
        return EnviromentHelper_1.default.getAssetURL(imageID);
    }
    static async getAuthProviders() {
        let getProvidersURL = ServerAPI.getAPIUrl() + "/auth";
        try {
            let api = ServerAPI.getAxiosInstance();
            let answer = await api.get(getProvidersURL);
            let providers = answer?.data?.data;
            return providers;
        }
        catch (err) {
            console.log(err);
        }
        return null;
    }
    static async getMe(directus = null) {
        if (!directus) {
            directus = ServerAPI.getClient();
        }
        return directus.users.me.read();
    }
    static async isRefreshTokenSaved() {
        let token = App_1.default.storage.auth_refresh_token;
        return !!token;
    }
    static async refreshWithDirectusAccessToken(directus_access_token) {
        let url = EnviromentHelper_1.default.getBackendURL() + '/auth/refresh';
        const api = ServerAPI.getAxiosInstance();
        try {
            let response = await api.post(url, { "refresh_token": "" + directus_access_token }, {});
            return response.data.data;
        }
        catch (err) {
            console.log("refreshWithDirectusToken error");
            console.log(err);
            console.log(err.toString());
        }
        return null;
    }
    static async refreshWithDirectusRefreshToken() {
    }
}
exports.default = ServerAPI;
