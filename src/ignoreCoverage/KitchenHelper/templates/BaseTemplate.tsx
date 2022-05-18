// @ts-nocheck
import React, {useState} from "react";
import {Box, View} from "native-base";
import {BreakPointLayout} from "./BreakPointLayout";
import {Layout} from "./Layout";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";
import {ShowMoreGradientPlaceholder} from "../utils/ShowMoreGradientPlaceholder";
import {BaseNoScrollTemplate} from "./BaseNoScrollTemplate";
import {ScrollViewWithGradient} from "../utils/ScrollViewWithGradient";
import {BaseNoPaddingTemplate} from "./BaseNoPaddingTemplate";
import {BasePadding} from "./BasePadding";

export const BaseTemplate = ({
								 children,
								 title,
                  header,
								 _status,
								 _hStack,
								 ...props}: any) => {

  const childrenWithProps = CloneChildrenWithProps.passProps(children, {...props});

	return(
		<BaseNoPaddingTemplate {...props} title={title} header={header}>
      <BasePadding>
        {childrenWithProps}
      </BasePadding>
		</BaseNoPaddingTemplate>
	)
}

BaseTemplate.useBaseTemplateContentWidth = Layout.useBaseTemplateContentWidth;
