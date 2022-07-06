// @ts-nocheck
import React, {FunctionComponent, useState} from 'react';
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {TouchableOpacity} from "react-native";
import {Text, View} from "native-base";
import {MyThemedBox} from "../helper/MyThemedBox";

import {Icon} from "../components/Icon";
import {MenuItem} from "./../navigation/MenuItem";

export interface AppState {
    menu: MenuItem,
    level: number
}
export const ExpandableDrawerItem: FunctionComponent<AppState> = (props) => {

    let menu = props.menu;

    const [expanded, setExpanded] = useState(menu.expanded)

    let menuChilds = menu?.getChildItems();
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

    async function handleOnPressIcon(){
        let nextExpandState = !expanded;
        menu.expanded = nextExpandState;
        setExpanded(nextExpandState);
        if(!hasChildren){
          await menu.handleOnPress(nextExpandState);
        }
    }

    async function handleOnPressContent(){
      if(hasChildren && !expanded){
        let nextExpandState = !expanded;
        menu.expanded = nextExpandState;
        setExpanded(nextExpandState);
        await menu.handleOnPress(nextExpandState);
      } else {
        await menu.handleOnPress(expanded);
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
                    {renderedChilds}
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
    if(expanded && hasChildren){
      boxShadeLevel+=1;
    }

    return(
        <View style={{width: "100%"}}>
            <MyThemedBox _shadeLevel={boxShadeLevel} style={{width: "100%"}} >
                <View style={{padding: 8}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                      <TouchableOpacity onPress={handleOnPressIcon} >
                        {renderExpandIcon()}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleOnPressContent} >
                        {renderContent()}
                      </TouchableOpacity>
                    </View>
                </View>
                {renderSubMenuContent()}
            </MyThemedBox>
        </View>
    )

}
