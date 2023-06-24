// @ts-nocheck
import React from 'react';
import {Settings} from "./Settings";
import {Navigation} from "./../../navigation/Navigation";
import {UserProfileAvatar} from "../../project/UserProfileAvatar";
import {ConfigHolder} from "../../ConfigHolder";

export interface AppState {
  color?: color
}
export const RequiredSettingsButton: (props) => any[] = (props) => {

  let user = ConfigHolder.instance.getUser()

  function handleAvatarPress(){
    //Navigation.navigateTo(Users, {id: user.id});
    Navigation.navigateTo(Settings);
  }

  return (
    <UserProfileAvatar user={user} color={props?.color} onPress={handleAvatarPress} />
  )
}
