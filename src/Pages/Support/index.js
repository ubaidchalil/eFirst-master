import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Accordion, Icon, Item, Input } from "native-base";
const dataArray = [
  { title: "Question One", content: "Lorem ipsum dolor sit amet" },
  { title: "Question Two", content: "Lorem ipsum dolor sit amet" },
  { title: "Question Two", content: "Lorem ipsum dolor sit amet" },
  { title: "Question Two", content: "Lorem ipsum dolor sit amet" },
  { title: "Question Three", content: "Lorem ipsum dolor sit amet" }
];


export default class AccordionExample extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedTabIndex : 2
    }
  }

  _renderAccordionContent(item) {
    return (
      <Text
        style={{
          padding: 10,
          paddingHorizontal: 15,
        }}
      >
        {item.content}
      </Text>
    );
  }

  _renderAccordionHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 12,
        paddingHorizontal: 15,
        fontSize: 15,
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: '#EAEDED',
        alignItems: "center" , }}>
      <Text style={{ backgroundColor: 'white',fontSize: 16, color: 'black' }}>
          {" "}{item.title}
        </Text>
      </View>
    );
  }

  _onTabListPressed(key) {
    this.setState({
      selectedTabIndex : key
    });
  }

  render() {
    return (
      <Container>
        <Content >

          <Item style={{ paddingHorizontal: 10 }} >
            <Input placeholder="Search" />
            <Icon name="search" />
          </Item>
          <Item>
            <Text style={{ backgroundColor: 'white', color: 'black', fontSize: 16, padding:10, paddingHorizontal:15 }}  >Categories</Text>
          </Item>

        <FlatList
          horizonal={true} 
          data={[
            {key: 'Cat1'},
            {key: 'Cat2'},
            {key: 'Cat3'},
            {key: 'Cat4'}
          ]}
          style={styles.tabList}
          horizontal={true}
          renderItem={
            ({item, index}) => 
            <TouchableOpacity onPress={()=>this._onTabListPressed(index)} >
              <Text style={[styles.tabItemText, this.state.selectedTabIndex==index ? styles.tabItemTextSelected : {} ]} >{item.key}{this.state.selectedTabIndex==index ? "11" : "22" }</Text>
            </TouchableOpacity >
          }
        />

          <Accordion style={{ borderBottomColor: '#EAEDED', borderBottomWidth: 1 }} dataArray={dataArray} expanded={0}
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
    backgroundColor: '#EAEDED'
  },
  tabItemTextSelected: {
    color: '#003366',
  }
}