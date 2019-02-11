import React, { Component } from "react";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, DrawerNavigator } from "react-navigation";
import HomeScreen from "../components/dashboard";
import DocumentAttestationScreen from "../components/service/documentattestation";
import UserActions from "../components/service/useractions";
import AuthStack from "./accountstack";
import RootHeader from "../components/styled/Headers/RootHeader";

import SideBar from '../SideBar';
import BottomBar from '../BottomBar';


const Tabs = createBottomTabNavigator({
  HomeScreen: { screen: HomeScreen },
  RequestService: { screen: DocumentAttestationScreen },
  MyRequests: { screen: UserActions }
},
{
  tabBarComponent: BottomBar,
  tabBarOptions: {
    activeTintColor: "#4F4F4F",
    inactiveTintColor: "#ddd"
  }
})

const Drawer = DrawerNavigator({
  Tabs
}, {
  contentComponent: SideBar,
  drawerWidth: 250
});



const root = createStackNavigator({
  Auth: {
    screen: AuthStack,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Drawer,
    navigationOptions: {
      header:null
    }
  },
  DocumentAttestationScreen: {
    screen: DocumentAttestationScreen,
    navigationOptions: {
      header:null
    }
  }
});
export default root;