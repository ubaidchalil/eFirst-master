import React, { Component } from "react";
import ChangePassword from "./screen";
import { connect } from "react-redux";
import { registerUser } from "../action";
import { View } from "react-native";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";
import { forgetChangePassword } from "../action";

class Container extends Component {
  componentDidMount = () => {
    //if (this.props.user) this.props.navigation.navigate('Profile');
  };
  componentDidUpdate = () => {
    if (this.props.forgetchangepassword) {
      if (
        !this.props.forgetchangepassword.error &&
        !this.props.forgetchangepassword.loading &&
        this.props.forgetchangepassword.success
      ) {
        this.props.navigation.navigate("Login");
      }
    }
  };
  render = () => {
    const { loading, error, success } = this.props.registration;
    const { Email } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <ChangePassword {...this.props} Email={Email} />
        {error && <AlertView type="error" />}
      </View>
    );
  };
}
const mapStateToProps = ({ registration }) => ({
  registration
});
const mapDispatchToProps = dispatch => ({
  registerUser: data => dispatch(registerUser(data)),
  changePassword: data => dispatch(forgetChangePassword(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
