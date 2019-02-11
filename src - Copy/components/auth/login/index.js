import React, { Component } from 'react';
import LoginScreen from './screen';
import { connect } from 'react-redux';
import { loginUser } from '../action';

class Container extends Component {
	componentDidMount = () => {
		//if (this.props.user) this.props.navigation.navigate('Profile');
	};

	static getDerivedStateFromProps({ login, token, navigation }) {
		
		if(token) navigation.navigate('Home');
	}

	render = () => <LoginScreen {...this.props} />;
}
const mapStateToProps = ({ token, login }) => ({
	token,
	login
});
const mapDispatchToProps = dispatch => ({ loginUser: data => dispatch(loginUser(data)) });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
