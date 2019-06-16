import React, { Component } from "react";
import MyHeader from "../../../Header";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity
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
  Textarea,
  Header,
  Left,
  Right,
  Body
} from "native-base";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../constants";
var ImagePicker = require("react-native-image-picker");

import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";

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
  navigation
}) => {
  openlaunchCamera = () => {
    console.log(ImagePicker);
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

        const file = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        };
        // values.Files.push(file);
        setFieldValue("Files", file);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        console.log(source);
      }
    });
  };

  openFile = () => {

    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.images()]
      },
      (error, res) => {
        // Android
        console.log(
          res.uri,
          res.type, // mime type
          res.fileName,
          res.fileSize
        );
        
        const file = {
          uri: res.uri,
          type: res.type,
          name: res.fileName
        };

        setFieldValue("Files", file);
      }
    );
  };


  openImagePicker = () => {
    console.log(ImagePicker);
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
            LANGUAGE TRANSLATION
          </Text>
        </View>
        <Right>
        </Right>
      </View>
      <Content style={{ padding: 10 }}>
      
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
                placeholder="Land Line"
                name="Office"
                label="Land Line"
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
                placeholder="Address Line 1"
                underline
                name="Address"
                label="Address Line 1"
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
              {errors.Address && (
                <Text style={{ color: "red" }} visible={errors.Street}>
                  {errors.Street}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
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
                style={{ width: undefined }}
                placeholder="Document Type *"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={values.SelectedDocumentTypeId}
                onValueChange={value =>
                  setFieldValue("SelectedDocumentTypeId", value)
                }
              >
                <Picker.Item key="0" label="Select type *" value="0" />
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
                style={{ width: undefined }}
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
                <Picker.Item key="0" label="Select language *" value="0" />
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
                style={{ width: undefined }}
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
            <Item style={{ borderBottomWidth: 0 }}>
              <Text>Upload File </Text>
            </Item>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "#B2BABB",
                  padding: 10
                }}
              >
                {values.Files ? values.Files.name : "Select File"}
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
                  onPress={() => this.openlaunchCamera()}
                >
                  <Icon name="camera" />
                  <Text>Camera</Text>
                </Button>
                <Button
                  transparent
                  dark
                  style={{
                    borderLeftWidth: 1,
                    borderLeftColor: "#CACFD2",
                    alignItems: "center"
                  }}
                  onPress={() => this.openFile()}
                >
                  <Icon name="albums" />
                  <Text>Album</Text>
                </Button>
              </View>
            </View>

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
                {translationrate.data
                  ? values.LegalStamp == true
                    ? translationrate.data.Rate + 24
                    : translationrate.data.Rate
                  : 0}{" "}
                AED
              </Text>
            </View>
            <Button
              style={{ backgroundColor: "#183E61", marginBottom: 50 }}
              full
              rounded
              onPress={handleSubmit}
            >
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
    Files: null,
    doclangTransCreate,
    ShowInfo: false
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
    var Rate = translationrate.data
      ? values.LegalStamp == true
        ? translationrate.data.Rate + 28
        : translationrate.data.Rate
      : 0;
    setRequestedValue(Rate);
    const address = `${values.Address1},${values.Street} ${values.City}, ${
      values.SelectedState
    } ${values.AddressCountry} ZIP- ${values.Zip}`;

    let data = new FormData();
    data.append("CustomerName", values.CustomerName);
    data.append("Email", values.Email);
    data.append("PersonalPhone", values.PersonalPhone);
    data.append("OfficePhone", values.OfficePhone);
    data.append("Address", address);
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
    data.append("Files", values.Files);
    data.append("Rate", Rate);
    data.append("ServiceId", 1);
    data.append("ServiceName", "TRANSLATION");

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
  }
});
