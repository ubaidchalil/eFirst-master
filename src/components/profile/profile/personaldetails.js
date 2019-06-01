import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Icon,
  Text,
  Button,
  Grid,
  Col,
  Row,
  Picker,
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
          padding: 3,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Text style={{ fontSize: 15, alignSelf: "center" }}>
          Personal Details{" "}
        </Text>
        <View>
          {!values.ShowEditPersonal ? (
            <Button
              transparent
              onPress={() => setFieldValue("ShowEditPersonal", true)}
            >
              <Icon style={{ color: "black", fontSize: 23 }} name="create" />
            </Button>
          ) : (
            <Button
              transparent
              onPress={() => {
                handleSubmit();
                setFieldValue("ShowEditPersonal", false);
              }}
            >
              <Icon style={{ color: "black", fontSize: 23 }} name="checkmark" />
            </Button>
          )}
        </View>
      </View>
      <View style={{ flex: 1, padding: 12, paddingHorizontal: 18 }}>
        <Grid>
          <Row>
            <Col>
              {!values.ShowEditPersonal ? (
                <Text style={styles.text_detail}>
                  Birthday: {personaldetail.Dob}
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
                <Item picker>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Gender"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={values.Gender}
                    onValueChange={value => {
                      setFieldValue("Gender", value);
                    }}
                  >
                    <Picker.Item key="0" label="Male" value="Male" />
                    <Picker.Item key="1" label="Female" value="Female" />
                  </Picker>
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
  mapPropsToValues: ({ userPersonalDetailCreate, personaldetail }) => ({
    DOB: personaldetail.Dob,
    Gender: personaldetail.Gender ? personaldetail.Gender : "Male",
    ShowEditPersonal: false,
    IsDatePickerVisible: false,
    userPersonalDetailCreate
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
    values.userPersonalDetailCreate({ DOB, Gender, token });
  }
})(PersonalDetails);
const styles = {
  text_detail: {
    padding: 5,
    color: "#808B96",
    fontSize: 13
  }
};
