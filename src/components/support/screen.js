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

import PhoneInput from "../../../tmp/react-native-phone-input/lib";
import CountryPicker from "react-native-country-picker-modal";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../constants";
import MyHeader from "../../Header";
import closeImgLight from "../../Assets/close-btn.png";
const renderList = () => {
  return data.map((datum, index) => {
    return (
      <View key={index} style={styles.item_border}>
        {datum.phone != "" ? (
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Phone </Text>
            </View>
            <View>
              <Text style={styles.value}>{datum.phone} </Text>
            </View>
          </View>
        ) : (
          <View />
        )}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>Email </Text>
        </View>
        <View>
          <Text style={styles.value}>{datum.email} </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>Address </Text>
        </View>
        <View>
          <Text style={styles.value}>{datum.address} </Text>
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
    phone: "+971 42 588 894",
    email: "welcome@efirst.ae",
    address:
      "Emirates First Business Service LLC\nOffice # G08,\nB-Block, Business Village,\nNear Clock Tower,Deira,\nDubai, UAE"
  },
  {
    phone: "+1(647)354-1222",
    email: "welcome@efirst.ca",
    address:
      "Emirates First Business Service LLC\n180 Northfield Drive West,\nUnit 4, 1st Floor\nWaterloo, Ontario, N2L 0C7,\nCanada."
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
}) => {
  onPressFlag = () => {
    this.countryPicker.openModal();
  };

  selectCountry = country => {
    this.phone.selectCountry(country.cca2.toLowerCase());
    setFieldValue("cca2", country.cca2);
    setFieldValue("callingCode", country.callingCode);
    setFieldValue("PersonalPhone", `+${country.callingCode}`);
  };
  const checkPhoneValid = () => {
    setFieldValue("phoneError", null);
    if (values.PersonalPhone) {
      console.log("Hi");
      if (!this.phone.isValidNumber()) {
        console.log("Hi 123");
        setFieldValue("phoneError", "Invalid Format");
        return;
      }
    }
    handleSubmit();
  };
  return (
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
            <Item>
              <View>
                <Item>
                  <CountryPicker
                    ref={ref => {
                      this.countryPicker = ref;
                    }}
                    onChange={value => this.selectCountry(value)}
                    translation="eng"
                    cca2={values.cca2}
                    styles={darkTheme}
                    hideAlphabetFilter={true}
                    closeButtonImage={closeImgLight}
                    closeable={true}
                  >
                    <View />
                  </CountryPicker>
                </Item>
                <Item>
                  <PhoneInput
                    ref={ref => {
                      this.phone = ref;
                    }}
                    textComponent={Input}
                    onPressFlag={this.onPressFlag}
                    style={{ paddingLeft: 5, padding: 10 }}
                    placeholder="Personal Phone *"
                    flagStyle={{ width: 30, height: 20 }}
                    name="PersonalPhone"
                    label="PersonalPhone *"
                    keyboardType="numeric"
                    onChangePhoneNumber={value =>
                      setFieldValue("PersonalPhone", value)
                    }
                    value={values.PersonalPhone}
                    error={touched.PersonalPhone && errors.PersonalPhone}
                    underlineColor={Color.secondary}
                  />
                </Item>
              </View>
            </Item>
            <Item style={{ borderBottomWidth: 0, padding: 10 }}>
              {values.phoneError && (
                <Text
                  style={{ color: "red", fontSize: 13 }}
                  visible={values.phoneError}
                >
                  {values.phoneError}
                </Text>
              )}
              {errors.PersonalPhone && (
                <Text style={{ color: "red" }} visible={errors.PersonalPhone}>
                  {errors.PersonalPhone}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
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
              onPress={checkPhoneValid}
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
};

export default withFormik({
  mapPropsToValues: ({ supportCreate, token, profile }) => ({
    CustomerName: profile.data.userdetail.FirstName,
    CustomerMail: profile.data.contactdetail.Email,
    PersonalPhone: profile.data.contactdetail.Phone
      ? profile.data.contactdetail.Phone
      : "+971",
    OfficePhone: profile.data.officedetail.CompanyPhone,
    Message: "",
    cca2: "AE",
    callingCode: "971",
    phoneError: null,
    supportCreate
  }),
  validateOnChange: false,
  enableReinitialize: true,
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

  handleSubmit: (values, { props, setFieldValue }) => {
    const token = props.token.token;
    setFieldValue("Message", "");
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
  label: { fontSize: 13, paddingTop: 5, fontWeight: "bold" },
  value: { fontSize: 13, paddingTop: 5, paddingLeft: 5 }
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
