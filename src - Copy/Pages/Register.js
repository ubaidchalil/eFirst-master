import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Container, Content, Item, Input, Text, Button,StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components'
import material  from '../../native-base-theme/variables/material';

export default class Register extends Component {
  render() {

    let styles = StyleSheet.create({
      backgroundImage: {
        flex: 1,
        height: 270,
        resizeMode: 'cover', // or 'stretch'
      },
      formContent : {
         flex:1,
         padding: 20
      },
      marginTop : {
          marginTop: 15
      }
    });

    return (
      <StyleProvider style={getTheme(material)}>
      <Container>
        <Content>
          <View style={{alignItems: 'center'}} >
            <Image source={require('../Assets/header/header_register.jpg')} style={styles.backgroundImage} />
          </View>
          <View style={styles.formContent} >
            <Item style={styles.marginTop} >
              <Input placeholder="Name" />
            </Item>
            <Item style={styles.marginTop} >
              <Input placeholder="Email Address" />
            </Item>
            <Item style={styles.marginTop} >
              <Input placeholder="Password" />
            </Item>
            <Item style={styles.marginTop} >
              <Input placeholder="Confirm Password" />
            </Item>
              <Button style={styles.marginTop} full rounded >
                <Text>Register</Text>
              </Button>
            </View>
        </Content>
      </Container>
      </StyleProvider>
    );
  }
}
