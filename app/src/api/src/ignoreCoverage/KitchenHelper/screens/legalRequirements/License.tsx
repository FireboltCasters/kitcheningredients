// @ts-nocheck
import React, {useEffect} from "react";
import {PackagesWithLicenses} from "./PackagesWithLicenses";
import {ConfigHolder} from "../../ConfigHolder";
import {AboutUs} from "./AboutUs";
import {keyof} from "ts-keyof";
import {RouteHelper} from "../../navigation/RouteHelper";

export const License = (props) => {

  ConfigHolder.instance.setHideDrawer(false, RouteHelper.getNameOfComponent(License));

	// corresponding componentDidMount
	useEffect(() => {

	}, [props?.route?.params])

	return(
		<>
			<PackagesWithLicenses />
		</>
	)
}

License.displayName = keyof({ License });
