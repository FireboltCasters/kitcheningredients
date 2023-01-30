import React, {FunctionComponent} from "react";
import {View, Text, Button} from "native-base";
import {DirectusImage, SynchedState} from "../../api/src";
import {ProjectLogo} from "../../api/src/ignoreCoverage/KitchenHelper/project/ProjectLogo";

export const ExampleImageScreen: FunctionComponent = (props) => {

  const [assetId, setAssetId] = React.useState("1bb60681-52f4-45dc-9a3b-081bfe4622aa");

  function renderImages(){
    return (
      <>
        <Text>{"Normal image"}</Text>
        <DirectusImage assetId={assetId} style={{width: 100, height: 100}} />
        <Text>{"Using unsafe access token"}</Text>
        <DirectusImage assetId={assetId} style={{width: 100, height: 100}} useUnsafeAccessTokenInURL={true} />
        <Text>{"Without asset id"}</Text>
        <DirectusImage assetId={null} style={{width: 100, height: 100}} />
        <Text>{"With fallback element showing text"}</Text>
        <DirectusImage assetId={null} style={{width: 100, height: 100}} fallbackElement={<View><Text>{"Showing fallbackElement"}</Text></View>} />
        <Text>{"Public project logo"}</Text>
        <ProjectLogo />
        <Text>{"Remote Image example"}</Text>
        <DirectusImage url={"https://images.pexels.com/photos/5044314/pexels-photo-5044314.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"} style={{width: 100, height: 100}} />
      </>
    )
  }


  return (
    <View>
      {renderImages()}
    </View>
  );
}
