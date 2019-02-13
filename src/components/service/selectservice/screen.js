import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Icon,
  Input,
  Text,
  Button,
  StyleProvider
} from "native-base";
import getTheme from "../../../../native-base-theme/components";
import material from "../../../../native-base-theme/variables/material";
import Greeting from "./useractionitems";

export default ({ navigation }) => {
  return (
    <StyleProvider style={getTheme(material)}>
      <Container>
        <Content>
          <Tex>Enter your content</Tex>
        </Content>
      </Container>
    </StyleProvider>
  );
};
