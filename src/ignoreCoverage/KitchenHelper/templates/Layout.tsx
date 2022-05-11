import {useBreakpointValue} from "native-base";

export class Layout {
	static padding = 16;

	static WIDTH_MD = 768-Layout.padding;
	static WIDTH_LG = 992-Layout.padding;
	static WIDTH_XL = 1280-Layout.padding

  private static getRawWidthValues(){
    return {
      "base": '100%',
      "md": Layout.WIDTH_MD,
      "lg": Layout.WIDTH_LG,
      "xl": Layout.WIDTH_XL,
    }
  }

  private static transformWithValuesToPxIfPossible(widthValues){
    //transform "md": number,
    let keys = Object.keys(widthValues);
    for(let key of keys){
      let value = widthValues[key];
      if(!(value+"").endsWith("%")){
        widthValues[key] = value+"px"
        //to 	  //transform "md": number+"px",
      }
    }
    return widthValues;
  }

	static getWidthValues(){
	  let widthValues = Layout.getRawWidthValues();
	  return Layout.transformWithValuesToPxIfPossible(widthValues)
	}


	static getBaseTemplateContentWidth(){
    let baseTemplateWidthValues = Layout.getRawWidthValues();
    let keys = Object.keys(baseTemplateWidthValues);
    for(let key of keys){
      let value = baseTemplateWidthValues[key];
      if(!(value+"").endsWith("%")){
        baseTemplateWidthValues[key] = value-(Layout.padding*2) //remove padding *2 because of left and right
      }
    }

    return Layout.transformWithValuesToPxIfPossible(baseTemplateWidthValues)
  }

  static useBaseTemplateContentWidth(){
    return useBreakpointValue(Layout.getBaseTemplateContentWidth());
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
