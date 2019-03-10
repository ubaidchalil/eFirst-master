import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class AlertView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }
  componentDidMount() {
    setTimeout(this.hideview, 5000);
  }
  hideview = () => {
    this.setState({ visible: false });
  };
  render() {
    const { type, message } = this.props;
    const backgroundColor = type === "success" ? "blue" : "red";
    const text =
      type === "success"
        ? message
          ? message
          : "Succesfully updated !"
        : message
        ? message
        : "Oops! Something went wrong!";
    return (
      <View>
        {this.state.visible && (
          <View style={[styles.bottomView, { backgroundColor }]}>
            <Text style={styles.textStyle}>{text}.</Text>
          </View>
        )}
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
