import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import {
  Button,
  ButtonInner,
  ButtonInnerText,
  StateContainer,
  StateText,
  AccordionContainer
} from "./general";

import { Color } from "../../constants";

export const SubmitButton = ({ onPress, textChildren, style, textStyle }) => (
  <Button onPress={onPress}>
    <ButtonInner style={style}>
      <ButtonInnerText style={textStyle}>
        {typeof textChildren === "string" ? textChildren : textChildren()}
      </ButtonInnerText>
    </ButtonInner>
  </Button>
);

export const StateComponent = ({ error, loading, onPress = () => null }) => (
  <StateContainer>
    <StateText>
      {error
        ? typeof error === "string"
          ? error
          : JSON.stringify(error, null, 2)
        : ""}
    </StateText>
    {loading ? (
      <ActivityIndicator size="large" color={Color.secondary} />
    ) : (
      <SubmitButton
        onPress={onPress}
        textChildren="Go Back"
        style={{ paddingHorizontal: 10, paddingVertical: 10 }}
      />
    )}
  </StateContainer>
);
export const EmptyComponent = ({ text }) => (
  <StateContainer>
    <StateText>{text}</StateText>
  </StateContainer>
);


