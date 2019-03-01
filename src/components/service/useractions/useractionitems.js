import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

let styles = StyleSheet.create({
  outer_card: {
    flexDirection: "row",
    borderColor: "#F39C12",
    borderWidth: 1,
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
    color: 'black'
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

const UserActonItem = ({ service, navigation }) => (
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

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ServiceDetail", { serviceId: service.SRID })
        }
      >
      <View style={[styles.inner_card, styles.card_status]}>
        <View style={styles.inner_top}>
          <Text style={styles.inner_top_text}> Process </Text>
        </View>
        <View
          style={{
            padding: 4,
            borderWidth: 1,
            borderColor: "#F1C40F",
            borderRadius: 10
          }}
        >
          <Text style={{ fontSize: 11, color: "#F1C40F", textAlign: "left" }}>
            {" "}
            {service.ProcessName}{" "}
          </Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  </View>
);
export default UserActonItem;
