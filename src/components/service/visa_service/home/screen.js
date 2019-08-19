import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import {
  Container,
  Picker,
  Content,
  Form,
  Item,
  Input,
  Icon,
  Radio,
  Text,
  CheckBox,
  ListItem,
  Button,
  Textarea,
  Header,
  Left,
  Right,
  Body,
  Title
} from "native-base";
import { NavigationActions } from "react-navigation";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../../constants";
import MyHeader from "../../../../Header";
import DateTimePicker from "react-native-modal-datetime-picker";
import { nationalities } from "./NationalityPicker";
import Modal from "react-native-modal";
import TermsandConditon from "../../../termsandcondition";

const deviceWidth = Dimensions.get("window").width;

const styles = {
  item_margin: {
    marginTop: 5
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 13,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  pickerStyle:
    Platform.OS === "ios"
      ? {
          width: deviceWidth - 30,
          marginLeft: -10
        }
      : { width: undefined }
};

const DocumentAttestation = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  countries,
  certificatetype,
  attestationrate,
  token,
  attestationPrice,
  visaServiceCreate,
  navigation,
  state
}) => {
  const ShowDateTimePicker = () => setFieldValue("IsDatePickerVisible", true);
  const HideDateTimePicker = () => setFieldValue("IsDatePickerVisible", false);
  const HandleDatePicked = date => {
    setFieldValue("PassportExiryDate", dateFormat(date));
    HideDateTimePicker();
  };

  dateFormat = date => {
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  navigateToScreen = route => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    navigation.dispatch(navigateAction);
  };

  setExpDateInit = () => {
    var dt = new Date();
    dt.setMonth(dt.getMonth() + 6);
    return dt;
  };

  setShowTerms = state => {
    setFieldValue("ShowTerms", state);
  };
  return (
    <Container>
      <MyHeader navigation={navigation} header="Visa Service" />

      <View
        style={{
          backgroundColor: "#F7F9F9",
          flexDirection: "row",
          paddingHorizontal: 10,
          paddingVertical: 10
        }}
      >
        <View>
          <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5 }}>
            VISA SERVICE
          </Text>
        </View>
        <Right />
      </View>
      <Content style={{ padding: 10 }}>
        <Modal isVisible={values.ShowTerms}>
          <TermsandConditon setShowTerms={this.setShowTerms} />
        </Modal>
        <ScrollView>
          <Form>
            <Item>
              <Input
                placeholder="Name *"
                name="CustomerName"
                label="Name *"
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
                name="Email"
                label="Email *"
                onChangeText={value => setFieldValue("Email", value)}
                value={values.Email}
                error={touched.Email && errors.Email}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.Email && (
                <Text style={{ color: "red" }} visible={errors.Email}>
                  {errors.Email}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Input
                placeholder="Mobile *"
                name="PersonalPhone"
                label="Mobile *"
                keyboardType="numeric"
                onChangeText={value => setFieldValue("PersonalPhone", value)}
                value={values.PersonalPhone}
                error={touched.PersonalPhone && errors.PersonalPhone}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.PersonalPhone && (
                <Text style={{ color: "red" }} visible={errors.PersonalPhone}>
                  {errors.PersonalPhone}
                </Text>
              )}
            </Item>
            <Item>
              <Input
                placeholder="Land Phone"
                name="Office"
                label="Land Phone"
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
              <Input
                placeholder="Address Line 1 *"
                underline
                name="Address1"
                label="Address Line 1 *"
                onChangeText={value => setFieldValue("Address1", value)}
                value={values.Address1}
                error={touched.Address1 && errors.Address1}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.Address1 && (
                <Text style={{ color: "red" }} visible={errors.Address1}>
                  {errors.Address1}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Input
                placeholder="Street Address *"
                underline
                name="Street"
                label="Street Address *"
                onChangeText={value => setFieldValue("Street", value)}
                value={values.Street}
                error={touched.Street && errors.Street}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.Street && (
                <Text style={{ color: "red" }} visible={errors.Street}>
                  {errors.Street}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.pickerStyle}
                placeholder="State *"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={values.SelectedState}
                onValueChange={value => setFieldValue("SelectedState", value)}
              >
                <Picker.Item value="0" label="State *" key="0" />
                <Picker.Item value="Ajman" label="Ajman" key="1" />
                <Picker.Item value="Abu Dhabi" label="Abu Dhabi" key="2" />
                <Picker.Item value="Al Fujairah" label="Al Fujairah" key="3" />
                <Picker.Item value="Sharjah" label="Sharjah" key="4" />
                <Picker.Item value="Dubai" label="Dubai" key="5" />
                <Picker.Item
                  value="Ras Al Khaima"
                  label="Ras Al Khaima"
                  key="6"
                />
                <Picker.Item
                  value="Umm Al Qwain"
                  label="Umm Al Qwain"
                  key="7"
                />
              </Picker>
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.SelectedState && (
                <Text style={{ color: "red" }} visible={errors.SelectedState}>
                  {errors.SelectedState}
                </Text>
              )}
            </Item>

            <Item style={styles.item_margin}>
              <Input
                placeholder="City *"
                name="City"
                label="City *"
                onChangeText={value => setFieldValue("City", value)}
                value={values.City}
                error={touched.City && errors.City}
                underlineColor={Color.secondary}
              />
              <Input
                placeholder="PO Box"
                name="Zip"
                label="PO Box"
                onChangeText={value => setFieldValue("Zip", value)}
                value={values.Zip}
                error={touched.Zip && errors.Zip}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.City && (
                <Text style={{ color: "red" }} visible={errors.City}>
                  {errors.City}
                </Text>
              )}
              {errors.Zip && (
                <Text style={{ color: "red" }} visible={errors.Zip}>
                  {errors.Zip}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Input
                placeholder="Country *"
                name="AddressCountry"
                label="Country *"
                onChangeText={value => setFieldValue("AddressCountry", value)}
                value={values.AddressCountry}
                error={touched.AddressCountry && errors.AddressCountry}
                underlineColor={Color.secondary}
                editable={false}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.AddressCountry && (
                <Text style={{ color: "red" }} visible={errors.AddressCountry}>
                  {errors.AddressCountry}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.pickerStyle}
                placeholder="Nationality *"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={values.Nationality}
                onValueChange={value => setFieldValue("Nationality", value)}
              >
                <Picker.Item value="" label="Nationality *" key="-1" />
                {nationalities.map((nationality, index) => (
                  <Picker.Item
                    value={nationality.value}
                    label={nationality.value}
                    key={index}
                  />
                ))}
              </Picker>
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.Nationality && (
                <Text style={{ color: "red" }} visible={errors.Nationality}>
                  {errors.Nationality}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Input
                onTouchStart={ShowDateTimePicker}
                placeholder="Passport Expiry Date *"
                underline
                name="PassportExpiryDate"
                label="Passport Expiry Date *"
                onChangeText={value =>
                  setFieldValue("PassportExiryDate", value)
                }
                value={values.PassportExiryDate}
                error={touched.PassportExiryDate && errors.PassportExiryDate}
                underlineColor={Color.secondary}
                editable={false}
              />
            </Item>

            <Item style={{ borderBottomWidth: 0 }}>
              {errors.PassportExiryDate && (
                <Text
                  style={{ color: "red" }}
                  visible={errors.PassportExiryDate}
                >
                  {errors.PassportExiryDate}
                </Text>
              )}
            </Item>
            <View style={{ marginBottom: 10, marginTop: 10, padding: 10 }}>
              <Text style={{ fontSize: 13 }}>
                Note: Passport Validity should be more than 6 months while
                applying for any Visa
              </Text>
            </View>

            <View>
              <ListItem style={{ borderBottomWidth: 0 }}>
                <CheckBox
                  color="green"
                  checked={values.AgreeTerms}
                  onPress={() => {
                    setFieldValue("AgreeTerms", !values.AgreeTerms);
                  }}
                />
                <Body>
                  <View style={{ flexDirection: "row" }}>
                    <Text> I have read and agree to the </Text>

                    <TouchableOpacity onPress={() => this.setShowTerms(true)}>
                      <Text
                        style={{
                          textDecorationLine: "underline",
                          marginLeft: -11
                        }}
                      >
                        Terms and
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => this.setShowTerms(true)}>
                    <Text
                      style={{
                        textDecorationLine: "underline"
                      }}
                    >
                      Conditions of Service
                    </Text>
                  </TouchableOpacity>
                </Body>
              </ListItem>
            </View>

            {values.AgreeTerms ? (
              <Button
                style={{ backgroundColor: "#183E61", marginBottom: 50 }}
                full
                rounded
                onPress={handleSubmit}
              >
                <Text> Pay Now </Text>
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "#818182", marginBottom: 50 }}
                full
                rounded
              >
                <Text> Pay Now </Text>
              </Button>
            )}
          </Form>
        </ScrollView>

        <DateTimePicker
          isVisible={values.IsDatePickerVisible}
          onConfirm={HandleDatePicked}
          onCancel={HideDateTimePicker}
          minimumDate={this.setExpDateInit()}
        />
      </Content>
    </Container>
  );
};

export default withFormik({
  mapPropsToValues: ({
    attestationPrice,
    countries,
    documenttypes,
    documentTypes,
    getCountries,
    attestationrate,
    profile,
    token,
    docAttestationCreate
  }) => ({
    CustomerName: profile.data.userdetail.FirstName,
    Email: profile.data.contactdetail.Email,
    PersonalPhone: profile.data.contactdetail.Phone,
    Address1: profile.data.contactdetail.Addressline1,
    Zip: "",
    AddressCountry: "United Arab Emirates",
    Street: "",
    City: "",
    SelectedState: "",
    SelectedCertificateType: "",
    PickUpandDropOption: "Direct Delivery",
    Nationality: "",
    PassportExiryDate: "",
    ShowInfo: false,
    AgreeTerms: false,
    ShowTerms: false,
    docAttestationCreate
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    CustomerName: Yup.string()
      .nullable()
      .min(3, "Must be longer than 3 characters")
      .required("Required"),
    Email: Yup.string()
      .nullable()
      .min(4, "Must be longer than 4 characters")
      .email("Email not valid")
      .required("Required"),
    PersonalPhone: Yup.number("Invalid No.")
      .nullable()
      .required("Required"),
    AddressCountry: Yup.string().required("Required"),
    Address1: Yup.string()
      .nullable()
      .required("Required"),
    Street: Yup.string().required("Required"),
    City: Yup.string().required("Required"),
    SelectedState: Yup.string().required("Required"),
    Nationality: Yup.string().required("Required"),
    PassportExiryDate: Yup.string().required("Required")
  }),

  handleSubmit: (values, { props }) => {
    const { navigation, updateTotalAmount } = props;
    const token = props.token.token;
    const data = navigation.state.params.data;
    const Address = `${values.Address1},${values.Street} ${values.City}, ${
      values.SelectedState
    } ${values.AddressCountry} - ${values.Zip}`;
    data.CustomerName = values.CustomerName;
    data.Email = values.Email;
    data.PersonalPhone = values.PersonalPhone;
    data.OfficePhone = values.OfficePhone;
    data.Address = Address;
    data.Nationality = values.Nationality;
    data.PassportExiryDate = values.PassportExiryDate;

    console.log("JSON", "result = > " + JSON.stringify(data));
    updateTotalAmount(data.TotalBillAmount);
    const serviceData = JSON.stringify(data);
    const docItem = navigation.state.params.docItem;

    let _data = new FormData();
    docItem.map((item, index) => _data.append("Files[]", item, item.name));
    _data.append("ServiceData", serviceData);
    console.log("result = > ", serviceData);
    console.log("data==>", JSON.stringify(_data));
    return props.visaServiceCreate({ data: _data, token });
  }
})(DocumentAttestation);
