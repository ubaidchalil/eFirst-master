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

const ContactDetails = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  contactdetail
}) => {
  
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
          Contact Details{" "}
        </Text>
        <View>
          {!values.ShowEditContact ? (
            <Button
              transparent
              onPress={() => setFieldValue("ShowEditContact", true)}
            >
              <Icon style={{ color: "black", fontSize: 25 }} name="create" />
            </Button>
          ) : (
            <Button
              transparent
              onPress={() => {
                handleSubmit();
                setFieldValue("ShowEditContact", false);
              }}
            >
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
              {!values.ShowEditContact ? (
                <Text style={styles.text_detail}>
                  Phone: {contactdetail.Phone}
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
                    style={{ paddingLeft: 5, padding: 10, fontSize: 13 }}
                    placeholder="Phone"
                    name="Phone"
                    label="Phone *"
                    keyboardType="numeric"
                    onChangeText={value => setFieldValue("Phone", value)}
                    value={values.Phone}
                    error={touched.Phone && errors.Phone}
                    underlineColor={Color.secondary}
                  />
                </Item>
                </View>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Text style={styles.text_detail}>
                Email: {contactdetail.Email}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              {!values.ShowEditContact ? (
                <Text style={styles.text_detail}>
                  Website: {contactdetail.Website}
                </Text>
              ) : (
                <Item>
                  <Input
                    placeholder="Website"
                    name="Website"
                    label="Website"
                    onChangeText={value => setFieldValue("Website", value)}
                    value={values.Website}
                    error={touched.Website && errors.Website}
                    underlineColor={Color.secondary}
                    style={{ fontSize: 13 }}
                  />
                </Item>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {!values.ShowEditContact ? (
                <Text style={styles.text_detail}>
                  Address : {contactdetail.Addressline1}
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
  mapPropsToValues: ({ userConatctDetailCreate, contactdetail }) => ({
    Phone: contactdetail.Phone,
    Email: contactdetail.Email,
    Website: contactdetail.Website,
    Addressline1: contactdetail.Addressline1,
    ShowEditContact: false,
    cca2: 'AE',
    callingCode: "971",
    userConatctDetailCreate
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    ShowEditContact: Yup.boolean(),
    Phone: Yup.string().when("ShowEditContact", {
      is: true,
      then: Yup.string()
        .nullable()
        .required("Must enter company name")
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
