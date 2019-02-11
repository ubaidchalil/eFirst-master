import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Container, Content, Item, Input, Text, Button,StyleProvider, Icon } from 'native-base';
import getTheme from '../../native-base-theme/components'
import material  from '../../native-base-theme/variables/material';

export default class Login extends Component {
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
            <Image source={require('../Assets/header/header_login.jpg')} style={styles.backgroundImage} />
          </View>
          <View style={styles.formContent} >
            <Item style={styles.marginTop} >
              <Input placeholder="Email Address" />
            </Item>
            <Item style={styles.marginTop} >
              <Input placeholder="Password" />
            </Item>
              <Button style={styles.marginTop} full rounded >
                <Text>Login</Text>
              </Button>
              <Button style={styles.marginTop} full rounded transparent >
                <Text>Forgot your password?</Text>
              </Button>
         </View>
        </Content>
      </Container>
      </StyleProvider>
    );
  }
}
