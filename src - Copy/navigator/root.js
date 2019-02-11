import React, { Component } from 'react';
import { createStackNavigator,createAppContainer } from 'react-navigation';
import HomeScreen from "../components/dashboard"
import UserActions from "../components/user_actions"
import AuthStack from './accountstack';
import RootHeader from "../components/styled/Headers/RootHeader";
const root= createStackNavigator({
  Home:{
    screen: HomeScreen,
    navigationOptions: {
      header:null
    }
  },
  Auth: {
    screen: AuthStack,
    navigationOptions: {
    header:null
    },
    
  
  },
  UserActions: {
      screen: UserActions,
      navigationOptions: {
      header:null
    },
  }
});
export default root;