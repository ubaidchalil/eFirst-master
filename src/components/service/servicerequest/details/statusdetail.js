import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

let styles = StyleSheet.create({
  outer_main: {
    borderColor: "#3498DB",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 15
  },
  description_text: {
    color: "#3498DB",
    fontSize: 14,
    padding: 3
  },
  date_text: {
    color: "#B2BABB",
    fontSize: 12,
    padding: 3
  }
});

const renderStatus = status => {
  return (
    <View style={styles.outer_main}>
      <Text style={styles.description_text}> {status.Comment} </Text>
      <Text style={styles.date_text}> {status.CreatedDate} </Text>
    </View>
  );
};

const Status = ({ status }) => <View>{renderStatus(status)}</View>;
export default Status;
