// @ts-nocheck
import React, {useEffect, useRef, useState} from "react";
import {Button, Input, Text, View} from "native-base";
import ServerAPI from "../../ServerAPI";
import {SettingsValue} from "../settings/SettingsValue";
import {SynchedVariable} from "../../storage/SynchedVariable";
import {RequiredStorageKeys} from "../../storage/RequiredStorageKeys";
import {useSynchedState} from "../../synchedstate/SynchedState";

export const Debug = (props) => {

	const [ms, setMs] = useState(null);
	const [date, setDate] = useState(new Date());
	const [info, setInfo] = useState(null);

	const [refreshToken, setRefreshToken] = useSynchedState(RequiredStorageKeys.KEY_AUTH_REFRESH_TOKEN);
	const [accessToken, setAccessToken] = useSynchedState(RequiredStorageKeys.KEY_AUTH_ACCESS_TOKEN);

	const timer = useRef(null); // we can save timer in useRef and pass it to child

	async function downloadServerStatus(){
		let directus = ServerAPI.getClient();
		let startTime = performance.now()
		await directus.server.ping();
		let endTime = performance.now();
		let msCalculated = endTime-startTime;
		msCalculated = parseInt(msCalculated.toFixed(0));
		setMs(msCalculated);
		setDate(new Date());
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
			<Text>{"Debug Screen"}</Text>
			<Text>{"MS: "+ms}</Text>
			<Text>{date.toString()}</Text>
			<View style={{width: "500px", margin: "40px"}}>
				<SynchedVariable storageKey={RequiredStorageKeys.KEY_AUTH_REFRESH_TOKEN} key={RequiredStorageKeys.KEY_AUTH_REFRESH_TOKEN}>
					<SettingsValue />
				</SynchedVariable>

				<SynchedVariable storageKey={RequiredStorageKeys.KEY_AUTH_ACCESS_TOKEN} key={RequiredStorageKeys.KEY_AUTH_ACCESS_TOKEN}>
					<SettingsValue />
				</SynchedVariable>
			</View>



		</>
	)
}
