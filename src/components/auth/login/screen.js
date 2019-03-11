import React, { Component } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
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
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    position: "absolute"
  }
});
const LoginForm = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  navigation,
  loginUser,
  token,
  login
}) => (
  <StyleProvider style={getTheme(material)}>
    <Container>
      <Content>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../Assets/header/header_login.jpg")}
            style={styles.backgroundImage}
          />
        </View>
        <View style={styles.formContent}>
          <Item style={styles.marginTop}>
            <Input
              placeholder="Email Address"
              name="email"
              label="Email"
              onChangeText={value => setFieldValue("username", value)}
              value={values.username}
              error={touched.username && errors.username}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }} >
              {errors.username && (
                <Text style={{ color:'red' }}  visible={errors.username}>
                  {errors.username}
                </Text>
              )}
          </Item>
          <Item style={styles.marginTop}>
            <Input
              placeholder="Password"
              name="password"
              label="Password"
              onChangeText={value => setFieldValue("password", value)}
              value={values.password}
              error={touched.password && errors.password}
              underlineColor={Color.secondary}
              secureTextEntry
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }} >
              {errors.password && (
                <Text style={{ color:'red' }}  visible={errors.password}>
                  {errors.password}
                </Text>
              )}
          </Item>
          <Button style={styles.marginTop} full rounded onPress={handleSubmit}>
            <Text>Login</Text>
          </Button>

          <Button
            full
            transparent
            onPress={() => navigation.navigate("Registration")}
          >
            <Text>New? Sign up!</Text>
          </Button>

          <Button
            full
            onPress={() => navigation.navigate("ForgetPassword")}
            transparent
          >
            <Text>Forgot your password?</Text>
          </Button>
          <View style={{ flexDirection: 'row', borderRadius: 25, elevation:1 }} >
              <TouchableOpacity style={{ flex:0.5 }}>
                <View style={{ padding: 15, flexDirection: 'row', justifyContent:'center', borderRightWidth:1, borderColor:"#E5E8E8" }} >
                  <Image source={require('../../../Assets/loginwithFB.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                  <Text style={{ paddingLeft:5, color:"#B2BABB" }} > By Facebook </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  style={{ flex:0.5 }}>
                <View style={{ padding: 15, flexDirection: 'row', justifyContent:'center' }} >
                  <Image source={require('../../../Assets/loginwithgoogle.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                  <Text style={{ paddingLeft:5, color:"#B2BABB" }} > By Google </Text>
                </View>
              </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  </StyleProvider>
);

export default withFormik({
  mapPropsToValues: ({ loginUser, token }) => ({
    username: "",
    password: "",
    grant_type: "password",
    loginUser,
    token
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .email("Invalid")
      .required("Required"),
    password: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .required("Required")
  }),

  handleSubmit: (values, { setSubmitting }) => {
    var formBody = [];
    for (var property in values) {
      if (property !== "loginUser") {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(values[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
    }
    formBody = formBody.join("&");
    return values.loginUser(formBody);
  }
})(LoginForm);
