import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
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
            <TouchableOpacity  onPress={this.navigateToScreen('HomeScreen')} style={{ alignItems:'center',  flex:1 }}  >
              <View  >
                <Icon style={{ alignSelf:'center' }} name="speedometer" />
                <Text>Dashboards</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems:'center',  flex:1, borderRightColor: '#7F8C8D', borderRightWidth: 1, borderLeftColor: '#7F8C8D', borderLeftWidth: 1  }}
              onPress={this.navigateToScreen('RequestService')}  >
              <View >
                <Icon style={{ alignSelf:'center' }} name="add" />
                <Text>Request service</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems:'center', flex:1 }} onPress={this.navigateToScreen('MyRequests')}  >
              <View  >
                <Icon style={{ alignSelf:'center' }} name="list-box" />
                <Text>My Requests</Text>
              </View>
            </TouchableOpacity>
          </FooterTab>
        </Footer>
    );
  }
}
