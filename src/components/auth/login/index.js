import React, { Component } from "react";
import { Alert } from "react-native";
import LoginScreen from "./screen";
import { connect } from "react-redux";
import { loginUser } from "../action";
import { StateComponent } from "../../styled/components";

class Container extends Component {
  componentDidMount = () => {
    if (this.props.token) {
      this.props.navigation.navigate("Home");
    }
  };
  // 	componentDidUpdate(prevProps){
  // 		if (prevProps.login.loading === true && this.props.login.loading === false) {
  // 			if(this.props.token){
  // 				console.log(this.props.login.loading,this.props.token)
  // 			}
  // 		}
  //   }
  componentDidUpdate() {
    if (!this.props.login.loading) {
      if (this.props.token) {
        this.props.navigation.navigate("DocumentAttestationScreen");
      } else {
        Alert.alert("Alert", "Entered username or password is incorrect");
      }
    }
  }

  render = () =>
    this.props.login.loading || this.props.login.error ? (
      <StateComponent
        loading={this.props.login.loading}
        error={this.props.login.error}
        onPress={() => this.props.navigation.navigate.goBack(null)}
      />
    ) : (
      <LoginScreen {...this.props} />
    );
}
const mapStateToProps = ({ token, login }) => ({
  token,
  login
});
const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
