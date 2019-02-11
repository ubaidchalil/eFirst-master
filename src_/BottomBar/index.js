import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Footer, FooterTab, Button, Text, Icon } from 'native-base';
import {NavigationActions} from 'react-navigation';

export default class FooterTabsExample extends Component {  

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
        <Footer>
          <FooterTab style={{ backgroundColor: 'white', elevation: 5, borderTopColor: '#7F8C8D', borderTopWidth: 1, justifyContent: 'space-around'}}>
            <View style={{ alignItems:'center',  flex:1 }}  onPress={this.navigateToScreen('Dashboard')} >
              <Icon style={{ alignSelf:'center' }} name="speedometer" />
              <Text>Dashboard</Text>
            </View>
            <View style={{ alignItems:'center',  flex:1, borderRightColor: '#7F8C8D', borderRightWidth: 1, borderLeftColor: '#7F8C8D', borderLeftWidth: 1  }} >
              <Icon style={{ alignSelf:'center' }} name="add" />
              <Text>Request service</Text>
            </View>
            <View style={{ alignItems:'center', flex:1 }} >
              <Icon style={{ alignSelf:'center' }} name="list-box" />
              <Text>My Requests</Text>
            </View>
          </FooterTab>
        </Footer>
    );
  }
}
