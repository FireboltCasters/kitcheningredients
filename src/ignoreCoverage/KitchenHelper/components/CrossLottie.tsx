// @ts-nocheck
import React, {useEffect, useState} from "react";
import { Platform, View } from "react-native";
import LottieView from "lottie-react-native";
import Lottie from "lottie-react";
import ServerAPI from "../ServerAPI";

export const CrossLottie = (props) => {

  const [source, setSource] = useState(props.source);
    const [reloadnumber, setReloadnumber] = useState(0);
    let url = props.url;

    let autoPlay = true;
    if(props.autoPlay!==undefined){
        autoPlay = props.autoPlay
    }

    async function downloadInformations(){
      if(!!url && !source){
        try{
          let api = ServerAPI.getAxiosInstance();
          let answer = await api.get(url);
          let data = answer.data;
          setSource(data);
          setReloadnumber(1);
        } catch (err){

        }
      }
    }

    // corresponding componentDidMount
    useEffect(() => {
        downloadInformations();
    }, [props])

    if(!source){
        return null;
    }

    let height = 300;
    let width = 300;

    let content = null;

    if(Platform.OS==="web"){
        content = <Lottie animationData={source} loop={true} autoplay={autoPlay} />
    } else {
        content = <LottieView
            style={props.style}
            autoPlay={autoPlay}
            source={source}
        />;
    }

    return (
        <View style={{height: height, width: width}}>
            <View style={{position: "absolute", height: "100%", width: "100%"}}>
                {content}
            </View>
        </View>
    )
}