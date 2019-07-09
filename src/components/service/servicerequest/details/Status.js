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

const renderStatus = statusList => {
  return statusList.map(status => {
    let color = "#3498DB";
    if (status.Note == "Completed") {
      color = "#02ab2c";
    } else if (status.Note == "Rejected") {
      color = "#f71b1b";
    } else if (status.Note == "On Hold") {
      color = "#3498DB";
    } else {
      color = "#3498DB";
    }
    return (
      <View style={[styles.outer_main, { borderColor: color }]}>
        <Text style={[styles.description_text, { color: color }]}>
          {" "}
          {status.Comment}{" "}
        </Text>
        <Text style={styles.date_text}> {status.CreatedDate} </Text>
      </View>
    );
  });
};

const Status = ({ statusList }) => <View>{renderStatus(statusList)}</View>;
export default Status;
