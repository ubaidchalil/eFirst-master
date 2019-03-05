import React, { Component } from "react";
import MyHeader from "../../../Header";
import { View, ScrollView, StyleSheet, Platform } from "react-native";
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

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    // ImagePicker.showImagePicker(options, response => {
    //   console.log("Response = ", response);

    //   if (response.didCancel) {
    //     console.log("User cancelled image picker");
    //   } else if (response.error) {
    //     console.log("ImagePicker Error: ", response.error);
    //   } else if (response.customButton) {
    //     console.log("User tapped custom button: ", response.customButton);
    //   } else {
    //     const source = { uri: response.uri };
    //     const file = {
    //       data: `data:${response.type};base64,${response.data}`,
    //       type: response.type,
    //       name: response.fileName
    //     };
    //     // values.Files.push(file);
    //     setFieldValue("Files", file);
    //     // You can also display the image using data:
    //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    //     console.log(source);
    //   }
    // });

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
          data: `data:${response.type};base64,${response.data}`,
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

  openImagePicker = () => {
    console.log(ImagePicker);
    const options = {
      title: "Select Avatar",
      storageOptions: {
        cameraRoll: true,
        waitUntilSaved: true
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    // ImagePicker.showImagePicker(options, response => {
    //   console.log("Response = ", response);

    //   if (response.didCancel) {
    //     console.log("User cancelled image picker");
    //   } else if (response.error) {
    //     console.log("ImagePicker Error: ", response.error);
    //   } else if (response.customButton) {
    //     console.log("User tapped custom button: ", response.customButton);
    //   } else {
    //     const source = { uri: response.uri };
    //     const file = {
    //       data: `data:${response.type};base64,${response.data}`,
    //       type: response.type,
    //       name: response.fileName
    //     };
    //     // values.Files.push(file);
    //     setFieldValue("Files", file);
    //     // You can also display the image using data:
    //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    //     console.log(source);
    //   }
    // });

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
          data: `data:${response.type};base64,${response.data}`,
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

  const renderTranslationLanguage = () =>
    documentlanguage.data.map(language => (
      <Picker.Item
        key={language.LanguageID}
        label={language.LanguageName}
        value={language.LanguageID}
      />
    ));
  const languageTranslationRateByLanguages = (toLanguage, fromLanguage) => {
    translationPrice({
      toLanguage,
      fromLanguage,
      token: token.token
    });
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
      <Header style={{ backgroundColor: "#F7F9F9", height: 50 }}>
        <Body>
          <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5 }}>
            LANGUAGE TRANSLATION
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
                placeholder="Document Type"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={values.SelectedDocumentTypeId}
                onValueChange={value =>
                  setFieldValue("SelectedDocumentTypeId", value)
                }
              >
                {renderDocumentTypes()}
              </Picker>
              {errors.SelectedDocumentTypeId && (
                <Text visible={errors.SelectedDocumentTypeId}>
                  {errors.SelectedDocumentTypeId}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Document Language"
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
                {renderTranslationLanguage()}
              </Picker>
              {errors.SelectedFromDocumentLanguageId && (
                <Text visible={errors.SelectedFromDocumentLanguageId}>
                  {errors.SelectedFromDocumentLanguageId}
                </Text>
              )}
            </Item>
            <Item style={styles.item_margin}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Document to be Translated"
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
              {errors.SelectedFromDocumentLanguageId && (
                <Text visible={errors.SelectedFromDocumentLanguageId}>
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
                  onPress={() => this.openImagePicker()}
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
            <Button full rounded onPress={handleSubmit}>
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
    Address: profile.data.contactdetail.Addressline1,
    SelectedDocumentTypeId: "",
    SelectedFromDocumentLanguageId: "",
    SelectedToDocumentLanguageId: "",
    LegalStamp: false,
    Files: null,
    doclangTransCreate
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
    SelectedToDocumentLanguageId: Yup.string().required("Required")
  }),

  handleSubmit: (values, { props }) => {
    const { translationrate } = props;
    const token = props.token.token;
    var Rate = translationrate.data
      ? values.LegalStamp == true
        ? translationrate.data.Rate + 28
        : translationrate.data.Rate
      : 0;
    let data = new FormData();
    data.append("CustomerName", values.CustomerName);
    data.append("Email", values.Email);
    data.append("PersonalPhone", values.PersonalPhone);
    data.append("OfficePhone", values.OfficePhone);
    data.append("Address", values.Address);
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
    data.append("ServiceName", "ServiceName");
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
  }
});
