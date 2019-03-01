import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Container, Picker, Content, Form, Item, Input, Icon, CheckBox, Text, ListItem, Button, Textarea, Header, Left, Right, Body } from 'native-base';
import {NavigationActions} from 'react-navigation';
import MyHeader from '../../../Header'

var ImagePicker = require('react-native-image-picker');

export default ({ navigation }) => {

  navigateToScreen = (route) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    navigation.dispatch(navigateAction);
  }
  

  openImgPicker = () => {
    console.log(ImagePicker);
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      
      /**
       * The first arg is the options object for customization (it can also be null or omitted for default options),
       * The second arg is the callback which sends object: response (more info in the API Reference)
       */
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            avatarSource: source,
          });
        }
      });
  }

  return (
    <Container>
      <MyHeader navigation={navigation} header="My Services" />
        <Header style={{ backgroundColor:'#F7F9F9', height: 50 }} >
          <Body>
            <Text style={{ color: '#99A3A4', fontSize: 14, marginLeft: 5 }} >LANGUAGE TRANSLATION</Text>
          </Body>
          <Right >
            <View style={{ flexDirection: 'row'}}  >
              <Icon name="alert" style={{ fontSize: 20, color: '#F39C12'  }} /> 
              <Text > Info</Text>
            </View>
          </Right>
        </Header>
        <Content style={{padding:10}} >
          <ScrollView>
            <Form>
              <Item>
                <Input placeholder="Name" />
              </Item >
              <Item style={styles.item_margin} >
                <Input placeholder="Email" />
              </Item>
              <Item style={styles.item_margin} >
                <Input placeholder="Mobile" />
                <Input placeholder="Office" />
              </Item>
              <Item style={styles.item_margin} >
                <Textarea rowSpan={5} placeholder="Address" underline />
              </Item>
              <Item style={styles.item_margin} >
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Document Type"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                >
                </Picker>
              </Item>
              <Item style={styles.item_margin} >
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Document Language"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                >
                </Picker>
              </Item>
              <Item style={styles.item_margin} >
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Document to be Translated"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                >
                </Picker>
              </Item>
              <ListItem style={[styles.item_margin, { borderBottomWidth:0 }]} >
                <CheckBox checked={true} />
                <Body>
                  <Text>Legal Stamp</Text>
                </Body>
              </ListItem>
              <Item style={{ borderBottomWidth:0 }} >
                <Text>Upload File </Text>
              </Item>
              <View style={{ alignItems: 'center', marginTop: 7 }}>
                <View style={{ flexDirection: 'row', borderWidth:1, borderColor:'#CACFD2', borderRadius: 10 }}>
                  <Button transparent dark style={{ alignItems:'center' }} 
                  onPress={this.openImgPicker()}
                  >
                    <Icon name="camera" />
                    <Text>Camera</Text>
                  </Button>
                  <Button transparent dark style={{  borderLeftWidth:1, borderLeftColor:'#CACFD2', alignItems:'center' }} >
                    <Icon name="albums" />
                    <Text>Album</Text>
                  </Button>
                </View>
              </View>
              <View>
                <Text style={{textAlign: 'center', color: 'red' , padding: 10, fontWeight: 'bold'}} >Rate : 200 AED</Text>
              </View>
              <Button style={{ backgroudColor:"#183E61", marginBottom: 50 }} full rounded > 
                <Text> Pay Now </Text>
              </Button>
            </Form>
          </ScrollView>
        </Content>
      </Container>
  );
};


const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
    marginTop: 10,
  },
  title: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ABB2B9',
    backgroundColor: '#003366',
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
  },
  title_text: {
    textAlign: 'center',
    padding: 15,
    color: 'white'
  },
  body: {
    backgroundColor: '#003366',
    padding: 15,
  },
  body_text: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white'
  },
  footer: {
    alignItems: 'center',
    backgroundColor: '#DC1F1F',
    padding: 13,
    borderBottomRightRadius: 13,
    borderBottomLeftRadius: 13,
  },
  footer_text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
});
