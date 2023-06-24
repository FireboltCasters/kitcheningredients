// @ts-nocheck
import React from 'react';
import {Navigation} from "./../../navigation/Navigation";
import {UserProfileAvatar} from "../../project/UserProfileAvatar";
import {ConfigHolder} from "../../ConfigHolder";
import {MenuItem} from "kitcheningredients";

export interface AppState {
  color?: string
}
export const RequiredSettingsButton: (props) => any[] = (props) => {

  let user = ConfigHolder.instance.getUser()

  function handleAvatarPress(){
    //Navigation.navigateTo(Users, {id: user.id});
    let menuItem: MenuItem = Navigation.requiredMenuItems[Navigation.DEFAULT_MENU_KEY_SETTINGS];
    Navigation.navigateTo(menuItem?.route?.path);
  }

  return (
    <UserProfileAvatar user={user} color={props?.color} onPress={handleAvatarPress} />
  )
}
