import React, { Component } from "react";
import { connect } from "react-redux";
import Support from "./screen";
import { supportCreate } from "./action";
import Loader from "../styled/loader";
import { View } from "react-native";
import AlertView from "../styled/alert-view";
class Container extends Component {
  render() {
    const {
      support: { loading, success }
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <Support {...this.props} />
        {success && (
          <AlertView type="success" message="Your request has been submitted" />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ token, support, profile }) => ({
  token,
  support,
  profile
});

const mapDispatchToProps = dispatch => ({
  supportCreate: payload => dispatch(supportCreate(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
