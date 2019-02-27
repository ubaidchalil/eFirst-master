import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  Icon,
  Left,
  H3,
  Thumbnail,
  Text,
  Button,
  Grid,
  Col,
  Row,
  Form,
  Item,
  Input
} from "native-base";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../constants";
const ContactDetails = ({ values, contactdetail }) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#E5E7E9",
          flex: 1,
          padding: 12,
          paddingHorizontal: 20,
          flexDirection: "row"
        }}
      >
        <Text>Contact Details </Text>
        <View
          style={{ alignSelf: "flex-end", flex: 1, alignItems: "flex-end" }}
        >
          {!values.ShowEditContact ? (
            <TouchableOpacity onPress={() => this.EditOfficeDts()}>
              <Icon style={{ color: "black" }} name="create" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.SaveOfficeDts()}>
              <Icon style={{ color: "black" }} name="checkmark" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ flex: 1, padding: 12, paddingHorizontal: 18 }}>
        <Grid>
          <Row>
            <Col>
              {!values.ShowEditContact ? (
                <Text style={styles.text_detail}>
                  Phone: {contactdetail.Phone}
                </Text>
              ) : (
                <Item>
                  <Input
                    placeholder="Phone"
                    name="Phone"
                    label="Phone"
                    onChangeText={value => setFieldValue("Phone", value)}
                    value={values.Phone}
                    error={touched.Phone && errors.Phone}
                    underlineColor={Color.secondary}
                  >
                    {contactdetail.Phone}
                  </Input>
                </Item>
              )}
            </Col>
            <Col>
              {!values.ShowEditContact ? (
                <Text style={styles.text_detail}>
                  Phone: {contactdetail.Website}
                </Text>
              ) : (
                <Item>
                  <Input
                    placeholder="Phone"
                    name="Phone"
                    label="Phone"
                    onChangeText={value => setFieldValue("Website", value)}
                    value={values.Website}
                    error={touched.Website && errors.Website}
                    underlineColor={Color.secondary}
                  >
                    {contactdetail.Website}
                  </Input>
                </Item>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {!values.ShowEditContact ? (
                <Text style={styles.text_detail}>
                  Email: {contactdetail.Email}
                </Text>
              ) : (
                <Item>
                  <Input
                    placeholder="Email"
                    name="Email"
                    label="Email"
                    onChangeText={value => setFieldValue("Email", value)}
                    value={values.Email}
                    error={touched.Email && errors.Email}
                    underlineColor={Color.secondary}
                  >
                    {contactdetail.Email}
                  </Input>
                </Item>
              )}
            </Col>
            <Col>
              {!values.ShowEditContact ? (
                <Text style={styles.text_detail}>
                  Website: {contactdetail.Addressline1}
                </Text>
              ) : (
                <Item>
                  <Input
                    placeholder="Address"
                    name="Addressline1"
                    label="Address"
                    onChangeText={value => setFieldValue("Addressline1", value)}
                    value={values.Addressline1}
                    error={touched.Addressline1 && errors.Addressline1}
                    underlineColor={Color.secondary}
                  >
                    {contactdetail.Addressline1}
                  </Input>
                </Item>
              )}
            </Col>
          </Row>
        </Grid>
      </View>
    </View>
  );
};

export default withFormik({
  mapPropsToValues: ({ updateUserDetails, contactdetail }) => ({
    Phone: contactdetail.Phone,
    Email: contactdetail.Email,
    Website: contactdetail.Website,
    Addressline1: contactdetail.Addressline1,
    ShowEditContact: false
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    ShowEditContact: yup.boolean(),
    Phone: Yup.string().when("ShowEditContact", {
      is: true,
      then: yup.string().required("Must enter company name")
    })
  }),

  handleSubmit: (values, { setSubmitting }) => {
    const { FirstName } = values;
    values.registerUser({ FirstName, Email, Password, ConfirmPassword });
  }
})(ContactDetails);
