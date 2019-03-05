import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";

let styles = StyleSheet.create({
  outer_main: {
    borderColor: "#F4D03F",
    borderWidth: 1,
    borderRadius: 13
  },
  title_view: {
    borderBottomColor: "#F4D03F",
    borderBottomWidth: 1,
    flexDirection: "row",
    padding: 8
  },
  title_msg_view: {
    flex: 0.7
  },
  title_msg_text: { color: "#F4D03F" },
  title_reply_view: { flex: 0.3 },
  title_reply_txt: { textAlign: "right", color: "#3498DB" }
});

const renderMessageList = ({ messageList, messages, MessageModal }) => {
  return messageList.map(item => (
    <View style={styles.outer_main}>
      <View style={styles.title_view}>
        <View style={styles.title_msg_view}>
          <Text style={styles.title_msg_text}>{item.NoteTitle} </Text>
        </View>
        <View style={styles.title_reply_view}>
          <TouchableOpacity onPress={() => MessageModal(0, item.NoteID)}>
            <Text style={styles.title_reply_txt}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={messages[item.NoteID]}
        renderItem={({ item, index }) => (
          <MessageItem message={item} index length={messageList.length} />
        )}
        ItemSeparatorComponent={this.renderSeparator}
      />
    </View>
  ));
};

renderSeparator = () => (
  <View
    style={{
      height: 1,
      backgroundColor: '#E5E8E8'
    }}
  />
);

const Message = ({ messageList, messages, MessageModal }) => (
  <View>{renderMessageList({ messageList, messages, MessageModal })}</View>
);
export default Message;

class MessageItem extends React.PureComponent {
  render() {
    const { message, length, index } = this.props;

    return (
      <View
        style={[
          { flexDirection: "row", padding: 10 }
        ]}
      >
        <View style={{ width: 60, padding: 10 }}>
          <Image
            style={{ height: 20, width: 15, resizeMode: "stretch" }}
            source={require("../../../../Assets/serviceDetail_user.png")}
          />
        </View>
        <View style={{}}>
          <Text style={{ fontSize: 12, fontWeight: "bold", padding: 1, color: 'black' }}>
            {message.CreatedBy}
          </Text>
          <Text style={{ fontSize: 10, color: "#707B7C", padding: 1 }}>
            {message.CreatedDate}{" "}
          </Text>
          <Text
            style={{ fontSize: 10, color: "#707B7C", padding: 3, marginTop: 5 }}
          >
            {message.MessageContent}{" "}
          </Text>
        </View>
      </View>
    );
  }
}
