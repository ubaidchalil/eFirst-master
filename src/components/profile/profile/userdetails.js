import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  Icon,
  Left,
  H3,
  Thumbnail,
  Text,
  Button,
  Grid,
  Col,
  Row,
  Form,
  Item,
  Input
} from "native-base";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../constants";
const UserDetails = ({ values, userdetail }) => {
  return (
    <View style={{ flexDirection: "row", padding: 10 }}>
      <View
        style={{
          width: 50,
          flex: 0.35,
          padding: 10,
          alignItems: "center"
        }}
      >
        <Thumbnail large source={require("./userProfile.png")} />
        <TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              padding: 3,
              textDecorationLine: "underline"
            }}
          >
            Change Photo
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "flex-start", flex: 0.75, padding: 5 }}>
        {!values.ShowEditUser ? (
          <H3>{userdetail.FirstName}</H3>
        ) : (
          <Item>
            <Input
              placeholder="FirstName"
              name="FirstName"
              label="User Name"
              onChangeText={value => setFieldValue("FirstName", value)}
              value={values.FirstName}
              error={touched.FirstName && errors.FirstName}
              underlineColor={Color.secondary}
            />
          </Item>
        )}
        {!user.ShowEditUser ? (
          <Text note>{userdetail.Designation}</Text>
        ) : (
          <Item>
            <Input
              placeholder="Designation"
              name="Designation"
              label="Designation"
              onChangeText={value => setFieldValue("Designation", value)}
              value={values.Designation}
              error={touched.Designation && errors.Designation}
              underlineColor={Color.secondary}
            />
          </Item>
        )}
        <Text style={{ color: "blue" }}>Open Services : 0</Text>
        <Text style={{ color: "green" }}>Completed Services : 0</Text>
        <Text style={{ color: "red" }}>Rejected Services : 0</Text>
      </View>
      <View style={{ flex: 0.1, alignContent: "flex-end" }}>
        {!user.ShowEditUser ? (
          <TouchableOpacity onPress={() => this.EditUser()}>
            <Icon style={{ color: "black" }} name="create" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.SaveUser()}>
            <Icon style={{ color: "black" }} name="checkmark" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default withFormik({
  mapPropsToValues: ({ updateUserDetails, userdetail }) => ({
    FirstName: userdetail.FirstName,
    Designation: userdetail.Designation,
    ShowEditUser: false
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    ShowEditUser: yup.boolean(),
    FirstName: Yup.string().when("ShowEditUser", {
      is: true,
      then: yup.string().required("Must enter user name")
    })
  }),

  handleSubmit: (values, { setSubmitting }) => {
    const { FirstName } = values;
    values.registerUser({ FirstName, Email, Password, ConfirmPassword });
  }
})(UserDetails);
