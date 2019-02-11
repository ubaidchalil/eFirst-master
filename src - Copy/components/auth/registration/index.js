import React, { Component } from 'react';
import RegistrationScreen from './screen';
import { connect } from 'react-redux';
import { registerUser } from '../action';

class Container extends Component {
	componentDidMount = () => {
		//if (this.props.user) this.props.navigation.navigate('Profile');
	};
	render = () => <RegistrationScreen {...this.props} />;
}
const mapStateToProps = ({  registration }) => ({
	registration
});
const mapDispatchToProps = dispatch => ({ registerUser: data => dispatch(registerUser(data)) });

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
