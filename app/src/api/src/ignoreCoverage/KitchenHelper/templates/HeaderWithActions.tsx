import React, {FunctionComponent} from "react";
import {useCustomHeaderTextColor} from "./useHeaderTextColor"
import {DrawerButton} from "./DrawerButton";
import {BackButton} from "./BackButton";

import {Heading, Text, View} from "native-base";
import {useSynchedDrawerConfig} from "../synchedstate/SynchedState";

export interface AppState{
	renderActions?: () => any;
	renderCustomTitle?: () => any;
	title?: any;
	renderCustomBottom?: () => any;
	route: any;
}
export const HeaderWithActions: FunctionComponent<AppState> = (props) => {
	const textColor = useCustomHeaderTextColor();

  const [drawerConfig, setDrawerConfig] = useSynchedDrawerConfig();
  let drawerPosition = drawerConfig?.drawerPosition || 'left';
  let flexDirection = drawerPosition === 'left' ? "row" : "row-reverse";
  let textAlign = drawerPosition === 'left' ? "left" : "right";

	const params = props?.route?.params;
	const showBackButton = params?.showbackbutton;

	function renderDrawerButton(){
		if(!showBackButton){
			return(
				<View accessibilityLabel={"Menu"}>
					<DrawerButton />
				</View>
			)
		} else {
			return (
				<View accessibilityLabel={"Back"}>
					<BackButton />
				</View>
			)
		}
	}

	function renderTitle(){
		if(props?.renderCustomTitle){
			return props.renderCustomTitle();
		} else if(props?.title){
			return(
        <Heading textAlign={textAlign} flex={1}>
          <Text color={textColor} >{props?.title}</Text>
        </Heading>
			)
		}
	}

	function renderActions(){
		if(props?.renderActions){
			return props.renderActions();
		}
		return null;
	}

	function renderBottomRow(){
		if(props?.renderCustomBottom){
			return props.renderCustomBottom();
		}
	}

	function renderHeader(){
		return(
			<View style={{width: "100%"}}>
				<View style={{flexDirection: flexDirection, width: "100%", alignItems: "center"}}>
					{renderDrawerButton()}
					<View style={{flex: 1,justifyContent: "flex-start"}}>
						{renderTitle()}
					</View>
					<View style={{justifyContent: "flex-end", flexDirection: "row", alignItems: "center"}}>
						{renderActions()}
					</View>
          <View style={{width: 4}} />
				</View>
				<View style={{flexDirection: "row", width: "100%", alignItems: "center"}}>
					{renderBottomRow()}
				</View>
			</View>
		)
	}

	return(
		renderHeader()
	)
}
