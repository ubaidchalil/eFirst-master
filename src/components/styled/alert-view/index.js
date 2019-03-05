import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class AlertView extends Component {
  render() {
    const { type } = this.props;
    const backgroundColor = type === "success" ? "blue" : "red";
    const text =
      type === "success"
        ? "Succesfully updated !"
        : "Oops! Something went wrong!";
    return (
      <View>
        <View style={[styles.bottomView, { backgroundColor }]}>
          <Text style={styles.textStyle}>{text}.</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bottomView: {
    width: "100%",
    height: 35,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  textStyle: {
    fontSize: 13,
    color: "white"
  }
});
