import React, { Component } from "react";
import ForgetPasswordScreen from "./screen";
import { connect } from "react-redux";
import { resetPasswordUser } from "../action";
import { Alert } from "react-native";

class Container extends Component {
  componentDidMount = () => {
    //if (this.props.user) this.props.navigation.navigate('Profile');
  };
  componentDidUpdate() {
    if (!this.props.forgetpassword.loading) {
      if (this.props.forgetpassword.error) {
        Alert.alert("Failure", this.props.forgetpassword.error);
      } else {
        Alert.alert(
          "Success",
          "Please check your email to reset your password"
        );
      }
    }
  }
  render = () => <ForgetPasswordScreen {...this.props} />;
}

const mapStateToProps = ({ forgetpassword }) => ({
  forgetpassword
  //
});
const mapDispatchToProps = dispatch => ({
  resetPasswordUser: email => dispatch(resetPasswordUser(email))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
