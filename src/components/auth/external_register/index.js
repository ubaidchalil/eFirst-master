import React, { Component } from "react";
import RegistrationScreen from "./screen";
import { connect } from "react-redux";
import { extRegisterUser } from "../action";
import { View } from "react-native";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";
class Container extends Component {
  componentDidMount = () => {
    //if (this.props.user) this.props.navigation.navigate('Profile');
  };

  componentDidUpdate = () => {
    
   };
  render = () => {
    const { loading, error, success } = this.props.extRegistration;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <RegistrationScreen {...this.props} />
        {error && <AlertView type="error" />}
      </View>
    );
  };
}

const mapStateToProps = ({ extRegistration }) => ({
  extRegistration
});
const mapDispatchToProps = dispatch => ({
  extRegisterUser: (data) => dispatch(extRegisterUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
