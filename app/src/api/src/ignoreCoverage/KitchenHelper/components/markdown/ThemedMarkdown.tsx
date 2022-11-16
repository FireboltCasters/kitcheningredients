import React, {FunctionComponent, useEffect, useState} from "react";
import {useColorMode, useTheme, Text} from "native-base";
import MarkdownIt from "markdown-it";
import RenderHtml from 'react-native-render-html';
import {MarkdownSkeleton} from "./MarkdownSkeleton";
import {PlatformHelper} from "../../helper/PlatformHelper";
import {useWindowDimensions} from "react-native";

interface AppState {
	darkmode?: boolean,
  hideSkeleton?: boolean,
}
export const ThemedMarkdown: FunctionComponent<AppState> = (props) => {

  if(props.children===undefined && !props.hideSkeleton){
    return <MarkdownSkeleton />
  }

	const { colorMode, toggleColorMode } = useColorMode();
	let darkMode = colorMode!=="light";
	if(props.darkmode !== undefined){
		darkMode = props.darkmode
	}

	const theme = useTheme();

	let darkModeTextColor = theme["colors"]["lightText"]; //darkText is used in lightmode !
	let lightModeTextColor = theme["colors"]["darkText"];

	let textColor = darkMode ? darkModeTextColor : lightModeTextColor;
	let fontSize = theme["fontSizes"]["lg"]

	//TODO add more adjustments
	const style = {
		text: {
			color: textColor
		},
		body: {
			backgroundColor: "transparent",
			fontSize: fontSize
		},
		blockquote: {
			backgroundColor: 'transparent',
		},
		code_inline: {
			color: textColor,
			backgroundColor: 'transparent',
		},
    "font-size": "large",
    "font-family": "Roboto",
    "color": "yellow",
	}

  const {width} = useWindowDimensions();

  let md = new MarkdownIt();
  let result = md.render(props.children);

  let html = {
    html: `
                <div style="color: ${textColor}; font-size: ${fontSize}">
                    ${result}
                </div>
            `
  };


  return <RenderHtml
      defaultTextProps={{selectable: true}}
      defaultViewProps={{style: {justifyContent: "flex-start"}}}
      source={html}
      contentWidth={width}
    />
}
