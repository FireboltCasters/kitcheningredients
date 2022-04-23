export interface PluginInterface{
    initApp();
    registerRoutes();
    onLogout(error);
    getSynchedStateKeysClass();
    getStorageKeysClass();
    getAboutUsComponent();
    getHomeComponent();
    getSettingsComponent();
    getPrivacyPolicyComponent();
    getTermsAndConditionsComponent();
}
