import React, { Component } from "react";
import { View,StyleSheet, TouchableOpacity } from "react-native";
import { navigation } from "react-navigation";

import {
  Container,
  Content,
  Icon,
  Input,
  Text,
  Button,
  StyleProvider,
  Header,
  Left,
  Right,
  Body,
  Title
} from "native-base";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

export default ({ navigation, header }) => (
      <Header style={{ backgroundColor: "#183E61" }}>
      <Left>
        <View style={{ flexDirection: "row" }} >
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu"  />
          </Button>
          <Button transparent onPress={() => navigation.goBack()}>
            <IconFontAwesome style={[{ color:'white' }, styles.icon_font_awesome ]} name="angle-left" />
          </Button>
        </View>
      </Left>
      <Body >
        <Title >{header}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name="notifications" />
        </Button>
        <Button transparent>
          <Icon
            name="contact"
            onPress={() => navigation.navigate("Profile")}
          />
        </Button>
      </Right>
    </Header>
);


let styles = StyleSheet.create({
    icon_font_awesome: {
      fontSize: 20
    }
  });