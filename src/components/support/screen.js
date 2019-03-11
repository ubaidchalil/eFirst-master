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
import MyHeader from "../../Header";

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
  support,
  values,
  errors,
  touched,
  token,
  navigation
}) => (
  <Container>
    <MyHeader navigation={navigation} header="Support" />
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
          <Item style={{ borderBottomWidth: 0 }} >
              {errors.CustomerName && (
                <Text style={{ color:'red' }}  visible={errors.CustomerName}>
                  {errors.CustomerName}
                </Text>
              )}
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
          <Item style={{ borderBottomWidth: 0 }} >
              {errors.CustomerMail && (
                <Text style={{ color:'red' }}  visible={errors.CustomerMail}>
                  {errors.CustomerMail}
                </Text>
              )}
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
          <Item style={{ borderBottomWidth: 0 }} >
              {errors.PersonalPhone && (
                <Text style={{ color:'red' }}  visible={errors.PersonalPhone}>
                  {errors.PersonalPhone}
                </Text>
              )}
              {errors.OfficePhone && (
                <Text style={{ color:'red' }}  visible={errors.OfficePhone}>
                  {errors.OfficePhone}
                </Text>
              )}
          </Item>
          <Item style={styles.item_margin}>
            <Textarea
              rowSpan={5}
              placeholder="Address"
              name="Message"
              label="Message"
              onChangeText={value => setFieldValue("Message", value)}
              value={values.Message}
              error={touched.Message && errors.Message}
              underlineColor={Color.secondary}
              underline
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }} >
              {errors.Message && (
                <Text style={{ color:'red' }}  visible={errors.Message}>
                  {errors.Message}
                </Text>
              )}
          </Item>
          <Button
            onPress={handleSubmit}
            style={{ marginTop: 10, backgroundColor: "#183E61" }}
            full
            rounded
          >
            <Text> Submit </Text>
          </Button>
        </Form>

        {renderList()}
      </ScrollView>
    </Content>
  </Container>
);

export default withFormik({
  mapPropsToValues: ({ supportCreate, token }) => ({
    CustomerName: "",
    CustomerMail: "",
    PersonalPhone: "",
    OfficePhone: "",
    Message: "",
    supportCreate
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    PersonalPhone: Yup.string().required("Required"),
    Message: Yup.string().required("Required")
  }),

  handleSubmit: (values, { props }) => {
    const token = props.token.token;
    return values.supportCreate({ ...values, token });
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
    borderColor: "#ECF0F1",
    padding: 10,
    flexDirection: "row"
  },
  label: { fontSize: 13 },
  value: { color: "#A6ACAF", fontSize: 13 }
};
