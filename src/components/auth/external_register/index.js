import React, { Component } from "react";
import RegistrationScreen from "./screen";
import { connect } from "react-redux";
import { extRegisterUser, getUserInfo, setExtToken } from "../action";
import { View } from "react-native";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";
class Container extends Component {
  componentDidMount = () => {
    //if (this.props.user) this.props.navigation.navigate('Profile');
  };
  constructor(props) {
    super(props);
    this.state = {
      extRegRequested: false,
      userInfoChecked: false
    };
  }
  requestExtRegistration = () => {
    this.setState({ extRegRequested: true });
  };
  componentDidUpdate = () => {
    if (this.props.extRegistration) {
      if (
        !this.props.extRegistration.error &&
        !this.props.extRegistration.loading &&
        this.props.extRegistration.data &&
        this.state.extRegRequested
      ) {
        this.setState({ extRegRequested: false, userInfoChecked: true });
        const { token } = this.props.navigation.state.params;
        this.props.getUserInfo(token);
      }
    }

    if (this.props.extUserInfo) {
      if (
        !this.props.extUserInfo.error &&
        !this.props.extUserInfo.loading &&
        this.props.extUserInfo.data &&
        this.state.userInfoChecked
      ) {
        if (!this.props.extUserInfo.data.HasRegistered) {
          const { token } = this.props.navigation.state.params;
          const { Email } = this.props.extUserInfo.data;
          this.props.token
            ? this.props.navigation.navigate("Home")
            : this.props.setExtToken({ access_token: token, username: Email });
        }
      }
    }
  };
  render = () => {
    const { loading, error, success } = this.props.extRegistration;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <RegistrationScreen
          {...this.props}
          requestExtRegistration={this.requestExtRegistration}
        />
        {error && (
          <AlertView
            type="error"
            message="Already registered with this mail id"
          />
        )}
      </View>
    );
  };
}

const mapStateToProps = ({ extRegistration, token, extUserInfo }) => ({
  extRegistration,
  token,
  extUserInfo
});
const mapDispatchToProps = dispatch => ({
  extRegisterUser: data => dispatch(extRegisterUser(data)),
  getUserInfo: extToken => dispatch(getUserInfo(extToken)),
  setExtToken: data => dispatch(setExtToken(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
