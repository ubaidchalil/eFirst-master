import React, { Component } from "react";
import { View, Image, StyleSheet, ImageBackground, Dimensions, ScrollView } from "react-native";
import {
  Container,
  Content,
  Item,
  Input,
  Text,
  Button,
  StyleProvider
} from "native-base";
import getTheme from "../../../../native-base-theme/components";
import material from "../../../../native-base-theme/variables/material";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../constants";

const screenHeight = Dimensions.get("window").height;

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
  backgroundImage: {
    height: 0.25 * screenHeight,
    width: 0.25 * screenHeight,
    resizeMode: "stretch" // or 'stretch'
  },
});
const ResetPasswordForm = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  navigation,
  resetPasswordUser
}) => (
  <ImageBackground
    source={require("../../../Assets/bg_login.jpg")}
    style={{ width: "100%", height: "100%" }}
  >
    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={{
          flex: 0.6,
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
          
          <Button
            style={[
              styles.marginTop,
              { backgroundColor: "rgba(250, 250, 250, 0.13)" }
            ]}
            full
            rounded
            onPress={handleSubmit}
          >
            <Text>Submit</Text>
          </Button>
        
          <Button
            style={[styles.marginTop, { borderWidth: 1, borderColor: "#FFF" }]}
            full
            transparent
            onPress={() => navigation.navigate("Auth")}
          >
            <Text style={{ color: "#FFF" }}>SIGN IN</Text>
          </Button>

   
        </ScrollView>
      </View>
    </View>

    </ImageBackground>
);
export default withFormik({
  mapPropsToValues: ({ resetPasswordUser, setStateEmail }) => ({
    Email: "",
    resetPasswordUser,
    setStateEmail
  }),
  validateOnChange: false,
  validationSchema: Yup.object().shape({
    Email: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .email("Invalid")
      .required("Required")
  }),

  handleSubmit: (values, { resetForm, setSubmitting }) => {
    const { Email } = values;
    const TokenFor = "Forget Password";
    values.resetPasswordUser({ Email, TokenFor });
    values.setStateEmail(Email);
    setSubmitting(false);
    resetForm();
  }
})(ResetPasswordForm);
