import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Tabs,
  Tab,
  Text,
  Button,
  StyleProvider
} from "native-base";
import getTheme from "../../../../native-base-theme/components";
import material from "../../../../native-base-theme/variables/material";
import Details from "./details";
import Documents from "./documents";
import SRDetails from "./sr-details";

export default class ServiceDetails extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Tabs>
            <Tab heading="Details">
              <Details />
            </Tab>
            <Tab heading="Documents">
              <Documents />
            </Tab>
            <Tab heading="SR Details">
              <SRDetails />
            </Tab>
          </Tabs>
        </Container>
      </StyleProvider>
    );
  }
}
