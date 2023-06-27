// @ts-nocheck
import React, {useEffect, useState} from "react";
import {AlertDialog, Button, Center, Divider, Text, View} from "native-base";
import {Platform} from "react-native";
import {ConfigHolder} from "../../ConfigHolder";
import {ProjectLogo} from "../../project/ProjectLogo";
import {DetailsComponentMenus, DetailsComponentMenuType} from "../../components/DetailsComponentMenus";
import {TranslationKeys} from "../../translations/TranslationKeys";

export const CookieInformation = (props) => {

  const menu_key_cookie_consent = "cookieConsent";
  const menu_key_cookie_details = "cookieDetails";
  const menu_key_cookie_about = "cookieAbout";

  const useTranslation = ConfigHolder.plugin.getUseTranslationFunction();

  const translation_cookie_policy_consent = useTranslation(TranslationKeys.cookie_policy_consent)
  const translation_cookie_policy_details = useTranslation(TranslationKeys.cookie_policy_details)
  const translation_cookie_policy_about = useTranslation(TranslationKeys.cookie_policy_about)

  const [default_menu_key, setDefaultMenuKey] = useState(menu_key_cookie_consent);

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

	if(Platform.OS!=="web"){
		return null;
	}

	function hasCookieConfig(){
		return ConfigHolder.storage.has_cookie_config()
	}

	const [isOpen, setIsOpen] = React.useState(!hasCookieConfig())

	// corresponding componentDidMount
	useEffect(() => {

	}, [])

	function denyCookies(){
		let cookie_config = {necessary: false};
		handleDecision(cookie_config)
	}

	function acceptCookies(){
		let cookie_config = {necessary: true};
		handleDecision(cookie_config)
	}

	function handleDecision(cookie_config){
		ConfigHolder.storage.set_cookie_config(cookie_config);
		setIsOpen(!hasCookieConfig())
	}

	const cancelRef = React.useRef(null)

  function renderCookiesConsent(){

  }

	function renderCookieDetails(){

  }


  function renderCookiesAbout(){

  }


	return (
	  <View stlye={{width: 900, height: 1000, backgroundColor: "red"}}>
      <View stlye={{width: 900, height: 1000, backgroundColor: "red"}}>
      </View>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={denyCookies}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>
            <ProjectLogo rounded={true} />
          </AlertDialog.Header>
          <AlertDialog.Body>
            <DetailsComponentMenus menus={menus} defaultMenuKey={default_menu_key} key={default_menu_key} />
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button onPress={acceptCookies}>
                Nur notwendige Cookies
              </Button>
              <Button onPress={() => {
                setDefaultMenuKey(menu_key_cookie_details);
              }}>
                Anpassen
              </Button>
              <Button onPress={acceptCookies}>
                Alle Cookies zulassen
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </View>
	)
}
