import React, { Component } from "react";
import { connect } from "react-redux";
import ChangePassword from "./screen";
import { changePassword } from "../action";
import Loader from "../../styled/loader";
import { View } from "react-native";
class Container extends Component {
  render() {
    const {
      support: { loading }
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <Support {...this.props} />
      </View>
    );
  }
}

const mapStateToProps = ({ token, support }) => ({
  token,
  changepassword
});

const mapDispatchToProps = dispatch => ({
  changePassword: payload => dispatch(changePassword(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
