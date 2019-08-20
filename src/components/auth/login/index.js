import React, { Component } from "react";
import { Alert, View } from "react-native";
import LoginScreen from "./screen";
import { connect } from "react-redux";
import { loginUser, getExtLoginUrls } from "../action";

import { StateComponent } from "../../styled/components";
import AlertView from "../../styled/alert-view";
import Loader from "../../styled/loader";
class Container extends Component {
  componentDidMount = () => {
    if (this.props.token) {
      this.props.navigation.navigate("SplashScreen");
    }
    this.props.getExtLoginUrls("0");
  };
  componentDidUpdate() {
    if (!this.props.login.loading) {
      if (this.props.token) {
        this.props.navigation.navigate("SplashScreen");
      }
    }
  }

  render = () => (
    <View style={{ flex: 1 }}>
      {/* <Loader loading={this.props.login.loading} /> */}
      <LoginScreen {...this.props} />
      {this.props.confirmemail.success && (
        <AlertView
          type="success"
          message="Verification completed successfully. Pls Login.."
        />
      )}
      {this.props.login.error && (
        <AlertView
          type="error"
          message="Entered username or password is incorrect"
        />
      )}
    </View>
  );
}
const mapStateToProps = ({ token, login, confirmemail, extLoginUrls }) => ({
  token,
  login,
  confirmemail,
  extLoginUrls
});

const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data)),
  getExtLoginUrls: data => dispatch(getExtLoginUrls(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
