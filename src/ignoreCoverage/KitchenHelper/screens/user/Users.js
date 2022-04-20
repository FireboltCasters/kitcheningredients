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
exports.Users = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const UserProfileAvatar_1 = require("../../project/UserProfileAvatar");
const ServerAPI_1 = __importDefault(require("../../ServerAPI"));
const MyThemedBox_1 = require("../../helper/MyThemedBox");
const vector_icons_1 = require("@expo/vector-icons");
const MyAlertDialog_1 = require("../../helper/MyAlertDialog");
const react_native_1 = require("react-native");
const Users = (props) => {
    const user_id = props?.route?.params?.id;
    const [user, setUser] = (0, react_1.useState)(null);
    const [role, setRole] = (0, react_1.useState)(null);
    const [firstload, setFirstload] = (0, react_1.useState)(true);
    const [showmore, setShowmore] = (0, react_1.useState)(false);
    async function loadData() {
        try {
            console.log("Load User");
            let directus = ServerAPI_1.default.getClient();
            let remoteUser = await directus.users.readOne(user_id);
            console.log("Users remoteUser: ", remoteUser);
            setUser(remoteUser);
            let remoteRole = await ServerAPI_1.default.getRole(remoteUser);
            setRole(remoteRole);
        }
        catch (err) {
            console.log(err);
        }
    }
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
        console.log("UseEffect Users");
        console.log("firstload: ", firstload);
        if (firstload) {
            console.log("Load Users");
            setFirstload(false);
            loadData();
        }
    }, [props.route.params]);
    function renderUserImage() {
        console.log("Render User Image");
        console.log(user);
        return (<MyThemedBox_1.MyThemedBox _shadeLevel={2} style={{ marginRight: 20, justifyContent: "center", alignItems: "center", height: 142, width: 142, borderRadius: 152, overflow: "hidden" }}>
				<native_base_1.View style={{ height: 132, width: 132, borderRadius: 132, overflow: "hidden" }}>
					<UserProfileAvatar_1.UserProfileAvatar heightAndWidth={"100%"} user={user}/>
				</native_base_1.View>
			</MyThemedBox_1.MyThemedBox>);
    }
    function renderRowInformation(icon, content) {
        let renderedIcon = !!icon ? <native_base_1.Text><native_base_1.Icon as={vector_icons_1.MaterialCommunityIcons} name={icon} marginRight={15}/></native_base_1.Text> : null;
        return (<native_base_1.View style={{ alignItems: "center", flexDirection: "row", margin: 3 }}>
				{renderedIcon}<native_base_1.Text>{content}</native_base_1.Text>
			</native_base_1.View>);
    }
    function renderUserBasicInformations() {
        let fullname = user?.first_name + " " + user?.last_name;
        let title = !!user?.title ? ", " + user.title : "";
        let mail = !!user?.email ? user.email : "";
        let id = !!user?.id ? user.id : "";
        return (<native_base_1.View style={{ flex: 1 }}>
				{renderRowInformation("account-circle", <>{fullname}<native_base_1.Text fontWeight={"thin"} italic={true}>{title}</native_base_1.Text></>)}
				{renderRowInformation("email", mail)}
				{renderRowInformation("passport", <native_base_1.Text fontWeight={"thin"} italic={true}>{id}</native_base_1.Text>)}
				{renderUserRole()}
			</native_base_1.View>);
    }
    function renderUserAdvancedInformations() {
        let content = <native_base_1.TextArea h={"500px"} value={JSON.stringify(user, null, 4)} w={{
                base: "100%",
            }}/>;
        return (<native_base_1.View key={showmore + "renderUserAdvancedInformations"}>
				<react_native_1.TouchableOpacity onPress={() => {
                setShowmore(true);
            }}>
					<native_base_1.Text><native_base_1.Icon as={vector_icons_1.MaterialCommunityIcons} name={"dots-horizontal"}/></native_base_1.Text>
				</react_native_1.TouchableOpacity>
				<MyAlertDialog_1.MyAlertDialog accept={"OK"} title={"More Informations"} content={content} onClose={() => { setShowmore(false); return false; }} onAccept={() => { setShowmore(false); return false; }} isOpen={showmore}/>
			</native_base_1.View>);
    }
    function renderUserRole() {
        let roleName = role?.name;
        return renderRowInformation("check-decagram", roleName);
    }
    return (<>
			<MyThemedBox_1.MyThemedBox _shadeLevel={1} style={{ width: "100%" }}>
				<native_base_1.View style={{ margin: 20, flexDirection: "row-reverse", alignItems: "center" }}>
					{renderUserAdvancedInformations()}
					<native_base_1.View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
						{renderUserImage()}
						{renderUserBasicInformations()}
					</native_base_1.View>
				</native_base_1.View>
			</MyThemedBox_1.MyThemedBox>
		</>);
};
exports.Users = Users;
