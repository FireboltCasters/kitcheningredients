// @ts-nocheck
import React from "react";
import {Box} from "native-base";
import {BreakPointLayout} from "./BreakPointLayout";
import {Layout} from "./Layout";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";
import {ShowMoreGradientPlaceholder} from "../utils/ShowMoreGradientPlaceholder";
import {EmptyTemplate} from "./EmptyTemplate";
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

  const childrenWithProps = CloneChildrenWithProps.passProps(children, {dimension: props.dimension});

	return(
		<EmptyTemplate {...props}>
      <ScrollViewWithGradient hideGradient={true} style={{width: "100%", height: "100%"}} >
				<BreakPointLayout >
					<Box style={{height: "100%", alignItems: "flex-start", width: "100%"}}>
						{childrenWithProps}
            <ShowMoreGradientPlaceholder />
					</Box>
				</BreakPointLayout>
      </ScrollViewWithGradient>
		</EmptyTemplate>
	)
}

BaseTemplate.useBaseTemplateContentWidth = Layout.useBaseTemplateContentWidth;
