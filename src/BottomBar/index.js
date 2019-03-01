import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container, Footer, FooterTab, Button, Text, Icon } from 'native-base';
import {NavigationActions} from 'react-navigation';
import IconAntDesign from "react-native-vector-icons/AntDesign";

export default class FooterTabs extends Component {  

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
        <Footer>
          <FooterTab style={{ backgroundColor: 'white', borderTopColor:'#F2F3F4', borderTopWidth:2, elevation: 1,shadowColor: '#000',shadowRadius: 2, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1,  justifyContent: 'space-around'}}>
            <TouchableOpacity  onPress={this.navigateToScreen('HomeScreen')} style={{ alignItems:'center',  flex:1 }}  >
              <View style={{ padding: 5 }} >
                <IconAntDesign style={{ alignSelf:'center', color: '#003366', fontSize: 23 }} name="dashboard" />
                <Text style={{ alignSelf:'center', color: '#003366', fontSize: 13 }}>Dashboard</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems:'center',  flex:1, borderRightColor: '#D7DBDD', borderRightWidth: 1, borderLeftColor: '#D7DBDD', borderLeftWidth: 1  }}
              onPress={this.navigateToScreen('RequestService')}  >
              <View style={{ padding: 5 }} >
                <IconAntDesign style={{ alignSelf:'center', color: '#003366', fontSize: 23 }} name="addfile" />
                <Text style={{ alignSelf:'center', color: '#003366', fontSize: 13 }}>Request a service</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems:'center', flex:1 }} onPress={this.navigateToScreen('MyRequests')}  >
              <View style={{ padding: 5 }} >
                <IconAntDesign style={{ alignSelf:'center', color: '#003366', fontSize: 23  }} name="filetext1" />
                <Text style={{ alignSelf:'center', color: '#003366', fontSize: 13 }}>My Requests</Text>
              </View>
            </TouchableOpacity>
          </FooterTab>
        </Footer>
    );
  }
}
