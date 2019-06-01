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
import { Image, View, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Logout, clearLogoutState } from "../components/auth/action";
import Loader from "../components/styled/loader";
import { DashboardData } from "../components/dashboard/action";
import { PROFILE_BASE_URL } from "../constants";
class Container1 extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };
  componentDidUpdate() {
    if (!this.props.logout.loading) {
      if (this.props.logout.success) {
        this.props.navigation.navigate("Auth");
        this.props.clearLogoutState();
      }
    }
  }

  onLogout = () => {
    const { token } = this.props.token;
    this.props.Logout(token);
  };

  loadDashboardData() {
    const { token } = this.props.token;
    this.props.DashboardData(token);
    this.navigateToScreen("HomeScreen");
  }
  render() {
    return (
      <Container>
        <Loader loading={this.props.logout.loading} />
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
                    uri: `${PROFILE_BASE_URL}${
                      this.props.userdetail.ProfilePic
                    }`
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
              onPress={() => this.loadDashboardData()}
            >
              <View style={styles.left}>
                <Icon style={styles.icon} name="arrow-dropright" />
              </View>
              <View style={styles.body}>
                <Text style={styles.text}>Dashboard</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listItem}
              onPress={this.navigateToScreen("SelectService")}
            >
              <View style={styles.left}>
                <Icon style={styles.icon} name="arrow-dropright" />
              </View>
              <View style={styles.body}>
                <Text style={styles.text}>My Services</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listItem}
              onPress={this.navigateToScreen("Profile")}
            >
              <View style={styles.left}>
                <Icon style={styles.icon} name="arrow-dropright" />
              </View>
              <View style={styles.body}>
                <Text style={styles.text}>My Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listItem}
              onPress={this.navigateToScreen("FAQ")}
            >
              <View style={styles.left}>
                <Icon style={styles.icon} name="arrow-dropright" />
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
                <Icon style={styles.icon} name="arrow-dropright" />
              </View>
              <View style={styles.body}>
                <Text style={styles.text}>Support</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listItem}
              onPress={this.props.Logout}
            >
              <Left style={styles.left}>
                <Icon style={styles.icon} name="arrow-dropright" />
              </Left>
              <Body style={styles.body}>
                <Text style={styles.text}>Logout</Text>
              </Body>
              <Right />
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
  token,
  logout
}) => ({
  userdetail,
  token,
  logout
});
const mapDispatchToProps = dispatch => ({
  Logout: payload => dispatch(Logout(payload)),
  DashboardData: payload => dispatch(DashboardData(payload)),
  clearLogoutState: () => dispatch(clearLogoutState())
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
    flex: 0.8
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
