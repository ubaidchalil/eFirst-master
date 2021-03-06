import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

let styles = StyleSheet.create({
  outer_main: {
    borderColor: "#3498DB",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    marginTop: 15
  },
  description_text: {
    color: "#3498DB",
    fontSize: 18,
    padding: 3
  },
  date_text: {
    color: "#B2BABB",
    fontSize: 16,
    padding: 3
  }
});

const Status = ({ status }) => (
  <View style={styles.outer_main}>
    <Text style={styles.description_text}> {status.status} </Text>
    <Text style={styles.date_text}> {status.date} </Text>
  </View>
);
export default Status;
