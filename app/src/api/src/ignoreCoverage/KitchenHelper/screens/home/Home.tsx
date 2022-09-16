// @ts-nocheck
import React, {useEffect, useRef, useState} from "react";
import {Text} from "native-base";
import ServerAPI from "../../ServerAPI";
import {ConfigHolder} from "../../ConfigHolder";
import {keyof} from "ts-keyof";

export const Home = (props) => {

  let customHomeComponent = ConfigHolder.plugin.getHomeComponent();
  if(!!customHomeComponent){
    return customHomeComponent;
  }

	// corresponding componentDidMount
	useEffect(() => {

	}, [props?.route?.params])

	return(
		<>
			<Text>{"Welcome Home"}</Text>
      <Text>{"You may implement getHomeComponent in the Plugin"}</Text>
		</>
	)
}

Home.displayName = keyof({ Home });
