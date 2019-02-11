import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Container, Content, Item, Input, Text, Button, StyleProvider, Icon } from 'native-base';
import getTheme from '../../../../native-base-theme/components'
import material from '../../../../native-base-theme/variables/material';
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../constants";
let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: 270,
    resizeMode: 'cover', // or 'stretch'
  },
  formContent: {
    flex: 1,
    padding: 20
  },
  marginTop: {
    marginTop: 15
  }
})
const LoginForm = ({
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
        <View style={{alignItems: 'center'}} >
            <Image source={require('../../../Assets/header/header_login.jpg')} style={styles.backgroundImage} />
          </View>
          <View style={styles.formContent} >
            <Item style={styles.marginTop} >
              <Input
                placeholder="Email Address"
                name="email"
                label="Email"
                onChangeText={value => setFieldValue("username", value)}
                value={values.username}
                error={touched.username && errors.username}
                underlineColor={Color.secondary}
              />
              {errors.username && (
                <Text
                  visible={errors.username}>
                  {errors.username}
                </Text>
              )}
            </Item>
            <Item style={styles.marginTop} >
              <Input
                placeholder="Password"
                name="password"
                label="Password"
                onChangeText={value => setFieldValue("password", value)}
                value={values.password}
                error={touched.password && errors.password}
                underlineColor={Color.secondary}
                secureTextEntry />
              {errors.password && (
                <Text
                  visible={errors.password}>
                  {errors.password}
                </Text>
              )}
            </Item>
            <Button style={styles.marginTop} full rounded
              onPress={handleSubmit}
            >
              <Text>Login</Text>
            </Button>

            <Button style={styles.marginTop} full rounded
              onPress={() => navigation.navigate("Registration")}
            >
              <Text>New? Sign up!</Text>
            </Button>

            <Button style={styles.marginTop} full rounded transparent >
              <Text>Forgot your password?</Text>
            </Button>
          </View>
        </Content>
      </Container>
    </StyleProvider>

  );

export default withFormik({
  mapPropsToValues: ({ loginUser }) => ({
    username: "",
    password: "",
    grant_type: "password",
    loginUser
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
      if(property!=="loginUser"){
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(values[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    }
    formBody = formBody.join("&");
    return values.loginUser(formBody)
  },

})(LoginForm);