export default class EnviromentHelper{

	static AppConfig = null;

	static getDirectusAccessTokenName(){
		return "directus_access_token";
	}

	static getAppManifest(): any{
		return process.env.APP_MANIFEST;
	}

	static getCustomEnvVariables(): any{
		let appManifest = EnviromentHelper.getAppManifest();
		if(appManifest){
			return appManifest.extra;
		}
		return {};
	}

	static getBackendURL(): string{
		return EnviromentHelper.getCustomEnvVariables().BACKEND_URL || EnviromentHelper.AppConfig.default.extra.BACKEND_URL;
	}

	static getAssetURL(file_id): any{
		if(!file_id){
			return null;
		}
		return EnviromentHelper.getBackendURL()+"/assets/"+file_id
	}

	static getBasePath(): string{
		return EnviromentHelper.getCustomEnvVariables().BASE_PATH || EnviromentHelper.AppConfig.default.extra.BASE_PATH;
	}

}
