import React, {FunctionComponent} from "react";
import {View} from "native-base";
import {DirectusImage} from "../../api/src";

export const ExampleImageScreen: FunctionComponent = (props) => {

  const [assetId, setAssetId] = React.useState("1bb60681-52f4-45dc-9a3b-081bfe4622aa");

  return (
    <View>
      <DirectusImage assetId={assetId} style={{width: 100, height: 100}} />
    </View>
  );
}
