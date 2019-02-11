import React from "react";
import { Platform, Dimensions } from "react-native";
import styled from "styled-components";
import { Color } from "../../constants";

export const { width, height } = Dimensions.get("window");

const TouchableIOS = styled.TouchableOpacity``;
const TouchableAndroid = styled.TouchableNativeFeedback``;

// BUTTON

export const Button =
  Platform.OS === "android" ? TouchableAndroid : TouchableIOS;

export const ButtonInner = styled.View`
  height: ${Platform.isPad ? 80 : 50};
  border-radius: 5;
  background-color: ${Color.secondary};
  align-items: center;
  justify-content: center;
`;

export const ButtonInnerText = styled.Text`
  font-size: ${Platform.isPad ? 26 : 22};
  text-align: center;
  font-weight: 300;
  color: #fff;
`;

// STATE

export const StateContainer = styled.View`
  height: ${height};
  width: ${width};
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
`;

export const StateText = styled.Text`
  color: ${Color.main};
  font-size: ${Platform.isPad ? 26 : 20};
  padding: 5%;
`;

// PRODUCT

export const Price = styled.Text`
  padding-horizontal: 5%;
  padding-vertical: 2.5%;
  font-size: 20;
  font-weight: bold;
  color: ${Color.secondary};
`;

export const Quantity = styled.Text`
  font-size: 20;
  font-weight: bold;
  color: ${Color.secondary};
`;

export const Name = styled.Text`
  font-size: 18;
  padding-horizontal: 5%;
`;

export const Text = styled.Text``;

export const Line = styled.View`
  margin-bottom: 2.5%;
  background-color: #eee;
  height: 1;
  width: 100%;
`;

export const PickerContainer = styled.View`
  width: 100%;
  height: 40;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  border-color: #ddd;
  border-bottom-width: 1;
`;

// OTHER
export const Container = styled.View`
  flex: ${({ flex }) => flex || "1"};
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
  justify-content: ${({ justifyContent }) => justifyContent || "space-around"};
  align-items: ${({ alignItems }) => alignItems || "center"};
`;

export const FormStyle = {
  height: "100%",
  width: "100%",
  backgroundColor: "#fff",
  paddingTop: 15,
  paddingHorizontal: 15
};

export const AccordionContainer = styled.View`
  background-color: #eee;
`;
