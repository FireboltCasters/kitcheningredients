import {useBreakpointValue} from "native-base";

export default class Layout {
	static padding = 16;

	static WIDTH_MD = 768-Layout.padding;
	static WIDTH_LG = 992-Layout.padding;
	static WIDTH_XL = 1536-Layout.padding

	static getWidthValues(){
		return {
			"base": '100%',
			"md": Layout.WIDTH_MD+'px',
			"lg": Layout.WIDTH_LG+'px',
			"xl": Layout.WIDTH_XL+'px',
		}
	}

	static getSmallDeviceValues(){
		return {
			base: true,
			md: false,
		}
	}

	static usesSmallDevice(){
		return useBreakpointValue(Layout.getSmallDeviceValues())
	}

}
