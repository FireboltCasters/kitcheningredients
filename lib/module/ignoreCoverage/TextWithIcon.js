import React from "react";
import { Icon, Text, View } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export const TextWithIcon = props => {
  function renderRowInformation(icon, content) {
    let renderedIcon = !!icon ? /*#__PURE__*/React.createElement(Text, null, /*#__PURE__*/React.createElement(Icon, {
      as: MaterialCommunityIcons,
      name: icon,
      marginRight: 15
    })) : null;
    return /*#__PURE__*/React.createElement(View, {
      style: {
        alignItems: "center",
        flexDirection: "row",
        margin: 3
      }
    }, renderedIcon, /*#__PURE__*/React.createElement(Text, null, content));
  }

  return renderRowInformation(props.icon, props.children);
};
//# sourceMappingURL=TextWithIcon.js.map