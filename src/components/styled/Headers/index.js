import styled from "styled-components";
import { Platform } from "react-native";
import { width } from "../general";

export const RootHeaderWrapper = styled.View`
  height: ${Platform.isPad ? "80" : "50"};
  elevation: 1;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LogoImage = styled.Image`
  height: ${Platform.isPad ? "60" : "50"};
  width: ${Platform.isPad ? "136" : "96"};
`;
export const LeftHeaderButton = styled.View`
  width: ${Platform.OS === "android" ? "30%" : "100%"};
  justify-content: space-around;
  align-items: center;
  height: ${Platform.isPad ? "80" : "50"};
`;
export const MiddleHeaderButton = styled.View`
  width: ${Platform.OS === "android" ? "40%" : "100%"};
  justify-content: space-around;
  align-items: center;
  height: ${Platform.isPad ? "80" : "50"};
  position: relative;
`;
export const RightHeaderButton = styled.View`
  width: ${Platform.OS === "android" ? "30%" : "100%"};
  justify-content: space-around;
  align-items: center;
  height: ${Platform.isPad ? "80" : "50"};
`;

export const Text = styled.Text``;
