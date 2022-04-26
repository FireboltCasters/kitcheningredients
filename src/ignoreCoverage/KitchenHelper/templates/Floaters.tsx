// @ts-nocheck
import React from 'react';
import CustomFloaters from "./CustomFloaters";
import {ThemeFloaterButton} from "./ThemeFloaterButton";
import {ConfigHolder} from "./../ConfigHolder";

//TODO: https://docs.nativebase.io/stagger
export const Floaters = () => {

  let themeFloaterButton = null;
  if(ConfigHolder.displayThemeFloater){
    themeFloaterButton = <ThemeFloaterButton />;
  }


	const renderedContent = [
		themeFloaterButton,
		...CustomFloaters.getFloaters()
	];

	return (
		<>
			{renderedContent}
		</>
	);
};
