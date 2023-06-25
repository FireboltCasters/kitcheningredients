// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Tooltip, View} from "native-base";
import {ProjectLogo} from "../project/ProjectLogo";
import {ProjectName} from "../project/ProjectName";
import {MyThemedBox} from "../helper/MyThemedBox";
import {ExpandableDrawerItem} from "./ExpandableDrawerItem";
import {SafeAreaView} from "react-native";
import {RouteRegisterer} from "./RouteRegisterer";
import {ConfigHolder} from "../ConfigHolder";
import {Navigation} from "../navigation/Navigation";
import {LegalRequiredLinks} from "../screens/legalRequirements/LegalRequiredLinks";
import {RequiredSettingsButton} from "../screens/settings/RequiredSettingsButton";
import {TranslationKeys} from "../translations/TranslationKeys";
import {MyTouchableOpacity} from "../buttons/MyTouchableOpacity";

export const CustomDrawerContent: FunctionComponent = (props) => {

	let user = ConfigHolder.instance.getUser()

  const useTranslation = ConfigHolder.plugin.getUseTranslationFunction();
  const translation_home = useTranslation(TranslationKeys.home);

	function renderDrawerItems(){
		let output = [];

		let registeredMenusList = Navigation.menuGetRegisteredList();
		let sortedMenus = sortMenus(registeredMenusList);
		for(let i=0; i<sortedMenus.length; i++){
		  const menu = sortedMenus[i];
		  if(menu.key===Navigation.DEFAULT_MENU_KEY_ABOUT_US){ // Skip since we want to render them else where
		    continue;
      }
      if(menu.key===Navigation.DEFAULT_MENU_KEY_PRIVACY_POLICY){ // Skip since we want to render them else where
        continue;
      }
      if(menu.key===Navigation.DEFAULT_MENU_KEY_LICENSE){ // Skip since we want to render them else where
        continue;
      }

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

	function renderLegalRequirements(){
	  return (
      <MyThemedBox style={{flexDirection: "row", alignItems: "center"}}>
        <View style={{
          flex: 1,
          width: '100%',
          alignItems: "center", justifyContent: "center",
          flexDirection: 'row',
          flexWrap: 'wrap', // Enable wrapping of items
        }}>
          <LegalRequiredLinks />
        </View>
      </MyThemedBox>
    )
  }

	let bgColor = RouteRegisterer.getDrawerBackgroundColor();
	let customBackgroundStyle = {};
	if(!!bgColor){
		customBackgroundStyle = {backgroundColor: bgColor}
	}

	return (
		<MyThemedBox style={[{height: "100%"}, customBackgroundStyle]}>
			<SafeAreaView style={{height: "100%", width: "100%"}}>
        <MyTouchableOpacity
          key={"ProjectLogoItem"}
          style={{padding: 18}}
          accessibilityLabel={translation_home}
          onPress={() => {
            if(!user){
              Navigation.navigateTo(Navigation.DEFAULT_ROUTE_LOGIN)
            } else {
              Navigation.navigateHome()
            }
          }}
        >
          <View style={{flexDirection: "row"}} >
            <ProjectLogo rounded={true} />
            <ProjectName themedColor={true} />
          </View>
        </MyTouchableOpacity>
				<DrawerContentScrollView {...props}>
					{renderDrawerItems()}
				</DrawerContentScrollView>
				{renderLegalRequirements()}
			</SafeAreaView>
		</MyThemedBox>
	);
}
