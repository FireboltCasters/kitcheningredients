// @ts-nocheck
import {Actionsheet, Divider, ScrollView, Text, useDisclose, useToast, View} from "native-base";
import React, {FunctionComponent} from "react";
import {Icon} from "../components/Icon";
import {KitchenSafeAreaView} from "kitcheningredients";
import {useKeyboardBottomInset} from "./MyActionsheetKeyboardHelper";

export interface MyAlertProps {
    title?: string,
    renderDescription?: any,
    acceptLabel?: string,
    onAccept?: any,
    cancelLabel?: string,
    onCancel?: any,
    renderCustomContent?: any,
    options?: any,
    onOptionSelect?: any,
}

export const MyActionsheetComponent: FunctionComponent<MyAlertProps> = (props) => {

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose(true);

    const bottomInset = useKeyboardBottomInset();
    const [height, setHeight] = React.useState(0);

    function handleClose(){
        onClose();
        if (props?.onClose) {
            props.onClose();
        }
    }

    function renderAccept(){
        let acceptLabel = props.acceptLabel || "Accept";
        const onPress = props.onAccept;
        return renderOption("accept", acceptLabel, onPress, <Icon name={"check"} />);
    }

    function renderCancel(){
        let acceptLabel = props.cancelLabel || "Cancel";
        const onPress = props.onCancel;
        return renderOption("cancel", acceptLabel, onPress, <Icon name={"close"} />);
    }

    function renderOption(key, label, onPress, renderedIcon?){
        return(
          <>
            <Actionsheet.Item
              key={key+"-item"}
              startIcon={renderedIcon}
              onPress={() => {
                if(onPress){
                  onPress(key);
                }
                handleClose();
              }} style={{backgroundColor: "transparent"}}>
              <Text>{label}</Text>
            </Actionsheet.Item>
            <Divider key={key+"-divider"} />
          </>
        )
    }

    function renderOptions(){
      let output = [];
      let keys = Object.keys(props.options);
      let onPress = props?.onOptionSelect || ((key) => {});

      for(let key of keys){
          const option = props.options[key];
          if(!!option && typeof option === "object") {
            let icon = option?.icon;
            let label = option?.label;
            let renderedIcon = null;
            if(!!icon){
              if(typeof icon === "string"){
                renderedIcon = <Icon name={icon} />;
              } else {
                renderedIcon = icon;
              }
            }
            output.push(renderOption(key, label, onPress, option?.renderedIcon));
          } else {
            let label = option;
            output.push(renderOption(key, label, onPress, null));
          }
      }
      return output;
    }

    function renderContent(){
        if(props?.renderCustomContent){
            return props.renderCustomContent(handleClose);
        } else {
          let output = null;
          if(props?.options) {
            output = renderOptions();
          } else {
            output = <>
              {renderAccept()}
              {renderCancel()}
            </>
          }

          return (
            <>
              {output}
            </>
          )
        }
    }

    function renderDescription(){
      if(props?.renderDescription){
        return props.renderDescription();
      } else {
        return null;
      }
    }

    const opacity = 0.75;

    return(
      <KitchenSafeAreaView>
          <Actionsheet isOpen={isOpen} onClose={handleClose} onLayout={(event) => {
            const height = event?.nativeEvent?.layout?.height;
            if(height){
              setHeight(height);
            }
          }} _backdrop={{
            opacity: opacity,
          }}>
            <Actionsheet.Content bottom={bottomInset} height={bottomInset > 0 ? height-bottomInset : undefined} >
              <View key={"ActionSheetHeader"} style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Text>{props?.title}</Text>
              </View>
              {renderDescription()}
              <ScrollView style={{width: "100%", backgroundColor: "orange"}}>
                {renderContent()}
              </ScrollView>
            </Actionsheet.Content>
          </Actionsheet>
      </KitchenSafeAreaView>
    );

}

export class MyActionsheet {
    static useActionsheet(): any {
        const toast = useToast();
        const toastIdRef = React.useRef();
        const currentToastIdRef = toastIdRef?.current;

        const onClose = () => {
            if (currentToastIdRef) {
                toast.close(currentToastIdRef);
            }
        }

        const show = (params: MyAlertProps, options) => {
            toastIdRef.current = toast.show({
                duration: null,
                render: () => {
                    return <MyActionsheetComponent {...params} options={options} onClose={onClose}/>;
                }
            });
            return onClose;
        }

        return {
            show: show
        };

    }
}
