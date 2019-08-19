import React, { Component } from "react";
import {
  View,
  ScrollView,
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
    const {
      messages,
      messageList,
      statusList,
      loading,
      MessageModal
    } = this.props;

    console.log(MessageModal);

    return (
        <ScrollView style={{ padding: 10 }}>
          <View style={{marginBottom: 30}} >
            <Messages
              messages={messages}
              messageList={messageList}
              MessageModal={MessageModal}
            />
            <Status statusList={statusList} />
          </View>
        </ScrollView>
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
