// @ts-nocheck
import React, {FunctionComponent, useState} from 'react';
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {TouchableOpacity} from "react-native";
import  {View} from "native-base";
import {MyThemedBox} from "../helper/MyThemedBox";

import {Icon} from "../components/Icon";

export interface AppState {
    onPress?: (nextExpanded?) => {}
    expanded?: boolean
}
export const ExpandableDrawerItem: FunctionComponent<AppState> = (props) => {

    const handlePress = props.onPress;
    const [expanded, setExpanded] = useState(props.expanded)

    function renderExpandIcon(){
        if(!props.hasChildren){
            return <Icon  name={"circle-small"}/>;
        }
        if(expanded){
            return <Icon  name={"chevron-down"}/>
        } else {
            return <Icon  name={"chevron-right"}/>
        }
    }

    async function handleOnPress(){
        setExpanded(!expanded);
        if(!!handlePress){
            await handlePress(!expanded);
        }
    }

    function renderContent(){
        if(!expanded){
            return null;
        }

        return(
            <View style={{paddingLeft: 15}}>
                <DrawerContentScrollView contentContainerStyle={{paddingTop: 0}}>
                    {props.children}
                </DrawerContentScrollView>
            </View>
        )
    }

    return(
        <View style={{width: "100%"}}>
            <MyThemedBox _shadeLevel={props.level} style={{width: "100%"}} >
                <TouchableOpacity onPress={handleOnPress} style={{padding: 8}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {renderExpandIcon()}
                        {props.label()}
                    </View>
                </TouchableOpacity>
                {renderContent()}
            </MyThemedBox>
        </View>
    )

}
