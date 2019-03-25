import React, { Component } from "react";
import { Alert, View } from "react-native";
import LoginScreen from "./screen";
import { connect } from "react-redux";
import { loginUser } from "../action";
import AlertView from "../../styled/alert-view";
import Loader from "../../styled/loader";
import { DashboardData } from "../../dashboard/action";
class Container extends Component {
  componentDidMount = () => {
    if (this.props.token) {
      //this.props.DashboardData(this.props.token);
      this.props.navigation.navigate("Process");
    }
  };
  componentDidUpdate() {
    if (!this.props.login.loading) {
      if (this.props.token) {
        this.props.navigation.navigate("Process");
      }
    }
  }

  render = () => (
    <View style={{ flex: 1 }}>
      <Loader loading={this.props.login.loading} />
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
const mapStateToProps = ({ token, login, confirmemail, dashboard }) => ({
  token,
  login,
  confirmemail,
  dashboard
});

const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data)),
  DashboardData: payload => dispatch(DashboardData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
