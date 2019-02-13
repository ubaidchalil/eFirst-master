import React, { Component } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
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
import getTheme from "../../../native-base-theme/components";
import material from "../../../native-base-theme/variables/material";
let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: 270,
    resizeMode: "cover" // or 'stretch'
  },
  notifications: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#003366",
    height: 60,
    padding: 10,
    alignItems: "center"
  },
  notification_text: {
    color: "white",
    padding: 5
  },
  card_outer: {
    height: 150,
    backgroundColor: "#FEF8A2",
    alignItems: "center"
  },
  card_inner: {
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  card_image_container: {
    width: 130,
    height: 100,
    overflow: "hidden",
    alignItems: "center"
  },
  card_image: {
    height: 100,
    width: 115,
    resizeMode: "contain"
  },
  card_content_outer: {
    width: 200,
    height: 100,
    justifyContent: "center",
    padding: 10
  },
  catd_content_main: {
    fontSize: 22,
    color: "#515A5A"
  },
  card_content_left: {
    fontSize: 13,
    color: "yellow"
  },
  card_content_right: {
    fontSize: 13,
    color: "#515A5A"
  }
});

export default ({ navigation, dashboard }) => (
  <StyleProvider style={getTheme(material)}>
    <Container>
      <Header style={{ backgroundColor: '#003366' }} >
          <Left>
            <Button transparent onPress={() => navigation.openDrawer()} >
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Dashboards</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='notifications' />
            </Button>
            <Button transparent>
              <Icon name='contact' />
            </Button>
          </Right>
        </Header>
      <Content>
        <View style={styles.card_outer}>
          <View style={styles.card_inner}>
            <View style={styles.card_image_container}>
              <Image
                source={require("../../Assets/tickets/ticket_required.png")}
                style={styles.card_image}
              />
            </View>
            <View style={styles.card_content_outer}>
              <View>
                <Text style={styles.catd_content_main}>Action Required</Text>
              </View>
              {dashboard.data && (
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.card_content_left}>
                    {dashboard.data.Tiles.ActionRequiredNewUpdateCount} Updates
                  </Text>
                  <Text style={styles.card_content_right}>
                    {" "}
                    | {dashboard.data.Tiles.ActionRequiredTotalUpdateCount}{" "}
                    Updates
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MyRequests", { statusId: 2 });
              }}
            >
              <Icon style={{ color: "#515A5A" }} name="arrow-dropright" />
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  </StyleProvider>
);
