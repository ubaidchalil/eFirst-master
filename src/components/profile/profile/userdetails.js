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
var ImagePicker = require("react-native-image-picker");
const UserDetails = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  userdetail
}) => {
  const selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        const pic =
          Platform.OS === "ios"
            ? {
                data: `data:${response.type};base64,${response.data}`,
                type: response.type,
                name: response.fileName
              }
            : {
                uri: uri,
                type: response.type,
                name: response.fileName
              };
        // values.Files.push(file);
        setFieldValue("ProfilePic", pic);
        setFieldValue("ImageUrl", source);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };
  return (
    <View style={{ flexDirection: "row", padding: 10 }}>
      <View
        style={{
          width: 50,
          flex: 0.35,
          padding: 10,
          alignItems: "center"
        }}
      >
        <Thumbnail large source={values.ImageUrl} />
        <TouchableOpacity onPress={selectPhotoTapped}>
          <Text
            style={{
              textAlign: "center",
              padding: 3,
              textDecorationLine: "underline",
              fontSize: 13
            }}
          >
            Change Photo
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "flex-start", flex: 0.75, padding: 5 }}>
        {!values.ShowEditUser ? (
          <H3>{userdetail.FirstName}</H3>
        ) : (
          <Item>
            <Input
              placeholder="FirstName"
              name="FirstName"
              label="User Name"
              onChangeText={value => setFieldValue("FirstName", value)}
              value={values.FirstName}
              error={touched.FirstName && errors.FirstName}
              underlineColor={Color.secondary}
              style={{ fontSize: 13 }}
            />
          </Item>
        )}
        {!values.ShowEditUser ? (
          <Text note>{userdetail.Designation}</Text>
        ) : (
          <Item>
            <Input
              placeholder="Designation"
              name="Designation"
              label="Designation"
              onChangeText={value => setFieldValue("Designation", value)}
              value={values.Designation}
              error={touched.Designation && errors.Designation}
              underlineColor={Color.secondary}
              style={{ fontSize: 13 }}
            />
          </Item>
        )}
        <Text style={{ color: "blue", fontSize: 13 }}>Open Services : 0</Text>
        <Text style={{ color: "green", fontSize: 13 }}>
          Completed Services : 0
        </Text>
        <Text style={{ color: "red", fontSize: 13 }}>
          Rejected Services : 0
        </Text>
      </View>
      <View style={{ flex: 0.1, alignContent: "flex-end" }}>
        {!values.ShowEditUser ? (
          <TouchableOpacity
            onPress={() => setFieldValue("ShowEditUser", false)}
          >
            <Icon style={{ color: "black", fontSize: 20 }} name="create" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setFieldValue("ShowEditUser", false);
              handleSubmit;
            }}
          >
            <Icon style={{ color: "black", fontSize: 20 }} name="checkmark" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default withFormik({
  mapPropsToValues: ({ userProfileCreate, userdetail }) => ({
    FirstName: userdetail.FirstName,
    Designation: userdetail.Designation,
    ImageUrl: require("./userProfile.png"),
    ProfilePic: "",
    ShowEditUser: false,
    userProfileCreate
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    ShowEditUser: Yup.boolean(),
    FirstName: Yup.string().when("ShowEditUser", {
      is: true,
      then: Yup.string().required("Must enter user name")
    })
  }),

  handleSubmit: (values, { props }) => {
    const token = props.token.token;
    const { FirstName, Designation, ProfilePic } = values;
    values.userProfileCreate({ FirstName, Designation, ProfilePic, token });
  }
})(UserDetails);
