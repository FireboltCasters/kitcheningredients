import {useBreakpointValue} from "native-base";

export default class Template {
	static padding = 16;

	static WIDTH_MD = 768-Template.padding;
	static WIDTH_LG = 992-Template.padding;
	static WIDTH_XL = 1536-Template.padding

	static getWidthValues(){
		return {
			"base": '100%',
			"md": Template.WIDTH_MD+'px',
			"lg": Template.WIDTH_LG+'px',
			"xl": Template.WIDTH_XL+'px',
		}
	}

	static getSmallDeviceValues(){
		return {
			base: true,
			md: false,
		}
	}

	static usesSmallDevice(){
		return useBreakpointValue(Template.getSmallDeviceValues())
	}

}
