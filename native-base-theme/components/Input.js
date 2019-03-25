// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const inputTheme = {
    ".multiline": {
      height: null
    },
    height: variables.inputHeightBase,
    color: variables.inputColor,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    fontSize: variables.inputFontSize
  };

  return inputTheme;
};

export const inputView = {
  height: variable.inputHeightBase,
  color: variable.inputColor,
  paddingLeft: 5,
  paddingRight: 5,
  flex: 1,
  fontSize: variable.inputFontSize
};
export const inputText = {
  fontSize: variable.inputFontSize
};
