import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator
} from "react-navigation";
import HomeScreen from "../components/dashboard";
import DocumentAttestation from "../components/service/documentattestation";
import LanguageTranslation from "../components/service/languagetranslation";
import SelectService from "../components/service/selectservice";
import PayfortPay from "../components/service/payfort";
import UserActions from "../components/service/useractions";
import FAQ from "../components/faq";
import Support from "../components/support";
import AuthStack from "./accountstack";
import SideBar from "../SideBar";
import BottomBar from "../BottomBar";
import Profile from "../components/profile/profile";
import ServiceDetail from "../components/service/servicerequest";
import VisaServiceStack from "./visaservice_stack";
import VisaServiceScreen from "../components/service/file_upload";
export const RequestServiceStack = createStackNavigator(
  {
    SelectService: {
      screen: SelectService
    },
    DocumentAttestation: {
      screen: DocumentAttestation
    },
    LanguageTranslation: {
      screen: LanguageTranslation
    },
    VisaService: {
      screen: VisaServiceStack
    },
    PayfortPay: {
      screen: PayfortPay
    },
    MyRequests: { screen: UserActions }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const Tabs = createBottomTabNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    RequestService: { screen: RequestServiceStack },
    MyRequests: { screen: UserActions },
    Profile: { screen: Profile },
    FAQ: { screen: FAQ },
    Support: { screen: Support },
    ServiceDetail: { screen: ServiceDetail },
    VisaServiceScreen: { screen: VisaServiceScreen }
  },
  {
    tabBarComponent: BottomBar,
    tabBarOptions: {
      activeTintColor: "#4F4F4F",
      inactiveTintColor: "#ddd"
    },
    defaultNavigationOptions: {
      header: null
    }
  }
);

const Drawer = createDrawerNavigator(
  {
    Tabs
  },
  {
    contentComponent: SideBar,
    drawerWidth: 250
  }
);

const root = createStackNavigator(
  {
    Auth: {
      screen: AuthStack
    },
    Home: {
      screen: Drawer
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(root);
