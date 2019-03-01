import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Icon,
  Input,
  Text,
  Button,
  StyleProvider
} from "native-base";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: "Name",
          value: "Username"
        },
        {
          label: "E-mail",
          value: "examplw@mail.com"
        },
        {
          label: "Phone",
          value: "00-0000-0000"
        }
      ]
    };
  }

  renderList() {
    return this.state.data.map(datum => {
      return (
        <View style={styles.item_border}>
          <Text style={styles.label}>{datum.label} </Text>
          <Text style={styles.value}> {datum.value} </Text>
        </View>
      );
    });
  }

  render() {
    return (
      <Container>
        <Content style={{ padding: 10 }}>
          <ScrollView>{this.renderList()}</ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  item_border: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#BDC3C7",
    padding: 10,
    flexDirection: "row"
  },
  label: { fontSize: 16 },
  value: { color: "#A6ACAF", fontSize: 16 }
});
