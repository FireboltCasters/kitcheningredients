// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Text, View} from "native-base";
import {ProjectLogo} from "../project/ProjectLogo";
import {NavigatorHelper} from "./NavigatorHelper";
import {ProjectName} from "../project/ProjectName";
import {Menu} from "./Menu";
import {MyThemedBox} from "../helper/MyThemedBox";
import {ExpandableDrawerItem} from "./ExpandableDrawerItem";
import {UserProfileAvatar} from "../project/UserProfileAvatar";
import {SignOutButton} from "../auth/SignOutButton";
import {Users} from "../screens/user/Users";
import {SafeAreaView} from "react-native";
import {SettingsButton} from "../screens/settings/SettingsButton";
import {RouteRegisterer} from "./RouteRegisterer";
import {ConfigHolder} from "../ConfigHolder";

export const CustomDrawerContent: FunctionComponent = (props) => {

	let history = props?.state?.history || [];
	let currentRoute = history.slice(-1)[0]; // get last element
	//console.log("currentRoute: ", currentRoute);
	//console.log("props", props);

	const currentRouteKey = currentRoute?.key;
	let user = ConfigHolder.instance.getUser()

	function renderDrawerItems(){
		let routes = props?.state?.routes || [];
		let output = [];


		if(!!user){
			output.push(renderAuthenticatedMenu())
			output.push(renderUserRoleIdMenu(user));
			output.push(renderUserRoleNameMenu());
		} else {
			output.push(renderUnauthenticatedMenu())
		}
		output.push(renderCommonMenu())

		return output;
	}

	function renderMenu(menu){
		return (
			<ExpandableDrawerItem
        menu={menu}
				key={"ExpandableDrawerItem"+menu.key}
				level={0}
			 />
		)
	}

	function renderUserRoleNameMenu(){
		let role = ConfigHolder.instance.getRole();
		return renderMenuByName(role?.name);
	}

	function renderUserRoleIdMenu(user){
		let role_id = user.role;
		return renderMenusByRole(role_id);
	}

	function renderUnauthenticatedMenu(){
		return renderMenusByRole(Menu.ROLE_UNAUTHENTICATED)
	}

	function renderAuthenticatedMenu(){
		return renderMenusByRole(Menu.ROLE_AUTHENTICATED)
	}

	function renderCommonMenu(){
		return renderMenusByRole(Menu.ROLE_PUBLIC)
	}

	function renderMenuByName(name){
		let menus = Menu.menusForRolesByName[name];
		return renderMenus(menus);
	}

	function renderMenusByRole(role){
		let menus = Menu.menusForRolesByID[role];
		return renderMenus(menus);
	}

	function renderMenus(menus){
		if(!menus) {
			menus = [];
		}
		let output = [];
		for(let menu of menus){
			output.push(renderMenu(menu))
		}
		return output
	}

	function handleAvatarPress(){
		NavigatorHelper.navigate(Users, {id: user.id});
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
				<DrawerContentScrollView {...props}>
					<DrawerItem
						key={"ProjectLogoItem"}
						label={() => {
							return (<View style={{flexDirection: "row"}} >
								<ProjectLogo rounded={true} />
								<ProjectName themedColor={true} />
							</View>)
						}}
						onPress={() => {
							NavigatorHelper.navigateHome();
						}}
					/>
					{renderDrawerItems()}
				</DrawerContentScrollView>
				{renderBottomPanel()}
			</SafeAreaView>
		</MyThemedBox>
	);
}
