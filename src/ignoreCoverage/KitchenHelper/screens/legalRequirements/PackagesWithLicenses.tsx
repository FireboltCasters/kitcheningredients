// @ts-nocheck
import React, {useEffect, useState} from "react";
import {Link, Skeleton, Text, View} from "native-base";
import {ExpandableDrawerItem} from "../../navigation/ExpandableDrawerItem";
import {MyThemedBox} from "../../helper/MyThemedBox";
import {TextWithIcon} from "../../components/TextWithIcon";
import {MoreInformationButton} from "../../components/MoreInformationButton";
import {ConfigHolder} from "../../ConfigHolder";
import {MenuItem} from "kitcheningredients";

export const PackagesWithLicenses = (props) => {

	// corresponding componentDidMount
	useEffect(() => {

	}, [])

	function getUrlToPackageInformation(dependencyKey){
		return "https://www.npmjs.com/package/"+dependencyKey;
	}

	function renderAllPackages(){
		let output = [];
		let dependencies = ConfigHolder.currentpackageJson?.dependencies || {};
		let lockPackageDependencies = ConfigHolder.currentpackageJsonLock?.packages || {};

		let dependencyKeys = Object.keys(dependencies);
		for(let dependencyKey of dependencyKeys){
			let upperVersion = dependencies[dependencyKey];

			let keyInPackageLockDependency = "node_modules/"+dependencyKey;
			let packageLockDependency = lockPackageDependencies[keyInPackageLockDependency] || {};
			let currentVersion = packageLockDependency?.version;

			let thirdpartyDependency = ConfigHolder.thirdpartyLicense[dependencyKey+"@"+currentVersion];

			output.push(renderPackage(dependencyKey, upperVersion, currentVersion, thirdpartyDependency));
		}
		return output;
	}

	function getSubMenuRow(icon, label, content){
		if(!content){
			return null;
		}

		let content = <Text><Text bold={true}>{label+": "}</Text>{content}</Text>;
		return new MenuItem(label, label, null, null, null, content, false, icon);
	}

	function getSubMenuWithLink(icon, url){
		if(!url){
			return null;
		}

    let content = (
      <Text>
        <Link href={url} >
        <Text>{url}</Text>
        </Link>
      </Text>
    );
    return new MenuItem(url, url, null, null, null, content, false, icon);
	}

	function getPackageChildrenMenu(dependencyKey, upperVersion, currentVersion, thirdpartyDependency){
		let url = thirdpartyDependency?.url;
		let repositoryUrl = thirdpartyDependency?.repository;

		let packageUrl = getUrlToPackageInformation(dependencyKey);
		let license = thirdpartyDependency?.licenses
		let publisher = thirdpartyDependency?.publisher
		let email = thirdpartyDependency?.email

    return [
      getSubMenuWithLink("web", url),
      getSubMenuRow("license", "License", license),
      getSubMenuRow("account-circle", "Publisher", publisher),
      getSubMenuRow("email", "Email", email),
      getSubMenuWithLink("github", repositoryUrl),
    ]
	}

	function renderPackage(dependencyKey, upperVersion, currentVersion, thirdpartyDependency){
	  let label = dependencyKey;
	  let key = dependencyKey;

	  let menuItem = new MenuItem(key, label, null, null, null, null, false);
	  menuItem.addChildMenuItems(getPackageChildrenMenu(dependencyKey, upperVersion, currentVersion, thirdpartyDependency))

		return (
			<View style={{paddingBottom: 10, width: "100%"}}>
				<ExpandableDrawerItem
          key={key}
					level={2}
          menu={menuItem}>
				</ExpandableDrawerItem>
			</View>
		);
	}

	return(
		<>
			{renderAllPackages()}
		</>
	)
}
