import React, { Component } from "react";
import { View, ScrollView, RefreshControl, TouchableOpacity, ImageBackground } from "react-native";
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
          color: "##6F5F0F",
          borderColor: "#6F5F0F",
          backgroundColor: "#ffffff00",
          statusLabel: "Review & Approval Process"
        };
      case "Completed":
        return {
          color: "#ffffff",
          borderColor: "#ffffff00",
          backgroundColor: "#07AE12",
          statusLabel: status
        };
      case "Rejected":
        return {
          color: "#ffffff",
          borderColor: "#DB0C0C",
          backgroundColor: "#DB0C0C",
          statusLabel: status
        };
      case "On Hold":
        return {
          color: "#ffffff",
          borderColor: "#123583",
          backgroundColor: "#123583",
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
        
        <ImageBackground source={require("../../../Assets/bg_useractions.jpg")} style={{width: '100%', height: '100%'}}>
        <Content style={{ padding: 5, marginBottom: 70 }}>
        
          
          <Item >
            <Icon name="ios-search" style={{color:"#FFF"}} />
            <Input placeholder="Search" style={{ fontSize:14 }} placeholderTextColor="#FFF"
              onChangeText={(searchText)=>{setSearchText(searchText)}}
              value={state.searchText}
            />
            <Button transparent onPress={() => setSearchText("")}>
              <Icon name="close" style={{color:"#FFF"}} />
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
              <Text style={{color:"#FFF"}}>{noDataLabel}</Text>
            </View>
          )}
          </ScrollView>
          </Content>
        </ImageBackground>
      </Container>
    </StyleProvider>
  );
};
