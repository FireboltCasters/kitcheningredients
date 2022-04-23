// @ts-nocheck
import React, {useEffect} from "react";
import {Text} from "native-base";
import {ConfigHolder} from "../../ConfigHolder";

export const Home = (props) => {

	// corresponding componentDidMount
	useEffect(() => {
	}, [props.route.params])

  let component = ConfigHolder.plugin.getHomeComponent();

  if(!!component){
    return component
  }

	return(
		<>
			<Text>{"Welcome Home"}</Text>
		</>
	)
}
