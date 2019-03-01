import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import {
  Container,
  Content,
  Icon,
  Input,
  Text,
  StyleProvider
} from "native-base";
import Messages from "./Message";
import Status from "./Status";
import { connect } from "react-redux";
class Details extends Component {
  render() {
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
    const { messages, messageList, statusList } = this.props;
    return (
      <Container>
        <Content style={{ padding: 10 }}>
          <Messages messages={messages} messageList={messageList} />

          <Status statusList={statusList} />
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = ({
  servicerequest: { messages, messageList, statusList }
}) => ({
  messages,
  messageList,
  statusList
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
