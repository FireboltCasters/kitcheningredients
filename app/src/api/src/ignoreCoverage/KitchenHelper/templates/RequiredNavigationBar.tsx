// @ts-nocheck
import React from 'react';
import {ScrollView, View,} from 'native-base';
import {ConfigHolder} from "../ConfigHolder";
import {DrawerButton} from "./DrawerButton";
import {useCustomHeaderTextColor} from "./useHeaderTextColor";
import {useProjectColor} from "./useProjectColor";
import {RequiredSettingsButton} from "../screens/settings/RequiredSettingsButton";

export const RequiredNavigationBar = ({
                                        children,
                                        navigation,
                                        title,
                                        showbackbutton,
                                        header,
                                        doclink,
                                        navigateTo,
                                        _status,
                                        _hStack,
                                        ...props
                                      }: any) => {

  const ssoIconColor = useProjectColor();
  let color = useCustomHeaderTextColor(props);

  let childContent = ConfigHolder.plugin.getBottomNavbarComponent();

  function renderChildren(childContent){
    if(!childContent){
        return null;
    }

    let childrenArray = []
    // Check if childContent is a single React Element or a Fragment
    if (React.Children.count(childContent.props.children) > 1) {
      // Convert children into array if childContent is a Fragment
      childrenArray = React.Children.toArray(childContent.props.children);
    } else {
      // Make an array with a single element if childContent is a single React Element
      childrenArray = [childContent];
    }

    return childrenArray.map((child, index) => (
      <View style={{paddingRight: 12}} key={index}>
        {child}
      </View>
    ));
  }

  let leftContent = <View style={{flexDirection: "row", alignItems: "center"}}>
    <View style={{width: 12}} />
    <DrawerButton />
    <View style={{width: 12}} />
  </View>

	return (
    <View style={{width: "100%", backgroundColor: ssoIconColor}}>
      <View style={{flexDirection: "row", width: "100%", alignItems: "center"}}>
        {leftContent}
        <ScrollView
          horizontal
          contentContainerStyle={{flexGrow: 1, flexDirection: "row"}}
          showsHorizontalScrollIndicator={false}
        >
          {renderChildren(childContent)}
        </ScrollView>
        <RequiredSettingsButton color={color} />
      </View>

    </View>
	);

	// { base: '100%', lg: '768px', xl: '1080px' }
};
