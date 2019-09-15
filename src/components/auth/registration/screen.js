import React, { Component } from "react";
import { View, Image, StyleSheet, ImageBackground, Dimensions, ScrollView } from "react-native";
import {
  Container,
  Content,
  Item,
  Input,
  Text,
  Button,
  StyleProvider,
  Icon
} from "native-base";
import getTheme from "../../../../native-base-theme/components";
import material from "../../../../native-base-theme/variables/material";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../constants";

const screenHeight = Dimensions.get("window").height;

let styles = StyleSheet.create({
  backgroundImage: {
    height: 0.15 * screenHeight,
    width: 0.15 * screenHeight,
    resizeMode: "stretch" // or 'stretch'
  },
  formContent: {
    flex: 1,
    padding: 20
  },
  marginTop: {
    marginTop: 15
  },
  inputItem : {
    marginTop: 15,
    borderBottomWidth: 0,
    backgroundColor: "rgba(250, 250, 250, 0.13)",
    paddingHorizontal: 10
  },
  errorItem : {
    marginTop: 15,
    borderBottomWidth: 0,
    backgroundColor: "rgba(250, 250, 250, 0.13)",
    paddingHorizontal: 10
  },
});

const RegistrationForm = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  navigation,
  loginUser
}) => (
      <ImageBackground
        source={require("../../../Assets/bg_login.jpg")}
        style={{ width: "100%", height: "100%" }}
      >

    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={{
          flex: 0.5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(52, 52, 52, 0.1)",
            padding: 5,
            borderRadius: 12
          }}
        >
          <Image
            source={require("../../../Assets/logo.png")}
            style={[styles.backgroundImage]}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          
          <Item style={styles.inputItem}>
            <Input
              style={{ color: "#FFF", paddingLeft: 5 }}
              placeholderTextColor={"#FFF"}
              placeholder="Name"
              name="FirstName"
              label="Name"
              onChangeText={value => setFieldValue("FirstName", value)}
              value={values.FirstName}
              error={touched.FirstName && errors.FirstName}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={styles.inputItem}>
            {errors.FirstName && (
              <Text style={{ color: "red" }} visible={errors.FirstName}>
                {errors.FirstName}
              </Text>
            )}
          </Item>
         
          <Item style={styles.inputItem}>
            <Input
              style={{ color: "#FFF", paddingLeft: 5 }}
              placeholderTextColor={"#FFF"}
              placeholder="Email Address"
              name="email"
              label="Email"
              onChangeText={value => setFieldValue("Email", value)}
              value={values.Email}
              error={touched.Email && errors.Email}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={styles.inputItem}>
            {errors.Email && (
              <Text style={{ color: "red" }} visible={errors.Email}>
                {errors.Email}
              </Text>
            )}
          </Item>         
          <Item style={styles.inputItem}>
            <Input
              style={{ color: "#FFF", paddingLeft: 5 }}
              placeholderTextColor={"#FFF"}
              placeholder="Mobile"
              name="MobileNumber"
              label="Mobile"
              onChangeText={value => setFieldValue("MobileNumber", value)}
              value={values.MobileNumber}
              error={touched.MobileNumber && errors.MobileNumber}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={styles.inputItem}>
            {errors.MobileNumber && (
              <Text style={{ color: "red" }} visible={errors.MobileNumber}>
                {errors.MobileNumber}
              </Text>
            )}
          </Item>         
          <Item style={styles.inputItem}>
            <Input
              style={{ color: "#FFF", paddingLeft: 5 }}
              placeholderTextColor={"#FFF"}
              placeholder="Password"
              name="password"
              label="Password"
              onChangeText={value => setFieldValue("Password", value)}
              value={values.Password}
              error={touched.Password && errors.Password}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={styles.inputItem}>
            {errors.Password && (
              <Text style={{ color: "red" }} visible={errors.Password}>
                {errors.Password}
              </Text>
            )}
          </Item>         
          <Item style={styles.inputItem}>
            <Input
              style={{ color: "#FFF", paddingLeft: 5 }}
              placeholderTextColor={"#FFF"}
              placeholder="Confirm Password"
              name="password"
              label="ConfirmPassword"
              onChangeText={value => setFieldValue("ConfirmPassword", value)}
              value={values.ConfirmPassword}
              error={touched.ConfirmPassword && errors.ConfirmPassword}
              underlineColor={Color.secondary}
              secureTextEntry
            />
          </Item>
          <Item style={styles.inputItem}>
            {errors.ConfirmPassword && (
              <Text style={{ color: "red" }} visible={errors.ConfirmPassword}>
                {errors.ConfirmPassword}
              </Text>
            )}
          </Item>
          <Button
            style={[
              styles.marginTop,
              { backgroundColor: "rgba(250, 250, 250, 0.13)" }
            ]}
            full
            rounded
            onPress={handleSubmit}
          >
            <Text>Register</Text>
          </Button>
        
        </ScrollView>
      </View>
    </View>
    
    </ImageBackground>
);

export default withFormik({
  mapPropsToValues: ({ registerUser }) => ({
    FirstName: "",
    Email: "",
    Password: "",
    MobileNumber: "",
    ConfirmPassword: "",
    registerUser
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    FirstName: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .required("Required"),
    Email: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .email("Invalid")
      .required("Required"),
    MobileNumber: Yup.string().required("Required"),
    Password: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .required("Required"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Passwords don't match")
      .required("Required")
  }),

  handleSubmit: (values, { setSubmitting }) => {
    const {
      FirstName,
      Email,
      Password,
      ConfirmPassword,
      MobileNumber
    } = values;
    values.registerUser({
      FirstName,
      Email,
      Password,
      ConfirmPassword,
      MobileNumber
    });
  }
})(RegistrationForm);
