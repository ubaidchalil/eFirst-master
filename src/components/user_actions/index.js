import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserActions from './screen';

class Container extends Component {
	render = () => <UserActions {...this.props}/>
}

export default connect(
	
)(Container);
