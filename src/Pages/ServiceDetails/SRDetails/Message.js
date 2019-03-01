import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

let styles = StyleSheet.create({
  outer_main: {
    borderColor: "#F4D03F",
    borderWidth: 2,
    borderRadius: 13
  },
  title_view: {
    borderBottomColor: "#F4D03F",
    borderBottomWidth: 2,
    flexDirection: "row",
    padding: 10
  },
  title_msg_view: {
    flex: 0.7,
    padding: 5
  },
  title_msg_text: { color: "#F4D03F" },
  title_reply_view: { flex: 0.3 },
  title_reply_txt: { textAlign: "right", color: "#3498DB" }
});

const Message = ({ messages }) => (
  <View style={styles.outer_main}>
    <View style={styles.title_view}>
      <View style={styles.title_msg_view}>
        <Text style={styles.title_msg_text}>Message Name </Text>
      </View>
      <View style={styles.title_reply_view}>
        <TouchableOpacity>
          <Text style={styles.title_reply_txt}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
    <FlatList
      data={messages}
      renderItem={({ item, index }) => (
        <MessageItem
          message_data={item}
          _index={index}
          _length={this.state.data.length}
        />
      )}
    />
  </View>
);
export default Message;

class MessageItem extends React.PureComponent {
  render() {
    const data = this.props.message_data;
    const _length = this.props._length;
    const _index = this.props._index;

    return (
      <View
        style={[
          { flexDirection: "row", padding: 10 },
          _index < _length && {
            borderBottomColor: "#CACFD2",
            borderBottomWidth: 1
          }
        ]}
      >
        <View style={{ width: 60, padding: 10 }}>
          <Image
            style={{ height: 30, width: 20, resizeMode: "stretch" }}
            source={require("../../../Assets/serviceDetail_user.png")}
          />
        </View>
        <View style={{}}>
          <Text style={{ fontSize: 15, fontWeight: "bold", padding: 1 }}>
            {data.user}
          </Text>
          <Text style={{ fontSize: 13, color: "#707B7C", padding: 1 }}>
            {data.date}{" "}
          </Text>
          <Text
            style={{ fontSize: 13, color: "#707B7C", padding: 3, marginTop: 5 }}
          >
            {data.message}{" "}
          </Text>
        </View>
      </View>
    );
  }
}
