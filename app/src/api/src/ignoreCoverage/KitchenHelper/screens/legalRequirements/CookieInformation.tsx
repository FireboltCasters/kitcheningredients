import React, {FunctionComponent, useEffect, useState} from "react";
import {AlertDialog, Button, Heading, Modal, Text, useContrastText, View} from "native-base";
import {Platform} from "react-native";
import {ConfigHolder} from "../../ConfigHolder";
import {DetailsComponentMenus, DetailsComponentMenuType} from "../../components/DetailsComponentMenus";
import {TranslationKeys} from "../../translations/TranslationKeys";
import {RequiredSynchedStates} from "../../synchedstate/RequiredSynchedStates";
import {useSynchedCookieConfig, useSynchedState} from "../../synchedstate/SynchedState";
import {Layout} from "../../templates/Layout";
import {useProjectColor} from "../../templates/useProjectColor";
import {useDefaultButtonColor} from "../../theme/useDefaultButtonColor";
import {SettingsRowBooleanSwitch} from "../../components/settings/SettingsRowBooleanSwitch";
import {LegalRequiredLinks} from "../legalRequirements/LegalRequiredLinks";
import {ScrollViewWithGradient} from "../../utils/ScrollViewWithGradient";
import {ShowMoreGradientPlaceholder} from "../../utils/ShowMoreGradientPlaceholder";
import {SettingsSpacer} from "../../components/settings/SettingsSpacer";
import {useBackgroundColor} from "../../templates/useBackgroundColor";
import {ProjectLogo} from "../../project/ProjectLogo";
import {DateHelper} from "../../helper/DateHelper";
import {KitchenSafeAreaView} from "kitcheningredients";

interface AppState {
  autoOpenCookies?: boolean;
}
export const CookieInformation: FunctionComponent<AppState> = ({autoOpenCookies, ...props}) => {

  const menu_key_cookie_consent = "cookieConsent";
  const menu_key_cookie_details = "cookieDetails";
  const menu_key_cookie_about = "cookieAbout";
  const backgroundColor = useBackgroundColor();

  const useTranslation = ConfigHolder.plugin.getUseTranslationFunction();
  const project_color = useProjectColor()
  const project_color_contrast_color = useContrastText(project_color);

  const defaultButtonColor = useDefaultButtonColor();
  const defaultButtonContrastColor = useContrastText(defaultButtonColor);

  const width = Layout.useBaseTemplateContentWidth()

  const [cookieConfig, setCookieConfig] = useSynchedCookieConfig();
  const [tempCookieConfig, setTempCookieConfig] = useState(cookieConfig);

  const date_consent = cookieConfig?.date_consent;
  const date_consent_human_readable = getHumanReadableDate(date_consent);
  const date_cookie_policy_updated = undefined;
  const date_cookie_policy_updated_human_readable = getHumanReadableDate(date_cookie_policy_updated);

  function getHumanReadableDate(date: Date | undefined): string {
    if (!date) {
      return "/";
    }
    return DateHelper.formatDateToReadable(new Date(date), true, true);
  }

  const translation_cookies = useTranslation(TranslationKeys.cookies);
  const translation_cookie_policy_consent = useTranslation(TranslationKeys.cookie_policy_consent)
  const translation_cookie_policy_details = useTranslation(TranslationKeys.cookie_policy_details)
  const translation_cookie_policy_about = useTranslation(TranslationKeys.cookie_policy_about)

  const translation_cookie_policy_checkbox_necessary = useTranslation(TranslationKeys.cookie_policy_checkbox_necessary)
  const translation_cookie_policy_checkbox_preference = useTranslation(TranslationKeys.cookie_policy_checkbox_preference)
  const translation_cookie_policy_checkbox_statistics = useTranslation(TranslationKeys.cookie_policy_checkbox_statistics)
  const translation_cookie_policy_checkbox_marketing = useTranslation(TranslationKeys.cookie_policy_checkbox_marketing)

  const translation_cookie_policy_button_accept_all = useTranslation(TranslationKeys.cookie_policy_button_accept_all)
  const translation_cookie_policy_button_only_necessary = useTranslation(TranslationKeys.cookie_policy_button_only_necessary)
  const translation_cookie_policy_button_deny_all = useTranslation(TranslationKeys.cookie_policy_button_deny_all)
  const translation_cookie_policy_button_allow_selected = useTranslation(TranslationKeys.cookie_policy_button_allow_selected)

  const translation_cookie_policy_consent_date = useTranslation(TranslationKeys.cookie_policy_consent_date)
  const translation_cookie_policy_policy_date_updated = useTranslation(TranslationKeys.cookie_policy_policy_date_updated)

  function onlyNecessarySelected(){
    return (
      tempCookieConfig.necessary &&
      !tempCookieConfig.preferences &&
      !tempCookieConfig.statistics &&
      !tempCookieConfig.marketing
    );
  }

  const translation_save_current_selection = onlyNecessarySelected() ? translation_cookie_policy_button_only_necessary : translation_cookie_policy_button_allow_selected;

  const [default_menu_key, setDefaultMenuKey] = useState(menu_key_cookie_consent);

  let [isOpen, setIsOpen] = useSynchedState(RequiredSynchedStates.showCookies)

  function getMenu(translation_text, element): DetailsComponentMenuType {
    return {
      element: element,
      menuButtonContent: <Text>{translation_text}</Text>,
      onPress: (menuKey) => {
        setDefaultMenuKey(menuKey)
      }
    }
  }

  const menu_consent: DetailsComponentMenuType = getMenu(translation_cookie_policy_consent, renderCookiesConsent());
  const menu_details: DetailsComponentMenuType = getMenu(translation_cookie_policy_details, renderCookieDetails());
  const menu_about: DetailsComponentMenuType = getMenu(translation_cookie_policy_about, renderCookiesAbout());


  const menus: Record<string, DetailsComponentMenuType> = {
    [menu_key_cookie_consent]: menu_consent,
    [menu_key_cookie_details]: menu_details,
    [menu_key_cookie_about]: menu_about
  }

  function cookieConsentUpToDate(){
    if(!cookieConfig || !date_consent){
      return false;
    } else {
      let isUpToDate = true;
      if(!!date_cookie_policy_updated){
        if(!!date_consent){
          if(new Date(date_consent) < new Date(date_cookie_policy_updated)){
            isUpToDate = false;
          }
        }
      }

      return isUpToDate;
    }
  }

  if(!cookieConsentUpToDate() && autoOpenCookies!==false){
    isOpen = true;
  }

  //isOpen = true;

  // corresponding componentDidMount
  useEffect(() => {

  }, [])

  function acceptCookiesSelected(){
    handleDecision(tempCookieConfig);
  }

  function denyCookiesAll(){
    tempCookieConfig.necessary = true;
    tempCookieConfig.preferences = false;
    tempCookieConfig.statistics = false;
    tempCookieConfig.marketing = false;
    handleDecision({...tempCookieConfig});
  }

  function acceptCookiesAll(){
    tempCookieConfig.necessary = true;
    tempCookieConfig.preferences = true;
    tempCookieConfig.statistics = true;
    tempCookieConfig.marketing = true;
    handleDecision({...tempCookieConfig});
  }

  function handleDecision(cookie_config){
    cookie_config.date_consent = new Date().getTime();
    setCookieConfig({...cookie_config});
    setTempCookieConfig({...cookie_config});
    // add a small delay to make sure the user sees the change
    setTimeout(() => {
      setIsOpen(false);
    } , 500);
  }

  function renderCookiesConsentScrollView(){
    return (
      <ScrollViewWithGradient>
        <View style={{
          flex: 1,
          width: "100%",
          alignItems: "center", justifyContent: "center",
          flexDirection: 'row',
          flexWrap: 'wrap', // Enable wrapping of items
        }}>
          <View style={{width: "100%"}}>
            {ConfigHolder.plugin.getCookieComponentConsent()}
          </View>
          <LegalRequiredLinks />
        </View>
        <ShowMoreGradientPlaceholder />
      </ScrollViewWithGradient>
    )
  }

  function renderCookiesConsent(){
      return (
        <View style={{width: "100%", flex: 1}}>
          <View style={{width: "100%", flex: 1}}>
            {renderCookiesConsentScrollView()}
          </View>
          <ScrollViewWithGradient>
            <View style={{
              flex: 1,
              width: "100%",
              alignItems: "center", justifyContent: "center",
              flexDirection: 'row',
              flexWrap: 'wrap', // Enable wrapping of items
            }}>
              <View style={{width: "100%"}}>
                <View style={{width: "100%"}}>
                  <SettingsSpacer />
                  <SettingsRowBooleanSwitch
                    key={"cookieConsentNecessary"+tempCookieConfig.date_updated}
                    value={true} disabled={true} accessibilityLabel={translation_cookie_policy_checkbox_necessary} leftContent={<Text>{translation_cookie_policy_checkbox_necessary}</Text>} />
                  <SettingsRowBooleanSwitch
                    key={"cookieConsentPreferences"+tempCookieConfig.preferences}
                    onPress={(nextValue) => {
                      tempCookieConfig.preferences = nextValue;
                      setTempCookieConfig({...tempCookieConfig})
                    }}
                    value={tempCookieConfig.preferences} accessibilityLabel={translation_cookie_policy_checkbox_preference} leftContent={<Text>{translation_cookie_policy_checkbox_preference}</Text>} />
                  <SettingsRowBooleanSwitch
                    key={"cookieConsentStatistics"+tempCookieConfig.statistics}
                    onPress={(nextValue) => {
                      tempCookieConfig.statistics = nextValue;
                      setTempCookieConfig({...tempCookieConfig})
                    }}
                    value={tempCookieConfig.statistics} accessibilityLabel={translation_cookie_policy_checkbox_statistics} leftContent={<Text>{translation_cookie_policy_checkbox_statistics}</Text>} />
                  <SettingsRowBooleanSwitch
                    key={"cookieConsentMarketing"+tempCookieConfig.marketing}
                    onPress={(nextValue) => {
                      tempCookieConfig.marketing = nextValue;
                      setTempCookieConfig({...tempCookieConfig})
                    }}
                    value={tempCookieConfig.marketing} accessibilityLabel={translation_cookie_policy_checkbox_marketing} leftContent={<Text>{translation_cookie_policy_checkbox_marketing}</Text>} />
                  <View style={{width: "100%"}}>
                    <Text>{translation_cookie_policy_consent_date+": "+date_consent_human_readable}</Text>
                    <Text>{translation_cookie_policy_policy_date_updated+": "+date_cookie_policy_updated_human_readable}</Text>
                  </View>
                </View>
              </View>
            </View>
            <ShowMoreGradientPlaceholder />
          </ScrollViewWithGradient>
        </View>
      )
  }

  function renderCookieDetails(){

  }


  function renderCookiesAbout(){
      return (
        <View style={{width: "100%"}}>
          <ScrollViewWithGradient>
            <View style={{
              flex: 1,
              width: "100%",
              alignItems: "center", justifyContent: "center",
              flexDirection: 'row',
              flexWrap: 'wrap', // Enable wrapping of items
            }}>
              <View style={{width: "100%"}}>
                {ConfigHolder.plugin.getCookieComponentAbout()}
              </View>
            </View>
            <ShowMoreGradientPlaceholder />
          </ScrollViewWithGradient>
        </View>
      )
  }

  return (
      <Modal isOpen={isOpen} style={{width: "100%", height: "100%"}}>
        <KitchenSafeAreaView style={{width: width, height: "100%"}}>
          <View style={{width: width, height: "100%"}}>
            <AlertDialog.Header>
              <View style={{flexDirection: "row"}}>
                <ProjectLogo rounded={true} />
                <View style={{ marginLeft: 16}}>
                  <Heading>
                    {translation_cookies}
                  </Heading>
                </View>
              </View>
            </AlertDialog.Header>

            <View style={{width: "100%", padding: Layout.padding, flex: 1, backgroundColor: backgroundColor}}>
              <DetailsComponentMenus flex={1} menus={menus} defaultMenuKey={default_menu_key} key={default_menu_key} />
            </View>
            <AlertDialog.Footer>
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
              }}>
                <Button onPress={denyCookiesAll} style={{backgroundColor: defaultButtonColor, marginTop: 4}}>
                  <Text color={defaultButtonContrastColor}>
                    {translation_cookie_policy_button_deny_all}
                  </Text>
                </Button>
                <View style={{width: 4}} />
                <Button style={{backgroundColor: defaultButtonColor, marginTop: 4}} onPress={acceptCookiesSelected}>
                  <Text color={defaultButtonContrastColor}>
                    {translation_save_current_selection}
                  </Text>
                </Button>
                <View style={{width: 4}} />
                <Button onPress={acceptCookiesAll} style={{backgroundColor: defaultButtonColor, marginTop: 4}}>
                  <Text color={defaultButtonContrastColor}>
                    {translation_cookie_policy_button_accept_all}
                  </Text>
                </Button>
              </View>
            </AlertDialog.Footer>
          </View>
        </KitchenSafeAreaView>

      </Modal>
  );
}
