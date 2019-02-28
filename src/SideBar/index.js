import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  List,
  Thumbnail
} from "native-base";
import { NavigationActions } from "react-navigation";
import { Image, View } from "react-native";

export default class ListIconExample extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <Container>
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
          <List>
            <ListItem avatar>
              <Left>
                {/* <Thumbnail source={{ uri: "./user_menu.png" }} /> */}
              </Left>
              <Body>
                <Text style={{ color: "red" }}>UserName</Text>
                <Text note>Project Manager</Text>
              </Body>
            </ListItem>
          </List>
        </View>
        <Content style={{ backgroundColor: "#003366" }}>
          <ListItem icon style={styles.listIem}>
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
          <ListItem icon style={styles.listIem}>
            <Left style={styles.left}>
              <Icon style={styles.icon} name="arrow-dropright" />
            </Left>
            <Body style={styles.body}>
              <Text style={styles.text}>Share</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const styles = {
  listIem: {
    backgroundColor: "#003366",
    height: 70,
    padding: 0
    //  borderBottomWidth: 1,
    //  borderBottomColor: 'white'
  },
  icon: {
    color: "white"
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
  }
};
