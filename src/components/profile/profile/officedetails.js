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
const OfficeDetails = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  officedetail
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
        <Text style={{ fontSize: 13 }}>Office Details </Text>
        <View
          style={{ alignSelf: "flex-end", flex: 1, alignItems: "flex-end" }}
        >
          {!values.ShowEditOffice ? (
            <TouchableOpacity
              onPress={() => setFieldValue("ShowEditOffice", true)}
            >
              <Icon style={{ color: "black", fontSize: 20 }} name="create" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSubmit}>
              <Icon style={{ color: "black", fontSize: 20 }} name="checkmark" />
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
                    style={{ fontSize: 13 }}
                  >
                    {officedetail.Company}
                  </Input>
                </Item>
              )}
              <Item style={{ borderBottomWidth: 0 }}>
                {errors.Company && (
                  <Text style={{ color: "red" }} visible={errors.Company}>
                    {errors.Company}
                  </Text>
                )}
              </Item>
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
                    style={{ fontSize: 13 }}
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
                    style={{ fontSize: 13 }}
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
                    style={{ fontSize: 13 }}
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
  mapPropsToValues: ({ userOfficeAddressCreate, officedetail }) => ({
    Company: officedetail.Company,
    CompanyEmail: officedetail.CompanyEmail,
    CompanyPhone: officedetail.CompanyPhone,
    CompanyWebsite: officedetail.CompanyWebsite,
    ShowEditOffice: false,
    userOfficeAddressCreate
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    Company: Yup.string().required("Required")
  }),

  handleSubmit: (values, { props }) => {
    const token = props.token.token;
    const { Company, CompanyEmail, CompanyPhone, CompanyWebsite } = values;
    values.userOfficeAddressCreate({
      Company,
      CompanyEmail,
      CompanyPhone,
      CompanyWebsite,
      token
    });
  }
})(OfficeDetails);

const styles = {
  text_detail: {
    padding: 5,
    color: "#808B96",
    fontSize: 13
  }
};
