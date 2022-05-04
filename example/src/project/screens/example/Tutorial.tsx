import {Icon, Text} from "native-base";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const Tutorial = (props: any) => {

  /**
   *     '3xs': 224,
   '2xs': 256,
   'xs': 320,
   'sm': 384,
   'md': 448,
   'lg': 512,
   'xl': 576,
   '2xl': 672,
   */

    return (
      <>
        <Text>{"Tutorial page"}</Text>
        <Icon as={MaterialCommunityIcons} name={"cog"} size={"xxs"} />
        <Icon as={MaterialCommunityIcons} name={"cog"} size={"xs"} />
        <Icon as={MaterialCommunityIcons} name={"cog"} size={"sm"} />
        <Icon as={MaterialCommunityIcons} name={"cog"} size={"md"} />
        <Icon as={MaterialCommunityIcons} name={"cog"} size={"lg"} />
        <Icon as={MaterialCommunityIcons} name={"cog"} size={"xl"} />
        <Icon as={MaterialCommunityIcons} name={"cog"} size={"2xl"} />
      </>
    );
}
