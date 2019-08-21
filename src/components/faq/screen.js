import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import MyHeader from "../../Header";
import {
  Container,
  Header,
  Content,
  Accordion,
  Icon,
  Item,
  Input
} from "native-base";
const dataArray = [
  { title: "Question One", content: "Lorem ipsum dolor sit amet" },
  { title: "Question Two", content: "Lorem ipsum dolor sit amet" },
  { title: "Question Two", content: "Lorem ipsum dolor sit amet" },
  { title: "Question Two", content: "Lorem ipsum dolor sit amet" },
  { title: "Question Three", content: "Lorem ipsum dolor sit amet" }
];

export default class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: -1,
      faq: [],
      data: []
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const { faq } = data[0];
    this.setState({ selectedTabIndex: 0, data, faq });
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
          {item.FAQCategoryName}
        </Text>
      </View>
    );
  }

  _onTabListPressed(key, item) {
    const { faq } = item;
    this.setState({
      selectedTabIndex: key,
      faq
    });
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <MyHeader navigation={navigation} header="FAQ" toDashboard={true} />
        <Content>
          {this.state.data.map(item => (
            <Item>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("FAQDetail", {
                    faq: item.faq,
                    title: item.FAQCategoryName
                  })
                }
              >
                <Text
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    fontSize: 16,
                    padding: 10,
                    paddingHorizontal: 15
                  }}
                >
                  {item.FAQCategoryName}
                </Text>
              </TouchableOpacity>
            </Item>
          ))}
        </Content>
      </Container>
    );
  }
}

const styles = {
  tabItemText: {
    padding: 10,
    paddingHorizontal: 15,
    fontSize: 17
  },
  tabList: {
    paddingHorizontal: 10,
    backgroundColor: "#EAEDED"
  },
  tabItemTextSelected: {
    color: "#003366"
  }
};
