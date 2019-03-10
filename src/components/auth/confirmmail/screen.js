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
const ConfirmEmail = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  navigation
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
              placeholder="Verification Code"
              name="code"
              label="Verification Code"
              onChangeText={value => setFieldValue("code", value)}
              value={values.code}
              error={touched.code && errors.code}
              underlineColor={Color.secondary}
            />
            {errors.code && <Text visible={errors.code}>{errors.code}</Text>}
          </Item>
          <Button
            style={[styles.marginTop, { backgroundColor: "#183E61" }]}
            onPress={handleSubmit}
            full
            rounded
          >
            <Text>Register</Text>
          </Button>
        </View>
      </Content>
    </Container>
  </StyleProvider>
);
export default withFormik({
  mapPropsToValues: ({ confirmEmail }) => ({
    code: "",
    confirmEmail
  }),
  validateOnChange: false,
  validationSchema: Yup.object().shape({
    code: Yup.string().required("Required")
  }),

  handleSubmit: (values, { resetForm, setSubmitting, props }) => {
    const { code } = values;
    const { registration } = props;
    console.log(props);
    const {
      data: { Id }
    } = registration;
    values.confirmEmail({ code, userid: Id });
    setSubmitting(false);
    resetForm();
  }
})(ConfirmEmail);
