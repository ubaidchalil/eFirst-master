import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Container, Content, Icon, Input, Text, Button,StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components'
import material  from '../../native-base-theme/variables/material';

export default class DashboardNotifications extends Component {
  render() {

    let styles = StyleSheet.create({
      backgroundImage: {
        flex: 1,
        height: 270,
        resizeMode: 'cover', // or 'stretch'
      },
      notifications: {
        flex: 1,
        flexDirection : 'row',
        backgroundColor: '#003366',
        height: 60,
        padding: 10,
        alignItems: 'center',
      },
      notification_text: {
        color: 'white',
        padding: 5
      },
      card_outer: {
        height: 150, 
        backgroundColor: '#FEF8A2',
         alignItems: 'center'
      },
      card_inner: {
        height: 150,
        flexDirection:'row', 
        alignItems: 'center', 
        justifyContent: 'space-around'
      },
      card_image_container: {
         width: 130,
         height: 100, 
         overflow: 'hidden', 
         alignItems: 'center'
      },
      card_image: {
          height: 100, 
          width: 115, 
          resizeMode: 'contain' 
      },
      card_content_outer : {
        width: 200, 
        height: 100, 
        justifyContent: 'center', 
        padding: 10
      },
      catd_content_main: {
        fontSize: 22, 
        color: '#515A5A'
      },
      card_content_left: {
        fontSize: 13, 
        color: 'yellow'
      },
      card_content_right: {
        fontSize: 13, 
        color: '#515A5A'
      }
    });

    return (
      <StyleProvider style={getTheme(material)}>
      <Container>
        <Content>
          <View>
            <View style={styles.notifications} >
              <Icon style={styles.notification_text}  name="notifications" />
              <Text style={styles.notification_text}  >You have 3 Updates</Text>
            </View>
          </View>
          <View style={styles.card_outer} >
            <View style={styles.card_inner} >
              <View style={styles.card_image_container} >
                <Image source={require('../Assets/tickets/ticket_required.png')} 
                  style={styles.card_image}
                />
              </View>
              <View style={styles.card_content_outer} >
                <View>
                  <Text style={ styles.catd_content_main } >Action Required</Text>
                </View>
                <View style={{ flexDirection: 'row'}} >
                  <Text style={ styles.card_content_left } >2 Updates</Text> 
                  <Text style={ styles.card_content_right } > | 12 Updates</Text>
                </View>
              </View>
              <View>
                <Icon style={{ color: '#515A5A' }} name="arrow-dropright" />
              </View>
            </View>
          </View>
          <View style={{height: 150, backgroundColor: '#98D9EA'}} >

          </View>
        </Content>
      </Container>
      </StyleProvider>
    );
  }
}
