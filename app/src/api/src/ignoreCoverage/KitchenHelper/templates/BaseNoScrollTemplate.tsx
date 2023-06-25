// @ts-nocheck
import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {BaseLayout} from "./BaseLayout";
import ServerAPI from "../ServerAPI";
import {View, KeyboardAvoidingView} from "native-base";
import {CookieInformation} from "../screens/legalRequirements/CookieInformation";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";
import {KitchenSafeAreaView} from "../components/KitchenSafeAreaView";
import {NavigatorHelper} from "./../navigation/NavigatorHelper";
import {Platform, StatusBar} from "react-native";
import {EmptyTemplate} from "./EmptyTemplate";


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
  const mountedRef = useRef(true)

	async function loadServerInfo() {
		try{
			let serverInfoRemote = await ServerAPI.getServerInfo();
      if (!mountedRef.current) return null
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
    return () => {
      mountedRef.current = false
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
		<EmptyTemplate>
        <View flex={1} flexDirection={"row"}>
          <BaseLayout title={title} serverInfo={serverInfo} header={header} showbackbutton={showbackbutton} >
            <View style={{width: "100%", height: "100%"}} >
              {childrenWithProps}
            </View>
          </BaseLayout>
        </View>
		</EmptyTemplate>
	)
}
