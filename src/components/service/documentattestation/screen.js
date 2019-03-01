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
import { Color } from "../../../constants";

const styles = {
  item_margin: {
    marginTop: 5
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
  documenttypes,
  attestationrate,
  token,
  attestationPrice,
  navigation
}) => {
  const renderDocumentCountries = () =>
    countries.data.map(country => (
      <Picker.Item
        key={country.CountryID}
        label={country.CountryName}
        value={country.CountryID}
      />
    ));

  const renderDocumentCertTypes = () =>
    documenttypes.data.map(doc => (
      <Picker.Item
        key={doc.DocumentTypeId}
        label={doc.DocumentTypeName}
        value={doc.DocumentTypeId}
      />
    ));
  componentDidUpdate = () => {
    console.log(attestationPrice);
  };
  const attestationRateByCountryandDCType = (CountryId, CertificateType) => {
    attestationPrice({
      CountryId: CountryId,
      CertificateType: CertificateType,
      token: token.token
    });
  };

  navigateToScreen = route => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    navigation.dispatch(navigateAction);
  };

  return (
    <Container>
      <Header style={{ backgroundColor: "#003366" }}>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>My Services</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="notifications" />
          </Button>
          <Button transparent onPress={() => this.navigateToScreen("Profile")}>
            <Icon name="contact" />
          </Button>
        </Right>
      </Header>
      <Header style={{ backgroundColor: "#F7F9F9", height: 50 }}>
        <Body>
          <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5 }}>
            DOCUMENT ATTESTATION
          </Text>
        </Body>
        <Right>
          <View style={{ flexDirection: "row" }}>
            <Icon name="alert" style={{ fontSize: 20, color: "#F39C12" }} />
            <Text> Info</Text>
          </View>
        </Right>
      </Header>
      <Content style={{ padding: 10 }}>
        <ScrollView>
          <Form>
            <Item>
              <Input
                placeholder="Name"
                name="CustomerName"
                label="Name"
                onChangeText={value => setFieldValue("CustomerName", value)}
                value={values.CustomerName}
                error={touched.CustomerName && errors.CustomerName}
                underlineColor={Color.secondary}
              />
              {errors.CustomerName && (
                <Text visible={errors.CustomerName}>{errors.CustomerName}</Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Input
                placeholder="Email"
                name="Email"
                label="Email"
                onChangeText={value => setFieldValue("Email", value)}
                value={values.Email}
                error={touched.Email && errors.Email}
                underlineColor={Color.secondary}
              />
              {errors.Email && (
                <Text visible={errors.Email}>{errors.Email}</Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Input
                placeholder="Mobile"
                name="PersonalPhone"
                label="Mobile"
                onChangeText={value => setFieldValue("PersonalPhone", value)}
                value={values.PersonalPhone}
                error={touched.PersonalPhone && errors.PersonalPhone}
                underlineColor={Color.secondary}
              />
              {errors.PersonalPhone && (
                <Text visible={errors.PersonalPhone}>
                  {errors.PersonalPhone}
                </Text>
              )}
              <Input
                placeholder="Office"
                name="Office"
                label="Office"
                onChangeText={value => setFieldValue("OfficePhone", value)}
                value={values.OfficePhone}
                error={touched.OfficePhone && errors.OfficePhone}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={styles.item_margin}>
              <Textarea
                rowSpan={5}
                placeholder="Address"
                underline
                name="Address"
                label="Address"
                onChangeText={value => setFieldValue("Address", value)}
                value={values.Address}
                error={touched.Address && errors.Address}
                underlineColor={Color.secondary}
              />
            </Item>
            <Item style={styles.item_margin}>
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
                {renderDocumentCountries()}
              </Picker>
              {errors.SelectedCountryId && (
                <Text visible={errors.SelectedCountryId}>
                  {errors.SelectedCountryId}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Certificate Type"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={values.SelectedCertificateType}
                onValueChange={value => {
                  setFieldValue("SelectedCertificateType", value);
                  attestationRateByCountryandDCType(
                    values.SelectedCountryId,
                    value
                  );
                }}
              >
                {renderDocumentCertTypes()}
              </Picker>
              {errors.SelectedCertificateType && (
                <Text visible={errors.SelectedCertificateType}>
                  {errors.SelectedCertificateType}
                </Text>
              )}
            </Item>
            <ListItem
              style={[styles.item_margin, { borderBottomWidth: 0 }]}
              onPress={() => {
                if (attestationrate.data) {
                  setFieldValue("Rate", attestationrate.data.Rate);
                }
                setFieldValue("PickUpandDropOption", "Direct Delivery");
              }}
            >
              <Radio
                selected={values.PickUpandDropOption == "Direct Delivery"}
              />
              <Body>
                <Text>Direct Delivery</Text>
              </Body>
              <Radio
                selected={values.PickUpandDropOption == "Through Courier"}
              />
              <Body>
                <Text>Through Courier</Text>
              </Body>
            </ListItem>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                  padding: 10,
                  fontWeight: "bold"
                }}
              >
                Rate :{" "}
                {attestationrate.data
                  ? values.PickUpandDropOption == "Through Courier"
                    ? attestationrate.data.Rate + 28
                    : attestationrate.data.Rate
                  : 0}{" "}
                AED
              </Text>
            </View>
            <Button full rounded onPress={() => handleSubmit(attestationrate)}>
              <Text> Pay Now </Text>
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
    token,
    docAttestationCreate
  }) => ({
    CustomerName: "",
    Email: "",
    PersonalPhone: "",
    OfficePhone: "",
    Address: "",
    SelectedCountryId: "",
    SelectedCertificateType: "",
    PickUpandDropOption: "Through Courier",
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
    SelectedCertificateType: Yup.string().required("Required")
  }),

  handleSubmit: (values, { props }) => {
    const { attestationrate } = props;
    const token = props.token.token;
    var Rate = attestationrate.data
      ? values.PickUpandDropOption == "Through Courier"
        ? attestationrate.data.Rate + 28
        : attestationrate.data.Rate
      : 0;
    return values.docAttestationCreate({ ...values, Rate, token });
  }
})(DocumentAttestation);
