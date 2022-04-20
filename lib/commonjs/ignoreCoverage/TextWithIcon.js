"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextWithIcon = void 0;

var _react = _interopRequireDefault(require("react"));

var _nativeBase = require("native-base");

var _vectorIcons = require("@expo/vector-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TextWithIcon = props => {
  function renderRowInformation(icon, content) {
    let renderedIcon = !!icon ? /*#__PURE__*/_react.default.createElement(_nativeBase.Text, null, /*#__PURE__*/_react.default.createElement(_nativeBase.Icon, {
      as: _vectorIcons.MaterialCommunityIcons,
      name: icon,
      marginRight: 15
    })) : null;
    return /*#__PURE__*/_react.default.createElement(_nativeBase.View, {
      style: {
        alignItems: "center",
        flexDirection: "row",
        margin: 3
      }
    }, renderedIcon, /*#__PURE__*/_react.default.createElement(_nativeBase.Text, null, content));
  }

  return renderRowInformation(props.icon, props.children);
};

exports.TextWithIcon = TextWithIcon;
//# sourceMappingURL=TextWithIcon.js.map