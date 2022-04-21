// @ts-nocheck
import EnviromentHelper from "./EnviromentHelper";
import {Auth, AuthMode, Directus, MemoryStorage, ServerInfo, Transport, UserItem} from "@directus/sdk";
import App from "./App";
import axios, {AxiosInstance} from "axios";
import {NavigatorHelper} from "./navigation/NavigatorHelper";
import {Login} from "./auth/Login";
import TransportWrapper from "./server/TransportWrapper";
import AuthTransportWrapper from "./server/AuthTransportWrapper";

export default class ServerAPI{

	static directus = null;
	static tempStore = {
		serverInfo: undefined
	};

	static getAxiosInstance(): AxiosInstance{
		return axios.create();
	}

	/**
	 * We want a public client to get dont interfere with broken permissions and other stuff
	 */
	static getPublicClient(){
		let storage = new MemoryStorage();
		return ServerAPI.getDirectus(storage);
	}

	static getDirectus(storage, customErrorHandleCallback=null){
		let url = EnviromentHelper.getBackendURL();
		let transport = ServerAPI.getTransport(url, storage, null);
		let auth = ServerAPI.getAuth(url, storage, customErrorHandleCallback)
		return new Directus(url, {transport: transport, storage: storage, auth: auth});
	}

	static areCredentialsSaved(){
		return App.storage.has_credentials_saved();
	}

	static async handleLogoutError(){
		let storage = App.storage;
		storage.clear_credentials();
	}

	static async handleLogout(error=null){
		console.log("handleLogout")
		if(!!App.plugin && !!App.plugin.onLogout){
			App.plugin.onLogout(error);
		}

		try{
			let directus = ServerAPI.getDirectus(App.storage, ServerAPI.handleLogoutError);
			let response = await directus.auth.logout();
			await ServerAPI.handleLogoutError(); // we better make sure to reset variables in storage
		} catch (err){
			console.log("Error at: handleLogout");
			console.log(err);
			await ServerAPI.handleLogoutError(); // we better make sure to reset variables in storage
		}
		console.log("navigate to login")
		NavigatorHelper.navigate(Login, null, false);
		await App.setRedirectToLogin(true);
		await App.setUser(null);
	}

	static getClient(): Directus<any>{
		if(ServerAPI.directus){
			return ServerAPI.directus;
		}
		let errorHandler = ServerAPI.handleLogoutError; //use default error handler
		if(App.storage.is_guest()){
			errorHandler = () => {}; //as guest we ignore errors
		}
		const directus = ServerAPI.getDirectus(App.storage, errorHandler);
		// api.interceptors.response.use(onResponse, onError);

		ServerAPI.directus = directus;
		return directus;
	}

	static async getRole(user){
		let role_id = user?.role;
		if(!!role_id){
			try{
				let directus = ServerAPI.getClient();
				let role = await directus.roles.readOne(role_id);
				return role;
			} catch (err){
				console.log("Error at get Server Info: ",err);
			}
		}
	}

	static async loginWithAccessDirectusAccessToken(directus_access_token){
		let data = await ServerAPI.refreshWithDirectusAccessToken(directus_access_token);
		console.log(data);
		let storage = App.storage;
		let access_token = data.access_token;
		let refresh_token = data.refresh_token;
		let expires = data.expires || ""+0;
		console.log("expires: ", expires);
		//https://github.com/directus/directus/blob/main/api/src/services/authentication.ts
		//let expiresIn = new Date(Date.now() + ms(expires as string));
		//console.log("expiresIn: ",expiresIn);
		storage.set_auth_expires(expires);
		storage.set_refresh_token(refresh_token);
		storage.set_access_token(access_token);
		return data;
	}

	private static getAuth(url, storage, customErrorHandleCallback=null){
		let transport = ServerAPI.getAuthTransport(url, storage, customErrorHandleCallback);
		const modeForAuth: AuthMode = "json";
		//const modeForAuth: AuthMode = "cookie";
		let auth = new Auth({
			transport: transport,
			storage: storage,
			autoRefresh: true,
			mode: modeForAuth
		});
		return auth;
	}

	static getAuthorizationHeader(storage = App.storage){
		const token = storage.auth_token;
		const bearer = token
			? token.startsWith(`Bearer `)
				? String(storage.auth_token)
				: `Bearer ${storage.auth_token}`
			: '';
		return {
			Authorization: bearer
		}
	}

	private static getTransport(url, storage, customErrorHandleCallback=null){
		let myTransport = new TransportWrapper({
			url: url,
			beforeRequest: (config) => {
				const token = storage.auth_token;
				const bearer = token
					? token.startsWith(`Bearer `)
						? String(storage.auth_token)
						: `Bearer ${storage.auth_token}`
					: '';

				return {
					...config,
					headers: {
						Authorization: bearer,
						...config.headers,
					},
				};
			}
		});
		myTransport.customErrorHandleCallback = customErrorHandleCallback;
		return myTransport;
	}

	private static getAuthTransport(url, storage, customErrorHandleCallback=null){
		let myTransport = new AuthTransportWrapper({
			url: url,
			beforeRequest: (config) => {
				const token = storage.auth_token;
				const bearer = token
					? token.startsWith(`Bearer `)
						? String(storage.auth_token)
						: `Bearer ${storage.auth_token}`
					: '';

				return {
					...config,
					headers: {
						Authorization: bearer,
						...config.headers,
					},
				};
			}
		});
		myTransport.customErrorHandleCallback = customErrorHandleCallback;
		return myTransport;
	}

	static getAPIUrl(){
		let directus = ServerAPI.getPublicClient();
		// @ts-ignore
		return directus.transport.url;
	}

	static async getServerInfo(): Promise<ServerInfo>{
		try{
			let directus = ServerAPI.getPublicClient();
			//TODO we could add caching here
			let serverInfo = await directus.server.info();
			ServerAPI.tempStore.serverInfo = serverInfo;
			return serverInfo;
		} catch (err){
			console.log("ServerAPI.getServerInfo()");
			console.log(err);
		}
		return null;
	}

	static getAssetImageURL(imageID: string){
		return EnviromentHelper.getAssetURL(imageID);
	}

	static async getAuthProviders(): Promise<any>{
		let getProvidersURL = ServerAPI.getAPIUrl()+"/auth";
		try{
			let api = ServerAPI.getAxiosInstance();
			let answer = await api.get(getProvidersURL);
			let providers = answer?.data?.data;
			return providers
		} catch (err){
			console.log(err)
		}
		return null;
	}

	static async getMe(directus=null): Promise<UserItem>{
		if(!directus){
			directus = ServerAPI.getClient();
		}
		return directus.users.me.read();
	}

	static async isRefreshTokenSaved(){
		let token = App.storage.auth_refresh_token;
		return !!token;
	}

	private static async refreshWithDirectusAccessToken(directus_access_token: string){
		let url = EnviromentHelper.getBackendURL()+'/auth/refresh';
		const api = ServerAPI.getAxiosInstance();
		try{
			let response = await api.post(url, {"refresh_token": ""+directus_access_token}, {});
			return response.data.data;
		} catch (err){
			console.log("refreshWithDirectusToken error");
			console.log(err);
			console.log(err.toString())
		}
		return null;
	}

	static async refreshWithDirectusRefreshToken(){

	}
}
