import {useToast, View, Text, Actionsheet, Divider, useDisclose} from "native-base";
import React, {FunctionComponent, useMemo, useState} from "react";
import {Icon} from "kitcheningredients";

export interface MyAlertProps {
    title,
    acceptLabel,
    onAccept,
    cancelLabel,
    onCancel,
    renderCustomContent
}

export const MyActionsheetComponent: FunctionComponent<MyAlertProps> = (props) => {

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose(true);

    function handleClose(){
        onClose();
        if (props?.onClose) {
            props.onClose();
        }
    }

    function renderAccept(){
        let acceptLabel = props.acceptLabel || "Accept";
        const onPress = props.onAccept;
        return renderOption(acceptLabel, onPress,  <Icon name={"check"} />);
    }

    function renderCancel(){
        let acceptLabel = props.cancelLabel || "Cancel";
        const onPress = props.onCancel;
        return renderOption(acceptLabel, onPress, <Icon name={"close"} />);
    }

    function renderOption(label, onPress, renderedIcon?){
        return(
            <Actionsheet.Item
                startIcon={renderedIcon}
                onPress={() => {
                    if(onPress){
                        onPress();
                    }
                    handleClose();
                }} style={{backgroundColor: "transparent"}}>
                <Text>{label}</Text>
            </Actionsheet.Item>
        )
    }

    function renderContent(){
        if(props?.renderCustomContent){
            return props.renderCustomContent(handleClose);
        } else {
            return <>
                {renderAccept()}
                <Divider />
                {renderCancel()}
            </>
        }
    }

    return(
        <Actionsheet isOpen={isOpen} onClose={handleClose} _backdrop={{
            opacity: 0.75,
        }}>
            <Actionsheet.Content >
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text>{props?.title}</Text>
                </View>
                {renderContent()}
            </Actionsheet.Content>
        </Actionsheet>
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

        const show = (params: MyAlertProps) => {
            toastIdRef.current = toast.show({
                duration: null,
                render: () => {
                    return <MyActionsheetComponent {...params} onClose={onClose}/>;
                }
            });
        }

        return {
            show: show
        };

    }
}