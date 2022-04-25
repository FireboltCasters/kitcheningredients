export interface PluginInterface{
    initApp();
    registerRoutes();
    onLogout(error);
    getSynchedStateKeysClass();
    getStorageKeysClass();
    getAboutUsComponent();
    getPrivacyPolicyComponent();
    getTermsAndConditionsComponent();
    getHomeComponent();
    getCustomProjectLogoComponent();
}
