import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  ImageBackground
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
import PhoneInput from "../../../../../tmp/react-native-phone-input/lib";
import CountryPicker from "react-native-country-picker-modal";
import closeImgLight from "../../../../Assets/close-btn.png";
const deviceWidth = Dimensions.get("window").width;

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

const styles = {
  item_margin: {
    marginTop: 5
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 13,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  itemTransparent: {
    marginTop: 5,
    marginLeft: 0,
    borderBottomWidth: 0,
    backgroundColor: "rgba(250, 250, 250, 0.9)",
    paddingHorizontal: 10,
    borderRadius: 10
  },
  pickerStyle:
    Platform.OS === "ios"
      ? {
          width: deviceWidth - 30,
          marginLeft: -10,
          color: "#5B5656"
        }
      : { width: undefined, color: "#5B5656" }
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

  onPressFlag = () => {
    this.countryPicker.openModal();
  };
  checkPhoneValid = () => {
    this.setPhoneError("");
    if (!this.phone.isValidNumber()) {
      this.setPhoneError("Invalid Format");
    } else {
      handleSubmit();
    }
  };
  selectCountry = country => {
    this.phone.selectCountry(country.cca2.toLowerCase());
    setFieldValue("cca2", country.cca2);
    setFieldValue("callingCode", country.callingCode);
    setFieldValue("PersonalPhone", `+${country.callingCode}`);
  };

  setPhoneError = msg => {
    setFieldValue("errorPhone", msg);
  };

  return (
    <Container>
      <MyHeader navigation={navigation} header="Visa Service" />

      <ImageBackground
        source={require("../../../../Assets/bg_all.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            backgroundColor: "rgba(52, 52, 52, 0.3)",
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <View>
            <Text
              style={{
                color: "#FFF",
                fontSize: 14,
                marginLeft: 5,
                fontWeight: "bold"
              }}
            >
              Applicant details
            </Text>
          </View>
          <Right />
        </View>
        <Content style={{ padding: 10, marginBottom: 30 }}>
          <Modal isVisible={values.ShowTerms}>
            <TermsandConditon setShowTerms={this.setShowTerms} />
          </Modal>
          <ScrollView>
            <Form>
              <Item style={styles.itemTransparent}>
                <Input
                  style={{ color: "#5B5656" }}
                  placeholderTextColor={"#5B5656"}
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
              <Item style={styles.itemTransparent}>
                <Input
                  style={{ color: "#5B5656" }}
                  placeholderTextColor={"#5B5656"}
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
              <Item style={styles.itemTransparent}>
                <PhoneInput
                  ref={ref => {
                    this.phone = ref;
                  }}
                  textComponent={Input}
                  onPressFlag={this.onPressFlag}
                  style={{ paddingLeft: 5, padding: 15, color: "#5B5656" }}
                  placeholder="Mobile *"
                  name="PersonalPhone"
                  label="Mobile *"
                  keyboardType="numeric"
                  onChangePhoneNumber={value =>
                    setFieldValue("PersonalPhone", value)
                  }
                  value={values.PersonalPhone}
                  error={touched.PersonalPhone && errors.PersonalPhone}
                  underlineColor={Color.secondary}
                />
              </Item>
              <Item style={{ borderBottomWidth: 0 }}>
                {values.errorPhone != "" && (
                  <Text style={{ color: "red" }}>{values.errorPhone}</Text>
                )}
              </Item>
              <Item style={styles.itemTransparent}>
                <Input
                  style={{ color: "#5B5656" }}
                  placeholderTextColor={"#5B5656"}
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
              <Item style={styles.itemTransparent}>
                <Input
                  style={{ color: "#5B5656" }}
                  placeholderTextColor={"#5B5656"}
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
              <Item style={styles.itemTransparent}>
                <Input
                  style={{ color: "#5B5656" }}
                  placeholderTextColor={"#5B5656"}
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
              <Item style={styles.itemTransparent}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={styles.pickerStyle}
                  placeholder="State *"
                  placeholderStyle={{ color: "#5B5656" }}
                  placeholderIconColor="#5B5656"
                  selectedValue={values.SelectedState}
                  onValueChange={value => setFieldValue("SelectedState", value)}
                >
                  <Picker.Item value="0" label="State *" key="0" />
                  <Picker.Item value="Ajman" label="Ajman" key="1" />
                  <Picker.Item value="Abu Dhabi" label="Abu Dhabi" key="2" />
                  <Picker.Item
                    value="Al Fujairah"
                    label="Al Fujairah"
                    key="3"
                  />
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

              <Item style={styles.itemTransparent}>
                <Input
                  style={{ color: "#5B5656" }}
                  placeholderTextColor={"#5B5656"}
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
              <Item style={styles.itemTransparent}>
                <Input
                  style={{ color: "#5B5656" }}
                  placeholderTextColor={"#5B5656"}
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
                  <Text
                    style={{ color: "red" }}
                    visible={errors.AddressCountry}
                  >
                    {errors.AddressCountry}
                  </Text>
                )}
              </Item>
              <Item style={styles.itemTransparent}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={styles.pickerStyle}
                  placeholder="Nationality *"
                  placeholderStyle={{ color: "#5B5656" }}
                  placeholderIconColor="#5B5656"
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
              <View
                style={[
                  styles.itemTransparent,
                  { padding: 10, borderRadius: 10 }
                ]}
              >
                <Item style={styles.marginTop}>
                  <Input
                    style={{ color: "#5B5656" }}
                    placeholderTextColor={"#5B5656"}
                    onTouchStart={ShowDateTimePicker}
                    placeholder="Passport Expiry Date *"
                    underline
                    name="PassportExpiryDate"
                    label="Passport Expiry Date *"
                    onChangeText={value =>
                      setFieldValue("PassportExiryDate", value)
                    }
                    value={values.PassportExiryDate}
                    error={
                      touched.PassportExiryDate && errors.PassportExiryDate
                    }
                    underlineColor={Color.secondary}
                    editable={Platform.OS === "ios" ? false : true}
                  />
                </Item>
                <View style={{ marginBottom: 10, marginTop: 10, padding: 10 }}>
                  <Text style={{ fontSize: 13 }}>
                    Note: Passport Validity should be more than 6 months while
                    applying for any Visa
                  </Text>
                </View>
              </View>

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

              <View
                style={[
                  styles.itemTransparent,
                  { padding: 10, borderRadius: 10 }
                ]}
              >
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
                      <Text style={{ color: "#5B5656" }}>
                        I have read and agree to the{" "}
                      </Text>

                      <TouchableOpacity onPress={() => this.setShowTerms(true)}>
                        <Text
                          style={{
                            color: "#5B5656",
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
                          color: "#5B5656",
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
                  style={{
                    backgroundColor: "#183E61",
                    marginBottom: 50,
                    marginTop: 5
                  }}
                  full
                  rounded
                  onPress={checkPhoneValid}
                >
                  <Text> Pay Now </Text>
                </Button>
              ) : (
                <Button
                  style={{
                    backgroundColor: "#818182",
                    marginBottom: 50,
                    marginTop: 5
                  }}
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
      </ImageBackground>
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
    PersonalPhone: profile.data.contactdetail.Phone
      ? profile.data.contactdetail.Phone
      : "+971",
    Address1: profile.data.contactdetail.Addressline1,
    OfficePhone: profile.data.officedetail.CompanyPhone,
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
    cca2: "AE",
    callingCode: "971",
    errorPhone: "",
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
    const Address = `${values.Address1},${values.Street} ${values.City}, ${values.SelectedState} ${values.AddressCountry} - ${values.Zip}`;

    data.CustomerName = values.CustomerName;
    data.Email = values.Email;
    data.PersonalPhone = values.PersonalPhone;
    data.OfficePhone = values.OfficePhone;
    data.Address = Address;
    data.Street = values.Street;
    data.City = values.City;
    data.Zip = values.Zip;
    data.AddressCountry = values.AddressCountry;
    data.AddressState = values.SelectedState;
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
