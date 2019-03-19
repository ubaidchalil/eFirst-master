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
  <View style={{ flexDirection: 'row', backgroundColor: "#183E61", height: 60  }}>
      <Left>
      <View style={{ flexDirection: "row" }} >
        <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon style={{ color:'white' }} name="menu"  />
        </Button>
        {
          (header != "Dashboard" &&
        <Button transparent onPress={() => navigation.goBack()}>
          <IconFontAwesome style={[{ color:'white', marginLeft:5 }, styles.icon_font_awesome ]} name="angle-left" />
        </Button>
          )
        }
      </View>
      </Left>
      <Body >
        <Title style={{ color:'white' }} >{header}</Title>
      </Body>
      <Right>
      <View style={{ flexDirection: "row" }} >
        <Button transparent>
            <Icon
              style={{ color:'white' }}
              name="notifications" />
        </Button>
        <Button transparent onPress={() => navigation.navigate("Profile")}>
            <Icon
            style={{ color:'white' }}
            name="contact"
            
            />
        </Button>
      </View>
      </Right>
    </View>
);


let styles = StyleSheet.create({
    icon_font_awesome: {
      fontSize: 20
    }
  });