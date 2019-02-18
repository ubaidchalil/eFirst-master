import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
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
  Title,
  Body
} from "native-base";
import getTheme from "../../../../native-base-theme/components";
import material from "../../../../native-base-theme/variables/material";
import Greeting from "./useractionitems";

export default ({ navigation, services }) => {
  const renderList = () =>
    services.data.map(service => <Greeting service={service} />);

    navigateToScreen = (route) => {
      const navigateAction = NavigationActions.navigate({
        routeName: route
      });
      navigation.dispatch(navigateAction);
    }
    
  return (
    <StyleProvider style={getTheme(material)}>
      <Container>
        
    <Header style={{ backgroundColor: '#003366' }} >
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()} >
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>My Services</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='notifications' />
          </Button>
          <Button transparent onPress={() => this.navigateToScreen("Profile")}>
            <Icon name='contact' />
          </Button>
        </Right>
      </Header>
        <Content>
          {services.data.map(service => (
            <Greeting service={service} />
          ))}
        </Content>
      </Container>
    </StyleProvider>
  );
};
