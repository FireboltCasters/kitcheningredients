import {TranslationKeys} from "./TranslationKeys";

export class DefaultTranslator{

    static useTranslation(translation_key){
      switch(translation_key){
        case TranslationKeys.home: return "Home";
        case TranslationKeys.log_in_with: return "Log In with";
        case TranslationKeys.continue: return "Continue";
        case TranslationKeys.sign_in: return "Sign In";
        case TranslationKeys.email: return "E-Mail";
        case TranslationKeys.password_visible: return "Password visible";
        case TranslationKeys.password_hidden: return "Password hidden";
        case TranslationKeys.confirm_password: return "Confirm password";
        case TranslationKeys.password: return "Password";
        case TranslationKeys.register: return "Register";
        case TranslationKeys.logout_confirm_message: return "Do you want to log out?";
        case TranslationKeys.logout: return "Logout";
        case TranslationKeys.sidebar_menu: return "Menu";
        case TranslationKeys.continue_as_guest: return "Without Profile";
        case TranslationKeys.forgot_password: return "Forgot password";
        case TranslationKeys.is_currently_authenticated_remember_this_account: return "is currently authenticated. Is this you?";
        case TranslationKeys.profile_and_settings: return "Profile and Settings";

        case TranslationKeys.by_continuing_you_agree_to_terms_and_conditions_and_privacy_policy: return "Indem du fortfährst, stimmst du den AGB zu und bestätigst, dass du unsere Datenschutzrichtlinien gelesen hast.";

        case TranslationKeys.cookie_policy_consent: return "Zustimmung";
        case TranslationKeys.cookie_policy_details: return "Details";
        case TranslationKeys.cookie_policy_about: return "Über Cookies";
      }
    }

}
