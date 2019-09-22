import React, { Component } from "react";
import { View } from "react-native";
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
  Textarea
} from "native-base";

export default class VisaServiceDt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBillAmt: 0
    };
  }

  componentDidMount = () => {
    const docsAndPayment = this.props.pageData[this.props.pageData.length - 1];
    let total = docsAndPayment.PriceDetils.reduce(
      (accumulator, item) => accumulator + parseFloat(item.Value),
      0
    );
    if (
      docsAndPayment.OriginalDocumentSubmissionType.Value == "Through Courier"
    )
      total += 10;
    this.setState({ totalBillAmt: total });
  };
  componentDidUpdate() {}

  renderPageData = () => {
    return this.props.pageData.map(datum => {
      return (
        datum["Text"] != "Documents and Payment Collection" && (
          <Item>
            <Text style={{ padding: 10, fontWeight: "bold" }}>
              {datum["Text"]} :{" "}
            </Text>
            <Text style={{ padding: 10 }}>{datum["Value"]}</Text>
          </Item>
        )
      );
    });
  };

  renderDocsData = () => {
    const docsAndPayment = this.props.pageData[this.props.pageData.length - 1];
    return docsAndPayment.Documents.map(datum => {
      return (
        <Item>
          <Text style={{ padding: 10, fontWeight: "bold" }}>
            {datum.Text} :{" "}
          </Text>
          <Right>
            <Text style={{ padding: 10 }}>{datum.FileUploaded}</Text>
          </Right>
        </Item>
      );
    });
  };

  renderPriceDts = () => {
    const docsAndPayment = this.props.pageData[this.props.pageData.length - 1];
    return docsAndPayment.PriceDetils.map(datum => {
      return (
        <Item>
          <Text style={{ padding: 10, fontWeight: "bold" }}>
            {datum.Text} :{" "}
          </Text>
          <Right>
            <Text style={{ padding: 10 }}>AED {datum.Value}</Text>
          </Right>
        </Item>
      );
    });
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
    return (
      <View>
        <View
          style={{
            backgroundColor: "#F7F9F9",
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <View>
            <Text
              style={{
                color: "#99A3A4",
                fontSize: 17,
                marginLeft: 5,
                fontWeight: "bold"
              }}
            >
              Application Details
            </Text>
          </View>
          <Right></Right>
        </View>

        {this.renderPageData()}
        
        {this.props.pageData[this.props.pageData.length - 1].IBANNumber && (
          <Item>
            <Text style={{ padding: 10, fontWeight: "bold" }}>
              IBAN Number :{" "}
            </Text>
            <Text style={{ padding: 10 }}>
              {
                this.props.pageData[this.props.pageData.length - 1].IBANNumber
                  .value
              }
            </Text>
          </Item>
        )}
        {this.props.pageData[this.props.pageData.length - 1]
          .AdditionalNotes && (
          <Item>
            <Text style={{ padding: 10, fontWeight: "bold" }}>
              Additional Notes :{" "}
            </Text>
            <Text style={{ padding: 10 }}>
              {
                this.props.pageData[this.props.pageData.length - 1]
                  .AdditionalNotes.value
              }
            </Text>
          </Item>
        )}
        <View
          style={{
            backgroundColor: "#F7F9F9",
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <View>
            <Text
              style={{
                color: "#99A3A4",
                fontSize: 17,
                marginLeft: 5,
                fontWeight: "bold"
              }}
            >
              Documents Uploaded
            </Text>
          </View>
          <Right></Right>
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
            <Text
              style={{
                color: "#99A3A4",
                fontSize: 17,
                marginLeft: 5,
                fontWeight: "bold"
              }}
            >
              Price Details
            </Text>
          </View>
          <Right></Right>
        </View>
        {this.renderPriceDts()}
        {this.props.pageData[this.props.pageData.length - 1]
          .OriginalDocumentSubmissionType.Value == "Through Courier" ? (
          <Item>
            <Text style={{ padding: 10, fontWeight: "bold" }}>
              Courier Charge :
            </Text>
            <Right>
              <Text style={{ padding: 10 }}>AED 10</Text>
            </Right>
          </Item>
        ) : (
          <View />
        )}
        {this.renderTotalPrice()}
      </View>
    );
  };
}
