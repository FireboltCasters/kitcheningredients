// @ts-nocheck
import React, {PureComponent, useEffect, useState} from "react";
import { Platform, View, Animated } from "react-native";
import LottieView from "lottie-react-native";
import Lottie from "lottie-react";
import ServerAPI from "../ServerAPI";
import {KitchenSkeleton} from "kitcheningredients";
import exampleLottie from "./../assets/exampleLottie.json";

export const CrossLottie = (props) => {

    let initialSource = props.source;
    if(!!props.example){
      initialSource = exampleLottie;
    }

    const [loaded, setLoaded] = useState(false);
    const [source, setSource] = useState(initialSource);
    const [reloadnumber, setReloadnumber] = useState(0);

    let url = props.url

    let autoPlay = true;
    if(props.autoPlay!==undefined){
        autoPlay = props.autoPlay
    }

    async function downloadInformations(){
      if(!source && !!url){
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

    let height = props.height || 300;
    let width = props.width || 300;

    let content = null;

    if(!!source){
      if(Platform.OS==="web"){
        content = <Lottie animationData={source} loop={true} autoplay={autoPlay} />
      } else {
        content = <LottieView
          style={props.style}
          autoPlay={autoPlay}
          source={source}
        />;
      }
    } else {
      content = <KitchenSkeleton style={{height: height, width: width}} />
    }

    return (
        <View style={{height: height, width: width}}>
            <View style={{position: "absolute", height: "100%", width: "100%"}}>
                {content}
            </View>
        </View>
    )
}
