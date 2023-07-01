import {TranslationKeys} from "./TranslationKeys";

export class DefaultTranslator{

    static useTranslation(translation_key){
      switch(translation_key){
        case TranslationKeys.home: return "Start";
        case TranslationKeys.log_in_with: return "Anmelden mit";
        case TranslationKeys.continue: return "Weiter";
        case TranslationKeys.sign_in: return "Anmelden";
        case TranslationKeys.email: return "E-Mail";
        case TranslationKeys.password_visible: return "Passwort sichtbar";
        case TranslationKeys.password_hidden: return "Passwort versteckt";
        case TranslationKeys.confirm_password: return "Passwort bestätigen";
        case TranslationKeys.password: return "Passwort";
        case TranslationKeys.register: return "Registrieren";
        case TranslationKeys.logout_confirm_message: return "Willst du dich abmelden?";
        case TranslationKeys.logout: return "Abmelden";
        case TranslationKeys.sidebar_menu: return "Menü";
        case TranslationKeys.continue_as_guest: return "Anonym fortfahren";
        case TranslationKeys.forgot_password: return "Passwort vergessen";
        case TranslationKeys.is_currently_authenticated_remember_this_account: return "Ist aktuell angemeldet. Erkennst du diesen Account?";
        case TranslationKeys.profile_and_settings: return "Profil und Einstellungen";

        case TranslationKeys.button_translation_switch: return "Wechseln";
        case TranslationKeys.button_disabled: return "Deaktiviert";

        case TranslationKeys.by_continuing_you_agree_to_terms_and_conditions_and_privacy_policy: return "Indem du fortfährst, stimmst du den AGB zu und bestätigst, dass du unsere Datenschutzrichtlinien gelesen hast.";

        case TranslationKeys.cookie_policy_consent: return "Zustimmung";
        case TranslationKeys.cookie_policy_details: return "Details";
        case TranslationKeys.cookie_policy_about: return "Über Cookies";
        case TranslationKeys.cookie_policy_button_accept_all: return "Alles akzeptieren";
        case TranslationKeys.cookie_policy_button_only_necessary: return "Nur notwendige Cookies";
        case TranslationKeys.cookie_policy_button_allow_selected: return "Auswahl erlauben";
        case TranslationKeys.cookie_policy_checkbox_necessary: return "Notwendig";
        case TranslationKeys.cookie_policy_checkbox_preference: return "Präferenzen";
        case TranslationKeys.cookie_policy_checkbox_statistics: return "Statistiken";
        case TranslationKeys.cookie_policy_checkbox_marketing: return "Marketing";
        case TranslationKeys.cookies: return "Cookies";
      }
    }



}
