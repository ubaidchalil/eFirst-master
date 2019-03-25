import React from "react";
import { View, StyleSheet, Platform } from "react-native";

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

const CustomHeader = props => {
    const navigation = props.navigation;
  return (
    <View style={{ flexDirection: 'row', backgroundColor: "#183E61", height: 60  }}>
    <Left>
      <View style={{ flexDirection: "row" }} >
        <Button transparent onPress={() => navigation.openDrawer()}>
        <Icon style={{ color:'white' }} name="menu"  />
        </Button>
        <Button transparent onPress={() => navigation.goBack()}>
          <IconFontAwesome style={[{ color:'white' }, styles.icon_font_awesome ]} name="angle-left" />
        </Button>
      </View>
    </Left>
    <Body >
      <Title >Headerr</Title>
    </Body>
    <Right>
      <View style={{ flexDirection: "row" }} >
        <Button transparent>
            <Icon name="notifications" />
        </Button>
        <Button transparent>
            <Icon
            name="contact"
            onPress={() => navigation.navigate("Profile")}
            />
        </Button>
      </View>
    </Right>
  </View>
  );
};

export default CustomHeader;

let styles = StyleSheet.create({
    icon_font_awesome: {
      fontSize: 20
    }
  });