import React, { Component } from 'react';
import { View, Image, StyleSheet,StatusBar } from 'react-native';
import { Container, Content, Icon, Input, Text, Button,StyleProvider } from 'native-base';

export default class extends Component {

	render = () =>
		<View style={{flex:1,backgroundColor:'red'}}>
		
		
			<View style={styles.notifications} >
				<Icon style={styles.notification_text} name="notifications" />
				<Text style={styles.notification_text}  >You have 3 Updates</Text>
			</View>
		</View>
}
let styles = StyleSheet.create({

	notifications: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#003366',
		height: 60,
		alignItems: 'center',
	},
	notification_text: {
		color: 'white',
		padding: 5
	},

});
