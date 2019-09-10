import React, { Component } from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity, ImageBackground } from "react-native";
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
    let total = this.props.navigation.state.params.docsAndPayment.PriceDetils.reduce(
      (accumulator, item) => accumulator + parseFloat(item.Value),
      0
    );
    if(this.props.navigation.state.params.docsAndPayment.OriginalDocumentSubmissionType.Value == "Through Courier")
      total += 10;
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
        <Item style={styles.itemTransparent}>
          <Text style={{ padding: 10, fontWeight: "bold", color:"#FFF"  }}>
            {datum["Text"]} :{" "}
          </Text>
          <Right>
            <Text style={{ padding: 10, color:"#FFF"  }}>{datum["Value"]}</Text>
          </Right>
        </Item>
      );
    });
  };

  renderDocsData = () => {
    const docs = this.props.navigation.state.params.docsAttached;
    return this.props.navigation.state.params.docs.map(datum => {
      return (
        <Item style={styles.itemTransparent}>
          <Text style={{ padding: 10, fontWeight: "bold", color:"#FFF" }}>{datum} : </Text>
          <Right>
            <Text style={{ padding: 10, color:"#FFF" }}>
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
          <Item style={styles.itemTransparent} >
            <Text style={{ padding: 10, fontWeight: "bold", color:"#FFF" }}>
              {datum.Text} :{" "}
            </Text>
            <Right>
              <Text style={{ padding: 10, color:"#FFF" }}>AED. {datum.Value}</Text>
            </Right>
          </Item>
        );
      }
    );
  };

  renderTotalPrice = () => {
    return (
      <Item style={styles.itemTransparent} >
        <Text style={{ padding: 10, fontWeight: "bold", color:"#FFF" }}>Total : </Text>
        <Right>
          <Text style={{ padding: 10, fontWeight: "bold", color:"#FFF" }}>
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
        <ImageBackground
          source={require("../../../../Assets/bg_all.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
        
        <Content style={{ padding: 10, marginBottom: 50 }}>
          <View style={[{ backgroundColor: "rgba(255,102,0,0.2)" }, styles.itemTransparent ]} >  
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                paddingVertical: 10
              }}
            >
              <View>
                <Text style={{ fontSize: 14, marginLeft: 5, fontWeight: "bold", color:"#FFF" }}>
                  Original Document Required
                </Text>
              </View>
              <Right />
            </View>

            <Text style={{ padding: 10, color:"#FFF" }}>
              {
                this.props.navigation.state.params.docsAndPayment
                  .OriginalDocumentRequired.Options[0]
              }
            </Text>
          </View>
        <View
          style={{
            backgroundColor: 'rgba(250, 250, 250, 0.3)',
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <View>
            <Text style={{ color: "#FFF", fontSize: 14, marginLeft: 5, color:"#FFF" }}>
              Application Details
            </Text>
          </View>
          <Right />
        </View>
          <Modal isVisible={this.state.ShowTerms}>
            <TermsandConditon setShowTerms={this.setShowTerms} />
          </Modal>
          {this.renderPageData()}

          <View
            style={{
              backgroundColor: 'rgba(250, 250, 250, 0.3)',
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
          >
            <View>
              <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5, color:"#FFF" }}>
                Documents Uploaded
              </Text>
            </View>
            <Right />
          </View>
          {this.renderDocsData()}

          <View
            style={{
              backgroundColor: 'rgba(250, 250, 250, 0.3)',
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
          >
            <View>
              <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5, color:"#FFF" }}>
                Notes
              </Text>
            </View>
            <Right />
          </View>
          <Text style={{ padding: 10, color:"#FFF" }}>
            {this.props.navigation.state.params.docsAndPayment.Notes.Options[0]}
          </Text>

          
          <View
            style={{
              backgroundColor: 'rgba(250, 250, 250, 0.3)',
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
          >
            <View>
              <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5, color:"#FFF" }}>
                IBAN Number
              </Text>
            </View>
            <Right />
          </View>
          <Text style={{ padding: 10, color:"#FFF" }}>
            {this.props.navigation.state.params.docsAndPayment.IBANNumber.value}
          </Text>

          <View
            style={{
              backgroundColor: 'rgba(250, 250, 250, 0.3)',
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
          >
            <View>
              <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5, color:"#FFF" }}>
                Additional Notes
              </Text>
            </View>
            <Right />
          </View>
          <Text style={{ padding: 10, color:"#FFF" }}>
            {this.props.navigation.state.params.docsAndPayment.AdditionalNotes.value}
          </Text>

          <View
            style={{
              backgroundColor: 'rgba(250, 250, 250, 0.3)',
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
          >
            <View>
              <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5, color:"#FFF" }}>
                Price Details
              </Text>
            </View>
            <Right />
          </View>
          <Right />
          {this.renderPriceDts()}
          {
            this.props.navigation.state.params.docsAndPayment.OriginalDocumentSubmissionType.Value == "Through Courier" ?
            (
              <Item style={styles.itemTransparent} >
                <Text style={{ padding: 10, fontWeight: "bold", color:"#FFF" }}>
                  Courier Charge : 
                </Text>
                <Right>
                  <Text style={{ padding: 10, color:"#FFF"}}>AED. 10</Text>
                </Right>
              </Item>
              ) :
              (<View />)
          }
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
        </ImageBackground>
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


const styles = {
  itemTransparent : {
    marginTop: 5,
    borderBottomWidth: 0,
    backgroundColor: "rgba(250, 250, 250, 0.13)",
    padding: 5,
    borderRadius: 15,
    borderTopLeftRadius: 0
  },
};
