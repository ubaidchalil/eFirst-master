import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Tabs, Tab, Text, Button, Input, Textarea, Form, Item, StyleProvider, Header, Body, Right, Icon } from 'native-base';
import getTheme from '../../../native-base-theme/components'
import material from '../../../native-base-theme/variables/material';
import Details from './Details'
import Documents from './Documents'
import SRDetails from './SRDetails'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal';

export default class ServiceDetails extends Component {

  
  constructor(props) {
    super(props);
      
      this.state = {
        showPopUp : false
      };
      this._renderModalContent = this._renderModalContent.bind(this);
    }
  


  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Item style={{ flexDirection: 'row', padding: 7 }} >
        <Text style={{ fontSize: 17, padding: 10, paddingHorizontal: 15 , flex: 0.9, fontWeight: "bold" }} >Send A Message</Text>
        <TouchableOpacity style={{ flex:0.1 }}  onPress={()=>this.setState({ showPopUp: false })} >
          <Icon name="close" />
        </TouchableOpacity>
      </Item >
      <View style={{ padding: 15 }} >
            <Form>
              <Item>
                <Input placeholder="Message Title" />
              </Item >
              <Item style={styles.item_margin} >
                <Textarea rowSpan={5} placeholder="Message" underline />
              </Item>
              <Button style={{ marginTop: 10 }} full rounded  onPress={()=>this.setState({ showPopUp: false })} > 
                <Text> SEND </Text>
              </Button>
            </Form>
      </View>
    </View>
  );


  render() {

    return (
      <StyleProvider style={getTheme(material)}>
      <Container>
        <Modal isVisible={this.state.showPopUp}>
          {this._renderModalContent()}
        </Modal>
      <Header style={{ backgroundColor: "#F7F9F9", height: 50 }}>
        <Body>
          <Text style={{ fontSize: 12, marginLeft: 5 }}>
            Family Visa - VISI0192 July
          </Text>
          <Text note  style={{ fontSize: 10, marginLeft: 5 }} >23, 2018 - 11:30</Text>
        </Body>
        <Right>
          <TouchableOpacity  onPress={()=>this.setState({ showPopUp: true })} >
            <View style={{ flexDirection: "row" }}>
              <IconMaterialIcons name="chat" style={{ fontSize: 20, color: "black" }} />
            </View>
          </TouchableOpacity>
        </Right>
      </Header>
        <Tabs>
            <Tab heading="Details">
              <Details />
            </Tab>
            <Tab heading="Documents">
              <Documents />
            </Tab>
            <Tab heading="SR Details">
              <SRDetails />
            </Tab>
          </Tabs>
      </Container>
      </StyleProvider>
    );
  }
}


const styles = {
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 13,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
};