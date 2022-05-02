// @ts-nocheck
import React, {useState} from "react";
import {Box, View} from "native-base";
import {BreakPointLayout} from "./BreakPointLayout";
import {Layout} from "./Layout";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";
import {ShowMoreGradientPlaceholder} from "../utils/ShowMoreGradientPlaceholder";
import {BaseNoScrollTemplate} from "./BaseNoScrollTemplate";
import {ScrollViewWithGradient} from "../utils/ScrollViewWithGradient";

export const BaseTemplate = ({
								 children,
								 navigation,
								 title,
								 navigateTo,
								 serverInfo,
								 _status,
								 _hStack,
								 ...props}: any) => {

  const [dimension, setDimenstion] = useState({width: undefined, height: undefined})

  function setDimensions(event){
    const {width, height} = event.nativeEvent.layout;
    // We can set the state to allow for reference through the state property, and will also change
    let adjustedHeight = undefined;
    if(!!height){
      adjustedHeight = parseInt(height)-Layout.padding; // since we have a small padding we want to remove the height
    }

    const contentWidth = Layout.useBaseTemplateContentWidth();

    setDimenstion({width: contentWidth, height: adjustedHeight});
  }

  const childrenWithProps = CloneChildrenWithProps.passProps(children, {dimension: dimension, ...props});

	return(
		<BaseNoScrollTemplate {...props} title={title}>
      <View style={{width: "100%", height: "100%"}} onLayout={setDimensions}>
        <ScrollViewWithGradient hideGradient={true} style={{width: "100%", height: "100%"}} >
          <BreakPointLayout >
            <Box style={{height: "100%", alignItems: "flex-start", width: "100%"}}>
              {childrenWithProps}
              <ShowMoreGradientPlaceholder />
            </Box>
          </BreakPointLayout>
        </ScrollViewWithGradient>
      </View>
		</BaseNoScrollTemplate>
	)
}

BaseTemplate.useBaseTemplateContentWidth = Layout.useBaseTemplateContentWidth;
