import React, { Component } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Tabs,
  Tab,
  Text,
  Button,
  Input,
  Textarea,
  Form,
  Item,
  StyleProvider,
  Header,
  Body,
  Right,
  Icon
} from "native-base";
import getTheme from "../../../../native-base-theme/components";
import material from "../../../../native-base-theme/variables/material";
import Details from "./details";
import Documents from "./documents";
import SRInfo from "./srdetails";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import { serviceRequestData, sendOrReplyMessage } from "../action";
import PostMessage from "./postmessage";
import { connect } from "react-redux";
import MyHeader from "../../../Header";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";

class ServiceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SRID: 0,
      NoteID: 0,
      Title: null,
      IsVisible: false
    };
    this.hideModal = this.hideModal.bind(this);
    this.MessageModal = this.MessageModal.bind(this);
  }
  MessageModal = (SRID, NoteID, Title: any) => {
    if (Title) {
      console.log("Title", Title);
    } else {
      console.log("Title", "Nothing");
    }

    this.setState({
      SRID,
      NoteID,
      Title,
      IsVisible: true
    });
  };
  hideModal() {
    this.setState({
      IsVisible: false
    });
  }
  render() {
    const { srDetail, loading, error, message } = this.props;
    const dtError = error || message.error;
    const success = message.success;
    const SRID = srDetail ? srDetail.SRID : 0;
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Loader loading={loading} />
          <PostMessage
            token={this.props.token}
            handle={this.hideModal}
            action={this.state}
            SendMessage={this.props.sendOrReplyMessage}
          />
          <MyHeader
            navigation={this.props.navigation}
            header="Service Details"
          />
          <Header style={{ backgroundColor: "#F7F9F9", height: 50 }}>
            <Body>
              <Text style={{ fontSize: 12, marginLeft: 5 }}>
                {srDetail ? srDetail.SRTitle : ""}
              </Text>
              <Text note style={{ fontSize: 10, marginLeft: 5 }}>
                {srDetail ? srDetail.CreatedDate : ""}
              </Text>
            </Body>
            <Right>
              <TouchableOpacity onPress={() => this.MessageModal(SRID, 0)}>
                <View style={{ flexDirection: "row" }}>
                  <IconMaterialIcons
                    name="chat"
                    style={{ fontSize: 20, color: "black" }}
                  />
                </View>
              </TouchableOpacity>
            </Right>
          </Header>
          <Tabs>
            <Tab heading="Details">
              <Details MessageModal={this.MessageModal} />
            </Tab>
            <Tab heading="Documents">
              <Documents />
            </Tab>
            <Tab heading="SR Details">
              <SRInfo />
            </Tab>
          </Tabs>
          {dtError && <AlertView type="error" />}
          {success && <AlertView type="success" />}
        </Container>
      </StyleProvider>
    );
  }
}

const styles = {
  modalContent: {
    backgroundColor: "white",
    borderRadius: 13,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
};

const mapStateToProps = ({
  servicerequest: { srDetail, loading, error },
  token,
  message
}) => ({
  srDetail,
  loading,
  error,
  token,
  message
});
const mapDispatchToProps = dispatch => ({
  serviceRequestData: payload => dispatch(serviceRequestData(payload)),
  sendOrReplyMessage: payload => dispatch(sendOrReplyMessage(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceDetails);
