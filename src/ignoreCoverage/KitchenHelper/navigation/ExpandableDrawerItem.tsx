// @ts-nocheck
import React, {FunctionComponent, useState} from 'react';
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {TouchableOpacity} from "react-native";
import {Text, View} from "native-base";
import {MyThemedBox} from "../helper/MyThemedBox";

import {Icon} from "../components/Icon";
import {MenuItem} from "kitcheningredients";

export interface AppState {
    menu: MenuItem,
    level: number
}
export const ExpandableDrawerItem: FunctionComponent<AppState> = (props) => {

    let menu = props.menu;
    let handleMenuPress = menu.handleOnPress;

    const [expanded, setExpanded] = useState(menu.expanded)

    let menuChilds = menu.getChildItems();
    let hasChildren = menuChilds.length>0;

    function renderExpandIcon(){
        if(!!menu.customIcon){
          if(typeof menu.customIcon === "string"){
            return <Icon name={menu.customIcon}/>;
          } else {
            return menu.customIcon(menu, hasChildren, expanded, props.level);
          }
        }

        if(!hasChildren){
            return <Icon name={"circle-small"}/>;
        }
        if(expanded){
            return <Icon name={"chevron-down"}/>
        } else {
            return <Icon name={"chevron-right"}/>
        }
    }

    async function handleOnPress(){
        let nextExpandState = !expanded;
        menu.expanded = nextExpandState;
        setExpanded(nextExpandState);
        if(!!handleMenuPress){
            await handleMenuPress(nextExpandState);
        }
    }

    function renderSubMenuContent(){
        if(!expanded){
            return null;
        }

      let renderedChilds = [];
      for(let childMenu of menuChilds){
        renderedChilds.push(<ExpandableDrawerItem menu={childMenu} level={props.level+1} />);
      }

        return(
            <View style={{paddingLeft: 15}}>
                <DrawerContentScrollView contentContainerStyle={{paddingTop: 0}}>
                    {props.children}
                </DrawerContentScrollView>
            </View>
        )
    }


    function renderContent(){
      let content = menu.content;
      if(!content){
        content = (
          <View>
            <Text fontSize={"md"}>{menu.label}</Text>
          </View>
        )
      }
      return content;
    }

    let boxShadeLevel = props.level;
    if(expanded){
      boxShadeLevel+=1;
    }

    return(
        <View style={{width: "100%"}}>
            <MyThemedBox _shadeLevel={boxShadeLevel} style={{width: "100%"}} >
                <TouchableOpacity onPress={handleOnPress} style={{padding: 8}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {renderExpandIcon()}
                        {renderContent()}
                    </View>
                </TouchableOpacity>
                {renderSubMenuContent()}
            </MyThemedBox>
        </View>
    )

}
