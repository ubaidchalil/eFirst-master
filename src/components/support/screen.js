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
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>Phone </Text>
          <Text style={styles.value}> {datum.phone} </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Email </Text>
          <Text style={styles.value}> {datum.email} </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}> Address </Text>
          <Text style={styles.value}> {datum.address} </Text>
        </View>
      </View>
    );
  });
};

const data = [
  {
    phone: "+971 55 277 7731 +971 56 555 4999",
    email: "welcome@efirst.ae",
    address:
      "Emirates First Business Service LLC\nOffice No.1, Al Hilal Bank Building,\nNear Al Twar Centre, Al Qusais \nDubai, UAE"
  },
  {
    phone: "+971 55 277 7731 +971 56 555 4999",
    email: "welcome@efirst.ae",
    address:
      "Emirates First Business Service LLC\nOffice # G08,\nB-Block, Business Village,\nNear Clock Tower,Deira,\nDubai, UAE"
  },
  {
    phone: "+971 55 277 7731 +971 56 555 4999",
    email: "welcome@efirst.ae",
    address:
      "Emirates First Business Service LLC\nOffice No.1, Al Hilal Bank Building,\nNear Al Twar Centre, Al Qusais \nDubai, UAE"
  },
  {
    phone: "+971 55 277 7731 +971 56 555 4999",
    email: "welcome@efirst.ae",
    address:
      "Emirates First Business Service LLC\nOffice No.1, Al Hilal Bank Building,\nNear Al Twar Centre, Al Qusais \nDubai, UAE"
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
  navigation,
  profile
}) => (
  <Container>
    <MyHeader navigation={navigation} header="Support" />
    <Content style={{ padding: 10 }}>
      <ScrollView>
        <Form>
          <Item>
            <Input
              placeholder="Name *"
              name="CustomerName"
              label="Name"
              onChangeText={value => setFieldValue("CustomerName", value)}
              value={values.CustomerName}
              error={touched.CustomerName && errors.CustomerName}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }}>
            {errors.CustomerName && (
              <Text style={{ color: "red" }} visible={errors.CustomerName}>
                {errors.CustomerName}
              </Text>
            )}
          </Item>
          <Item style={styles.item_margin}>
            <Input
              placeholder="Email *"
              name="CustomerMail"
              label="Email"
              onChangeText={value => setFieldValue("CustomerMail", value)}
              value={values.CustomerMail}
              error={touched.CustomerMail && errors.CustomerMail}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }}>
            {errors.CustomerMail && (
              <Text style={{ color: "red" }} visible={errors.CustomerMail}>
                {errors.CustomerMail}
              </Text>
            )}
          </Item>
          <Item style={styles.item_margin}>
            <Input
              placeholder="Mobile *"
              name="PersonalPhone"
              label="Name"
              keyboardType="numeric"
              onChangeText={value => setFieldValue("PersonalPhone", value)}
              value={values.PersonalPhone}
              error={touched.PersonalPhone && errors.PersonalPhone}
              underlineColor={Color.secondary}
            />
            <Input
              placeholder="Office"
              name="OfficePhone"
              label="Office"
              keyboardType="numeric"
              onChangeText={value => setFieldValue("OfficePhone", value)}
              value={values.OfficePhone}
              error={touched.OfficePhone && errors.OfficePhone}
              underlineColor={Color.secondary}
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }}>
            {errors.PersonalPhone && (
              <Text style={{ color: "red" }} visible={errors.PersonalPhone}>
                {errors.PersonalPhone}
              </Text>
            )}
            {errors.OfficePhone && (
              <Text style={{ color: "red" }} visible={errors.OfficePhone}>
                {errors.OfficePhone}
              </Text>
            )}
          </Item>
          <Item style={styles.item_margin}>
            <Textarea
              style={{ fontSize: 17 }}
              rowSpan={5}
              placeholder="Message *"
              name="Message"
              label="Message"
              onChangeText={value => setFieldValue("Message", value)}
              value={values.Message}
              error={touched.Message && errors.Message}
              underlineColor={Color.secondary}
              underline
            />
          </Item>
          <Item style={{ borderBottomWidth: 0 }}>
            {errors.Message && (
              <Text style={{ color: "red" }} visible={errors.Message}>
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
  mapPropsToValues: ({ supportCreate, token, profile }) => ({
    CustomerName: profile.data.userdetail.FirstName,
    CustomerMail: profile.data.contactdetail.Email,
    PersonalPhone: profile.data.contactdetail.Phone,
    OfficePhone: profile.data.officedetail.CompanyPhone,
    Message: "",
    supportCreate
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    PersonalPhone: Yup.string()
      .nullable()
      .required("Required"),
    Message: Yup.string()
      .nullable()
      .required("Required"),
    CustomerName: Yup.string()
      .nullable()
      .required("Required"),
    CustomerMail: Yup.string()
      .nullable()
      .required("Required")
      .email("Invalid")
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
    padding: 10
  },
  label: { fontSize: 13 },
  value: { color: "#A6ACAF", fontSize: 13 }
};
