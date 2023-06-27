import React, {useEffect, useState} from "react";
import {AlertDialog, Button, Center, Divider, Text, View} from "native-base";
import {Platform} from "react-native";
import {ConfigHolder} from "../../ConfigHolder";
import {ProjectLogo} from "../../project/ProjectLogo";
import {DetailsComponentMenus, DetailsComponentMenuType} from "../../components/DetailsComponentMenus";
import {TranslationKeys} from "../../translations/TranslationKeys";
import CookieBot from "react-cookiebot";

console.log("CookieBot");
console.log(Object.keys(CookieBot))

const domainGroupId = '94249d04-d315-442f-89ec-59f4259938bd';

export const CookieInformation = (props) => {

  const [hasCookiebot, setHasCookieBot] = useState(false);
  //const domainGroupId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;

  useEffect(() => {
    console.log("useEffect")
    console.log("hasCookiebot: "+hasCookiebot);
    if (hasCookiebot) {
      return;
    }
    const cookie = document.querySelector('#CookieBot');
    console.log("cookie");
    console.log(cookie)
    setHasCookieBot(!!cookie);
  });

  if (hasCookiebot || !domainGroupId || typeof window === 'undefined') {
    console.log("true === (hasCookiebot || !domainGroupId || typeof window === 'undefined')");
    //return null;
  }

  return <View style={{width: 500, height: 500, backgroundColor: "red"}}>
    <Text>{"Okay"}</Text>
    <CookieBot domainGroupId={domainGroupId} />
  </View>;
}
