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
    const { messages, messageList, statusList, loading } = this.props;
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
