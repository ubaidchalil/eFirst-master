import React, { Component } from "react";
import MyHeader from "../../../Header";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions
} from "react-native";

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
  Radio,
  Header,
  Left,
  Right,
  Body,
  state
} from "native-base";
import Modal from "react-native-modal";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../constants";
import TermsandConditon from "../../termsandcondition";
import { validateFileTypeAndSizeForTranslation } from "../../../constants";
var ImagePicker = require("react-native-image-picker");
import DocumentPicker from "react-native-document-picker";

const deviceWidth = Dimensions.get("window").width;

const LanguageTranslation = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  translationPrice,
  documentlanguage,
  translationrate,
  documenttypes,
  token,
  state,
  navigation,
  showToast,
  setShowTerms
}) => {
  openlaunchCamera = i => {
    const options = {
      title: "Select Avatar",
      storageOptions: {
        cameraRoll: true,
        waitUntilSaved: true
      }
    };

    ImagePicker.launchCamera(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        let imgName = response.fileName;
        if (Platform.OS === "ios") {
          // on iOS, using camera returns undefined fileName. This fixes that issue, so API can work.
          var getFilename = response.uri.split("/");
          imgName = getFilename[getFilename.length - 1];
        }
        const file = {
          uri: response.uri,
          type: response.type,
          name: imgName
        };

        var files = values.Files;
        if (i == 0) files.push(file);
        else files[i] = file;
        setFieldValue("Files", files);
      }
    });
  };

  const openFile = async i => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images]
    });

    if (res) {
      const valdateRes = validateFileTypeAndSizeForTranslation(res);
      if (valdateRes.validateSize && valdateRes.validateType) {
        const file = {
          uri: res.uri,
          type: res.type,
          name: res.name
        };
        var files = values.Files;
        if (i == 0) files.push(file);
        else files[i] = file;
        setFieldValue("Files", files);
      } else {
        showToast("- Invalid file type.\n- File must be smaller than 5 MB");
      }
    }
  };

  renderDocs = i => {
    return values.Files.map(doc => {
      return (
        <View style={{ marginTop: 10 }}>
          <Item style={{ borderBottomWidth: 0, borderTopWidth: 1 }} />
          <View>
            <Text
              style={{
                textAlign: "center",
                color: "#B2BABB",
                padding: 10
              }}
            >
              {doc.name || "Select File"}
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 7 }}>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#CACFD2",
                borderRadius: 10
              }}
            >
              <Button
                transparent
                dark
                style={{ alignItems: "center" }}
                onPress={() => this.openlaunchCamera(i)}
              >
                <Icon style={styles.uploadBtnIcon} name="camera" />
                <Text style={styles.uploadBtnIcon}>Camera</Text>
              </Button>
              <Button
                transparent
                style={{
                  borderLeftWidth: 1,
                  borderLeftColor: "#CACFD2",
                  alignItems: "center"
                }}
                onPress={() => openFile(i)}
              >
                <Icon style={styles.uploadBtnIcon} name="albums" />
                <Text style={styles.uploadBtnIcon}>Album</Text>
              </Button>
            </View>
          </View>
        </View>
      );
    });
  };

  openImagePicker = () => {
    const options = {
      title: "Select Avatar",
      storageOptions: {
        cameraRoll: true,
        waitUntilSaved: true
      }
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        const file = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        };
        setFieldValue("Files", file);
        console.log(file);
      }
    });
  };

  const renderTranslationLanguage = () =>
    documentlanguage.data.map(language => (
      <Picker.Item
        key={language.LanguageID}
        label={language.LanguageName}
        value={language.LanguageID}
      />
    ));

  const languageTranslationRateByLanguages = (toLanguage, fromLanguage) => {
    if (toLanguage && fromLanguage) {
      translationPrice({
        toLanguage,
        fromLanguage,
        token: token.token
      });
    }
  };

  const renderDocumentTypes = () =>
    documenttypes.data.map(doc => (
      <Picker.Item
        key={doc.DocumentTypeId}
        label={doc.DocumentTypeName}
        value={doc.DocumentTypeId}
      />
    ));

  return (
    <Container>
      <MyHeader navigation={navigation} header="Translation Service" />
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
            TRANSLATION SERVICE
          </Text>
        </View>
        <Right />
      </View>
      <Content style={{ padding: 10 }}>
        <Modal isVisible={state.ShowTerms}>
          <TermsandConditon setShowTerms={setShowTerms} />
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
                placeholder="Address Line 1*"
                underline
                name="Address"
                label="Address Line 1*"
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
                placeholder="Document Type *"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={values.SelectedDocumentTypeId}
                onValueChange={value =>
                  setFieldValue("SelectedDocumentTypeId", value)
                }
              >
                <Picker.Item key="0" label="Document Type *" value="" />
                {renderDocumentTypes()}
              </Picker>
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.SelectedDocumentTypeId && (
                <Text
                  style={{ color: "red" }}
                  visible={errors.SelectedDocumentTypeId}
                >
                  {errors.SelectedDocumentTypeId}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.pickerStyle}
                placeholder="Document Language *"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={values.SelectedFromDocumentLanguageId}
                onValueChange={value => {
                  setFieldValue("SelectedFromDocumentLanguageId", value);
                  languageTranslationRateByLanguages(
                    value,
                    values.SelectedToDocumentLanguageId
                  );
                }}
              >
                <Picker.Item key="0" label="Document Language *" value="" />
                {renderTranslationLanguage()}
              </Picker>
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.SelectedFromDocumentLanguageId && (
                <Text
                  style={{ color: "red" }}
                  visible={errors.SelectedFromDocumentLanguageId}
                >
                  {errors.SelectedFromDocumentLanguageId}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.pickerStyle}
                placeholder="Document to be Translated *"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={values.SelectedToDocumentLanguageId}
                onValueChange={value => {
                  setFieldValue("SelectedToDocumentLanguageId", value);
                  languageTranslationRateByLanguages(
                    values.SelectedFromDocumentLanguageId,
                    value
                  );
                }}
              >
                <Picker.Item
                  key="0"
                  label="Document to be Translated *"
                  value=""
                />
                {renderTranslationLanguage()}
              </Picker>
            </Item>
            <Item style={{ borderBottomWidth: 0 }}>
              {errors.SelectedFromDocumentLanguageId && (
                <Text
                  style={{ color: "red" }}
                  visible={errors.SelectedFromDocumentLanguageId}
                >
                  {errors.SelectedFromDocumentLanguageId}
                </Text>
              )}
            </Item>
            <ListItem style={[styles.item_margin, { borderBottomWidth: 0 }]}>
              <CheckBox
                checked={values.LegalStamp}
                onPress={() => {
                  if (values.LegalStamp) {
                    setFieldValue("LegalStamp", false);
                  } else {
                    setFieldValue("LegalStamp", true);
                  }
                }}
              />
              <Body>
                <Text>Legal Stamp</Text>
              </Body>
            </ListItem>
            {values.LegalStamp && (
              <ListItem style={[styles.item_margin, { borderBottomWidth: 0 }]}>
                <Radio
                  selected={values.PickUpandDropOption == "Direct Delivery"}
                  onPress={() => {
                    if (translationrate.data) {
                      setFieldValue("Rate", translationrate.data.Rate);
                    }
                    setFieldValue("PickUpandDropOption", "Direct Delivery");
                  }}
                />
                <Body>
                  <TouchableOpacity
                    onPress={() => {
                      if (translationrate.data) {
                        setFieldValue("Rate", translationrate.data.Rate);
                      }
                      setFieldValue("PickUpandDropOption", "Direct Delivery");
                    }}
                  >
                    <Text>Direct Delivery</Text>
                  </TouchableOpacity>
                </Body>
                <Radio
                  selected={values.PickUpandDropOption == "Through Courier"}
                  onPress={() => {
                    if (translationrate.data) {
                      setFieldValue("Rate", translationrate.data.Rate);
                    }
                    setFieldValue("PickUpandDropOption", "Through Courier");
                  }}
                />
                <Body>
                  <TouchableOpacity
                    onPress={() => {
                      if (translationrate.data) {
                        setFieldValue("Rate", translationrate.data.Rate);
                      }
                      setFieldValue("PickUpandDropOption", "Through Courier");
                    }}
                  >
                    <Text>Through Courier</Text>
                  </TouchableOpacity>
                </Body>
              </ListItem>
            )}
            <Item style={{ borderBottomWidth: 0 }}>
              <Text>Upload File </Text>
            </Item>
            {this.renderDocs()}
            <View style={{ marginTop: 10 }}>
              <Item style={{ borderBottomWidth: 0, borderTopWidth: 1 }} />
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#B2BABB",
                    padding: 10
                  }}
                >
                  Select File
                </Text>
              </View>
              <View style={{ alignItems: "center", marginTop: 7 }}>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: "#CACFD2",
                    borderRadius: 10
                  }}
                >
                  <Button
                    transparent
                    dark
                    style={{ alignItems: "center" }}
                    onPress={() => this.openlaunchCamera(0)}
                  >
                    <Icon style={styles.uploadBtnIcon} name="camera" />
                    <Text style={styles.uploadBtnText}>Camera</Text>
                  </Button>
                  <Button
                    transparent
                    dark
                    style={{
                      borderLeftWidth: 1,
                      borderLeftColor: "#CACFD2",
                      alignItems: "center"
                    }}
                    onPress={() => openFile(0)}
                  >
                    <Icon style={styles.uploadBtnIcon} name="albums" />
                    <Text style={styles.uploadBtnText}>Album</Text>
                  </Button>
                </View>
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: "row"
              }}
            >
              <Text style={{ fontWeight: "500", fontSize: 12 }}>
                File format:
              </Text>
              <Text style={{ fontSize: 12 }}> .jpeg, .jpg, .png</Text>
            </View>
            <View
              style={{
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: "row"
              }}
            >
              <Text style={{ fontWeight: "500", fontSize: 12 }}>
                File size:
              </Text>
              <Text style={{ fontSize: 12 }}> 5MB</Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ marginTop: 8, fontWeight: "bold", fontSize: 18 }}>
                Your Bill Amount
              </Text>
              <Text style={{ marginTop: 8 }}>
                Translation Charge:{" "}
                {translationrate.data
                  ? translationrate.data.Rate * values.Files.length
                  : 0}{" "}
                AED
              </Text>
              <Text style={{ marginTop: 8 }}>
                Service Charge:{" "}
                {translationrate.data ? translationrate.data.ServiceCharge : 0}{" "}
                AED
              </Text>
              {translationrate.data && values.LegalStamp == true && (
                <Text style={{ marginTop: 8 }}>
                  Legal Stamp Charge: {translationrate.data.LeagualStampRate}{" "}
                  AED
                </Text>
              )}
              {translationrate.data &&
                values.LegalStamp == true &&
                values.PickUpandDropOption == "Through Courier" && (
                  <Text style={{ marginTop: 8 }}>
                    Courier Charge : {translationrate.data.CourierCharge} AED
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
                {translationrate.data
                  ? values.LegalStamp == true
                    ? values.PickUpandDropOption == "Through Courier"
                      ? translationrate.data.Rate * values.Files.length +
                        translationrate.data.LeagualStampRate +
                        translationrate.data.CourierCharge +
                        translationrate.data.ServiceCharge
                      : translationrate.data.Rate * values.Files.length +
                        translationrate.data.LeagualStampRate +
                        translationrate.data.ServiceCharge
                    : translationrate.data.Rate * values.Files.length
                  : 0}{" "}
                AED
              </Text>
            </View>
            <View>
              <ListItem style={{ borderBottomWidth: 0 }}>
                <CheckBox
                  checked={values.AgreeTerms}
                  onPress={() => {
                    setFieldValue("AgreeTerms", !values.AgreeTerms);
                  }}
                />
                <Body>
                  <View style={{ flexDirection: "row" }}>
                    <Text> I have read and agree to the </Text>

                    <TouchableOpacity onPress={() => setShowTerms(true)}>
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
                  <TouchableOpacity onPress={() => setShowTerms(true)}>
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
      </Content>
    </Container>
  );
};

export default withFormik({
  mapPropsToValues: ({
    translationPrice,
    documentlanguage,
    translationrate,
    profile,
    documenttypes,
    token,
    doclangTransCreate
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
    SelectedDocumentTypeId: "",
    SelectedFromDocumentLanguageId: "",
    SelectedToDocumentLanguageId: "",
    LegalStamp: false,
    PickUpandDropOption: "Direct Delivery",
    Files: [],
    AgreeTerms: false,
    doclangTransCreate,
    ShowTerms: false
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
    SelectedDocumentTypeId: Yup.string().required("Required"),
    SelectedFromDocumentLanguageId: Yup.string().required("Required"),
    SelectedToDocumentLanguageId: Yup.string().required("Required"),
    AddressCountry: Yup.string().required("Required"),
    Street: Yup.string().required("Required"),
    City: Yup.string().required("Required"),
    SelectedState: Yup.string().required("Required")
  }),

  handleSubmit: (values, { props }) => {
    const { translationrate, setRequestedValue } = props;
    const token = props.token.token;
    const docRate = translationrate.data ? translationrate.data.Rate : 0;
    const courierCharge = translationrate.data
      ? translationrate.data.CourierCharge
      : 0;
    const leagualStampRate = translationrate.data
      ? translationrate.data.LeagualStampRate
      : 0;
    const serviceCharge = translationrate.data
      ? translationrate.data.ServiceCharge
      : 0;
    const totalDocRate = docRate * values.Files.length;
    var Rate =
      values.LegalStamp == true
        ? values.PickUpandDropOption == "Through Courier"
          ? totalDocRate + leagualStampRate + courierCharge + serviceCharge
          : totalDocRate + leagualStampRate + serviceCharge
        : totalDocRate;
    setRequestedValue(Rate);
    // const address = `${values.Address1},${values.Street} ${values.City}, ${
    //   values.SelectedState
    // } ${values.AddressCountry} ZIP- ${values.Zip}`;

    let data = new FormData();
    data.append("CustomerName", values.CustomerName);
    data.append("Email", values.Email);
    data.append("PersonalPhone", values.PersonalPhone);
    data.append("OfficePhone", values.OfficePhone);
    // data.append("Address", address);
    data.append("SelectedDocumentTypeId", values.SelectedDocumentTypeId);
    data.append(
      "SelectedFromDocumentLanguageId",
      values.SelectedFromDocumentLanguageId
    );
    data.append(
      "SelectedToDocumentLanguageId",
      values.SelectedToDocumentLanguageId
    );
    data.append("LegalStamp", values.LegalStamp);
    values.Files.map((item, index) => data.append("Files[]", item, item.name));
    data.append("Rate", Rate);
    data.append("ServiceId", 7);
    data.append("ServiceName", "TRANSLATION SERVICE");
    data.append("PickUpandDropOption", values.PickUpandDropOption);
    data.append("DocumentCount", values.Files.length);
    data.append("AddressLine1", values.Address1);
    data.append("POBox", values.Zip);
    data.append("Country", values.AddressCountry);
    data.append("StreetAddress", values.Street);
    data.append("City", values.City);
    data.append("State", values.SelectedState);
    console.log("result =>", JSON.stringify(data));
    
    return values.doclangTransCreate({ data, token });
  }
})(LanguageTranslation);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
    marginTop: 10
  },
  title: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ABB2B9",
    backgroundColor: "#003366",
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13
  },
  title_text: {
    textAlign: "center",
    padding: 15,
    color: "white"
  },
  body: {
    backgroundColor: "#003366",
    padding: 15
  },
  body_text: {
    textAlign: "center",
    fontSize: 17,
    color: "white"
  },
  footer: {
    alignItems: "center",
    backgroundColor: "#DC1F1F",
    padding: 13,
    borderBottomRightRadius: 13,
    borderBottomLeftRadius: 13
  },
  footer_text: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  },
  item_margin: {
    marginTop: 5
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 13,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  uploadBtnIcon : {
    color: "black"
  },
  uploadBtnText : {
    color: "black"
  },
  pickerStyle:
    Platform.OS === "ios"
      ? {
          width: deviceWidth - 30,
          marginLeft: -10
        }
      : { width: undefined }
});

