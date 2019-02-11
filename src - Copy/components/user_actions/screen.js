import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Container, Content, Icon, Input, Text, Button, StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components'
import material from '../../../native-base-theme/variables/material';
let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: 270,
    resizeMode: 'cover', // or 'stretch'
  },

});


export default ({ navigation }) => (
  <StyleProvider style={getTheme(material)}>
  <Container>
    <Content>
      <View style={{ flexDirection: 'row', borderColor: 'yellow', borderWidth: 2, borderRadius: 10, height: 100, flex: 1, backgroundColor: 'red' }} >
      <Text> asdfasdfsdf</Text>
      </View>
    </Content>
  </Container>
  </StyleProvider>

)


