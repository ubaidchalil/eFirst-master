/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Alert } from "react-native";
import { GoogleSignin, statusCodes } from "react-native-google-signin";

const instructions = Platform.select({ 
     ios: "Press Cmd+R to reload,\n" + "Cmd+D or  shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  async componentDidMount() {
    this._configureGoogleSignIn();
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId:
        "151161792070-as792kqljt54l5qpl7es5v1qvh5oma8r.apps.googleusercontent.com", //Replace with your own client id
      offlineAccess: false
    });
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await GoogleSignin.revokeAccess();
      console.log("Success:", userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert("cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert("in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("play services not available or outdated");
      } else {
        console.log("Something went wrong:", error.toString());
        Alert.alert("Something went wrong", error.toString());
        this.setState({
          error
        });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this._signIn}>
          Google SignIn
        </Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
