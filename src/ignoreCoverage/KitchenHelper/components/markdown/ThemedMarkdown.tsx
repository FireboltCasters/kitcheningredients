import React, {FunctionComponent, useEffect, useState} from "react";
import {useColorMode, useTheme} from "native-base";
import Markdown from "react-native-markdown-display";
import {MarkdownSkeleton} from "./MarkdownSkeleton";

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
	}

	return(
		<Markdown
			style={style}
		>
			{props.children}
		</Markdown>
	)
}
