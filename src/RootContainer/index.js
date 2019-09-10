import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import Navigator from "../navigator/root";
import { StatusBar, View, Platform, AsyncStorage } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { setOneSignalDeviceInfo } from "../components/onesignal/action";
import { connect } from "react-redux";
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 40 : StatusBar.currentHeight;
import OneSignal from "react-native-onesignal";
class RootContainer extends Component {
  constructor(props) {
    super(props);
    console.log("props---->", props);
  }
  componentDidMount() {
    OneSignal.init("83811424-4d3d-469e-adf6-f95169abe477", {
      kOSSettingsKeyAutoPrompt: true
    });
    OneSignal.addEventListener("received", this.onReceived);

    OneSignal.addEventListener("ids", this.onIds);

    OneSignal.configure(); // <-- add this line
    console.log("OneSignal==");
  }
  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onIds(device) {
    console.log("Device info: ", device);
    const playerid = device.userId;
    AsyncStorage.setItem("playerid", playerid);
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
const mapDispatchToProps = dispatch => ({
  setOneSignalDeviceInfo: data => dispatch(setOneSignalDeviceInfo(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer);
