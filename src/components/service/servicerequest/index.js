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
  Left,
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
      IsVisible: false,
      MessageRequested: false
    };
    this.hideModal = this.hideModal.bind(this);
    this.MessageModal = this.MessageModal.bind(this);
  }
  changeRequestMessageState = state =>
    this.setState({ MessageRequested: state });
  MessageModal = (SRID, NoteID, Title: any) => {
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
  componentDidUpdate() {
    const { error, success, loading } = this.props.message;
    const { MessageRequested } = this.state;
    if (!error && !loading && success && MessageRequested) {
      this.changeRequestMessageState(false);
      const { srDetail, token } = this.props;
      const SRID = srDetail ? srDetail.SRID : 0;

      this.props.serviceRequestData({ serviceId: SRID, token: token.token });
    }
  }
  render() {
    const { srDetail, loading, error, message, profile } = this.props;
    const dtError = error || message.error;
    const success = message.success;
    const SRID = srDetail ? srDetail.SRID : 0;

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Loader loading={loading} />
          <PostMessage
            changeRequestMessageState={this.changeRequestMessageState}
            token={this.props.token}
            handle={this.hideModal}
            action={this.state}
            SendMessage={this.props.sendOrReplyMessage}
            profile={profile}
          />
          <MyHeader
            navigation={this.props.navigation}
            header="Service Details"
          />
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              backgroundColor: "#F7F9F9",
              height: 50
            }}
          >
            <Left>
              <Text style={{ fontSize: 12, marginLeft: 5 }}>
                {srDetail ? srDetail.SRTitle : ""}
              </Text>
              <Text note style={{ fontSize: 10, marginLeft: 5 }}>
                {srDetail ? srDetail.CreatedDate : ""}
              </Text>
            </Left>
            <Right>
              <Button transparent onPress={() => this.MessageModal(SRID, 0)}>
                <IconMaterialIcons
                  name="chat"
                  style={{ fontSize: 20, color: "black" }}
                />
              </Button>
            </Right>
          </View>
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
  message,
  profile
}) => ({
  srDetail,
  profile,
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
