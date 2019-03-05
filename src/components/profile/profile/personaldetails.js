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
import DateTimePicker from "react-native-modal-datetime-picker";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../constants";
const PersonalDetails = ({
  personaldetail,
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched
}) => {
  const ShowDateTimePicker = () => setFieldValue("IsDatePickerVisible", true);
  const HideDateTimePicker = () => setFieldValue("IsDatePickerVisible", false);
  const HandleDatePicked = date => {
    setFieldValue("DOB", new Date(date).toDateString());
    HideDateTimePicker();
  };
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
        <Text style={{ fontSize: 13 }}>Personal Details </Text>
        <View
          style={{ alignSelf: "flex-end", flex: 1, alignItems: "flex-end" }}
        >
          {!values.ShowEditPersonal ? (
            <TouchableOpacity
              onPress={() => setFieldValue("ShowEditPersonal", true)}
            >
              <Icon style={{ color: "black", fontSize: 20 }} name="create" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                handleSubmit;
                setFieldValue("ShowEditPersonal", false);
              }}
            >
              <Icon style={{ color: "black", fontSize: 20 }} name="checkmark" />
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
                    onTouchStart={ShowDateTimePicker}
                    placeholder="Birthday"
                    name="DOB"
                    label="Birthday"
                    onChangeText={value => setFieldValue("DOB", value)}
                    value={values.DOB}
                    error={touched.DOB && errors.DOB}
                    underlineColor={Color.secondary}
                    style={{ fontSize: 13 }}
                  />
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
                    style={{ fontSize: 13 }}
                  />
                </Item>
              )}
            </Col>
          </Row>
        </Grid>
        <DateTimePicker
          isVisible={values.IsDatePickerVisible}
          onConfirm={HandleDatePicked}
          onCancel={HideDateTimePicker}
        />
      </View>
    </View>
  );
};

export default withFormik({
  mapPropsToValues: ({ updateUserDetails, personaldetail }) => ({
    DOB: personaldetail.DOB,
    Gender: personaldetail.Gender,
    ShowEditPersonal: false,
    IsDatePickerVisible: false
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    ShowEditPersonal: Yup.boolean(),
    DOB: Yup.string().when("ShowEditPersonal", {
      is: true,
      then: Yup.string().required("Must enter DOB")
    })
  }),

  handleSubmit: (values, { props }) => {
    const token = props.token.token;
    const { DOB, Gender } = values;
    values.registerUser({ DOB, Gender });
  }
})(PersonalDetails);

const styles = {
  text_detail: {
    padding: 5,
    color: "#808B96",
    fontSize: 13
  }
};
