"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnviromentHelper {
    static AppConfig = null;
    static getDirectusAccessTokenName() {
        return "directus_access_token";
    }
    static getAppManifest() {
        return process.env.APP_MANIFEST;
    }
    static getCustomEnvVariables() {
        let appManifest = EnviromentHelper.getAppManifest();
        if (appManifest) {
            return appManifest.extra;
        }
        return {};
    }
    static getBackendURL() {
        return EnviromentHelper.getCustomEnvVariables().BACKEND_URL || EnviromentHelper.AppConfig.default.extra.BACKEND_URL;
    }
    static getAssetURL(file_id) {
        if (!file_id) {
            return null;
        }
        return EnviromentHelper.getBackendURL() + "/assets/" + file_id;
    }
    static getBasePath() {
        return EnviromentHelper.getCustomEnvVariables().BASE_PATH || EnviromentHelper.AppConfig.default.extra.BASE_PATH;
    }
}
exports.default = EnviromentHelper;
