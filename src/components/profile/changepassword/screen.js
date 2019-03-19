import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Item,
  Input,
  Text,
  Button,
  StyleProvider
} from "native-base";
import getTheme from "../../native-base-theme/components";
import material from "../../native-base-theme/variables/material";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../constants";
import MyHeader from "../../Header";
const styles = StyleSheet.create({
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
const ChangePassword = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  support,
  values,
  errors,
  touched,
  token,
  navigation
}) => (
  <StyleProvider style={getTheme(material)}>
    <Container>
      <Content>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../Assets/header/header_change_password.jpg")}
            style={styles.backgroundImage}
          />
        </View>
        <View style={styles.formContent}>
          <Item style={styles.marginTop}>
            <Input
              placeholder="New Password"
              name="NewPassword"
              label="NewPassword"
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
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }}>
            {errors.ConfirmPassword && (
              <Text style={{ color: "red" }} visible={errors.ConfirmPassword}>
                {errors.ConfirmPassword}
              </Text>
            )}
          </Item>
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
              placeholder="Email"
              name="Email"
              label="Email"
              onChangeText={value => setFieldValue("Email", value)}
              value={values.Email}
              error={touched.Email && errors.Email}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }}>
            {errors.Email && (
              <Text style={{ color: "red" }} visible={errors.Email}>
                {errors.Email}
              </Text>
            )}
          </Item>
          <Button style={styles.marginTop} full rounded onPress={handleSubmit}>
            <Text>Submit</Text>
          </Button>
        </View>
      </Content>
    </Container>
  </StyleProvider>
);

export default withFormik({
  mapPropsToValues: ({ changePassword, token }) => ({
    NewPassword: "",
    ConfirmPassword: "",
    Code: "",
    Email: "",
    changePassword
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    NewPassword: Yup.string().required("Required"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("NewPassword"), null], "Passwords don't match")
      .required("Required"),
    Code: Yup.string().required("Required"),
    Email: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .email("Invalid")
      .required("Required")
  }),

  handleSubmit: (values, { props }) => {
    const token = props.token.token;
    return values.changePassword({ ...values, token });
  }
})(ChangePassword);

const styles = {
  item_margin: {
    marginTop: 5
  },
  item_border: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ECF0F1",
    padding: 10,
    flexDirection: "row"
  },
  label: { fontSize: 13 },
  value: { color: "#A6ACAF", fontSize: 13 }
};
