import React, { Component } from "react";
import { Alert, View, AsyncStorage } from "react-native";
import LoginScreen from "./screen";
import { connect } from "react-redux";
import { loginUser, getExtLoginUrls } from "../action";
import { profileData } from "../../profile/action";
import { registerOnesignal } from "../../onesignal/action";
import { StateComponent } from "../../styled/components";
import AlertView from "../../styled/alert-view";
import Loader from "../../styled/loader";
class Container extends Component {
  componentDidMount = async () => {
    const palyerId = await AsyncStorage.getItem("playerid");
    console.log("playerid--->", palyerId);
    if (this.props.token) {
      this.props.navigation.navigate("SplashScreen");
    }
    this.props.getExtLoginUrls("0");
  };
  async componentDidUpdate(prevProps) {
    if (this.props.login.success && !prevProps.login.success) {
      if (this.props.token) {
        this.props.profileData(this.props.token.token);
      }
    }
    if (this.props.profile.success && !prevProps.profile.success) {
      const { UserId } = this.props.profile.data.userdetail;
      const PlayerId = await AsyncStorage.getItem("playerid");
      const data = { UserId, PlayerId };
      const token = this.props.token.token;
      this.props.registerOnesignal({ data, token });
      this.props.navigation.navigate("SplashScreen");
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
const mapStateToProps = ({
  token,
  login,
  confirmemail,
  extLoginUrls,
  onesignalInfo,
  profile
}) => ({
  token,
  login,
  confirmemail,
  extLoginUrls,
  onesignalInfo,
  profile
});

const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data)),
  getExtLoginUrls: data => dispatch(getExtLoginUrls(data)),
  registerOnesignal: data => dispatch(registerOnesignal(data)),
  profileData: payload => dispatch(profileData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
