import React, { Component } from "react";
import RegistrationScreen from "./screen";
import { connect } from "react-redux";
import { registerUser } from "../action";
import { View } from "react-native";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";
class Container extends Component {
  componentDidMount = () => {
    //if (this.props.user) this.props.navigation.navigate('Profile');
  };
  componentDidUpdate = () => {
    if (this.props.registration) {
      if (!this.props.registration.error && !this.props.registration.loading) {
        this.props.navigation.navigate("ConfirmEmail");
      }
    }
  };
  render = () => {
    const { loading, error, success } = this.props.registration;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <RegistrationScreen {...this.props} />
        {error && <AlertView type="error" />}
      </View>
    );
  };
}
const mapStateToProps = ({ registration }) => ({
  registration
});
const mapDispatchToProps = dispatch => ({
  registerUser: data => dispatch(registerUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
