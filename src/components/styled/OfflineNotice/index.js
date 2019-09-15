import React, { PureComponent } from "react";
import { View, Text, NetInfo, Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}
class OfflineNotice extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setTimeout(this.hideview, 5000);
  }
  hideview = () => {
    console.log("changeInternetStatus1");
    const { changeInternetStatus } = this.props;
    changeInternetStatus(true);
  };
  render() {
    const { isConnected } = this.props;
    console.log(this.props);
    return <MiniOfflineSign />;
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width,
    position: "absolute",
    top: 0
  },
  offlineText: {
    color: "#fff"
  }
});
export default OfflineNotice;
