// @ts-nocheck
import React, {useState} from "react";
import {Layout} from "./Layout";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";
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
