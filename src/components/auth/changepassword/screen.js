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
              placeholder="Token"
              name="Token"
              label="Token"
              onChangeText={value => setFieldValue("Token", value)}
              value={values.Token}
              error={touched.Token && errors.Token}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }}>
            {errors.Token && (
              <Text style={{ color: "red" }} visible={errors.Token}>
                {errors.Token}
              </Text>
            )}
          </Item>
          <Item style={styles.marginTop}>
            <Input
              placeholder="New Password"
              name="NewPassword"
              label="New Password"
              onChangeText={value => setFieldValue("NewPassword", value)}
              value={values.NewPassword}
              error={touched.NewPassword && errors.NewPassword}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }}>
            {errors.NewPassword && (
              <Text style={{ color: "red" }} visible={errors.NewPassword}>
                {errors.NewPassword}
              </Text>
            )}
          </Item>
          <Item style={styles.marginTop}>
            <Input
              placeholder="Confirm Password"
              name="ConfirmPassword"
              label="Confirm Password"
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
  mapPropsToValues: ({ changePassword }) => ({
    NewPassword: "",
    ConfirmPassword: "",
    Token: "",
    changePassword
  }),
  validateOnChange: false,
  validationSchema: Yup.object().shape({
    Token: Yup.string().required("Required"),
    NewPassword: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .required("Required"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("NewPassword"), null], "Passwords don't match")
      .required("Required")
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    console.log(props);
    const { Token, NewPassword } = values;
    const { Email } = props;

    return values.changePassword({
      Token,
      NewPassword,
      Email
    });
  }
})(RegistrationForm);
