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
const ContactDetails = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  contactdetail
}) => {
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
        <Text style={{ fontSize: 13 }}>Contact Details </Text>
        <View
          style={{ alignSelf: "flex-end", flex: 1, alignItems: "flex-end" }}
        >
          {!values.ShowEditContact ? (
            <TouchableOpacity
              onPress={() => setFieldValue("ShowEditContact", true)}
            >
              <Icon style={{ color: "black", fontSize: 20 }} name="create" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                handleSubmit;
                setFieldValue("ShowEditContact", false);
              }}
            >
              <Icon style={{ color: "black", fontSize: 20 }} name="checkmark" />
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
                    style={{ fontSize: 13 }}
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
                    style={{ fontSize: 13 }}
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
  mapPropsToValues: ({ userConatctDetailCreate, contactdetail }) => ({
    Phone: contactdetail.Phone,
    Email: contactdetail.Email,
    Website: contactdetail.Website,
    Addressline1: contactdetail.Addressline1,
    ShowEditContact: false,
    userConatctDetailCreate
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    ShowEditContact: Yup.boolean(),
    Phone: Yup.string().when("ShowEditContact", {
      is: true,
      then: Yup.string().required("Must enter company name")
    })
  }),

  handleSubmit: (values, { props }) => {
    const token = props.token.token;
    const { Phone, Email, Website, Addressline1 } = values;
    values.userConatctDetailCreate({
      Phone,
      Email,
      Website,
      Addressline1,
      token
    });
  }
})(ContactDetails);

const styles = {
  text_detail: {
    padding: 5,
    color: "#808B96",
    fontSize: 13
  }
};
