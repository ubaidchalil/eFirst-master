import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

let styles = StyleSheet.create({
  outer_card: {
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    flexDirection: "row",
    borderRadius: 15,
    flex: 1,
    padding: 5
  },
  inner_card: {
    flexDirection: "column",
    padding: 5,
    flex: 0.3
  },
  inner_top: {
    height: 25,
    padding: 5
  },
  inner_top_text: {
    fontSize: 11,
    fontWeight: "bold",
    color: "black"
  },
  inner_bottom: {
    padding: 3
  },
  inner_bottom_text: {
    fontSize: 11,
    color: "#808B96"
  },
  card_date: {
    flex: 0.25
  },
  card_description: {
    flex: 0.4
  },
  card_status: {
    flex: 0.35
  }
});

const UserActonItem = ({
  service,
  navigation,
  color,
  backgroundColor,
  borderColor,
  statusLabel
}) => (
  <View style={{ padding: 5 }}>
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
          <Text style={styles.inner_top_text}> Status </Text>
        </View>
        {
          <View
            style={{
              padding: 4,
              borderWidth: 1,
              borderColor,
              borderRadius: 10,
              backgroundColor
            }}
          >
            <Text style={{ fontSize: 11, color, textAlign: "left" }}>
              {" "}
              {statusLabel}{" "}
            </Text>
          </View>
        }
      </View>
    </View>
  </View>
);
export default UserActonItem;
