import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
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
export default class ListAvatarExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditUser: false,
      showEditPersonalDts: false,
      showEditOfficeDts: false,
      user: {
        username: "User Name",
        designation: "Project Manager"
      },
      persaonal_details: {
        phone: "=91 000000000",
        email: "email@domain.in",
        website: "email@domain.in",
        address: "Diera, Dubai, UAE"
      },
      office_details: {
        company: "Company Name",
        email: "email@domain.in",
        website: "email@domain.in",
        address: "Diera, Dubai, UAE"
      }
    };
  }

  EditUser() {
    this.setState({ showEditUser: true });
  }

  SaveUser() {
    this.setState({ showEditUser: false });
  }

  EditPersonalDts() {
    this.setState({ showEditPersonalDts: true });
  }

  SavePersonalDts() {
    this.setState({ showEditPersonalDts: false });
  }

  EditOfficeDts() {
    this.setState({ showEditOfficeDts: true });
  }

  SaveOfficeDts() {
    this.setState({ showEditOfficeDts: false });
  }

  render() {
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
              {!this.state.showEditUser ? (
                <H3>{this.state.user.username}</H3>
              ) : (
                <Item>
                  <Input placeholder="Username">
                    {this.state.user.username}
                  </Input>
                </Item>
              )}
              {!this.state.showEditUser ? (
                <Text note>{this.state.user.designation}</Text>
              ) : (
                <Item>
                  <Input placeholder="Designation">
                    {this.state.user.designation}
                  </Input>
                </Item>
              )}
              <Text style={{ color: "blue" }}>Open Services : 0</Text>
              <Text style={{ color: "green" }}>Completed Services : 0</Text>
              <Text style={{ color: "red" }}>Rejected Services : 0</Text>
            </View>
            <View style={{ flex: 0.1, alignContent: "flex-end" }}>
              {!this.state.showEditUser ? (
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
              {!this.state.showEditPersonalDts ? (
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
                  {!this.state.showEditPersonalDts ? (
                    <Text style={styles.text_detail}>
                      Phone: {this.state.persaonal_details.phone}
                    </Text>
                  ) : (
                    <Item>
                      <Input placeholder="Phone">
                        {this.state.persaonal_details.phone}
                      </Input>
                    </Item>
                  )}
                </Col>
                <Col>
                  {!this.state.showEditPersonalDts ? (
                    <Text style={styles.text_detail}>
                      Email: {this.state.persaonal_details.email}
                    </Text>
                  ) : (
                    <Item>
                      <Input placeholder="Email">
                        {this.state.persaonal_details.email}
                      </Input>
                    </Item>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  {!this.state.showEditPersonalDts ? (
                    <Text style={styles.text_detail}>
                      Website: {this.state.persaonal_details.website}
                    </Text>
                  ) : (
                    <Item>
                      <Input placeholder="Website">
                        {this.state.persaonal_details.website}
                      </Input>
                    </Item>
                  )}
                </Col>
                <Col>
                  {!this.state.showEditPersonalDts ? (
                    <Text style={styles.text_detail}>
                      Address: {this.state.persaonal_details.address}
                    </Text>
                  ) : (
                    <Item>
                      <Input placeholder="Address">
                        {this.state.persaonal_details.address}
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
              {!this.state.showEditOfficeDts ? (
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
                  {!this.state.showEditOfficeDts ? (
                    <Text style={styles.text_detail}>
                      Phone: {this.state.office_details.company}
                    </Text>
                  ) : (
                    <Item>
                      <Input placeholder="Phone">
                        {this.state.office_details.company}
                      </Input>
                    </Item>
                  )}
                </Col>
                <Col>
                  {!this.state.showEditOfficeDts ? (
                    <Text style={styles.text_detail}>
                      Email: {this.state.office_details.email}
                    </Text>
                  ) : (
                    <Item>
                      <Input placeholder="Email">
                        {this.state.office_details.email}
                      </Input>
                    </Item>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  {!this.state.showEditOfficeDts ? (
                    <Text style={styles.text_detail}>
                      Website: {this.state.office_details.website}
                    </Text>
                  ) : (
                    <Item>
                      <Input placeholder="Website">
                        {this.state.office_details.website}
                      </Input>
                    </Item>
                  )}
                </Col>
                <Col>
                  {!this.state.showEditOfficeDts ? (
                    <Text style={styles.text_detail}>
                      Address: {this.state.office_details.address}
                    </Text>
                  ) : (
                    <Item>
                      <Input placeholder="Address">
                        {this.state.office_details.address}
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
  }
}

const styles = {
  text_detail: {
    padding: 5,
    color: "#808B96"
  }
};
