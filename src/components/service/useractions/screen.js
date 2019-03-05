import React, { Component } from "react";
import { View, Image, StyleSheet, TouchableOpacity  } from "react-native";
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
import MyHeader from '../../../Header';

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
        
      <MyHeader navigation={navigation} header="User Acions" />
        <Content style={{ padding:5 }} >
          {services.data.map(service => (
            
                <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ServiceDetail", { serviceId: service.SRID })
                }
              >
            <Greeting service={service} navigation={navigation}  />
            </TouchableOpacity>
          ))}
        </Content>
      </Container>
    </StyleProvider>
  );
};
