import React, { Component } from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Radio,
  Text,
  ListItem,
  Left,
  Right,
  Button,
  Item,
  Icon,
  Textarea,
  CheckBox,
  Body
} from "native-base";
import MyHeader from "../../../../Header";
import { visaServiceCreate, updAttestationSRAmt } from "../../action";
import Loader from "../../../styled/loader";
import AlertView from "../../../styled/alert-view";
import Modal from "react-native-modal";
import TermsandConditon from "../../../termsandcondition";

class _Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBillAmt: 0,
      AgreeTerms: false,
      ShowTerms: false
    };
  }

  componentDidMount = () => {
    const total = this.props.navigation.state.params.docsAndPayment.PriceDetils.reduce(
      (accumulator, item) => accumulator + parseFloat(item.Value),
      0
    );
    this.setState({ totalBillAmt: total });
  };

  saveData = () => {
    const { token } = this.props.token;
    var _data = {};
    var pageData = this.props.navigation.state.params.pageData;
    var docsAndPayment = this.props.navigation.state.params.docsAndPayment;
    var Documents = [];

    const docsAttached = this.props.navigation.state.params.docsAttached;

    _data.TotalBillAmount = this.state.totalBillAmt;
    _data.CurrencyUsed = "AED";
    _data.MinimumServiceCharge = 105;

    this.props.navigation.state.params.docs.forEach(function(doc) {
      Documents.push({
        Text: doc,
        Name: doc.replace(/ /g, ""),
        FileUploaded: docsAttached.indexOf(doc) >= 0 ? "YES" : "NO"
      });
    });

    docsAndPayment.Documents = Documents;
    pageData.push(docsAndPayment);
    _data.PageData = pageData;

    const docItem = this.props.navigation.state.params.docItem;

    this.props.navigation.navigate("VisaServiceHome", {
      data: _data,
      docItem
    });
  };

  renderPageData = () => {
    return this.props.navigation.state.params.pageData.map(datum => {
      return (
        <Item>
          <Text style={{ padding: 10, fontWeight: "bold" }}>
            {datum["Text"]} :{" "}
          </Text>
          <Right>
            <Text style={{ padding: 10 }}>{datum["Value"]}</Text>
          </Right>
        </Item>
      );
    });
  };

  renderDocsData = () => {
    const docs = this.props.navigation.state.params.docsAttached;
    return this.props.navigation.state.params.docs.map(datum => {
      return (
        <Item>
          <Text style={{ padding: 10, fontWeight: "bold" }}>{datum} : </Text>
          <Right>
            <Text style={{ padding: 10 }}>
              {docs.indexOf(datum) >= 0 ? "Yes" : "No"}
            </Text>
          </Right>
        </Item>
      );
    });
  };

  renderPriceDts = () => {
    return this.props.navigation.state.params.docsAndPayment.PriceDetils.map(
      datum => {
        return (
          <Item>
            <Text style={{ padding: 10, fontWeight: "bold" }}>
              {datum.Text} :{" "}
            </Text>
            <Right>
              <Text style={{ padding: 10 }}>AED. {datum.Value}</Text>
            </Right>
          </Item>
        );
      }
    );
  };

  renderTotalPrice = () => {
    return (
      <Item>
        <Text style={{ padding: 10, fontWeight: "bold" }}>Total : </Text>
        <Right>
          <Text style={{ padding: 10, fontWeight: "bold" }}>
            AED {this.state.totalBillAmt}
          </Text>
        </Right>
      </Item>
    );
  };

  render = () => {
    const loading =
      this.props.visaservice.loading || this.props.docSRAmUpdation.loading;
    const error =
      this.props.visaservice.error || this.props.docSRAmUpdation.error;
    const success =
      this.props.visaservice.success || this.props.docSRAmUpdation.success;
    return (
      <Container>
        <Loader loading={loading} />
        <MyHeader navigation={this.props.navigation} header="Visa Service" />

        <View
          style={{
            backgroundColor: "#F7F9F9",
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <View>
            <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5 }}>
              Application Details
            </Text>
          </View>
          <Right />
        </View>
        <Content style={{ padding: 10 }}>
          <Modal isVisible={this.state.ShowTerms}>
            <TermsandConditon setShowTerms={this.setShowTerms} />
          </Modal>
          {this.renderPageData()}

          <View
            style={{
              backgroundColor: "#F7F9F9",
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
          >
            <View>
              <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5 }}>
                Documents Uploaded
              </Text>
            </View>
            <Right />
          </View>
          {this.renderDocsData()}

          <View
            style={{
              backgroundColor: "#F7F9F9",
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
          >
            <View>
              <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5 }}>
                Notes
              </Text>
            </View>
            <Right />
          </View>
          <Text style={{ padding: 10 }}>
            {this.props.navigation.state.params.docsAndPayment.Notes.Options[0]}
          </Text>

          <View
            style={{
              backgroundColor: "#F7F9F9",
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
          >
            <View>
              <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5 }}>
                Original Document Required
              </Text>
            </View>
            <Right />
          </View>

          <Text style={{ padding: 10 }}>
            {
              this.props.navigation.state.params.docsAndPayment
                .OriginalDocumentRequired.Options[0]
            }
          </Text>

          <View>
            <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5 }}>
              Price Details
            </Text>
          </View>
          <Right />
          {this.renderPriceDts()}

          {this.renderTotalPrice()}

          <Button
            style={{
              backgroundColor: "#183E61",
              marginBottom: 30,
              marginTop: 10,
              marginHorizontal: 5
            }}
            full
            rounded
            onPress={() => {
              this.saveData();
            }}
          >
            <Text>Next</Text>
          </Button>
        </Content>
        {error && <AlertView type="error" />}
      </Container>
    );
  };
}

const mapStateToProps = ({ token, visaservice, docSRAmUpdation, profile }) => ({
  token,
  visaservice,
  docSRAmUpdation,
  profile
});
const mapDispatchToProps = dispatch => ({
  visaServiceCreate: payload => dispatch(visaServiceCreate(payload)),
  updAttestationSRAmt: payload => dispatch(updAttestationSRAmt(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_Container);
