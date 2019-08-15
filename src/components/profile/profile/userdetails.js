import React, { Component } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
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
import { Color, PROFILE_BASE_URL } from "../../../constants";

var ImagePicker = require("react-native-image-picker");
const UserDetails = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  userdetail,
  dashboard
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
        let imgName = response.fileName;
        if (Platform.OS === "ios") {
          // on iOS, using camera returns undefined fileName. This fixes that issue, so API can work.
          var getFilename = response.uri.split("/");
          imgName = getFilename[getFilename.length - 1];
        }

        const pic =
          Platform.OS === "ios"
            ? {
                uri: response.uri,
                type: response.type,
                name: imgName
              }
            : {
                uri: response.uri,
                type: response.type,
                name: imgName
              };
        console.log("PiC====>", pic);
        setFieldValue("ProfilePic", pic);
        setFieldValue("ProfilePicName", response.fileName);
        setFieldValue("ImageUrl", source);
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
        {values.ImageUrl ? (
          <Thumbnail large source={values.ImageUrl} />
        ) : userdetail.ProfilePic ? (
          <Thumbnail
            large
            source={{
              uri: `${PROFILE_BASE_URL}${userdetail.ProfilePic}`
            }}
          />
        ) : (
          <Thumbnail large source={require("./userProfile.png")} />
        )}

        {values.ShowEditUser && (
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
        )}
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
              editable={false}
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
        <Text style={{ color: "blue", fontSize: 13 }}>
          Open Services :{" "}
          {dashboard.data
            ? dashboard.data.Tiles.InReviewNewUpdateCount +
              dashboard.data.Tiles.InReviewTotalUpdateCount
            : 0}
        </Text>
        <Text style={{ color: "green", fontSize: 13 }}>
          Completed Services :{" "}
          {dashboard.data
            ? dashboard.data.Tiles.CompletedNewUpdateCount +
              dashboard.data.Tiles.CompletedTotalUpdateCount
            : 0}
        </Text>
        <Text style={{ color: "red", fontSize: 13 }}>
          Rejected Services :{" "}
          {dashboard.data
            ? dashboard.data.Tiles.RejectedNewUpdateCount +
              dashboard.data.Tiles.RejectedTotalUpdateCount
            : 0}
        </Text>
      </View>
      <View style={{ flex: 0.1, alignContent: "flex-end" }}>
        {!values.ShowEditUser ? (
          <TouchableOpacity onPress={() => setFieldValue("ShowEditUser", true)}>
            <Icon style={{ color: "black", fontSize: 25 }} name="create" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setFieldValue("ShowEditUser", false);
              handleSubmit();
            }}
          >
            <Icon
              style={{ color: "black", fontSize: 25 }}
              name="md-checkmark-circle"
            />
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
    ImageUrl: null,
    ProfilePicName: "",
    ProfilePic: null,
    ShowEditUser: false,
    userProfileCreate
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    ShowEditUser: Yup.boolean(),
    FirstName: Yup.string().when("ShowEditUser", {
      is: true,
      then: Yup.string()
        .nullable()
        .required("Please enter a user name")
    })
  }),

  handleSubmit: (values, { props }) => {
    const token = props.token.token;
    const { FirstName, Designation, ProfilePic, ProfilePicName } = values;
    let data = new FormData();
    data.append("FirstName", FirstName);
    data.append("Designation", Designation);
    data.append("ProfilePicName", ProfilePicName);
    data.append("ProfilePic", ProfilePic);
    console.log("DATA", data);
    values.userProfileCreate({ data, token });
  }
})(UserDetails);
