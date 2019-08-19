import React, { Component } from "react";
import { View, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Icon,
  Input,
  Text,
  Item,
  StyleProvider,
  Button,
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
  noDataLabel,
  setSearchText,
  state,
  _onRefresh
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
        <MyHeader navigation={navigation} header={headerTitle} toDashboard={true} />
        <Content style={{ padding: 5, marginBottom: 30 }}>
          
          <Item >
            <Icon name="ios-search" />
            <Input placeholder="Search" style={{ fontSize:14 }}
              onChangeText={(searchText)=>{setSearchText(searchText)}}
              value={state.searchText}
            />
            <Button transparent onPress={() => setSearchText("")}>
              <Icon name="close" />
            </Button>
          </Item>
          <ScrollView 
            refreshControl={
              <RefreshControl
                refreshing={state.Refreshing}
                onRefresh={_onRefresh}
              />
            } 
          >
          {services.data.length > 0 ? (
            services.data.filter(service => (service.SRTitle.toString().toLowerCase() + " - SR" + service.SRID.toString().toLowerCase()).includes(state.searchText.toLowerCase())).map(service => {
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
                justifyContent: "center",
                padding:5
              }}
            >
              <Text>{noDataLabel}</Text>
            </View>
          )}
          </ScrollView>
        </Content>
      </Container>
    </StyleProvider>
  );
};
