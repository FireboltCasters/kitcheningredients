// @ts-nocheck
import React from 'react';
import {Navigation} from "./../../navigation/Navigation";
import {UserProfileAvatar} from "../../project/UserProfileAvatar";
import {ConfigHolder} from "../../ConfigHolder";
import {MenuItem} from "../../navigation/MenuItem";
import {useCustomHeaderTextColor} from "../../templates/useHeaderTextColor";
import {TranslationKeys} from "../../translations/TranslationKeys";

export const RequiredSettingsButton = ({color, ...props}: any) => {

  let user = ConfigHolder.instance.getUser()

  let usedColor = color || useCustomHeaderTextColor(props);

  function handleAvatarPress(){
    //Navigation.navigateTo(Users, {id: user.id});
    let menuItem: MenuItem = Navigation.requiredMenuItems[Navigation.DEFAULT_MENU_KEY_SETTINGS];
    Navigation.navigateTo(menuItem?.route?.path);
  }

  const useTranslation = ConfigHolder.plugin.getUseTranslationFunction();
  const accessibilityLabel = useTranslation(TranslationKeys.profile_and_settings);

  return (
    <UserProfileAvatar accessibilityLabel={accessibilityLabel} user={user} color={usedColor} onPress={handleAvatarPress} />
  )
}
