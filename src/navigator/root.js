import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import HomeScreen from "../components/dashboard";
import DocumentAttestation from "../components/service/documentattestation";
import LanguageTranslation from "../components/service/languagetranslation";
import SelectService from "../components/service/selectservice";
import PayfortPay from "../components/service/payfort";
import PaymentSuccess from "../components/service/payfort/success";
import Foloosi from "../components/foloosi";
import FoloosiSuccess from "../components/foloosi/success";
import FAQStack from "./faq_stack";
import Support from "../components/support";
import AuthStack from "./accountstack";
import SideBar from "../SideBar";
import BottomBar from "../BottomBar";
import Profile from "../components/profile/profile";
import SRStack from "./sr_stack";
import VisaServiceStack from "./visaservice_stack";
import VisaServiceScreen from "../components/service/file_upload";
import SplashStack from "./splash_stack";
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
    Support: { screen: Support },
    Foloosi: {
      screen: Foloosi
    },
    MyRequests: { screen: SRStack }
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
    MyRequests: { screen: SRStack },
    Profile: { screen: Profile },
    FAQ: { screen: FAQStack },
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

const root = createSwitchNavigator(
  {
    SplashStack: {
      screen: SplashStack
    },
    Auth: {
      screen: AuthStack
    },
    Home: {
      screen: Drawer
    },
    PaymentSuccess: {
      screen: PaymentSuccess
    },
    FoloosiSuccess: {
      screen: FoloosiSuccess
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(root);
