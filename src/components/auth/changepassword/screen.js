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
            source={require("../../../Assets/header/header_change_password.jpg")}
            style={styles.backgroundImage}
          />
        </View>
        <View style={styles.formContent}>
          
          <Item style={styles.marginTop}>
            <Input
              placeholder="Code"
              name="Code"
              label="Code"
              onChangeText={value => setFieldValue("Code", value)}
              value={values.Code}
              error={touched.Code && errors.Code}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }}>
            {errors.Code && (
              <Text style={{ color: "red" }} visible={errors.Code}>
                {errors.Code}
              </Text>
            )}
          </Item>
          <Item style={styles.marginTop}>
            <Input
              placeholder="New Password"
              name="password"
              label="Password"
              onChangeText={value => setFieldValue("Password", value)}
              value={values.Password}
              error={touched.Password && errors.Password}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }}>
            {errors.Password && (
              <Text style={{ color: "red" }} visible={errors.Password}>
                {errors.Password}
              </Text>
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
              secureTextEntry
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }}>
            {errors.ConfirmPassword && (
              <Text style={{ color: "red" }} visible={errors.ConfirmPassword}>
                {errors.ConfirmPassword}
              </Text>
            )}
          </Item>
          <Button style={styles.marginTop} onPress={handleSubmit} full rounded>
            <Text>Change Password</Text>
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
   
    Code: Yup.string().required("Required"),
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
