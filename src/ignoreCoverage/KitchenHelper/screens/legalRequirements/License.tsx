// @ts-nocheck
import React, {useEffect} from "react";
import {PackagesWithLicenses} from "./PackagesWithLicenses";
import {ConfigHolder} from "../../ConfigHolder";

export const License = (props) => {

	ConfigHolder.instance.setHideDrawer(false);

	// corresponding componentDidMount
	useEffect(() => {

	}, [props.route.params])

	return(
		<>
			<PackagesWithLicenses />
		</>
	)
}
