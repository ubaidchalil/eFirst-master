import React, { Component } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Radio,
  Text,
  ListItem,
  Left,
  Right,
} from "native-base";
import { NavigationActions } from "react-navigation";
import { withFormik } from "formik";
import * as Yup from "yup";
import MyHeader from "../../../../Header";

const styles = {
  item_margin: {
    marginTop: 5
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 13,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
};

const DocumentAttestation = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  token,
  navigation,
  state
}) => {

  componentDidUpdate = () => {
    
  };

  navigateToScreen = route => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    navigation.dispatch(navigateAction);
  };

  return (
    <Container>
      <MyHeader navigation={navigation} header="My Services" />

      <View
        style={{
          backgroundColor: "#F7F9F9",
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingVertical: 10
        }}
      >
        <View>
          <Text style={{ color: "#000", fontSize: 14, marginLeft: 5, fontWeight: "bold" }}>
            SELECT VISA TYPE11
          </Text>
        </View>
        <Right>
        </Right>
      </View>

      <View
        style={{
          backgroundColor: "#F7F9F9",
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingVertical: 10
        }}
      >
        <View>
          <Text style={{ color: "#000", fontSize: 14, marginLeft: 5, fontWeight: "bold" }}>
            SELECT VISA TYPE
          </Text>
        </View>
        <Right>
        </Right>
      </View>
        <Content>
          <ListItem>
            <Left>
              <Text>Daily Stand Up</Text>
            </Left>
            <Right>
              <Radio selected={false} />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Discussion with Client</Text>
            </Left>
            <Right>
              <Radio selected={true} />
            </Right>
          </ListItem>
        </Content>
      </Container>
  );
};

export default withFormik({
  mapPropsToValues: ({
    
  }) => ({
    
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    
  }),

  handleSubmit: (values, { props }) => {
    
  }
})(DocumentAttestation);
