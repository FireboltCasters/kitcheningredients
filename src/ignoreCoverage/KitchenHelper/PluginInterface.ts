export default interface PluginInterface{
    initApp();
    registerRoutes();
    onLogout(error);
    getSynchedStateKeysClass();
    getStorageKeysClass();
    getAboutUsComponent();
    getSettingsComponent();
    getPrivacyPolicyComponent();
    getTermsAndConditionsComponent();
}
