import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import SideBar from './SideBar';
import BottomBar from './BottomBar';

// Navigators
import { DrawerNavigator, createBottomTabNavigator } from 'react-navigation'

import  LanguageTranslation from './LanguageTranslation';
import  DocumentAttestation from './DocumentAttestation';

export const Tabs = createBottomTabNavigator({
  Dashboard: { screen: LanguageTranslation },
  RequestService: { screen: DocumentAttestation },
  MyRequests: { screen: DocumentAttestation }
},
{
  tabBarComponent: BottomBar,
  tabBarOptions: {
    activeTintColor: "#4F4F4F",
    inactiveTintColor: "#ddd"
  }
})

export const Drawer = DrawerNavigator({
  Tabs
}, {
  contentComponent: SideBar,
  drawerWidth: 250
});
