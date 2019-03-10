import React, { Component } from "react";
import ConfirmEmail from "./screen";
import { connect } from "react-redux";
import { confirmEmail } from "../action";
import { Alert } from "react-native";
import { View } from "react-native";
import AlertView from "../../styled/alert-view";
import Loader from "../../styled/loader";
class Container extends Component {
  componentDidMount = () => {
    //if (this.props.user) this.props.navigation.navigate('Profile');
  };
  componentDidUpdate() {
    if (!this.props.confirmemail.loading) {
      if (this.props.confirmemail.success) {
        this.props.navigation.navigate("Login");
      }
    }
  }
  render = () => {
    const { error, loading } = this.props.confirmemail;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <ConfirmEmail {...this.props} />
        {error ? <AlertView type="error" message="Invalid code" /> : null}
        <AlertView
          type="success"
          message="Please check your email to get verification code"
        />
      </View>
    );
  };
}

const mapStateToProps = ({ registration, confirmemail }) => ({
  registration,
  confirmemail
  //
});
const mapDispatchToProps = dispatch => ({
  confirmEmail: payload => dispatch(confirmEmail(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
