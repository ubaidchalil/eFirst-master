import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

let styles = StyleSheet.create({
  outer_card: {
    flexDirection: "row",
    borderColor: "#F39C12",
    borderWidth: 2,
    borderRadius: 18,
    flex: 1,
    padding: 8,
    marginTop: 10
  },
  inner_card: {
    width: 110,
    flexDirection: "column",
    padding: 5,
    flex: 0.3
  },
  inner_top: {
    height: 50,
    padding: 5
  },
  inner_top_text: {
    fontSize: 18,
    fontWeight: "bold"
  },
  inner_bottom: {
    height: 40,
    padding: 3,
    width: 110
  },
  inner_bottom_text: {
    fontSize: 16,
    color: "#808B96"
  },
  card_date: {
    flex: 0.3
  },
  card_description: {
    flex: 0.6
  },
  card_status: {
    flex: 0.3
  }
});

const UserActonItem = ({ service }) => (
  <View style={{ padding: 10 }}>
    <View style={styles.outer_card}>
      <View style={[styles.inner_card, styles.card_date]}>
        <View style={styles.inner_top}>
          <Text style={styles.inner_top_text}> Date </Text>
        </View>
        <View style={styles.inner_bottom}>
          <Text style={styles.inner_bottom_text}> {service.CreatedDate} </Text>
        </View>
      </View>

      <View style={[styles.inner_card, styles.card_description]}>
        <View style={styles.inner_top}>
          <Text style={styles.inner_top_text}> Service Request </Text>
        </View>
        <View style={styles.inner_bottom}>
          <Text style={styles.inner_bottom_text}>
            {" "}
            {service.SRTitle} - SR{service.SRID}{" "}
          </Text>
        </View>
      </View>

      <View style={[styles.inner_card, styles.card_status]}>
        <View style={styles.inner_top}>
          <Text style={styles.inner_top_text}> Process </Text>
        </View>
        <View
          style={{
            padding: 3,
            borderWidth: 2,
            borderColor: "#F1C40F",
            borderRadius: 10
          }}
        >
          <Text style={{ fontSize: 14, color: "#F1C40F", textAlign: "center" }}>
            {" "}
            {service.ProcessName}{" "}
          </Text>
        </View>
      </View>
    </View>
  </View>
);
export default UserActonItem;
