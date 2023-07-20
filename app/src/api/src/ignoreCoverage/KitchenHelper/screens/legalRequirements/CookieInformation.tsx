// @ts-nocheck
import React, {FunctionComponent, useEffect, useState} from "react";
import {AlertDialog, Button, Heading, Modal, Text, useContrastText, View} from "native-base";
import {ConfigHolder} from "../../ConfigHolder";
import {DetailsComponentMenus, DetailsComponentMenuType} from "../../components/DetailsComponentMenus";
import {TranslationKeys} from "../../translations/TranslationKeys";
import {RequiredSynchedStates} from "../../synchedstate/RequiredSynchedStates";
import {useSynchedCookieConfig, useSynchedJSONState} from "../../synchedstate/SynchedState";
import {Layout} from "../../templates/Layout";
import {useProjectColor} from "../../templates/useProjectColor";
import {useDefaultButtonColor} from "../../theme/useDefaultButtonColor";
import {SettingsRowBooleanSwitch} from "../../components/settings/SettingsRowBooleanSwitch";
import {LegalRequiredLinks} from "../legalRequirements/LegalRequiredLinks";
import {ScrollViewWithGradient} from "../../utils/ScrollViewWithGradient";
import {SettingsSpacer} from "../../components/settings/SettingsSpacer";
import {useBackgroundColor} from "../../templates/useBackgroundColor";
import {ProjectLogo} from "../../project/ProjectLogo";
import {DateHelper} from "../../helper/DateHelper";
import {KitchenSafeAreaView} from "../../components/KitchenSafeAreaView";
import {
  CookieDetails,
  CookieGroupEnum,
  CookieHelper,
  getAcceptAllCookieConfig,
  getDefaultCookieConfig
} from "./CookieHelper";
import {SettingsRow} from "../../components/settings/SettingsRow";
import {MyTouchableOpacity} from "../../components/buttons/MyTouchableOpacity";
import {Linking} from "react-native";
import {MyThemedBox} from "../../helper/MyThemedBox";
import {CookieInformationInner} from "./CookieInformationInner";

interface AppState {
  autoOpenCookies?: boolean;
}
export const CookieInformation: FunctionComponent<AppState> = ({autoOpenCookies, ...props}) => {

  if(!ConfigHolder.useCookiePolicy){
    return null;
  }

  let [isOpen, setIsOpen] = useSynchedJSONState(RequiredSynchedStates.showCookies)

  if(isOpen){
    return <CookieInformationInner />
  } else {
    return null;
  }

}
