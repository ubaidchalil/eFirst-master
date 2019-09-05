import React, { Component } from "react";
import { connect } from "react-redux";
import { ImageBackground, View, AsyncStorage, StatusBar } from "react-native";
import { Button, Text } from "native-base";
import { DASHBOARD_DATA_URL } from "../../constants";
import { NavigationActions } from "react-navigation";
import { setStatusBar } from "./action";
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: ""
    };
  }
  navigateTo = page => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: page })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  async getIn() {
    const { token } = this.props.token;
    const result = await fetch(DASHBOARD_DATA_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }).catch(error => {
      this.setState({ error });
      this.setState({ loading: false });
    });
    if (!result) return;
    const data = await result.json();
    const {
      ActionRequiredNewUpdateCount,
      ActionRequiredTotalUpdateCount,
      CompletedNewUpdateCount,
      CompletedTotalUpdateCount,
      InReviewNewUpdateCount,
      InReviewTotalUpdateCount,
      RejectedNewUpdateCount,
      RejectedTotalUpdateCount
    } = data.Tiles;

    const total =
      ActionRequiredNewUpdateCount +
      ActionRequiredTotalUpdateCount +
      CompletedNewUpdateCount +
      CompletedTotalUpdateCount +
      InReviewNewUpdateCount +
      InReviewTotalUpdateCount +
      RejectedNewUpdateCount +
      RejectedTotalUpdateCount;

    if (total > 0) {
      this.props.setStatusBar(true);
      this.props.navigation.navigate("Home");
    } else {
      this.props.setStatusBar(true);
      this.props.navigation.navigate("SelectService");
    }
  }

  async componentDidMount() {
    try {
      this.props.setStatusBar(false);
      const value = await AsyncStorage.getItem("InitialLogin");
  /*    if (value !== null) {
        if (this.props.token) await this.getIn();
        else {
          this.props.setStatusBar(true);
          this.props.navigation.push("Auth");
        }
      } else */{
        AsyncStorage.setItem("InitialLogin", "1");
        this.setState({ loading: false });
      }
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render = () => {
    return (
      <ImageBackground
        source={require("../../Assets/bg/lang_selection.jpg")}
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "row",
          alignItems: "flex-end"
        }}
      >
        <StatusBar hidden />
        <View style={{ flex: 1, padding: 2 }}>
          {this.state.error ? (
            <View style={{ marginBottom: "10%", alignItems: "center" }}>
              <Text style={{ color: "red", fontSize: 17 }}>
                Network connection failed
              </Text>
            </View>
          ) : !this.state.loading ? (
            <Button
              full
              onPress={() => this.props.navigation.push("SplashSlider")}
              style={{ backgroundColor: "#183E61" }}
            >
              <Text style={{ fontSize: 20 }}>English</Text>
            </Button>
          ) : (
            <View style={{ marginBottom: "10%", alignItems: "center" }}>
              <Text style={{ color: "#FFF", fontSize: 17 }}>Loading..</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    );
  };
}

const mapStateToProps = ({ token }) => ({ token });
const mapDispatchToProps = dispatch => ({
  setStatusBar: payload => dispatch(setStatusBar(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);
