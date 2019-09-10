import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
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

export default ({ navigation, header, onBackPressed, toDashboard }) => (
  <View
    style={{ flexDirection: "row", backgroundColor: "#183E61", height: 60 }}
  >
    <View style={{ width: 75, flexDirection: "row" }}>
      <Left>
        <View style={{ flexDirection: "row" }}>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon style={{ color: "white" }} name="menu" />
          </Button>
          {header != "Dashboard" && (
            <Button style={{ padding:10 }} transparent onPress={() => {
              if(toDashboard)
                navigation.navigate("HomeScreen")
              else{
                  !onBackPressed ? navigation.goBack() : onBackPressed()
              }
               }}>
              <IconFontAwesome
                style={[
                  { color: "white" },
                  styles.icon_font_awesome
                ]}
                name="angle-left"
              />
            </Button>
          )}
        </View>
      </Left>
    </View>
    <Body>
      <Title style={{ color: "white" }}>{header}</Title>
    </Body>
    <View style={{ width: 75, flexDirection: "row" }}>
      <Right>
        <View style={{ flexDirection: "row" }}>
          <Button transparent onPress={() => navigation.navigate("Profile")}>
            <Icon style={{ color: "white" }} name="contact" />
          </Button>
        </View>
      </Right>
    </View>
  </View>
);

let styles = StyleSheet.create({
  icon_font_awesome: {
    fontSize: 22
  }
});
