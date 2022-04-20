"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagesWithLicenses = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const ExpandableDrawerItem_1 = require("../../navigation/ExpandableDrawerItem");
const MyThemedBox_1 = require("../../helper/MyThemedBox");
const TextWithIcon_1 = require("../../components/TextWithIcon");
const MoreInformationButton_1 = require("../../components/MoreInformationButton");
const App_1 = __importDefault(require("../../App"));
const PackagesWithLicenses = (props) => {
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
    }, []);
    function getUrlToPackageInformation(dependencyKey) {
        return "https://www.npmjs.com/package/" + dependencyKey;
    }
    function renderAllPackages() {
        let output = [];
        let dependencies = App_1.default.currentpackageJson?.dependencies || {};
        let lockPackageDependencies = App_1.default.currentpackageJsonLock?.packages || {};
        let dependencyKeys = Object.keys(dependencies);
        for (let dependencyKey of dependencyKeys) {
            let upperVersion = dependencies[dependencyKey];
            let keyInPackageLockDependency = "node_modules/" + dependencyKey;
            let packageLockDependency = lockPackageDependencies[keyInPackageLockDependency] || {};
            let currentVersion = packageLockDependency?.version;
            let thirdpartyDependency = App_1.default.thirdpartyLicense[dependencyKey + "@" + currentVersion];
            output.push(renderPackage(dependencyKey, upperVersion, currentVersion, thirdpartyDependency));
        }
        return output;
    }
    function renderPackageLabel(dependencyKey, upperVersion, currentVersion, thirdpartyDependencyn) {
        return (<native_base_1.View>
				<native_base_1.Text>{dependencyKey}</native_base_1.Text>
			</native_base_1.View>);
    }
    function renderRowInformation(icon, label, content) {
        if (!content) {
            return null;
        }
        return (<TextWithIcon_1.TextWithIcon icon={icon}>
				<native_base_1.Text><native_base_1.Text bold={true}>{label + ": "}</native_base_1.Text>{content}</native_base_1.Text>
			</TextWithIcon_1.TextWithIcon>);
    }
    function renderRowInformationLink(icon, url) {
        if (!url) {
            return null;
        }
        return (<TextWithIcon_1.TextWithIcon icon={icon}>
				<native_base_1.Link href={url}>
					<native_base_1.Text>{url}</native_base_1.Text>
				</native_base_1.Link>
			</TextWithIcon_1.TextWithIcon>);
    }
    function renderDownloadedInformations(dependencyKey, upperVersion, currentVersion, thirdpartyDependency) {
        let url = thirdpartyDependency?.url;
        let repositoryUrl = thirdpartyDependency?.repository;
        let packageUrl = getUrlToPackageInformation(dependencyKey);
        let license = thirdpartyDependency?.licenses;
        let publisher = thirdpartyDependency?.publisher;
        let email = thirdpartyDependency?.email;
        return (<native_base_1.View>
				{renderRowInformationLink("web", url)}
				{renderRowInformation("license", "License", license)}
				{renderRowInformation("account-circle", "Publisher", publisher)}
				{renderRowInformation("email", "Email", email)}
				{renderRowInformationLink("github", repositoryUrl)}
				<MoreInformationButton_1.MoreInformationButton key={dependencyKey} content={thirdpartyDependency}/>
			</native_base_1.View>);
    }
    function renderPackageInformations(dependencyKey, upperVersion, currentVersion, thirdpartyDependency) {
        return (<native_base_1.View>
				<MyThemedBox_1.MyThemedBox _shadeLevel={3}>
					<native_base_1.View style={{ padding: 4 }}>
						{renderDownloadedInformations(dependencyKey, upperVersion, currentVersion, thirdpartyDependency)}
					</native_base_1.View>
				</MyThemedBox_1.MyThemedBox>
			</native_base_1.View>);
    }
    function renderPackage(dependencyKey, upperVersion, currentVersion, thirdpartyDependency) {
        return (<native_base_1.View style={{ paddingBottom: 10, width: "100%" }}>
				<ExpandableDrawerItem_1.ExpandableDrawerItem level={2} hasChildren={true} label={() => { return renderPackageLabel(dependencyKey, upperVersion, currentVersion, thirdpartyDependency); }}>
					{renderPackageInformations(dependencyKey, upperVersion, currentVersion, thirdpartyDependency)}
				</ExpandableDrawerItem_1.ExpandableDrawerItem>
			</native_base_1.View>);
    }
    return (<>
			{renderAllPackages()}
		</>);
};
exports.PackagesWithLicenses = PackagesWithLicenses;
