import React, { Component } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
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
import MyHeader from "../../../Header";

export default ({
  navigation,
  token,
  services,
  serviceRequestData,
  headerTitle,
  noDataLabel
}) => {
  const renderList = () =>
    services.data.map(service => <Greeting service={service} />);

  navigateToScreen = route => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    navigation.dispatch(navigateAction);
  };

  const navigateToDetail = serviceId => {
    const token1 = token.token;
    serviceRequestData({ serviceId, token: token1 });
    navigation.navigate("ServiceDetail");
  };
  const getTextandBackgroundColor = status => {
    switch (status) {
      case "In Review":
        return {
          color: "#F1C40F",
          borderColor: "#F1C40F",
          backgroundColor: "#ffffff",
          statusLabel: "Review & Approval Process"
        };
      case "Completed":
        return {
          color: "#ffffff",
          borderColor: "#ffffff",
          backgroundColor: "#02ab2c",
          statusLabel: status
        };
      case "Rejected":
        return {
          color: "#ffffff",
          borderColor: "#ffffff",
          backgroundColor: "#f71b1b",
          statusLabel: status
        };
      case "On Hold":
        return {
          color: "#ffffff",
          borderColor: "#ffffff",
          backgroundColor: "#f07000",
          statusLabel: status
        };
      default:
        break;
    }
  };
  return (
    <StyleProvider style={getTheme(material)}>
      <Container>
        <MyHeader navigation={navigation} header={headerTitle} />
        <Content style={{ padding: 5 }}>
          {services.data.length > 0 ? (
            services.data.map(service => {
              const res = getTextandBackgroundColor(service.SRStatusName);

              return (
                <TouchableOpacity
                  onPress={() => navigateToDetail(service.SRID)}
                >
                  <Greeting
                    service={service}
                    {...res}
                    navigation={navigation}
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text>{noDataLabel}</Text>
            </View>
          )}
        </Content>
      </Container>
    </StyleProvider>
  );
};
