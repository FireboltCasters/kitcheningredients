// @ts-nocheck
import React, {useEffect, useRef, useState} from "react";
import {Text} from "native-base";
import ServerAPI from "../../ServerAPI";
import {ConfigHolder} from "../../api/ConfigHolder";
import {keyof} from "ts-keyof";
import {ThemedMarkdown} from "../../components/markdown/ThemedMarkdown";

export const Home = (props) => {

  const [test, setTest] = useState({});

  let customHomeComponent = ConfigHolder.plugin.getHomeComponent();
  if(!!customHomeComponent){
    return customHomeComponent;
  }

  async function loadInformation() {
    let storage = ConfigHolder.storage;
    let expires = storage.get_auth_expires();
    let now = new Date();
    setTest({expires: expires, now: now});
  }

	// corresponding componentDidMount
	useEffect(() => {
	      loadInformation();
	}, [props?.route?.params])

	return(
		<>
			<Text>{"Welcome Home"}</Text>
      <Text>{"You may implement getHomeComponent in the Plugin"}</Text>
      <Text>{JSON.stringify(test)}</Text>
      <Text>{"Markdown Test Start"}</Text>
      <ThemedMarkdown>{"Über das Backend können neue Menüs einfach hinzugefügt werden.\n" +
      "\n" +
      "**Dicken Text**\n" +
      "\n" +
      "*Kursiven*\n" +
      "\n" +
      "~~Durchgestrichener Text~~\n" +
      "\n" +
      "- Aufzählungen\n" +
      "- Als Liste\n" +
      "\n" +
      "**Dicken Text**\n" +
      "\n" +
      "*Kursiven*\n" +
      "\n" +
      "~~Durchgestrichener Text~~\n" +
      "\n" +
      "1. Nummerierungen\n" +
      "2. Mit Nummern\n" +
      "\n" +
      "> Zitate welche lang sein können\n" +
      "\n" +
      "`Code Blöcke um coolen Inhalt zu zeigen`\n" +
      "\n" +
      "[Einfache Links](https://www.google.de)\n" +
      "\n" +
      "Tabellen\n" +
      "| Header | Header | Header | Header |\n" +
      "| ------ | ------ | ------ | ------ |\n" +
      "| Cell   | Cell   | Cell   | Cell   |\n" +
      "| Cell   | Cell   | Cell   | Cell   |\n" +
      "| Cell   | Cell   | Cell   | Cell   |\n" +
      "| Cell   | Cell   | Cell   | Cell   |\n" +
      "\n" +
      "![](https://images.pexels.com/photos/14185268/pexels-photo-14185268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)"}</ThemedMarkdown>
      <Text>{"Markdown Test End"}</Text>
		</>
	)
}

Home.displayName = keyof({ Home });
