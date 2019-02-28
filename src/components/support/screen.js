import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Container,
  Picker,
  Content,
  Form,
  Item,
  Input,
  Icon,
  CheckBox,
  Text,
  ListItem,
  Button,
  Textarea,
  Header,
  Left,
  Right,
  Body
} from "native-base";
import getTheme from "../../../native-base-theme/components";
import material from "../../../native-base-theme/variables/material";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../constants";

const renderList = () => {
  return data.map((datum, index) => {
    return (
      <View key={index} style={styles.item_border}>
        <Text style={styles.label}>{datum.label} </Text>
        <Text style={styles.value}> {datum.value} </Text>
      </View>
    );
  });
};

const data = [
  {
    label: "Phone : ",
    value: "+9715521234567 +971561234567"
  },
  {
    label: "E-mail : ",
    value: "example@mail.com"
  },
  {
    label: "Address : ",
    value:
      "Emirates First Business Service\nGround Floor, Al Hilal Bank Building. \nAl Nahda Road Al Qusais, Dubai, UAE"
  }
];
const Support = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  token
}) => (
  <Container>
    <Content style={{ padding: 10 }}>
      <ScrollView>
        <Form>
          <Item>
            <Input
              placeholder="Name"
              name="CustomerName"
              label="Name"
              onChangeText={value => setFieldValue("CustomerName", value)}
              value={values.CustomerName}
              error={touched.CustomerName && errors.CustomerName}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={styles.item_margin}>
            <Input
              placeholder="Email"
              name="CustomerMail"
              label="Name"
              onChangeText={value => setFieldValue("CustomerMail", value)}
              value={values.CustomerMail}
              error={touched.CustomerMail && errors.CustomerMail}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={styles.item_margin}>
            <Input
              placeholder="Mobile"
              name="PersonalPhone"
              label="Name"
              onChangeText={value => setFieldValue("PersonalPhone", value)}
              value={values.PersonalPhone}
              error={touched.PersonalPhone && errors.PersonalPhone}
              underlineColor={Color.secondary}
            />
            {errors.PersonalPhone && (
              <Text visible={errors.PersonalPhone}>{errors.PersonalPhone}</Text>
            )}
            <Input
              placeholder="Office"
              name="OfficePhone"
              label="Office"
              onChangeText={value => setFieldValue("OfficePhone", value)}
              value={values.OfficePhone}
              error={touched.OfficePhone && errors.OfficePhone}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={styles.item_margin}>
            <Textarea
              rowSpan={5}
              placeholder="Message"
              name="Message"
              label="Message"
              onChangeText={value => setFieldValue("Message", value)}
              value={values.Message}
              error={touched.Message && errors.Message}
              underlineColor={Color.secondary}
              underline
            />
            {errors.Message && (
              <Text visible={errors.Message}>{errors.Message}</Text>
            )}
          </Item>
          <Button onPress={handleSubmit} style={{ marginTop: 10 }} full rounded>
            <Text> Pay Now </Text>
          </Button>
        </Form>

        {renderList()}
      </ScrollView>
    </Content>
  </Container>
);

export default withFormik({
  mapPropsToValues: ({ loginUser, token }) => ({
    CustomerName: "",
    CustomerMail: "",
    PersonalPhone: "",
    OfficePhone: "",
    Message: "",
    loginUser,
    token
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    PersonalPhone: Yup.string().required("Required"),
    Message: Yup.string().required("Required")
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
})(Support);

const styles = {
  item_margin: {
    marginTop: 5
  },
  item_border: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#BDC3C7",
    padding: 10,
    flexDirection: "row"
  },
  label: { fontSize: 16 },
  value: { color: "#A6ACAF", fontSize: 16 }
};
