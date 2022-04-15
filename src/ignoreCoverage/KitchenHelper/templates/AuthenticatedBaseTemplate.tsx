import React, {useEffect, useState} from "react";
import ServerAPI from "../ServerAPI";
import {BaseTemplate} from "./BaseTemplate";

export const AuthenticatedBaseTemplate = ({
								 children,
								 navigation,
								 title,
								 navigateTo,
								 serverInfo,
								 _status,
								 _hStack,
								 ...props}: any) => {

	const [authenticated, setAuthenticated] = useState(undefined)

	async function loadServerInfo() {
		try{
			let directus = ServerAPI.getClient();

		} catch (err){
			console.log("Error at get Server Info");
			console.log(err);
		}
	}

	// corresponding componentDidMount
	useEffect(() => {
		if(!serverInfo){
			loadServerInfo();
		}
	}, [props.route.params])

	return(
		<BaseTemplate>
			{children}
		</BaseTemplate>
	)
}
