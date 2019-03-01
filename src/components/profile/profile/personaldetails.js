import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  Icon,
  Left,
  H3,
  Thumbnail,
  Text,
  Button,
  Grid,
  Col,
  Row,
  Form,
  Item,
  Input
} from "native-base";

<View>
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
    <View style={{ alignSelf: "flex-end", flex: 1, alignItems: "flex-end" }}>
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
              <Input placeholder="Phone">{user.persaonal_details.phone}</Input>
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
              <Input placeholder="Email">{user.persaonal_details.email}</Input>
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
</View>;
