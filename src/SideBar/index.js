import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Item,
  Text,
  Icon,
  Left,
  Body,
  Right,
  List,
  Thumbnail
} from "native-base";
import { NavigationActions, DrawerActions } from "react-navigation";
import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { Logout, clearLogoutState } from "../components/auth/action";
import { unregisterOnesignal } from "../components/onesignal/action";
import Loader from "../components/styled/loader";
import { DashboardData } from "../components/dashboard/action";
import { servicesData } from "../components/service/action";
import { PROFILE_BASE_URL } from "../constants";
class Container1 extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };
  navigateToHome = route => () => {
    const { token } = this.props.token;
    this.props.DashboardData(token);
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };
  componentDidUpdate(prevProps) {
    if (this.props.logout.success && !prevProps.logout.success) {
      this.props.navigation.navigate("Auth");
      this.props.clearLogoutState();
    }
    if (this.props.onesignal.success && !prevProps.onesignal.success) {
      const { token } = this.props.token;
      this.props.Logout(token);
    }
  }

  onLogout = async () => {
    const { UserId } = this.props.userdetail;
    const PlayerId = await AsyncStorage.getItem("playerid");
    const data = { UserId, PlayerId };
    const token = this.props.token.token;
    this.props.unregisterOnesignal({ data, token });
  };

  render() {
    return (
      <Container>
        <Loader
          loading={this.props.logout.loading || this.props.onesignal.loading}
        />
        <View
          style={{
            backgroundColor: "white",
            height: 150,
            alignItems: "flex-start"
          }}
        >
          <View style={{ height: 60, padding: 10 }}>
            <Image
              source={require("./logo.png")}
              style={{
                height: 50,
                width: 100,
                resizeMode: "contain",
                alignSelf: "flex-start"
              }}
            />
          </View>
          <View style={{ height: 30, backgroundColor: "yellow" }} />
          <View style={{ flexDirection: "row" }}>
            <View style={{ paddingLeft: 7, paddingRight: 7 }}>
              {this.props.userdetail.ProfilePic ? (
                <Thumbnail
                  small
                  source={{
                    uri: `${PROFILE_BASE_URL}${this.props.userdetail.ProfilePic}`
                  }}
                />
              ) : (
                <Thumbnail small source={require("./user_menu.png")} />
              )}
            </View>

            <View>
              <Text>{this.props.userdetail.FirstName}</Text>
              <Text note style={{ color: "#183E61" }}>
                {this.props.userdetail.Designation}
              </Text>
            </View>
          </View>
        </View>
        <Content style={{ backgroundColor: "#003366" }}>
          <ScrollView>
            <TouchableOpacity
              style={styles.listItem}
              onPress={this.navigateToHome("HomeScreen")}
            >
              <View style={styles.left}>
                <Icon style={styles.icon} name="md-arrow-dropright" />
              </View>
              <View style={styles.body}>
                <Text style={styles.text}>Dashboard</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                const { token } = this.props.token;
                const statusId = null;
                this.props.servicesData({ statusId, token });

                this.props.navigation.navigate("UserActions", {
                  headerTitle: "My Requests",
                  noDataLabel: "No recent service request"
                });
                this.props.navigation.navigate("UserActions", {
                  headerTitle: "My Requests",
                  noDataLabel: "No recent service request"
                });
              }}
            >
              <View style={styles.left}>
                <Icon style={styles.icon} name="md-arrow-dropright" />
              </View>
              <View style={styles.body}>
                <Text style={styles.text}>My Requests</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listItem}
              onPress={this.navigateToScreen("SelectService")}
            >
              <View style={styles.left}>
                <Icon style={styles.icon} name="md-arrow-dropright" />
              </View>
              <View style={styles.body}>
                <Text style={styles.text}>Request a Service</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listItem}
              onPress={this.navigateToScreen("Profile")}
            >
              <View style={styles.left}>
                <Icon style={styles.icon} name="md-arrow-dropright" />
              </View>
              <View style={styles.body}>
                <Text style={styles.text}>My Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listItem}
              onPress={this.navigateToScreen("FAQScreen")}
            >
              <View style={styles.left}>
                <Icon style={styles.icon} name="md-arrow-dropright" />
              </View>
              <View style={styles.body}>
                <Text style={styles.text}>FAQ</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listItem}
              onPress={this.navigateToScreen("Support")}
            >
              <View style={styles.left}>
                <Icon style={styles.icon} name="md-arrow-dropright" />
              </View>
              <View style={styles.body}>
                <Text style={styles.text}>Support</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem} onPress={this.onLogout}>
              <View style={styles.left}>
                <Icon style={styles.icon} name="md-arrow-dropright" />
              </View>
              <View style={styles.body}>
                <Text style={styles.text}>Logout</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({
  profile: {
    data: { userdetail }
  },
  onesignal,
  token,
  logout
}) => ({
  userdetail,
  token,
  logout,
  onesignal
});
const mapDispatchToProps = dispatch => ({
  servicesData: payload => dispatch(servicesData(payload)),
  Logout: payload => dispatch(Logout(payload)),
  DashboardData: payload => dispatch(DashboardData(payload)),
  clearLogoutState: () => dispatch(clearLogoutState()),
  unregisterOnesignal: data => dispatch(unregisterOnesignal(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container1);

const styles = {
  listItem: {
    backgroundColor: "#003366",
    padding: 0,
    marginLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#5D6D7E",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 20,
    flexDirection: "row"
  },
  icon: {
    color: "white",
    marginLeft: 20
  },
  text: {
    color: "white"
  },
  body: {
    flex: 0.8,
    paddingTop: 5
  },
  left: {
    flex: 0.2
  },
  bottomView: {
    width: "100%",
    height: 35,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  textStyle: {
    fontSize: 13,
    color: "white"
  }
};
