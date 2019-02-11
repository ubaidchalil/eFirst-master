import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Container, Content, Icon, Input, Text, Button, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material';
import Greeting from './UserActionItem';

export default class UserActions extends Component {
  render() {

    const user_action_item = [{
      date : "10/12/2018",
      document_dt : "Family Visa - VIS0192",
      document_info : "ATTESTATION",
      process : "Application Process" 
    },{
      date : "11/12/2018",
      document_dt : "Family Visa - VIS0199",
      document_info : "ATTESTATION",
      process : "Application Process" 
    }]

    const renderList = user_action_item.map((data) => {
      return (
        <Greeting user_action_item={ data }  />
      )
    })

    return (
      <StyleProvider style={getTheme(material)}>
      <Container>
        <Content>
          {renderList}
        </Content>
      </Container>
      </StyleProvider>
    );
  }
}
