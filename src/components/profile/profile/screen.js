import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Icon,
  Input,
  Text,
  Button,
  StyleProvider
} from "native-base";
import getTheme from "../../../../native-base-theme/components";
import material from "../../../../native-base-theme/variables/material";
import Greeting from "./useractionitems";

export default ({ navigation, user }) => {
  return (
    <Container>
      <Header />
      <Content>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <View
            style={{
              width: 50,
              flex: 0.35,
              padding: 10,
              alignItems: "center"
            }}
          >
            <Thumbnail large source={require("./userProfile.png")} />
            <TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  padding: 3,
                  textDecorationLine: "underline"
                }}
              >
                Change Photo
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "flex-start", flex: 0.75, padding: 5 }}>
            {!user.showEditUser ? (
              <H3>{user.user.username}</H3>
            ) : (
              <Item>
                <Input placeholder="Username">{user.user.username}</Input>
              </Item>
            )}
            {!user.showEditUser ? (
              <Text note>{user.user.designation}</Text>
            ) : (
              <Item>
                <Input placeholder="Designation">{user.user.designation}</Input>
              </Item>
            )}
            <Text style={{ color: "blue" }}>Open Services : 0</Text>
            <Text style={{ color: "green" }}>Completed Services : 0</Text>
            <Text style={{ color: "red" }}>Rejected Services : 0</Text>
          </View>
          <View style={{ flex: 0.1, alignContent: "flex-end" }}>
            {!user.showEditUser ? (
              <TouchableOpacity onPress={() => this.EditUser()}>
                <Icon style={{ color: "black" }} name="create" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.SaveUser()}>
                <Icon style={{ color: "black" }} name="checkmark" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#E5E7E9",
            flex: 1,
            padding: 12,
            paddingHorizontal: 20,
            flexDirection: "row"
          }}
        >
          <Text>Personal Details </Text>
          <View
            style={{ alignSelf: "flex-end", flex: 1, alignItems: "flex-end" }}
          >
            {!user.showEditPersonalDts ? (
              <TouchableOpacity onPress={() => this.EditPersonalDts()}>
                <Icon style={{ color: "black" }} name="create" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.SavePersonalDts()}>
                <Icon style={{ color: "black" }} name="checkmark" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ flex: 1, padding: 12, paddingHorizontal: 18 }}>
          <Grid>
            <Row>
              <Col>
                {!user.showEditPersonalDts ? (
                  <Text style={styles.text_detail}>
                    Phone: {user.persaonal_details.phone}
                  </Text>
                ) : (
                  <Item>
                    <Input placeholder="Phone">
                      {user.persaonal_details.phone}
                    </Input>
                  </Item>
                )}
              </Col>
              <Col>
                {!user.showEditPersonalDts ? (
                  <Text style={styles.text_detail}>
                    Email: {user.persaonal_details.email}
                  </Text>
                ) : (
                  <Item>
                    <Input placeholder="Email">
                      {user.persaonal_details.email}
                    </Input>
                  </Item>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {!user.showEditPersonalDts ? (
                  <Text style={styles.text_detail}>
                    Website: {user.persaonal_details.website}
                  </Text>
                ) : (
                  <Item>
                    <Input placeholder="Website">
                      {user.persaonal_details.website}
                    </Input>
                  </Item>
                )}
              </Col>
              <Col>
                {!user.showEditPersonalDts ? (
                  <Text style={styles.text_detail}>
                    Address: {user.persaonal_details.address}
                  </Text>
                ) : (
                  <Item>
                    <Input placeholder="Address">
                      {user.persaonal_details.address}
                    </Input>
                  </Item>
                )}
              </Col>
            </Row>
          </Grid>
        </View>
        <View
          style={{
            backgroundColor: "#E5E7E9",
            flex: 1,
            padding: 12,
            paddingHorizontal: 20,
            flexDirection: "row"
          }}
        >
          <Text>Personal Details </Text>
          <View
            style={{ alignSelf: "flex-end", flex: 1, alignItems: "flex-end" }}
          >
            {!user.showEditOfficeDts ? (
              <TouchableOpacity onPress={() => this.EditOfficeDts()}>
                <Icon style={{ color: "black" }} name="create" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.SaveOfficeDts()}>
                <Icon style={{ color: "black" }} name="checkmark" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ flex: 1, padding: 12, paddingHorizontal: 18 }}>
          <Grid>
            <Row>
              <Col>
                {!user.showEditOfficeDts ? (
                  <Text style={styles.text_detail}>
                    Phone: {user.office_details.company}
                  </Text>
                ) : (
                  <Item>
                    <Input placeholder="Phone">
                      {user.office_details.company}
                    </Input>
                  </Item>
                )}
              </Col>
              <Col>
                {!user.showEditOfficeDts ? (
                  <Text style={styles.text_detail}>
                    Email: {user.office_details.email}
                  </Text>
                ) : (
                  <Item>
                    <Input placeholder="Email">
                      {user.office_details.email}
                    </Input>
                  </Item>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {!user.showEditOfficeDts ? (
                  <Text style={styles.text_detail}>
                    Website: {user.office_details.website}
                  </Text>
                ) : (
                  <Item>
                    <Input placeholder="Website">
                      {user.office_details.website}
                    </Input>
                  </Item>
                )}
              </Col>
              <Col>
                {!user.showEditOfficeDts ? (
                  <Text style={styles.text_detail}>
                    Address: {user.office_details.address}
                  </Text>
                ) : (
                  <Item>
                    <Input placeholder="Address">
                      {user.office_details.address}
                    </Input>
                  </Item>
                )}
              </Col>
            </Row>
          </Grid>
        </View>
      </Content>
    </Container>
  );
};

EditUser = () => {
  this.setState({ showEditUser: true });
};

SaveUser = () => {
  this.setState({ showEditUser: false });
};

EditPersonalDts = () => {
  this.setState({ showEditPersonalDts: true });
};

SavePersonalDts = () => {
  this.setState({ showEditPersonalDts: false });
};

EditOfficeDts = () => {
  this.setState({ showEditOfficeDts: true });
};

SaveOfficeDts = () => {
  this.setState({ showEditOfficeDts: false });
};

const styles = {
  text_detail: {
    padding: 5,
    color: "#808B96"
  }
};
