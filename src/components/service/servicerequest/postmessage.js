import React from "react";
import { View, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from "react-native";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Color } from "../../../constants";
import Modal from "react-native-modal";
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
  action
}) => {
  const SendMessage = () => {
    handle();
    handleSubmit;
  };

  return (
    <Modal isVisible={action.IsVisible}>
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}} >
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
              {!action.NoteID ? (
                <Input
                  placeholder="Message Title"
                  name="MessageTitle"
                  label="Title"
                  onChangeText={value => setFieldValue("MessageTitle", value)}
                  value={values.MessageTitle}
                  error={touched.MessageTitle && errors.MessageTitle}
                  underlineColor={Color.secondary}
                  style={{ fontSize: 15, paddingLeft: 10 }}
                />
              ) : (
                <Input
                  placeholder="Message Title"
                  name="MessageTitle"
                  label="Title"
                  style={{ fontSize: 15, paddingLeft: 10 }}
                  value={action.Title}
                  error={touched.MessageTitle && errors.MessageTitle}
                  underlineColor={Color.secondary}
                  editable={false}
                />
              )}
            </Item>
            {errors.MessageTitle && (
              <Text visible={errors.MessageTitle}>{errors.MessageTitle}</Text>
            )}
            <Item style={styles.item_margin}>
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
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ action, SendMessage }) => ({
    MessageTitle: action.SRID == 0 ? action.Title : "",
    MessageContent: "",

    SendMessage
  }),
  validateOnChange: false,

  validationSchema: Yup.object().shape({
    MessageTitle: Yup.string().required("Required"),
    MessageContent: Yup.string().required("Required")
  }),

  handleSubmit: (values, { props }) => {
    const { handle, changeRequestMessageState } = props;
    handle();
    const token = props.token.token;
    const { profile } = props;
    const { UserId } = profile.data.userdetail;
    const { SRID, NoteID } = props.action;
    const NoteType = SRID != 0 ? "NewMessage" : "ReplyMessage";
    const { MessageContent, MessageTitle } = values;

    values.SendMessage({
      SRID,
      NoteID,
      NoteType,
      MessageContent,
      MessageTitle,
      CreatedBy: UserId,
      token
    });
    return changeRequestMessageState(true);
  }
})(PostMessage);
const styles = {
  modalContent: {
    backgroundColor: "white",
    borderRadius: 13,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
};
