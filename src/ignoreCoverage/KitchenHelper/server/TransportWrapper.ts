import {Transport, TransportMethods, TransportOptions, TransportResponse} from "@directus/sdk";
import ServerAPI from "../ServerAPI";
import {ConfigHolder} from "../ConfigHolder";
import AwaitLock from "await-lock";

let refreshLock = new AwaitLock(); //we want to synchronize the refresh, cause maybe two refreshes collide

export default class TransportWrapper extends Transport{
	customErrorHandleCallback = null;

	protected async request<T = any, R = any>(
		method: TransportMethods,
		path: string,
		data?: Record<string, any>,
		options?: Omit<TransportOptions, 'url'>
	): Promise<TransportResponse<T, R>> {
		try {
			return await super.request(method, path, data, options);
		} catch (error: any) {
			if (!error || error instanceof Error === false) {
				throw error;
			}

			const status = error.response?.status;
			const code = error.errors?.[0]?.extensions?.code;

			console.log("");
			console.log("TransportWrapper error");
			console.log("path: ",path);
			console.log("status: ",status);
			console.log("code: ",code);
			console.log(path);

			//Happens when the refresh or access token is too old
			if(this.isTokenExpired(error, status, code)){
			  await refreshLock.acquireAsync(); //okay lets lock this, so not that we dont register multiple times
        //TODO check if lock is free, otherwise wait until its free, and then skipt the refresh and simple resend the super.request


				console.log("Token is expired, lets try to refresh it")
				let directus = ServerAPI.getDirectus(ConfigHolder.storage, ServerAPI.handleLogoutError);
				let refreshAnswer = await directus.auth.refresh();


				if(this.isRefreshSuccessfull(refreshAnswer)){
					console.log("Okay lets try to resend the request")
					try{
						let answer = await super.request(method, path, data, options);
            refreshLock.release(); //before handleLogout
						return answer;
					} catch (err){
						console.log("Resent request after refresh still unsuccessfull, rejecting");
						console.log(err);
            refreshLock.release(); //before handleLogout
						return Promise.reject(error);
					}
				} else {
          refreshLock.release(); //before handleLogout
					await ServerAPI.handleLogout(error); // after releasing lock!
					return Promise.reject(error);
				}
			}

			console.log("-------")
			//console.log("No idea what error caused neither what to do");
      refreshLock.release(); //before handleLogout
			return Promise.reject(error);
		}
	}

	isRefreshSuccessfull(answer){
		return !!answer && !!answer["access_token"] && !!answer["refresh_token"] && !!answer["expires"]
	}

	isTokenExpired(error, status, code){
	  console.log("isTokenExpired?");
    console.log("error.toString()")
    console.log(error.toString())

		if(error.toString()==="Token expired"){
			return true;
		}
		if(status===403 && code==="INVALID_TOKEN"){
			return true;
		}
    if(status===401 && code==="INVALID_TOKEN"){
      return true;
    }
		return false;
	}

}
