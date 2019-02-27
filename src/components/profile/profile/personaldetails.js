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
const PersonalDetails = ({ values, personaldetails }) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#E5E7E9",
          flex: 1,
          padding: 12,
          paddingHorizontal: 20,
          flexDirection: "row"
        }}
      >
        <Text>Personal Details </Text>
        <View
          style={{ alignSelf: "flex-end", flex: 1, alignItems: "flex-end" }}
        >
          {!values.ShowEditPersonal ? (
            <TouchableOpacity onPress={() => this.EditOfficeDts()}>
              <Icon style={{ color: "black" }} name="create" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.SaveOfficeDts()}>
              <Icon style={{ color: "black" }} name="checkmark" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ flex: 1, padding: 12, paddingHorizontal: 18 }}>
        <Grid>
          <Row>
            <Col>
              {!values.ShowEditPersonal ? (
                <Text style={styles.text_detail}>
                  Birthday: {personaldetail.DOB}
                </Text>
              ) : (
                <Item>
                  <Input
                    placeholder="Birthday"
                    name="DOB"
                    label="Birthday"
                    onChangeText={value => setFieldValue("DOB", value)}
                    value={values.DOB}
                    error={touched.DOB && errors.DOB}
                    underlineColor={Color.secondary}
                  >
                    {personaldetail.DOB}
                  </Input>
                </Item>
              )}
            </Col>
            <Col>
              {!values.ShowEditPersonal ? (
                <Text style={styles.text_detail}>
                  Gender: {personaldetail.Gender}
                </Text>
              ) : (
                <Item>
                  <Input
                    placeholder="Gender"
                    name="Gender"
                    label="Gender"
                    onChangeText={value => setFieldValue("Gender", value)}
                    value={values.Gender}
                    error={touched.Gender && errors.Gender}
                    underlineColor={Color.secondary}
                  >
                    {personaldetail.Gender}
                  </Input>
                </Item>
              )}
            </Col>
          </Row>
        </Grid>
      </View>
    </View>
  );
};

export default withFormik({
  mapPropsToValues: ({ updateUserDetails, personaldetail }) => ({
    DOB: personaldetail.DOB,
    Gender: personaldetail.Gender,
    ShowEditPersonal: false
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    ShowEditPersonal: yup.boolean(),
    DOB: Yup.string().when("ShowEditPersonal", {
      is: true,
      then: yup.string().required("Must enter DOB")
    })
  }),

  handleSubmit: (values, { setSubmitting }) => {
    const { FirstName } = values;
    values.registerUser({ FirstName, Email, Password, ConfirmPassword });
  }
})(PersonalDetails);
