import React, { Component } from "react";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, DrawerNavigator } from "react-navigation";
import HomeScreen from "../components/dashboard";
import DocumentAttestation from "../components/service/documentattestation";
import LanguageTranslation from "../components/service/languagetranslation";
import SelectService from "../components/service/selectservice";
import UserActions from "../components/service/useractions";
import AuthStack from "./accountstack";
import SideBar from '../SideBar';
import BottomBar from '../BottomBar';
import Profile from '../components/profile/profile';

export const RequestServiceStack = createStackNavigator({
  SelectService: {
    screen: SelectService,
    navigationOptions: {
      header: null
    }
  },
  DocumentAttestation: {
    screen: DocumentAttestation,
    navigationOptions: {
      header:null
    }
  },
  LanguageTranslation: {
    screen: LanguageTranslation,
    navigationOptions: {
      header:null
    }
  }
});

const Tabs = createBottomTabNavigator({
  HomeScreen: { screen: HomeScreen },
  RequestService: { screen: RequestServiceStack },
  MyRequests: { screen: UserActions },
  Profile : { screen: Profile },
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
  }
});
export default root;