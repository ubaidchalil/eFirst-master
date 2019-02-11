import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeScreen from './screen';

class Container extends Component {
	componentDidMount = () => {
		this.props.navigation.navigate("UserActions");
	};
	render = () => <HomeScreen {...this.props}/>
}

export default connect(
	
)(Container);
