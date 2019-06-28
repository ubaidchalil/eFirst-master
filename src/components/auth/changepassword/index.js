import React, { Component } from "react";
import ChangePassword from "./screen";
import { connect } from "react-redux";
import { registerUser } from "../action";
import { View } from "react-native";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";
import { forgetChangePassword } from "../action";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false
    };
  }
  componentDidMount = () => {
    //if (this.props.user) this.props.navigation.navigate('Profile');
  };
  updateState = value => this.setState({ updated: value });
  componentDidUpdate = () => {
    if (this.props.forgetchangepassword) {
      if (
        !this.props.forgetchangepassword.error &&
        !this.props.forgetchangepassword.loading &&
        this.props.forgetchangepassword.success &&
        this.state.updated
      ) {
        this.updateState(false);
        this.props.navigation.navigate("Auth");
      }
    }
  };
  render = () => {
    const { loading, error, success } = this.props.forgetchangepassword;
    const { Email } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <ChangePassword
          {...this.props}
          Email={Email}
          updateState={this.updateState}
        />
        {error && <AlertView type="error" />}
        {success && <AlertView type="success" />}
      </View>
    );
  };
}
const mapStateToProps = ({ forgetchangepassword }) => ({
  forgetchangepassword
});
const mapDispatchToProps = dispatch => ({
  registerUser: data => dispatch(registerUser(data)),
  changePassword: data => dispatch(forgetChangePassword(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
