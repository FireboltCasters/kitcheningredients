// @ts-nocheck
import React from "react";
import {Box} from "native-base";
import {BreakPointLayout} from "./BreakPointLayout";
import {Layout} from "./Layout";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";
import {ShowMoreGradientPlaceholder} from "../utils/ShowMoreGradientPlaceholder";
import {EmptyTemplate} from "./EmptyTemplate";

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
				<BreakPointLayout >
					<Box style={{height: "100%", alignItems: "flex-start", width: "100%"}}>
						{childrenWithProps}
            <ShowMoreGradientPlaceholder />
					</Box>
				</BreakPointLayout>
		</EmptyTemplate>
	)
}

BaseTemplate.useBaseTemplateContentWidth = Layout.useBaseTemplateContentWidth;
