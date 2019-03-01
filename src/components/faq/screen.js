import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import MyHeader from '../../Header'
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
          {item.FAQuestion}
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
        <MyHeader navigation={navigation} header="FAQ" />
        <Content>
          <Item style={{ paddingHorizontal: 10 }}>
            <Input placeholder="Search" />
            <Icon name="search" />
          </Item>
          <Item>
            <Text
              style={{
                backgroundColor: "white",
                color: "black",
                fontSize: 16,
                padding: 10,
                paddingHorizontal: 15
              }}
            >
              Categories
            </Text>
          </Item>

          <FlatList
            horizonal={true}
            data={this.state.data}
            style={styles.tabList}
            horizontal={true}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() => this._onTabListPressed(index, item)}
              >
                <Text
                  style={[
                    styles.tabItemText,
                    this.state.selectedTabIndex == index
                      ? styles.tabItemTextSelected
                      : {}
                  ]}
                >
                  {item.FAQCategoryName}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Accordion
            style={{ borderBottomColor: "#EAEDED", borderBottomWidth: 1 }}
            dataArray={this.state.faq}
            expanded={false}
            renderHeader={this._renderAccordionHeader}
            renderContent={this._renderAccordionContent}
          />
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
