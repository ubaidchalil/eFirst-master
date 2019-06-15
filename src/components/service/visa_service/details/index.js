import React, { Component } from "react";
import { connect } from "react-redux";
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
import MyHeader from "../../../../Header";
import { visaServiceCreate } from "../../action";

class _Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};
  componentDidUpdate() {}

  saveData = () => {
    const { token } = this.props.token;
    const dataJson = this.props.navigation.state.params.data;
    const serviceData = JSON.stringify(dataJson);

    const docItem = this.props.navigation.state.params.docItem;
    let data = new FormData();
    data.append("ServiceData", serviceData);
    docItem.map((item, index) => data.append("Files[]", item, item.name));
    console.log("data", data);
    return this.props.visaServiceCreate({ data, token });
  };

  renderPageData = () => {
    return this.props.navigation.state.params.data.pageData.map(datum => {
      return (
        <Item>
          <Text style={{ padding: 10, fontWeight: "bold" }}>
            {datum["Text"]} :{" "}
          </Text>
          <Text style={{ padding: 10 }}>{datum["Value"]}</Text>
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
          <Text style={{ padding: 10 }}>
            {docs.indexOf(datum) >= 0 ? "Yes" : "No"}
          </Text>
        </Item>
      );
    });
  };

  renderPriceDts = () => {
    const docs = this.props.navigation.state.params.docsAttached;
    return this.props.navigation.state.params.data.PriceDetails.map(datum => {
      return (
        <Item>
          <Text style={{ padding: 10, fontWeight: "bold" }}>
            {datum.Text} :{" "}
          </Text>
          <Text style={{ padding: 10 }}>AED {datum.Value}</Text>
        </Item>
      );
    });
  };

  renderTotalPrice = () => {
    var total = 0;
    this.props.navigation.state.params.data.PriceDetails.forEach(function(
      item
    ) {
      total += parseFloat(item.Value);
    });
    return (
      <Item>
        <Text style={{ padding: 10, fontWeight: "bold" }}>Total : </Text>
        <Text style={{ padding: 10, fontWeight: "bold" }}>AED {total}</Text>
      </Item>
    );
  };

  render = () => {
    return (
      <Container>
        <MyHeader navigation={this.props.navigation} header="My Services" />

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
        <Content>
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
              marginTop: 10
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
      </Container>
    );
  };
}

const mapStateToProps = ({ token }) => ({ token });
const mapDispatchToProps = dispatch => ({
  visaServiceCreate: payload => dispatch(visaServiceCreate(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_Container);
