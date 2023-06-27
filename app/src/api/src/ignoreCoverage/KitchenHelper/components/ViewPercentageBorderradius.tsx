// @ts-nocheck
import React, {FunctionComponent, useState} from "react";
import {ViewProps} from "react-native";
import {View} from "native-base";

export const ViewPercentageBorderradius: FunctionComponent<ViewProps> = ({style, children, ...props}) => {

    const [dimension, setDimension] = useState({x: undefined, y: undefined, width: undefined, height: undefined, reloadNumber: 0});

    let copiedStyle = JSON.parse(JSON.stringify(style || {}));

    function fixPercentage(copiedValue){
        if(!!copiedValue && typeof copiedValue==="string" && copiedValue.endsWith("%")){
            let percentage = parseInt(copiedValue);
            let width = dimension.width;
            if(!!width){
                return percentage*width/100;
            } else {
                return null;
            }
        }
        return copiedValue;
    }

    function fixStyleForFields(styles, ...fieldnames){
        let mergedStyle = {};
        if(!!styles){
            if(!styles?.length){
                mergedStyle = styles;
            } else if(styles?.length > 1) {
                styles.forEach(style => {
                    mergedStyle = {...mergedStyle, ...style};
                });
            }
        }

        for(let fieldname of fieldnames){
            mergedStyle[fieldname] = fixPercentage(mergedStyle[fieldname]);
        }
        return mergedStyle;
    }

    copiedStyle = fixStyleForFields(copiedStyle, "borderRadius", "borderRadius", "borderTopRightRadius", "borderTopLeftRadius", "borderBottomRightRadius", "borderBottomLeftRadius")

    let outerStyle = {...copiedStyle, ...{}};
    if(!dimension?.width ||  !dimension?.height){
        outerStyle.opacity = 0; // render first time invisible, since we dont know the size yet
    }

    return(
        <View {...props} style={[outerStyle]} onLayout={(event) => {
                const {x, y, width, height} = event.nativeEvent.layout;
                setDimension({x: x, y: y, width: width, height: height, reloadNumber: dimension.reloadNumber+1});
        }}>
            {children}
        </View>
    )
}
