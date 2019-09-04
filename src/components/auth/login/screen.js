import React, { Component } from "react";
import { View, Image, StyleSheet, TouchableOpacity,ImageBackground, Dimensions, ScrollView } from "react-native";
import {
  Container,
  Content,
  Item,
  Input,
  Text,
  Button,
  StyleProvider,
  Icon,
  Left,
  Right
} from "native-base";
import getTheme from "../../../../native-base-theme/components";
import material from "../../../../native-base-theme/variables/material";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color, BASE_URL } from "../../../constants";

const screenHeight = Dimensions.get('window').height;

let styles = StyleSheet.create({
  backgroundImage: {
    height: 0.30*screenHeight,
    resizeMode: "contain" // or 'stretch'
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
  login,
  extLoginUrls
}) => (
        <ImageBackground source={require("../../../Assets/bg_login.jpg")} style={{width: '100%', height: '100%'}}>
        <View style={{ flex:1, padding: 10 }} >
          <View style={{ flex:0.8 , flexDirection: "row", alignItems: "center"}}>
            <Image
              source={require("../../../Assets/logo.png")}
              style={styles.backgroundImage}
            />
          </View>
          <View style={{ flex:1 }} >
            <ScrollView >
            <Item style={[styles.marginTop, {borderBottomWidth:0, backgroundColor: 'rgba(250, 250, 250, 0.13)' , paddingHorizontal:10}]}>
              <Icon active name='ios-person' style={{color:"#FFF"}} />
              <Input
                style={{color:"#FFF", paddingLeft: 5}}
                placeholderTextColor={'#FFF'}
                placeholder="Username"
                name="email"
                label="Email"
                onChangeText={value => setFieldValue("username", value)}
                value={values.username}
                error={touched.username && errors.username}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={[styles.marginTop, {backgroundColor:"#FFF" , paddingHorizontal:10,borderBottomWidth:0}]}>
              {errors.username && (
                <Text style={{ color: "red" }} visible={errors.username}>
                  {errors.username}
                </Text>
              )}
            </Item>
            <Item style={[styles.marginTop, {borderBottomWidth:0, backgroundColor: 'rgba(250, 250, 250, 0.13)' , paddingHorizontal:10}]}>
              <Icon active name='home' style={{color:"#FFF"}} />
              <Input
                style={{color:"#FFF", paddingLeft: 5}}
                placeholderTextColor={'#FFF'}
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
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.password && (
                <Text style={{ color: "red" }} visible={errors.password}>
                  {errors.password}
                </Text>
              )}
            </Item>
            <Button style={[styles.marginTop,{ backgroundColor: 'rgba(250, 250, 250, 0.13)' }]} full rounded onPress={handleSubmit}>
              <Text style={{ color:"black" }} >Login</Text>
            </Button>
            <Item style={{ borderBottomWidth: 0, paddingVertical: 15 }} >
              <Left>
                <Text></Text>
              </Left>
              <Right>
                <TouchableOpacity  onPress={() => navigation.navigate("ForgetPassword")} >
                  <Text style={{fontStyle: "italic", color: "#FFF"}} >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </Right>
            </Item>
            <Button style={[styles.marginTop,{borderWidth:1, borderColor:"#FFF"}]} full transparent  onPress={() => navigation.navigate("Registration")} >
              <Text  style={{ color:"#FFF" }}  >Create Account</Text>
            </Button>
            
            {!extLoginUrls.error && !extLoginUrls.loading ? (
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  borderRadius: 25,
                  borderColor: "#FFF",
                  borderWidth: 1
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ExternalLogin", {
                      uri: BASE_URL + extLoginUrls.data[0].Url
                    })
                  }
                  style={{ flex: 0.5 }}
                >
                  <View
                    style={{
                      padding: 15,
                      flexDirection: "row",
                      justifyContent: "center",
                      borderRightWidth: 1,
                      borderColor: "#FFF"
                    }}
                  >
                    <Image
                      source={require("../../../Assets/loginwithFB.png")}
                      style={{ width: 20, height: 20, resizeMode: "contain" }}
                    />
                    <Text style={{ paddingLeft: 5, color: "#FFF", fontWeight:"bold" }}>
                      {" "}
                      By Facebook{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ExternalLogin", {
                      uri: BASE_URL + extLoginUrls.data[1].Url
                    })
                  }
                  style={{ flex: 0.5 }}
                >
                  <View
                    style={{
                      padding: 15,
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  >
                    <Image
                      source={require("../../../Assets/loginwithgoogle.png")}
                      style={{ width: 20, height: 20, resizeMode: "contain" }}
                    />
                    <Text style={{ paddingLeft: 5, color: "#FFF", fontWeight:"bold" }}>
                      {" "}
                      By Google{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ height: 50 }} />
            )}
            </ScrollView >
            </View>
        </View>
        </ImageBackground>
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
