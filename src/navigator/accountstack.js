import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "../components/auth/login";
import Home from "../components/dashboard";
import RootHeader from "../components/styled/Headers/RootHeader";
import Registration from "../components/auth/registration";
import ForgetPassword from "../components/auth/forgetpassword";
import ConfirmEmail from "../components/auth/confirmmail";
import ExternalLogin from "../components/auth/external";
import RegisterExternal from "../components/auth/external_register";
import ChangePassword from "../components/auth/changepassword";
const accountStack = createStackNavigator(
  {
    Auth: Login,
    Registration: Registration,
    ForgetPassword: ForgetPassword,
    ConfirmEmail: ConfirmEmail,
    ExternalLogin: ExternalLogin,
    RegisterExternal: RegisterExternal,
    ChangePassword: ChangePassword
  },
  {
    initialRouteName: "Auth",
    swipeEnabled: false,
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default accountStack;
