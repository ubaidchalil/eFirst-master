import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
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

let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: 270,
    resizeMode: "cover" // or 'stretch'
  },
  formContent: {
    flex: 1,
    padding: 20
  },
  marginTop: {
    marginTop: 15
  }
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
  <StyleProvider style={getTheme(material)}>
    <Container>
      <Content>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../Assets/header/header_register.jpg")}
            style={styles.backgroundImage}
          />
        </View>
        <View style={styles.formContent}>
          <Item style={styles.marginTop}>
            <Input
              placeholder="Name"
              name="FirstName"
              label="Name"
              onChangeText={value => setFieldValue("FirstName", value)}
              value={values.FirstName}
              error={touched.FirstName && errors.FirstName}
              underlineColor={Color.secondary}
            />
            {errors.FirstName && (
              <Text visible={errors.FirstName}>{errors.FirstName}</Text>
            )}
          </Item>
          <Item style={styles.marginTop}>
            <Input
              placeholder="Email Address"
              name="email"
              label="Email"
              onChangeText={value => setFieldValue("Email", value)}
              value={values.Email}
              error={touched.Email && errors.Email}
              underlineColor={Color.secondary}
            />
            {errors.Email && <Text visible={errors.Email}>{errors.Email}</Text>}
          </Item>
          <Item style={styles.marginTop}>
            <Input
              placeholder="Mobile"
              name="MobileNumber"
              label="Mobile"
              onChangeText={value => setFieldValue("MobileNumber", value)}
              value={values.MobileNumber}
              error={touched.MobileNumber && errors.MobileNumber}
              underlineColor={Color.secondary}
            />
            {errors.MobileNumber && (
              <Text visible={errors.MobileNumber}>{errors.MobileNumber}</Text>
            )}
          </Item>
          <Item style={styles.marginTop}>
            <Input
              placeholder="Password"
              name="password"
              label="Password"
              onChangeText={value => setFieldValue("Password", value)}
              value={values.Password}
              error={touched.Password && errors.Password}
              underlineColor={Color.secondary}
            />
            {errors.Password && (
              <Text visible={errors.Password}>{errors.Password}</Text>
            )}
          </Item>
          <Item style={styles.marginTop}>
            <Input
              placeholder="Confirm Password"
              name="password"
              label="ConfirmPassword"
              onChangeText={value => setFieldValue("ConfirmPassword", value)}
              value={values.ConfirmPassword}
              error={touched.ConfirmPassword && errors.ConfirmPassword}
              underlineColor={Color.secondary}
            />
            {errors.ConfirmPassword && (
              <Text visible={errors.ConfirmPassword}>
                {errors.ConfirmPassword}
              </Text>
            )}
          </Item>
          <Button style={styles.marginTop} onPress={handleSubmit} full rounded>
            <Text>Register</Text>
          </Button>
          <Button
            style={[styles.marginTop, { backgroundColor: "#183E61" }]}
            onPress={() => navigation.navigate("Login")}
            full
            rounded
          >
            <Text>Have an Account? Sign in!</Text>
          </Button>
        </View>
      </Content>
    </Container>
  </StyleProvider>
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
