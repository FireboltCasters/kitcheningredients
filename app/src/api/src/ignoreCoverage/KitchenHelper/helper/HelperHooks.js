import {useColorMode, useTheme} from "native-base";

export const useThemeTextColor = () => {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  let darkModeTextColor = theme["colors"]["lightText"]; //darkText is used in lightmode !
  let lightModeTextColor = theme["colors"]["darkText"];

  let darkMode = colorMode!=="light";
  let textColor = darkMode ? darkModeTextColor : lightModeTextColor;

  return textColor;
}
