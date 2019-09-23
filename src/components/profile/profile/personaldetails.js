import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
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

const deviceWidth = Dimensions.get("window").width;

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

  dateFormat = date => {
    return date
      ? new Date(date).getDate() +
          "/" +
          (new Date(date).getMonth() + 1) +
          "/" +
          new Date(date).getFullYear()
      : "";
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
              <Icon style={{ color: "black", fontSize: 25 }} name="create" />
            </Button>
          ) : (
            <Button transparent onPress={handleSubmit}>
              <Icon
                style={{ color: "black", fontSize: 25 }}
                name="md-checkmark-circle"
              />
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
                  Birthday: {this.dateFormat(personaldetail.Dob)}
                </Text>
              ) : (
                <Item>
                  <Input
                    onTouchStart={ShowDateTimePicker}
                    placeholder="Birthday"
                    name="DOB"
                    label="Birthday"
                    onChangeText={value => setFieldValue("DOB", value)}
                    value={this.dateFormat(values.DOB)}
                    error={touched.DOB && errors.DOB}
                    underlineColor={Color.secondary}
                    style={{ fontSize: 13 }}
                  />
                </Item>
              )}
            </Col>
          </Row>
          <Row>
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
                    style={
                      Platform.OS === "ios"
                        ? {
                            width: deviceWidth - 30,
                            marginLeft: -10
                          }
                        : { width: undefined }
                    }
                    textStyle={{ fontSize: 13 }}
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
          date={new Date("01/01/1947")}
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
  handleSubmit: (values, { props, setFieldValue }) => {
    setFieldValue("ShowEditPersonal", false);
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
