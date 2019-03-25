import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../constants";
import Modal from "react-native-modal";
import { inputView } from "../../../../native-base-theme/components/Input";
import { Text, Button, Input, Textarea, Form, Item, Icon } from "native-base";
const PostMessage = ({
  handleSubmit,
  setFieldValue,
  handleBlur,
  values,
  errors,
  touched,
  token,
  navigation,
  SRID,
  NoteID,
  handle,
  action: { IsVisible, Title }
}) => {
  const SendMessage = () => {
    setFieldValue("IsVisible", false);
    handleSubmit;
  };

  return (
    <Modal isVisible={IsVisible}>
      <View style={styles.modalContent}>
        <Item style={{ flexDirection: "row", padding: 7 }}>
          <Text
            style={{
              fontSize: 17,
              padding: 10,
              paddingHorizontal: 15,
              flex: 0.9,
              fontWeight: "bold"
            }}
          >
            Send A Message
          </Text>
          <TouchableOpacity style={{ flex: 0.1 }} onPress={() => handle()}>
            <Icon name="close" />
          </TouchableOpacity>
        </Item>
        <View style={{ padding: 15 }}>
          <Form>
            <Item>
              {Title ? (
                <View style={inputView}>
                  <Text style={{ fontSize: 20, marginTop: 15 }}>{Title}</Text>
                </View>
              ) : (
                <Input
                  placeholder="Message Title"
                  name="MessageTitle"
                  label="Title"
                  onChangeText={value => setFieldValue("MessageTitle", value)}
                  value={values.MessageTitle}
                  error={touched.MessageTitle && errors.MessageTitle}
                  underlineColor={Color.secondary}
                />
              )}
            </Item>
            {errors.MessageTitle && (
              <Text visible={errors.MessageTitle}>{errors.MessageTitle}</Text>
            )}
            <Item>
              <Textarea
                rowSpan={5}
                placeholder="Message"
                name="MessageContent"
                label="Message"
                onChangeText={value => setFieldValue("MessageContent", value)}
                value={values.MessageContent}
                error={touched.MessageContent && errors.MessageContent}
                underlineColor={Color.secondary}
                underline
              />
            </Item>
            {errors.MessageContent && (
              <Text visible={errors.MessageContent}>
                {errors.MessageContent}
              </Text>
            )}
            <Button
              style={{ marginTop: 10 }}
              full
              rounded
              onPress={handleSubmit}
            >
              <Text> SEND </Text>
            </Button>
          </Form>
        </View>
      </View>
    </Modal>
  );
};

export default withFormik({
  mapPropsToValues: ({ action: { IsVisible }, SendMessage }) => ({
    MessageTitle: "",
    MessageContent: "",
    IsVisible,
    SendMessage
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    MessageTitle: Yup.string().required("Required"),
    MessageContent: Yup.string().required("Required")
  }),

  handleSubmit: (values, { props }) => {
    const token = props.token.token;
    const { SRID, NoteID } = props.action;
    const NoteType = SRID ? "NewMessage" : "ReplyMessage";
    const { MessageContent, MessageTitle } = values;
    return values.SendMessage({
      SRID,
      NoteID,
      NoteType,
      MessageContent,
      MessageTitle,
      token
    });
  }
})(PostMessage);

// NoteType: NewMessage
// MessageTitle: Test
// MessageContent: gfvvbbmmb
// SRID: 138
// NoteID: 0
// IsAdminMessage: 0
// CreatedBy: 44

// NoteType: ReplyMessage
// MessageTitle: Test
// MessageContent: cghjbnm
// SRID: 0
// NoteID: 478
// IsAdminMessage: 0
// CreatedBy: 44
const styles = {
  modalContent: {
    backgroundColor: "white",
    borderRadius: 13,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
};
