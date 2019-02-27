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
const OfficeDetails = ({ values, officedetail }) => {
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
        <Text>Office Details </Text>
        <View
          style={{ alignSelf: "flex-end", flex: 1, alignItems: "flex-end" }}
        >
          {!values.ShowEditOffice ? (
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
              {!values.ShowEditOffice ? (
                <Text style={styles.text_detail}>
                  Company: {officedetail.Company}
                </Text>
              ) : (
                <Item>
                  <Input
                    placeholder="Company"
                    name="Company"
                    label="Company"
                    onChangeText={value => setFieldValue("Company", value)}
                    value={values.Company}
                    error={touched.Company && errors.Company}
                    underlineColor={Color.secondary}
                  >
                    {officedetail.Company}
                  </Input>
                </Item>
              )}
            </Col>
            <Col>
              {!values.ShowEditOffice ? (
                <Text style={styles.text_detail}>
                  Phone: {officedetail.CompanyPhone}
                </Text>
              ) : (
                <Item>
                  <Input
                    placeholder="Phone"
                    name="CompanyPhone"
                    label="Phone"
                    onChangeText={value => setFieldValue("CompanyPhone", value)}
                    value={values.CompanyPhone}
                    error={touched.CompanyPhone && errors.CompanyPhone}
                    underlineColor={Color.secondary}
                  >
                    {officedetail.CompanyPhone}
                  </Input>
                </Item>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {!values.ShowEditOffice ? (
                <Text style={styles.text_detail}>
                  Email: {officedetail.CompanyEmail}
                </Text>
              ) : (
                <Item>
                  <Input
                    placeholder="Email"
                    name="CompanyEmail"
                    label="Email"
                    onChangeText={value => setFieldValue("CompanyEmail", value)}
                    value={values.CompanyEmail}
                    error={touched.CompanyEmail && errors.CompanyEmail}
                    underlineColor={Color.secondary}
                  >
                    {officedetail.CompanyEmail}
                  </Input>
                </Item>
              )}
            </Col>
            <Col>
              {!values.ShowEditOffice ? (
                <Text style={styles.text_detail}>
                  Website: {officedetail.CompanyWebsite}
                </Text>
              ) : (
                <Item>
                  <Input
                    placeholder="Website"
                    name="CompanyWebsite"
                    label="Website"
                    onChangeText={value =>
                      setFieldValue("CompanyWebsite", value)
                    }
                    value={values.CompanyWebsite}
                    error={touched.CompanyWebsite && errors.CompanyWebsite}
                    underlineColor={Color.secondary}
                  >
                    {officedetail.CompanyWebsite}
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
  mapPropsToValues: ({ updateUserDetails, officedetail }) => ({
    Company: officedetail.Company,
    CompanyEmail: officedetail.CompanyEmail,
    CompanyPhone: officedetail.CompanyPhone,
    CompanyWebsite: officedetail.CompanyWebsite,
    ShowEditOffice: false
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    ShowEditOffice: yup.boolean(),
    Company: Yup.string().when("ShowEditOffice", {
      is: true,
      then: yup.string().required("Must enter company name")
    })
  }),

  handleSubmit: (values, { setSubmitting }) => {
    const { FirstName } = values;
    values.registerUser({ FirstName, Email, Password, ConfirmPassword });
  }
})(OfficeDetails);
