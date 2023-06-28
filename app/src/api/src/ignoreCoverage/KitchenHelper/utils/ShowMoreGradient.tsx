// @ts-nocheck
import React, {useEffect} from "react";
import {useColorModeValue, useToken, View} from "native-base";
import {LinearGradient} from "expo-linear-gradient";
import {ShowMoreGradientPlaceholder} from "./ShowMoreGradientPlaceholder";
import {ConfigHolder} from "../ConfigHolder";

export const ShowMoreGradient = (props) => {
	const [lightBg, darkBg] = useToken(
		'colors',
		[ConfigHolder.styleConfig.backgroundColor.light, ConfigHolder.styleConfig.backgroundColor.dark],
		'blueGray.900',
	);
	const bgColor = useColorModeValue(lightBg, darkBg);
	const gradColors = [bgColor+'00', bgColor+'FF'];

  useEffect(() => {
    let isMounted = true;  // mutable flag

    return () => { isMounted = false };  // cleanup toggles value, if unmounted
  }, []);  // adjust dependencies to your needs

  function renderGradient(){
    /**
     * Removed due to cleanUp Bugs in Linear Gradient
    return (
      <LinearGradient
        style={{flex: 4}}
        colors={gradColors}
        pointerEvents={'none'}
      />
    )

     */

    // Custom LinearGradient
    const steps = new Array(50).fill(0);
    return(
      <>
        {steps.map((_, i) => (
          <View
            pointerEvents={'none'}
            key={i}
            style={{
              flex: 1,
              backgroundColor: bgColor,
              opacity: i / steps.length,  // Increase the opacity for each step
              width: "100%",
            }}
          />
        ))}
      </>
    )
  }

	return (
		<View pointerEvents="none" style={[{width: "100%", position: "absolute", bottom: 0, height: "auto"}]}>
			<ShowMoreGradientPlaceholder />
			<View style={{position: "absolute", height: "100%", width: "100%", bottom: 0}}>
        {renderGradient()}
				<View style={{flex: 1, backgroundColor: bgColor}} />
			</View>
		</View>
	);
}
