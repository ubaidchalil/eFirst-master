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
  ListItem,
  Button,
  Textarea,
  CheckBox,
  Header,
  Left,
  Right,
  Body,
  Title
} from "native-base";
import { NavigationActions } from "react-navigation";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../constants";
import MyHeader from "../../../Header";
import Modal from "react-native-modal";
import TermsandConditon from "../../termsandcondition";
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';

const deviceWidth = Dimensions.get("window").width;

const DARK_COLOR = "#18171C";
const PLACEHOLDER_COLOR = "rgba(255,255,255,0.2)";
const LIGHT_COLOR = "#FFF";

const styles = {
  item_margin: {
    marginTop: 5
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 13,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  itemTransparent : {
    marginTop: 5,
    borderBottomWidth: 0,
    backgroundColor: "rgba(250, 250, 250, 0.13)",
    paddingHorizontal: 10
  },
  pickerStyle:
    Platform.OS === "ios"
      ? {
          width: deviceWidth - 30,
          marginLeft: -10
        }
      : { width: undefined }
};

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
  navigation,
  setShowTerms,
  state
}) => {
  const renderDocumentCountries = () =>
    countries.data.map(country => (
      <Picker.Item
        key={country.CountryID}
        label={country.CountryName}
        value={country.CountryID}
      />
    ));

  const renderCertificateTypes = () =>
    certificatetype.data.map(cert => (
      <Picker.Item
        key={cert.CertificateTypeID}
        label={cert.CertificateTypeName}
        value={cert.CertificateTypeID}
      />
    ));

  componentDidUpdate = () => {
    console.log(attestationPrice);
  };

  const attestationRateByCountryandDCType = (CountryId, CertificateType) => {
    console.log("CountryId", CountryId);
    console.log("CertificateType", CertificateType);
    if (CountryId && CertificateType) {
      attestationPrice({
        CountryId: CountryId,
        CertificateType: CertificateType,
        token: token.token
      });
    }
  };

  navigateToScreen = route => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    navigation.dispatch(navigateAction);
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

  setPhoneError = (msg) => {
    setFieldValue("errorPhone", msg)
  }

  return (
    <Container>
      <MyHeader navigation={navigation} header="Attestation Service" />
      <ImageBackground
        source={require("../../../Assets/bg_all.jpg")}
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
          <Text style={{ color: "#FFF", fontSize: 14, marginLeft: 5, fontWeight:"bold" }}>
            ATTESTATION SERVICE
          </Text>
        </View>
        <Right />
      </View>
      <Content style={{ padding: 10, marginBottom: 30 }}>
        <Modal isVisible={state.ShowTerms}>
          <TermsandConditon setShowTerms={setShowTerms} />
        </Modal>
        <ScrollView>
          <Form>
            <Item style={styles.itemTransparent} >
              <Input
                style={{ color: "#FFF" }}
                placeholderTextColor={"#FFF"}
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
            <Item style={styles.itemTransparent} >
              <Input
                style={{ color: "#FFF" }}
                placeholderTextColor={"#FFF"}
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
            <Item style={styles.itemTransparent} >
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
            <Item style={styles.itemTransparent} >
              <PhoneInput
                ref={(ref) => {
                  this.phone = ref;
                }}
                textStyle={{ color: "#FFF" }}
                placeholderTextColor={"#FFF"}
                textComponent={Input}
                onPressFlag={this.onPressFlag}
                style={{ paddingLeft: 5, padding: 15 }}
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
              {values.errorPhone!="" && (
                <Text style={{ color: "red" }} >
                  {values.errorPhone}
                </Text>
              )}
            </Item>
            <Item style={styles.itemTransparent} >
              <Input
                style={{ color: "#FFF" }}
                placeholderTextColor={"#FFF"}
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
            <Item style={styles.itemTransparent} >
              <Input
                style={{ color: "#FFF" }}
                placeholderTextColor={"#FFF"}
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
            <Item style={styles.itemTransparent} >
              <Input
                style={{ color: "#FFF" }}
                placeholderTextColor={"#FFF"}
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
            <Item style={styles.itemTransparent} >
              <Picker
                placeholderTextColor={"#FFF"}
                mode="dropdown"
                iosIcon={<Icon style={{color: "#FFF"}} name="arrow-down" />}
                style={[styles.pickerStyle,{color: "#FFF"}]}
                placeholder="State *"
                placeholderIconColor="#FFF"
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

            <Item style={styles.itemTransparent} >
              <Input
                style={{ color: "#FFF" }}
                placeholderTextColor={"#FFF"}
                placeholder="City *"
                name="City"
                label="City *"
                onChangeText={value => setFieldValue("City", value)}
                value={values.City}
                error={touched.City && errors.City}
                underlineColor={Color.secondary}
              />
              <Input
                style={{ color: "#FFF" }}
                placeholderTextColor={"#FFF"}
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
            <Item style={styles.itemTransparent} >
              <Input
                style={{ color: "#FFF" }}
                placeholderTextColor={"#FFF"}
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
            <Item style={styles.itemTransparent} >
              <Picker
                placeholderTextColor={"#FFF"}
                placeholderIconColor="#FFF"
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={[styles.pickerStyle,{color: "#FFF"}]}
                placeholder="Country"
                placeholderStyle={{ color: "#bfc6ea" }}
                selectedValue={values.SelectedCountryId}
                onValueChange={value => {
                  setFieldValue("SelectedCountryId", value);
                  attestationRateByCountryandDCType(
                    value,
                    values.SelectedCertificateType
                  );
                }}
              >
                <Picker.Item
                  key="0"
                  label="Certificate Issued Country *"
                  value=""
                />
                {renderDocumentCountries()}
              </Picker>
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.SelectedCountryId && (
                <Text
                  style={{ color: "red" }}
                  visible={errors.SelectedCountryId}
                >
                  {errors.SelectedCountryId}
                </Text>
              )}
            </Item>
            <Item style={styles.itemTransparent} >
              <Picker
                placeholderTextColor={"#FFF"}
                placeholderIconColor="#FFF"
                placeholderStyle={{ color: "#FFF" }}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={[styles.pickerStyle,{color: "#FFF"}]}
                placeholder="Certificate Type"
                selectedValue={values.SelectedCertificateType}
                onValueChange={value => {
                  setFieldValue("SelectedCertificateType", value);
                  attestationRateByCountryandDCType(
                    values.SelectedCountryId,
                    value
                  );
                }}
              >
                <Picker.Item key="0" label="Certificate Type *" value="" />
                {renderCertificateTypes()}
              </Picker>
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.SelectedCountryId && (
                <Text
                  style={{ color: "red" }}
                  visible={errors.SelectedCountryId}
                >
                  {errors.SelectedCountryId}
                </Text>
              )}
            </Item>
            <ListItem style={[styles.itemTransparent]}>
              <Radio
               style={{color:"#FFF"}}
                selected={values.PickUpandDropOption == "Direct Delivery"}
                onPress={() => {
                  if (attestationrate.data) {
                    setFieldValue("Rate", attestationrate.data.Rate);
                  }
                  setFieldValue("PickUpandDropOption", "Direct Delivery");
                }}
              />
              <Body>
                <TouchableOpacity
                  onPress={() => {
                    if (attestationrate.data) {
                      setFieldValue("Rate", attestationrate.data.Rate);
                    }
                    setFieldValue("PickUpandDropOption", "Direct Delivery");
                  }}
                >
                  <Text style={{color:"#FFF"}} >Direct Delivery</Text>
                </TouchableOpacity>
              </Body>
              <Radio
                selected={values.PickUpandDropOption == "Through Courier"}
                style={{color:"#FFF"}}
                onPress={() => {
                  if (attestationrate.data) {
                    setFieldValue("Rate", attestationrate.data.Rate);
                  }
                  setFieldValue("PickUpandDropOption", "Through Courier");
                }}
              />
              <Body>
                <TouchableOpacity
                  onPress={() => {
                    if (attestationrate.data) {
                      setFieldValue("Rate", attestationrate.data.Rate);
                    }
                    setFieldValue("PickUpandDropOption", "Through Courier");
                  }}
                >
                  <Text style={{color:"#FFF"}}>Through Courier</Text>
                </TouchableOpacity>
              </Body>
            </ListItem>
            <View style={[styles.itemTransparent, { padding: 10, borderRadius: 10 }]} >
              <Text style={{ color:"#FFF", marginTop: 8, fontWeight: "bold", fontSize: 18 }}>
                Your Bill Amount
              </Text>
              <Text style={{ marginTop: 8,color:"#FFF" }}>
                Attestation Charge:{" "}
                {attestationrate.data ? attestationrate.data.Rate : 0} AED
              </Text>
              <Text style={{ marginTop: 8,color:"#FFF" }}>
                Service Charge:{" "}
                {attestationrate.data ? attestationrate.data.ServiceCharge : 0}{" "}
                AED
              </Text>
              {attestationrate.data &&
                values.PickUpandDropOption == "Through Courier" && (
                  <Text style={{ marginTop: 8,color:"#FFF" }}>
                    Courier Charge:{" "}
                    {attestationrate.data
                      ? attestationrate.data.CourierCharge
                      : 0}{" "}
                    AED
                  </Text>
                )}
              <Text
                style={{
                  color: "red",
                  marginTop: 10,
                  fontWeight: "bold"
                }}
              >
                Your Total Bill Amount :{" "}
                {attestationrate.data
                  ? values.PickUpandDropOption == "Through Courier"
                    ? attestationrate.data.Rate +
                      attestationrate.data.CourierCharge +
                      attestationrate.data.ServiceCharge
                    : attestationrate.data.Rate +
                      attestationrate.data.ServiceCharge
                  : 0}{" "}
                AED
              </Text>
            </View>

            <View style={[styles.itemTransparent, { padding: 10, borderRadius: 10 }]} >
              <ListItem style={{ borderBottomWidth: 0 }}>
                <CheckBox
                  checked={values.AgreeTerms}
                  onPress={() => {
                    setFieldValue("AgreeTerms", !values.AgreeTerms);
                  }}
                />
                <Body>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{color:"#FFF"}} > I have read and agree to the </Text>

                    <TouchableOpacity onPress={() => setShowTerms(true)}>
                      <Text
                        style={{
                          textDecorationLine: "underline",
                          marginLeft: -11,
                          color:"#FFF"
                        }}
                      >
                        Terms and
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => setShowTerms(true)}>
                    <Text
                      style={{
                        color:"#FFF",
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
      </Content>
      </ ImageBackground>
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
    AgreeTerms: false,
    SelectedState: "",
    SelectedCountryId: "",
    SelectedCertificateType: "",
    PickUpandDropOption: "Through Courier",
    ShowInfo: false,
    cca2: 'AE',
    callingCode: "971",
    errorPhone : "",
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
    PersonalPhone: Yup.string()
      .nullable()
      .required("Required"),
    Address1: Yup.string()
      .nullable()
      .required("Required"),
    SelectedCountryId: Yup.string().required("Required"),
    SelectedCertificateType: Yup.string().required("Required"),
    AddressCountry: Yup.string().required("Required"),
    Street: Yup.string().required("Required"),
    City: Yup.string().required("Required"),
    SelectedState: Yup.string().required("Required")
   }),

  handleSubmit: (values, { props }) => {
    this.setPhoneError("");
    if(!this.phone.isValidNumber())
    {
      this.setPhoneError("Invalid number. Eg: +971XXXXXXXX");
      return;
    }
      
    const { attestationrate, setRequestedValue } = props;
    const token = props.token.token;
    const Address = `${values.Address1},${values.Street} ${values.City}, ${
      values.SelectedState
    } ${values.AddressCountry} - ${values.Zip}`;
    var Rate = attestationrate.data
      ? values.PickUpandDropOption == "Through Courier"
        ? attestationrate.data.Rate +
          attestationrate.data.CourierCharge +
          attestationrate.data.ServiceCharge
        : attestationrate.data.Rate + attestationrate.data.ServiceCharge
      : 0;
    const ServiceName = "ATTESTATION SERVICE";
    setRequestedValue(Rate);
    return values.docAttestationCreate({
      ...values,
      Address,
      Rate,
      ServiceName,
      token
    });
  }
})(DocumentAttestation);
