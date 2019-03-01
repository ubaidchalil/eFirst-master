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

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "1",
          user: "Username",
          date: "August 15, 2018",
          message: "Lorem Ipsum"
        },
        {
          id: "2",
          user: "Super Admin",
          date: "August 16, 2018",
          message: "Lorem Ipsum is simple"
        }
      ],
      status: {
        status: "Assigned to Application Process",
        date: "December 28, 2018 10:14 AM",
        type: 1
      }
    };
  }

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

    return (
      <Container>
        <Content style={{ padding: 10 }}>
          <Messages messages={this.state.data} />

          <Status status={this.state.status} />
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = ({ dashboard, token }) => ({
  dashboard,
  token
});
const mapDispatchToProps = dispatch => ({
  DashboardData: payload => dispatch(DashboardData(payload)),
  profileData: payload => dispatch(profileData(payload)),
  FAQCategoryData: payload => dispatch(FAQCategoryData(payload)),
  ClearFaq: () => dispatch(clearFaq())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
