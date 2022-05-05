// @ts-nocheck
import React, {useEffect, useRef, useState} from "react";
import {Text} from "native-base";
import ServerAPI from "../../ServerAPI";
import {ConfigHolder} from "../../ConfigHolder";

export const Home = (props) => {

  let customHomeComponent = ConfigHolder.plugin.getHomeComponent();
  if(!!customHomeComponent){
    return customHomeComponent;
  }

	const [ms, setMs] = useState(null);
	const [info, setInfo] = useState(null);

	const timer = useRef(null); // we can save timer in useRef and pass it to child

	async function downloadServerStatus(){
		console.log("Home DownloadServerStatus")
		let directus = ServerAPI.getClient();
		let startTime = Date.now()
		await directus.server.ping();
		let endTime = Date.now();
		let msCalculated = endTime-startTime;
		msCalculated = parseInt(msCalculated.toFixed(0));
		setMs(msCalculated);

		try{
			let users = await directus.users.readByQuery();
			setInfo(users);
		} catch (err){
			console.log(err);
		}
	}

	// corresponding componentDidMount
	useEffect(() => {
		downloadServerStatus()
		timer.current = setInterval(() => {downloadServerStatus()}, 1000);
		// this will clear Interval
		// clear on component unmount
		return () => {
			clearInterval(timer.current);
		};
	}, [props.route.params])

	return(
		<>
			<Text>{"Welcome Home"}</Text>
			<Text>{"MS: "+ms}</Text>
			<Text>{JSON.stringify(info, null, 4)}</Text>
		</>
	)
}

Home.componentName = "Home"
