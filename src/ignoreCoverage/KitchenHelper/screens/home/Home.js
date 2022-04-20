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
exports.Home = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const ServerAPI_1 = __importDefault(require("../../ServerAPI"));
const Home = (props) => {
    const [ms, setMs] = (0, react_1.useState)(null);
    const [info, setInfo] = (0, react_1.useState)(null);
    const timer = (0, react_1.useRef)(null); // we can save timer in useRef and pass it to child
    async function downloadServerStatus() {
        console.log("Home DownloadServerStatus");
        let directus = ServerAPI_1.default.getClient();
        let startTime = performance.now();
        await directus.server.ping();
        let endTime = performance.now();
        let msCalculated = endTime - startTime;
        msCalculated = parseInt(msCalculated.toFixed(0));
        setMs(msCalculated);
        try {
            let users = await directus.users.readByQuery();
            setInfo(users);
        }
        catch (err) {
            console.log(err);
        }
    }
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
        downloadServerStatus();
        timer.current = setInterval(() => { downloadServerStatus(); }, 1000);
        // this will clear Interval
        // clear on component unmount
        return () => {
            clearInterval(timer.current);
        };
    }, [props.route.params]);
    return (<>
			<native_base_1.Text>{"Welcome Home"}</native_base_1.Text>
			<native_base_1.Text>{"MS: " + ms}</native_base_1.Text>
			<native_base_1.Text>{JSON.stringify(info, null, 4)}</native_base_1.Text>
		</>);
};
exports.Home = Home;
