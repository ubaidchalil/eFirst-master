import React, { Component } from "react";
import { connect } from "react-redux";
import { View, WebView } from "react-native";
import { getUserInfo, activateSR, servicesData } from "../action";

import { WEBSITE_URL } from "../../../constants";
import Loader from "../../styled/loader";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "", Requested: false };
  }

  componentDidMount = () => {
    const srid = this.props.navigation.state.params.srid;
    this.props.activateSR({ srid: srid, token: this.props.token.token });
    this.setState({ Requested: true });
  };

  componentDidUpdate() {
    if (
      !this.props.srActivation.loading &&
      !this.props.srActivation.error &&
      this.props.srActivation.success &&
      this.state.Requested
    ) {
      this.setState({ Requested: false });
      const { token } = this.props.token;
      const statusId = null;
      this.props.servicesData({ statusId, token });
      this.props.navigation.navigate("MyRequests");
    }
  }

  _onNavigationStateChange = webViewState => {
    console.log(webViewState.url);
    var str = webViewState.url;
    var n = str.indexOf("Success");
    const srid = this.props.navigation.state.params.srid;
    if (n >= 0) {
      this.props.activateSR({ srid: srid, token: this.props.token.token });
      this.setState({ Requested: true });
    }
    //    this.props.navigation.navigate("MyRequests");
  };

  render = () => {
    const { loading } = this.props.srActivation;
    const srid = this.props.navigation.state.params.srid;
    const userid = this.props.navigation.state.params.userid;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <WebView
          source={{
            uri: `https://staging.efirst.ae/MobilePayment/Index?srid=${srid}&userId=${userid}`
          }}
          userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
          style={{ marginTop: 20 }}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        />
      </View>
    );
  };
}

const mapStateToProps = ({ extUserInfo, token, srActivation }) => ({
  extUserInfo,
  token,
  srActivation
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: eToken => dispatch(getUserInfo(eToken)),
  activateSR: eToken => dispatch(activateSR(eToken)),
  servicesData: payload => dispatch(servicesData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
