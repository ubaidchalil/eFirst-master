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
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';

const OfficeDetails = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  officedetail
}) => {
  const submit = () => {
    handleSubmit();
    setFieldValue("ShowEditOffice", false);
  };
  
  onPressFlag = () => {
    this.countryPicker.openModal();
  }

  selectCountry = (country) => {
    this.phone.selectCountry(country.cca2.toLowerCase());
    setFieldValue("cca2", country.cca2 )
    setFieldValue("callingCode", country.callingCode )
    setFieldValue("PersonalPhone", `+${country.callingCode}`)
  }


  return (
    <View>
      <View
        style={{
          backgroundColor: "#E5E7E9",
          flex: 1,
          padding: 3,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Text style={{ fontSize: 15, alignSelf: "center" }}>
          Office Details
        </Text>
        <View>
          {!values.ShowEditOffice ? (
            <Button
              transparent
              onPress={() => setFieldValue("ShowEditOffice", true)}
            >
              <Icon style={{ color: "black", fontSize: 25 }} name="create" />
            </Button>
          ) : (
            <Button transparent onPress={submit}>
              <Icon
                style={{ color: "black", fontSize: 25 }}
                name="md-checkmark-circle"
              />
            </Button>
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
                  />
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
          </Row>
          <Row>
            <Col>
              {!values.ShowEditOffice ? (
                <Text style={styles.text_detail}>
                  Phone: {officedetail.CompanyPhone}
                </Text>
              ) : (
                <View>
                <Item>
                  <CountryPicker
                    ref={(ref) => {
                      this.countryPicker = ref;
                    }}
                    onChange={value => this.selectCountry(value)}
                    translation="eng"
                    cca2={values.cca2}
                    styles={darkTheme}
                    hideAlphabetFilter={true}
                  >
                    <View />
                  </CountryPicker>
                </Item>
                <Item>
                  <PhoneInput
                    ref={(ref) => {
                      this.phone = ref;
                    }}
                    textComponent={Input}
                    onPressFlag={this.onPressFlag}
                    style={{ paddingLeft: 5, padding: 10 ,fontSize: 13 }}
                    placeholder="Phone"
                    name="CompanyPhone"
                    label="Phone *"
                    keyboardType="numeric"
                    onChangeText={value => setFieldValue("CompanyPhone", value)}
                    value={values.CompanyPhone}
                    error={touched.CompanyPhone && errors.CompanyPhone}
                    underlineColor={Color.secondary}
                  />
                </Item>
                </View>
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
                  />
                </Item>
              )}
            </Col>
          </Row>
          <Row>
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
                  />
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
    Company: officedetail.Company ? officedetail.Company : "",
    CompanyEmail: officedetail.CompanyEmail ? officedetail.CompanyEmail : "",
    CompanyPhone: officedetail.CompanyPhone ? officedetail.CompanyPhone : "",
    CompanyWebsite: officedetail.CompanyWebsite
      ? officedetail.CompanyWebsite
      : "",
    ShowEditOffice: false,
    cca2: 'AE',
    callingCode: "971",
    userOfficeAddressCreate
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    Company: Yup.string()
      .nullable()
      .required("Required")
  }),

  handleSubmit: (values, { props }) => {
    const token = props.token.token;
    const { Company, CompanyEmail, CompanyPhone, CompanyWebsite } = values;
    console.log(props);
    console.log(values);
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

{
  /* <TouchableOpacity
onPress={() => {
  handleSubmit;
  setFieldValue("ShowEditOffice", false);
}}
>
<Icon style={{ color: "black", fontSize: 20 }} name="md-checkmark-circle" />
</TouchableOpacity> */
}


const DARK_COLOR = "#18171C";
const PLACEHOLDER_COLOR = "rgba(255,255,255,0.2)";
const LIGHT_COLOR = "#FFF";

const darkTheme = StyleSheet.create({
  modalContainer: {
     backgroundColor: DARK_COLOR
   },
   contentContainer: {
     backgroundColor: DARK_COLOR
   },
   header: {
     backgroundColor: DARK_COLOR
   },
   itemCountryName: {
     borderBottomWidth: 0
   },
   countryName: {
     color: LIGHT_COLOR
   },
   letterText: {
     color: LIGHT_COLOR
   },
   input: {
     color: LIGHT_COLOR,
     borderBottomWidth: 1,
     borderColor: LIGHT_COLOR
   }
 });
