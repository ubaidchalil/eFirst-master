import React, { Component } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
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
import Modal from "react-native-modal";
import MyHeader from "../../../../Header";
import visa_options from "./data";

const styles = {
  item_margin: {
    marginTop: 5
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 13,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
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
  navigation,
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

  _renderModalContent = state => (
    <View style={styles.modalContent}>
      <Item style={{ flexDirection: "row", padding: 7 }}>
        <View
          style={{
            flexDirection: "row",
            fontSize: 17,
            padding: 10,
            paddingHorizontal: 15,
            flex: 0.9,
            fontWeight: "bold"
          }}
        >
          <Icon style={{ color: "#F1C40F" }} name="alert" />
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Info</Text>
        </View>
        <TouchableOpacity
          style={{ flex: 0.1 }}
          onPress={() => {
            setFieldValue("ShowInfo", false);
          }}
        >
          <Icon name="close" />
        </TouchableOpacity>
      </Item>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 13, lineHeight: 20, paddingHorizontal: 10 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </Text>
        <Text
          style={{ paddingTop: 5, fontSize: 13, lineHeight: 20, padding: 10 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </Text>
        <Text
          style={{
            paddingTop: 5,
            fontSize: 13,
            fontWeight: "bold",
            paddingHorizontal: 10
          }}
        >
          AED : 75/PAGE
        </Text>
        <Text
          style={{
            paddingTop: 5,
            fontSize: 13,
            fontWeight: "bold",
            paddingHorizontal: 10,
            paddingBottom: 10
          }}
        >
          SERVICE CHARGE: AED 105 (VAT INCLUDED)
        </Text>
      </View>
    </View>
  );

  return (
    <Container>
      <MyHeader navigation={navigation} header="My Services" />

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
            DOCUMENT ATTESTATION
          </Text>
        </View>
        <Right>
          <TouchableOpacity
            onPress={() => {
              setFieldValue("ShowInfo", true);
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="alert" style={{ fontSize: 20, color: "#F39C12" }} />
              <Text> Info</Text>
            </View>
          </TouchableOpacity>
        </Right>
      </View>
      <Content style={{ padding: 10 }}>
        <Modal isVisible={values.ShowInfo}>{this._renderModalContent()}</Modal>
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
                onChangeText={value => setFieldValue("PersonalPhone", value)}
                value={values.PersonalPhone}
                error={touched.PersonalPhone && errors.PersonalPhone}
                underlineColor={Color.secondary}
              />
              <Input
                placeholder="Land Phone"
                name="Office"
                label="Land Phone"
                onChangeText={value => setFieldValue("OfficePhone", value)}
                value={values.OfficePhone}
                error={touched.OfficePhone && errors.OfficePhone}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.PersonalPhone && (
                <Text style={{ color: "red" }} visible={errors.PersonalPhone}>
                  {errors.PersonalPhone}
                </Text>
              )}
              {errors.OfficePhone && (
                <Text style={{ color: "red" }} visible={errors.OfficePhone}>
                  {errors.OfficePhone}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Textarea
                rowSpan={5}
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
              <Textarea
                rowSpan={5}
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
            <Item picker style={styles.item_margin}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
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
                value={values.POBox}
                error={touched.POBox && errors.POBox}
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
            <Item picker style={styles.item_margin}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Country"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={values.SelectedCountryId}
                onValueChange={value => {
                  setFieldValue("SelectedCountryId", value);
                  attestationRateByCountryandDCType(
                    value,
                    values.SelectedCertificateType
                  );
                }}
              >
                <Picker.Item key="0" label="Select Country" value="0" />
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
            <Button
              style={{ backgroundColor: "#183E61", marginBottom: 50 }}
              full
              rounded
              onPress={handleSubmit}
            >
              <Text> Next </Text>
            </Button>
          </Form>
        </ScrollView>
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
    OfficePhone: profile.data.officedetail.FirstName,
    Address1: profile.data.contactdetail.Addressline1,
    Zip: "",
    AddressCountry: "United Arab Emirates",
    Street: "",
    City: "",
    SelectedState: "",
    SelectedCountryId: "",
    SelectedCertificateType: "",
    PickUpandDropOption: "Direct Delivery",
    ShowInfo: false,
    docAttestationCreate
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    CustomerName: Yup.string()
      .min(3, "Must be longer than 3 characters")
      .required("Required"),
    Email: Yup.string()
      .min(4, "Must be longer than 4 characters")
      .email("Email not valid")
      .required("Required"),
    PersonalPhone: Yup.string().required("Required"),
    SelectedCountryId: Yup.string().required("Required"),
    AddressCountry: Yup.string().required("Required"),
    Street: Yup.string().required("Required"),
    City: Yup.string().required("Required"),
    SelectedState: Yup.string().required("Required")
  }),

  handleSubmit: (values, { props }) => {
    const { navigation } = props;
    const token = props.token.token;
    const data = {
      CustomerName: values.CustomerName,
      Email: values.Email,
      PersonalPhone: values.PersonalPhone,
      OfficePhone: values.OfficePhone,
      Address: values.Address1,
      Street: values.Street,
      City: values.City,
      Zip: values.Zip,
      AddressCountry: values.AddressCountry,
      AddressState: values.SelectedState
    }
    console.log("JSON","result = > "+ JSON.stringify(data));
    navigation.navigate("VisaServceType", { options: visa_options,data : data, pageData : [] }) 
  }
})(DocumentAttestation);
