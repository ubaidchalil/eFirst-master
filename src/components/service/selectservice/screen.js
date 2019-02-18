import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Container, Content, Item, H3, Text, Button,Header, Left, Right, Title, Body, Icon } from 'native-base';
import {NavigationActions} from 'react-navigation';

export default ({ navigation }) => {

  navigateToScreen = (route) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    navigation.dispatch(navigateAction);
  }


  return (
    <Container>
    <Header style={{ backgroundColor: '#003366' }} >
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()} >
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>My Services</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='notifications' />
          </Button>
          <Button transparent onPress={() => this.navigateToScreen("Profile")}>
            <Icon name='contact' />
          </Button>
        </Right>
      </Header>
      <Content style={{padding: 10}} >
        <View style={styles.main} >
          <View style={styles.title} >
              <H3 style={styles.title_text}>DOCUMENT ATTESTATION</H3>
          </View>
          <View style={styles.body} >
              <Text style={styles.body_text}>Lorem Ipsum</Text>
          </View>
          <View style={styles.footer} >
              <TouchableOpacity  onPress={() => this.navigateToScreen("DocumentAttestation")} >
                  <Text style={styles.footer_text}>Apply Now</Text>
              </TouchableOpacity>
          </View>
      </View>
      <View style={styles.main} >
          <View style={styles.title} >
              <H3 style={styles.title_text}>LANGUAGE TRANSLATION</H3>
          </View>
          <View style={styles.body} >
              <Text style={styles.body_text}>Lorem Ipsum..</Text>
          </View>
          <View style={styles.footer} >
              <TouchableOpacity onPress={() => this.navigateToScreen("LanguageTranslation")}  >
                  <Text style={styles.footer_text}>Apply Now</Text>
              </TouchableOpacity>
          </View>
       </View>
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
