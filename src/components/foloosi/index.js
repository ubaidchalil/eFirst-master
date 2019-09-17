import React, { Component } from "react";
import { connect } from "react-redux";
import { View, WebView } from "react-native";

import { PAYMENT_WEB_URL } from "../../constants";
import success from "./success";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      Requested: false,
      showWeb: true,
      type: "success"
    };
  }
  componentDidUpdate() {
    const { srid } = this.props.navigation.state.params;
    console.log(this.props.navigation.state.params);
    if (this.state.Requested) {
      this.props.navigation.navigate("FoloosiSuccess", {
        srid
      });
    }
  }
  _onNavigationStateChange = webViewState => {
    console.log("urls =>", webViewState.url);
    var str = webViewState.url;
    console.log("string===>", str);
    var s = str.indexOf("Success");
    var e = str.indexOf("Error Occured");
    if (s >= 0) {
      this.WebView.stopLoading();
      this.setState({ Requested: true, showWeb: false, type: "success" });
    }
    if (e >= 0) {
      this.WebView.stopLoading();
      this.setState({ Requested: true, showWeb: false, type: "error" });
    }
  };

  render = () => {
    const { Id } = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1 }}>
        {this.state.showWeb && (
          <WebView
            source={{
              uri: `${PAYMENT_WEB_URL}${Id}`
            }}
            userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
            style={{ marginTop: 20 }}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            ref={c => {
              this.WebView = c;
            }}
          />
        )}
      </View>
    );
  };
}

const mapStateToProps = ({ extUserInfo, token }) => ({
  extUserInfo,
  token
});

export default connect(
  mapStateToProps,
  null
)(Container);
