export default interface PluginInterface{
    initApp();
    registerRoutes();
    onLogout(error);
    getSynchedStateKeysClass();
    getStorageKeysClass();
    getAboutUsComponent();
    getPrivacyPolicyComponent();
    getTermsAndConditionsComponent();
}