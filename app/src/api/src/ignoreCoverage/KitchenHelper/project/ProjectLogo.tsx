// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {Image, View} from "native-base";
import {ServerInfoHelper} from "../helper/ServerInfoHelper";
import {ServerInfo} from "@directus/sdk";
import {DirectusImage} from "./DirectusImage";
import ServerAPI from "../ServerAPI";
import {ConfigHolder} from "../ConfigHolder";

let titleBoxHeight = 60;

interface AppState {
	serverInfo?: ServerInfo;
	rounded?: boolean
}
export const ProjectLogo: FunctionComponent<AppState> = (props) => {

	const serverInfo = props.serverInfo || ServerAPI.tempStore.serverInfo;
	let project_color = ServerInfoHelper.getProjectColor(serverInfo);
	let project_logo_asset_id = ServerInfoHelper.getProjectLogoAssetId(serverInfo);

	let borderRadius = props.rounded? 10 : 0;
	const heightAndWidth = titleBoxHeight || 10;


	if(!!ConfigHolder?.plugin?.renderCustomProjectLogo){
	  let rendered = ConfigHolder?.plugin?.renderCustomProjectLogo({
      serverInfo: serverInfo,
      height: heightAndWidth,
      width: heightAndWidth,
      backgroundColor: project_color,
      borderRadius: borderRadius
	  });
	  if(!!rendered){
	    return rendered;
    }
  }

	return(
		// @ts-ignore
		<View style={{height: heightAndWidth, width: heightAndWidth, backgroundColor: project_color, borderRadius: borderRadius, alignItems: "center", justifyContent: "center"}}>
			<DirectusImage alt={""}
						   isPublic={true}
						   assetId={project_logo_asset_id}
						   style={{height: 40, width: 40}} />
		</View>
	)
}