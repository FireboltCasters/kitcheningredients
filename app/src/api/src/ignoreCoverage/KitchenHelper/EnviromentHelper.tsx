import {ConfigHolder} from "./ConfigHolder";

export default class EnviromentHelper{

	static getDirectusAccessTokenName(){
		return "directus_access_token";
	}

	static getAppManifest(): any{
		return ConfigHolder?.AppConfig;
	}

  static getAppManifestExtra(): any{
    return EnviromentHelper.getAppManifest()?.extra;
  }

	static getBackendURL(): string{
		return EnviromentHelper.getAppManifestExtra()?.BACKEND_URL;
	}

	static getAssetURL(file_id): any{
		if(!file_id){
			return null;
		}
		return EnviromentHelper.getBackendURL()+"/assets/"+file_id
	}

	static getBasePath(): string{
		return EnviromentHelper.getAppManifestExtra()?.BASE_PATH;
	}

}
