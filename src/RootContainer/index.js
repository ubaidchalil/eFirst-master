import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import Navigator from "../navigator/root";
import { StatusBar, View, Platform } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { connect } from "react-redux";
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 40 : StatusBar.currentHeight;
class RootContainer extends Component {
  componentDidMount() {
    console.log("StatusBar==>", this.props.statusBar);
  }
  render = () => (
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ bottom: "never", top: "never" }}
    >
      {Platform.OS === "ios" &&
        (this.props.statusBar.statusBar && (
          <View
            style={{
              width: "100%",
              height: STATUS_BAR_HEIGHT,
              backgroundColor: "#183E61"
            }}
          >
            <StatusBar barStyle="light-content" />
          </View>
        ))}
      <StatusBar backgroundColor="#183E61" barStyle="light-content" />
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </SafeAreaView>
  );
}

const mapStateToProps = ({ statusBar }) => ({ statusBar });
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer);
