import React, {FunctionComponent} from "react";
import {DrawerButton} from "./DrawerButton";
import {BackButton} from "./BackButton";

import {Heading, Text, useContrastText, View} from "native-base";
import {useSynchedDrawerConfig} from "../synchedstate/SynchedState";
import {Navigation} from "../navigation/Navigation";
import {useMyContrastColor} from "../theme/useMyContrastColor";

export interface AppState{
	renderActions?: () => any;
	renderCustomTitle?: () => any;
	title?: any;
	renderCustomBottom?: () => any;
	showbackbutton?: boolean;
  backgroundColor?: string
  textColor?: string,
}
export const HeaderWithActions: FunctionComponent<AppState> = (props) => {
  const headerBackgroundColor = props?.backgroundColor;
  let headerTextColor = props?.textColor;
  if(!headerTextColor){
    headerTextColor = useMyContrastColor(headerBackgroundColor);
  }
	const textColor = headerTextColor

  const [drawerConfig, setDrawerConfig] = useSynchedDrawerConfig();
  let drawerPosition = drawerConfig?.drawerPosition || 'left';
  let flexDirection: "row" | "row-reverse" | "column" | "column-reverse" = drawerPosition === 'left' ? "row" : "row-reverse";
  let textAlign = drawerPosition === 'left' ? "left" : "right";

  const [history, setHistory] = Navigation.useNavigationHistory();

	const showBackButton = props?.showbackbutton

	function renderDrawerButton(){
		if(!showBackButton){
			return(
				<View accessibilityLabel={"Menu"}>
					<DrawerButton color={textColor} />
				</View>
			)
		} else {
			return (
				<View accessibilityLabel={"Back"}>
					<BackButton color={textColor} />
				</View>
			)
		}
	}

	function renderTitle(){
		if(props?.renderCustomTitle){
			return props.renderCustomTitle();
		} else if(props?.title){
			return(
          <Heading
            textAlign={textAlign}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text color={textColor}>{props?.title}</Text>
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
			<View style={{width: "100%", backgroundColor: headerBackgroundColor}}>
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
