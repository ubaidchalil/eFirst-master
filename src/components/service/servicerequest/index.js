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
import Modal from "react-native-modal";
import { serviceRequestData } from "../action";
import { connect } from "react-redux";
import MyHeader from '../../../Header'


class ServiceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopUp: false
    };
    this._renderModalContent = this._renderModalContent.bind(this);
  }
  componentDidMount() {
    const serviceId = this.props.navigation.state.params
      ? this.props.navigation.state.params.serviceId
      : null;
    const token = this.props.token.token;
    this.props.serviceRequestData({ serviceId, token });
  }

  _renderModalContent = () => (
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
        <TouchableOpacity
          style={{ flex: 0.1 }}
          onPress={() => this.setState({ showPopUp: false })}
        >
          <Icon name="close" />
        </TouchableOpacity>
      </Item>
      <View style={{ padding: 15 }}>
        <Form>
          <Item>
            <Input placeholder="Message Title" />
          </Item>
          <Item style={styles.item_margin}>
            <Textarea rowSpan={5} placeholder="Message" underline />
          </Item>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            onPress={() => this.setState({ showPopUp: false })}
          >
            <Text> SEND </Text>
          </Button>
        </Form>
      </View>
    </View>
  );

  render() {
    const { srDetail } = this.props;
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Modal isVisible={this.state.showPopUp}>
            {this._renderModalContent()}
          </Modal>
      <MyHeader navigation={this.props.navigation} header="Service Details" />
          <Tabs>
            <Tab heading="Details">
              <Details />
            </Tab>
            <Tab heading="Documents">
              <Documents />
            </Tab>
            <Tab heading="SR Details">
              <SRInfo />
            </Tab>
          </Tabs>
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

const mapStateToProps = ({ servicerequest: { srDetail }, token }) => ({
  srDetail,
  token
});
const mapDispatchToProps = dispatch => ({
  serviceRequestData: payload => dispatch(serviceRequestData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceDetails);
