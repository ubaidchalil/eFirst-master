import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from "react-native";
import {
  Container,
  Content,
  Item,
  H3,
  Text,
  Button,
  Header,
  Left,
  Right,
  Title,
  Body,
  Icon
} from "native-base";
import { NavigationActions } from "react-navigation";
import MyHeader from "../../../Header";

const { height } = Dimensions.get('window');
const cardHeight = height/8;//<150 ? 150 : height/3;

export default ({ navigation }) => {
  navigateToScreen = route => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    navigation.dispatch(navigateAction);
  };

  return (
    <Container>
      <MyHeader navigation={navigation} header="Request a Service" />
      <ImageBackground source={require("../../../Assets/bg_services.jpg")} style={{width: '100%', height: '100%'}}>
      
      <Content style={{ padding: 10 }}>
        <View style={styles.main}>
          <View style={styles.title}>
            <H3 style={styles.title_text}>ATTESTATION SERVICE</H3>
          </View>
          <View style={styles.body}>
            <Text style={styles.body_text}>
              Get your certificates attested as legally required
            </Text>
          </View>
          <TouchableOpacity
            style={styles.footer}
            onPress={() => navigation.navigate("DocumentAttestation")}
          >
            <Text style={styles.footer_text}>Apply Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View style={styles.title}>
            <H3 style={styles.title_text}>TRANSLATION SERVICE</H3>
          </View>
          <View style={styles.body}>
            <Text style={styles.body_text}>
              Get your documents translated as legally required
            </Text>
          </View>
          <TouchableOpacity
            style={styles.footer}
            onPress={() => navigation.navigate("LanguageTranslation")}
          >
            <Text style={styles.footer_text}>Apply Now</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.main, { marginBottom: 20 }]}>
          <View style={styles.title}>
            <H3 style={styles.title_text}>VISA SERVICE</H3>
          </View>
          <View style={styles.body}>
            <Text style={styles.body_text}>
              Apply for New VISA, renewals & cancellations
            </Text>
          </View>
          <TouchableOpacity
            style={styles.footer}
            onPress={() => navigation.navigate("VisaService")}
          >
            <Text style={styles.footer_text}>Apply Now</Text>
          </TouchableOpacity>
        </View>
      </Content>
      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
    marginTop: 10
  },
  title: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ABB2B9",
    backgroundColor: "#183E61",
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13
  },
  title_text: {
    textAlign: "center",
    padding: 15,
    color: "white"
  },
  body: {
    backgroundColor: "#183E61",
    padding: 15,
    height: cardHeight,
    alignItems:"center",
    flexDirection: "row"
  },
  body_text: {
    textAlign: "center",
    fontSize: 17,
    color: "white",
    alignSelf: "center",
    flex: 1
  },
  footer: {
    alignItems: "center",
    backgroundColor: "#DC1F1F",
    padding: 13,
    borderBottomRightRadius: 13,
    borderBottomLeftRadius: 13
  },
  footer_text: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  }
});
