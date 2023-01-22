// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View} from "native-base";
import {ProjectLogo} from "../project/ProjectLogo";
import {NavigatorHelper} from "./NavigatorHelper";
import {ProjectName} from "../project/ProjectName";
import {MyThemedBox} from "../helper/MyThemedBox";
import {ExpandableDrawerItem} from "./ExpandableDrawerItem";
import {UserProfileAvatar} from "../project/UserProfileAvatar";
import {SignOutButton} from "../auth/SignOutButton";
import {Users} from "../screens/user/Users";
import {SafeAreaView} from "react-native";
import {SettingsButton} from "../screens/settings/SettingsButton";
import {RouteRegisterer} from "./RouteRegisterer";
import {ConfigHolder} from "../ConfigHolder";
import {Navigation} from "../navigation/Navigation";

export const CustomDrawerContent: FunctionComponent = (props) => {

	let user = ConfigHolder.instance.getUser()

	function renderDrawerItems(){
		let output = [];

		let registeredMenusList = Navigation.menuGetRegisteredList();
		let sortedMenus = sortMenus(registeredMenusList);
		for(let i=0; i<sortedMenus.length; i++){
		  const menu = sortedMenus[i];
      output.push(<ExpandableDrawerItem key={menu?.key} menu={menu} level={0}/>);
    }

		return output;
	}

	function sortMenus(menus){
    return menus.sort((a, b) => {
      let positionA = a?.position || 0;
      let positionB = b?.position || 0;
      return positionB - positionA;
    })
  }

	function handleAvatarPress(){
		Navigation.navigateTo(Users, {id: user.id});
	}

	function renderBottomPanel(){
		if(!!user){
			return (
				<MyThemedBox style={{flexDirection: "row", alignItems: "center"}}>
					<UserProfileAvatar user={user} onPress={handleAvatarPress} />
					<SettingsButton onlyIcon={true} />
					<View style={{flex: 1, flexDirection: "row-reverse"}}>
						<SignOutButton onlyIcon={true} />
					</View>
				</MyThemedBox>
			)
		}
	}

	let bgColor = RouteRegisterer.getDrawerBackgroundColor();
	let customBackgroundStyle = {};
	if(!!bgColor){
		customBackgroundStyle = {backgroundColor: bgColor}
	}

	return (
		<MyThemedBox style={[{height: "100%"}, customBackgroundStyle]}>
			<SafeAreaView style={{height: "100%", width: "100%"}}>
        <DrawerItem
          key={"ProjectLogoItem"}
          label={() => {
            return (<View style={{flexDirection: "row"}} >
              <ProjectLogo rounded={true} />
              <ProjectName themedColor={true} />
            </View>)
          }}
          onPress={() => {
            if(!user){
              Navigation.navigateTo(Navigation.DEFAULT_ROUTE_LOGIN)
            } else {
              Navigation.navigateHome()
            }
          }}
        />
				<DrawerContentScrollView {...props}>
					{renderDrawerItems()}
				</DrawerContentScrollView>
				{renderBottomPanel()}
			</SafeAreaView>
		</MyThemedBox>
	);
}
