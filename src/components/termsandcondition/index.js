import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { Item, Icon, Text } from "native-base";
const TermsAndCondition = ({ setShowTerms }) => (
  <View style={styles.modalContent}>
    <Item style={{ flexDirection: "row", padding: 7 }}>
      <View
        style={{
          flexDirection: "row",
          fontSize: 17,
          padding: 10,
          paddingHorizontal: 15,
          flex: 0.9,
          fontWeight: "bold"
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Terms and Condition
        </Text>
      </View>
      <TouchableOpacity
        style={{ flex: 0.1 }}
        onPress={() => {
          setShowTerms(false);
        }}
      >
        <Icon name="close" />
      </TouchableOpacity>
    </Item>
    <View style={{ padding: 20 }}>
      <Text
        style={{
          paddingTop: 5,
          fontSize: 13,
          fontWeight: "bold",
          paddingHorizontal: 10
        }}
      >
        Comming soon...
      </Text>
    </View>
  </View>
);
export default TermsAndCondition;
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    borderRadius: 13,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
