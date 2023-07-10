import React, {useEffect, useState} from "react";
import {CookieInformation} from "../screens/legalRequirements/CookieInformation";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";
import {RequiredNavigationBar} from "./RequiredNavigationBar";
import {KeyboardAvoidingView, View} from "native-base";

import {Platform, StatusBar} from "react-native";
import {KitchenSafeAreaView} from "../components/KitchenSafeAreaView";

const EmptyTemplate = React.memo(({
                                    children,
                                    navigation,
                                    title,
                                    navigateTo,
                                    serverInfo,
                                    _status,
                                    _hStack,
                                    autoOpenCookies,
                                    ...props}: any) => {

  const [dimension, setDimenstion] = useState({width: undefined, height: undefined})
  const [rendered, setRendered] = useState([]);


  useEffect(() => {
    setTimeout(() => {
      const childrenWithProps = CloneChildrenWithProps.passProps(children, {dimension: dimension});
      setRendered(childrenWithProps);
    }, 0)
  }, []);

  const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0
  const keyboardVerticalOffset = paddingTop;

  function setDimensions(event){
    const {width, height} = event.nativeEvent.layout;
    // We can set the state to allow for reference through the state property, and will also change
    let adjustedHeight = undefined;
    if(!!height){
      adjustedHeight = parseInt(height); // since we have a small padding we want to remove the height
    }

    setDimenstion({width: width, height: adjustedHeight});
  }




  return(
    <KitchenSafeAreaView>
      <KeyboardAvoidingView
        keyboardVerticalOffset = {keyboardVerticalOffset} // adjust the value here if you need more padding
        style = {{height: "100%", width: "100%"}}
        behavior={Platform.OS === "ios" ? "padding" : "height"} >
        <View style={{height: "100%", width: "100%"}}>
          <View style={{height: "100%", width: "100%", flexDirection: "column-reverse"}}>
            <RequiredNavigationBar />
            <View style={{flex: 1, width: "100%", height: "100%"}} onLayout={setDimensions} >
              {rendered}
            </View>
          </View>
          <CookieInformation autoOpenCookies={autoOpenCookies} />
        </View>
      </KeyboardAvoidingView>
    </KitchenSafeAreaView>
  )
});

export { EmptyTemplate };
