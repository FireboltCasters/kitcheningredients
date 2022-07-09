// @ts-nocheck
import React, {FunctionComponent, useEffect, useState} from "react";
import {BaseLayout} from "./BaseLayout";
import ServerAPI from "../ServerAPI";
import {View, KeyboardAvoidingView} from "native-base";
import {CookieInformation} from "../screens/legalRequirements/CookieInformation";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";
import {KitchenSafeAreaView} from "../components/KitchenSafeAreaView";
import {NavigatorHelper} from "./../navigation/NavigatorHelper";
import {Platform, StatusBar} from "react-native";


export interface BaseNoScrollTemplateProps{
  title?: string,
  header?: JSX.Element,
  serverInfo?: any
}
export const BaseNoScrollTemplate: FunctionComponent<BaseNoScrollTemplateProps>= ({
								 children,
								 title,
                  header,
								 _status,
								 _hStack,
								 ...props}: any) => {

  const params = props?.route?.params;
	const [reloadnumber, setReloadnumber] = useState(0)
	const [serverInfo, setServerInfo] = useState(props.serverInfo)

	async function loadServerInfo() {
		try{
			let serverInfoRemote = await ServerAPI.getServerInfo();
			setServerInfo(serverInfoRemote);
			setReloadnumber(reloadnumber+1);
		} catch (err){
			console.log("Error at get Server Info");
			console.log(err);
		}
	}

	// corresponding componentDidMount
	useEffect(() => {
		if(!serverInfo){
			loadServerInfo();
		}
	}, [params])

  const childrenWithProps = CloneChildrenWithProps.passProps(children, {...props});

	let showbackbutton = params?.showbackbutton;
	if(NavigatorHelper.getHistory()?.length<=1){
	  showbackbutton = false;
  }

  const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0
  const keyboardVerticalOffset = paddingTop;

	return(
		<KitchenSafeAreaView>
      <KeyboardAvoidingView
        keyboardVerticalOffset = {keyboardVerticalOffset} // adjust the value here if you need more padding
        style = {{height: "100%", width: "100%"}}
        behavior={Platform.OS === "ios" ? "padding" : "height"} >
        <View flex={1} flexDirection={"row"}>
          <BaseLayout title={title} serverInfo={serverInfo} header={header} showbackbutton={showbackbutton} >
            <View style={{width: "100%", height: "100%"}} >
              {childrenWithProps}
            </View>
          </BaseLayout>
          <CookieInformation />
        </View>
      </KeyboardAvoidingView>
		</KitchenSafeAreaView>
	)
}
