"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDrawerContent = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const drawer_1 = require("@react-navigation/drawer");
const native_base_1 = require("native-base");
const ProjectLogo_1 = require("../project/ProjectLogo");
const NavigatorHelper_1 = require("./NavigatorHelper");
const ProjectName_1 = require("../project/ProjectName");
const MyMenuRegisterer_1 = require("./MyMenuRegisterer");
const MyThemedBox_1 = require("../helper/MyThemedBox");
const ExpandableDrawerItem_1 = require("./ExpandableDrawerItem");
const App_1 = __importDefault(require("../App"));
const UserProfileAvatar_1 = require("../project/UserProfileAvatar");
const SignOutButton_1 = require("../auth/SignOutButton");
const Users_1 = require("../screens/user/Users");
const react_native_1 = require("react-native");
const SettingsButton_1 = require("../screens/settings/SettingsButton");
const RouteRegisterer_1 = require("./RouteRegisterer");
const CustomDrawerContent = (props) => {
    let history = props?.state?.history || [];
    let currentRoute = history.slice(-1)[0]; // get last element
    //console.log("currentRoute: ", currentRoute);
    //console.log("props", props);
    const currentRouteKey = currentRoute?.key;
    let user = App_1.default.getUser();
    function renderDrawerItems() {
        let routes = props?.state?.routes || [];
        let output = [];
        if (!!user) {
            output.push(renderAuthenticatedMenu());
            output.push(renderUserRoleIdMenu(user));
            output.push(renderUserRoleNameMenu());
        }
        else {
            output.push(renderUnauthenticatedMenu());
        }
        output.push(renderCommonMenu());
        return output;
    }
    function renderMenu(menu, level = 0) {
        let menuChilds = menu.getChildItems();
        let hasChildren = menuChilds.length > 0;
        let renderedChilds = [];
        for (let childMenu of menuChilds) {
            renderedChilds.push(renderMenu(childMenu, level + 1));
        }
        let content = menu.content;
        if (!content) {
            content = (<native_base_1.View>
					<native_base_1.Text fontSize={"md"}>{menu.label}</native_base_1.Text>
				</native_base_1.View>);
        }
        return (<ExpandableDrawerItem_1.ExpandableDrawerItem expanded={menu.expanded} key={"ExpandableDrawerItem" + menu.key} hasChildren={hasChildren} level={level} label={() => {
                return content;
            }} onPress={(nextExpanded) => { menu.handleOnPress(); }}>
				{renderedChilds}
			</ExpandableDrawerItem_1.ExpandableDrawerItem>);
    }
    function renderUserRoleNameMenu() {
        let role = App_1.default.getRole();
        return renderMenuByName(role?.name);
    }
    function renderUserRoleIdMenu(user) {
        let role_id = user.role;
        return renderMenusByRole(role_id);
    }
    function renderUnauthenticatedMenu() {
        return renderMenusByRole(MyMenuRegisterer_1.MyMenuRegisterer.ROLE_UNAUTHENTICATED);
    }
    function renderAuthenticatedMenu() {
        return renderMenusByRole(MyMenuRegisterer_1.MyMenuRegisterer.ROLE_AUTHENTICATED);
    }
    function renderCommonMenu() {
        return renderMenusByRole(MyMenuRegisterer_1.MyMenuRegisterer.ROLE_PUBLIC);
    }
    function renderMenuByName(name) {
        let menus = MyMenuRegisterer_1.MyMenuRegisterer.menusForRolesByName[name];
        return renderMenus(menus);
    }
    function renderMenusByRole(role) {
        let menus = MyMenuRegisterer_1.MyMenuRegisterer.menusForRolesByID[role];
        return renderMenus(menus);
    }
    function renderMenus(menus) {
        if (!menus) {
            menus = [];
        }
        let output = [];
        for (let menu of menus) {
            output.push(renderMenu(menu));
        }
        return output;
    }
    function handleAvatarPress() {
        NavigatorHelper_1.NavigatorHelper.navigate(Users_1.Users, { id: user.id });
    }
    function renderBottomPanel() {
        if (!!user) {
            return (<MyThemedBox_1.MyThemedBox style={{ flexDirection: "row", alignItems: "center" }}>
					<UserProfileAvatar_1.UserProfileAvatar user={user} onPress={handleAvatarPress}/>
					<SettingsButton_1.SettingsButton onlyIcon={true}/>
					<native_base_1.View style={{ flex: 1, flexDirection: "row-reverse" }}>
						<SignOutButton_1.SignOutButton onlyIcon={true}/>
					</native_base_1.View>
				</MyThemedBox_1.MyThemedBox>);
        }
    }
    let bgColor = RouteRegisterer_1.RouteRegisterer.getDrawerBackgroundColor();
    let customBackgroundStyle = {};
    if (!!bgColor) {
        customBackgroundStyle = { backgroundColor: bgColor };
    }
    return (<MyThemedBox_1.MyThemedBox style={[{ height: "100%" }, customBackgroundStyle]}>
			<react_native_1.SafeAreaView style={{ height: "100%", width: "100%" }}>
				<drawer_1.DrawerContentScrollView {...props}>
					<drawer_1.DrawerItem key={"ProjectLogoItem"} label={() => {
            return (<native_base_1.View style={{ flexDirection: "row" }}>
								<ProjectLogo_1.ProjectLogo menuBar={true}/>
								<ProjectName_1.ProjectName themedColor={true}/>
							</native_base_1.View>);
        }} onPress={() => {
            NavigatorHelper_1.NavigatorHelper.navigateHome();
        }}/>
					{renderDrawerItems()}
				</drawer_1.DrawerContentScrollView>
				{renderBottomPanel()}
			</react_native_1.SafeAreaView>
		</MyThemedBox_1.MyThemedBox>);
};
exports.CustomDrawerContent = CustomDrawerContent;
