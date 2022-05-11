export interface PluginInterface{
    initApp();
    registerRoutes();
    onLogout(error);
    onLogin(user, role);
    getSynchedStateKeysClass();
    getStorageKeysClass();
    getAboutUsComponent();
    getPrivacyPolicyComponent();
    getTermsAndConditionsComponent();
    getHomeComponent();
    getSettingsComponent();
    getCustomProjectLogoComponent();
}
