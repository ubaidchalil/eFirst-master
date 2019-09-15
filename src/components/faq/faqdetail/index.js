import React, { Component } from "react";
import { View, Text, BackHandler } from "react-native";
import MyHeader from "../../../Header";
import { Container, Accordion, Content } from "native-base";
export default class FAQDetail extends Component {
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  _renderAccordionContent(item) {
    return (
      <Text
        style={{
          padding: 10,
          paddingHorizontal: 15
        }}
      >
        {item.FAQAnswer}
      </Text>
    );
  }

  _renderAccordionHeader(item, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 12,
          paddingHorizontal: 15,
          fontSize: 15,
          justifyContent: "space-between",
          borderTopWidth: 1,
          borderTopColor: "#EAEDED",
          alignItems: "center"
        }}
      >
        <Text
          style={{ backgroundColor: "white", fontSize: 16, color: "black" }}
        >
          {" "}
          {item.FAQuestion}
        </Text>
      </View>
    );
  }
  render = () => {
    const { faq, title } = this.props.navigation.state.params;
    console.log("FAQ=>", faq);
    return (
      <View style={{ flex: 1 }}>
        <MyHeader navigation={this.props.navigation} header={title} />
        <Container>
          <Content>
            <Accordion
              style={{ borderBottomColor: "#EAEDED", borderBottomWidth: 1 }}
              dataArray={faq}
              expanded={false}
              renderHeader={this._renderAccordionHeader}
              renderContent={this._renderAccordionContent}
            />
          </Content>
        </Container>
      </View>
    );
  };
}
