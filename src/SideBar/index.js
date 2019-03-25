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
  List,
  Thumbnail
} from "native-base";
import { NavigationActions, DrawerActions } from "react-navigation";
import { Image, View, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Logout, clearLogoutState } from "../components/auth/action";
import Loader from "../components/styled/loader";
import { DashboardData } from "../components/dashboard/action";
class Container1 extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    // this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };
  componentDidUpdate() {
    console.log(this.props.logout);
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
    this.props.navigation.navigate("HomeScreen");
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
                    uri:
                      "https://efirst.blob.core.windows.net/profilepic/c8d94856-a3f1-47b9-bb1a-fbd3142907c0.jpg"
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
            <ListItem
              icon
              style={styles.listIem}
              onPress={() => this.loadDashboardData()}
            >
              <Left style={styles.left}>
                <Icon style={styles.icon} name="arrow-dropright" />
              </Left>
              <Body style={styles.body}>
                <Text style={styles.text}>Dashboard</Text>
              </Body>
            </ListItem>
            <ListItem
              icon
              style={styles.listIem}
              onPress={this.navigateToScreen("RequestService")}
            >
              <Left style={styles.left}>
                <Icon style={styles.icon} name="arrow-dropright" />
              </Left>
              <Body style={styles.body}>
                <Text style={styles.text}>My Services</Text>
              </Body>
            </ListItem>
            <ListItem
              icon
              style={styles.listIem}
              onPress={this.navigateToScreen("Profile")}
            >
              <Left style={styles.left}>
                <Icon style={styles.icon} name="arrow-dropright" />
              </Left>
              <Body style={styles.body}>
                <Text style={styles.text}>My Profile</Text>
              </Body>
            </ListItem>
            <ListItem
              icon
              style={styles.listIem}
              onPress={this.navigateToScreen("FAQ")}
            >
              <Left style={styles.left}>
                <Icon style={styles.icon} name="arrow-dropright" />
              </Left>
              <Body style={styles.body}>
                <Text style={styles.text}>FAQ</Text>
              </Body>
            </ListItem>
            <ListItem
              icon
              style={styles.listIem}
              onPress={this.navigateToScreen("Support")}
            >
              <Left style={styles.left}>
                <Icon style={styles.icon} name="arrow-dropright" />
              </Left>
              <Body style={styles.body}>
                <Text style={styles.text}>Support</Text>
              </Body>
            </ListItem>
          </ScrollView>
        </Content>
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={this.props.Logout}>
            <View>
              <Text style={styles.textStyle}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  listIem: {
    backgroundColor: "#003366",
    height: 70,
    padding: 0,
    marginLeft: 0
    //  borderBottomWidth: 1,
    //  borderBottomColor: 'white'
  },
  icon: {
    color: "white",
    marginLeft: 20
  },
  text: {
    color: "white"
  },
  body: {
    borderBottomWidth: 1,
    borderBottomColor: "#c3c3c3",
    height: 70
  },
  left: {
    borderBottomWidth: 1,
    borderBottomColor: "#c3c3c3",
    height: 70
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
