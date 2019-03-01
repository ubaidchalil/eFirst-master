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
  <StyleProvider style={getTheme(material)}>
    <Container>
      <Content>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../Assets/header/header_reset_pasword.jpg")}
            style={styles.backgroundImage}
          />
        </View>
        <View style={styles.formContent}>
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
          <Button style={[styles.marginTop,{ backgroundColor: "#183E61" }]} onPress={handleSubmit} full rounded>
            <Text>Register</Text>
          </Button>
        </View>
      </Content>
    </Container>
  </StyleProvider>
);
export default withFormik({
  mapPropsToValues: ({ resetPasswordUser }) => ({
    Email: "",
    resetPasswordUser
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
    values.resetPasswordUser({ Email });
    setSubmitting(false);
    resetForm();
  }
})(ResetPasswordForm);
