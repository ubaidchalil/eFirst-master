import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "../components/auth/login";
import Home from "../components/dashboard";
import RootHeader from "../components/styled/Headers/RootHeader";
import Registration from "../components/auth/registration";
import ForgetPassword from "../components/auth/forgetpassword";
// import ForgetPassword from "../components/auth/forgetpassword";

const accountStack = createStackNavigator(
  {
    Auth : Login,
    Registration : Registration,
    ForgetPassword : ForgetPassword
  },
  {
    initialRouteName: "Auth",
    swipeEnabled: false,
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default accountStack;
