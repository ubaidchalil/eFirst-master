import React, { Component } from "react";
import { connect } from "react-redux";
import { View, WebView } from "react-native";
import { getUserInfo } from '../action'

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = { token : "" };
  }

  componentDidMount = () => {
    
  };

  componentDidUpdate() {
    if (this.props.extUserInfo) {
      if (!this.props.extUserInfo.error && !this.props.extUserInfo.loading) {
        if(!this.props.extUserInfo.data.HasRegistered)
          this.props.navigation.navigate("RegisterExternal", {token: this.state.token});
      }
    }
  }

  _onNavigationStateChange = (webViewState) => {
    console.log(webViewState.url)
    var str = webViewState.url;
    var n = str.search("access_token");
    if(n<0) return;
    var m = str.substring(n+13,str.length);
    var eToken = m.split('&')[0];
    console.log("Token : " + eToken)
    this.setState({token: eToken});
    this.props.getUserInfo(eToken);
  }

  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{uri: this.props.navigation.state.params.uri}}
          userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
          style={{marginTop: 20}}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        />
      </View>
    );
  };
}


const mapStateToProps = ({ extUserInfo }) => ({
  extUserInfo
});
const mapDispatchToProps = dispatch => ({
  getUserInfo: eToken => dispatch(getUserInfo(eToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
