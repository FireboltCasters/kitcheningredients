import React, {FunctionComponent} from "react";
import {BaseLayout} from "./BaseLayout";
import ServerAPI from "../ServerAPI";
import {View} from "native-base";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";
import {NavigatorHelper} from "./../navigation/NavigatorHelper";
import {Platform, StatusBar} from "react-native";
import {EmptyTemplate} from "./EmptyTemplate";

export interface BaseNoScrollTemplateProps{
  title?: string,
  header?: JSX.Element,
  serverInfo?: any,
  autoOpenCookies?: boolean
}

const BaseNoScrollTemplate: FunctionComponent<BaseNoScrollTemplateProps> = React.memo(({
                                                                                         children,
                                                                                         title,
                                                                                         header,
                                                                                         _status,
                                                                                         _hStack,
                                                                                         ...props
                                                                                       }: any) => {

  const params = props?.route?.params;
  const serverInfo = ServerAPI.tempStore.serverInfo;

  const childrenWithProps = CloneChildrenWithProps.passProps(children, {...props});

  let showbackbutton = params?.showbackbutton;
  if(NavigatorHelper.getHistory()?.length<=1){
    showbackbutton = false;
  }

  const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0
  const keyboardVerticalOffset = paddingTop;

  return (
    <EmptyTemplate autoOpenCookies={props?.autoOpenCookies}>
      <View flex={1} flexDirection={"row"}>
        <BaseLayout title={title} serverInfo={serverInfo} header={header} showbackbutton={showbackbutton} >
          <View style={{width: "100%", height: "100%"}} >
            {childrenWithProps}
          </View>
        </BaseLayout>
      </View>
    </EmptyTemplate>
  )
});

export { BaseNoScrollTemplate };
