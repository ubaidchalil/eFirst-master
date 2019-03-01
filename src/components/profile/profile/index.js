import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Content,
  Body,
  Icon,
  Left,
  Title,
  Right,
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
import UserDetail from "./userdetails";
import ContactDetail from "./contactdetails";
import PersonalDetail from "./personaldetails";
import OfficeDetail from "./officedetails";

class Container1 extends Component {
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
    console.log(props);
  }

  render = () => (
    <Container>
      <Header style={{ backgroundColor: "#003366" }}>
        <Left>
          <Button
            transparent
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Manage Profile</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="notifications" />
          </Button>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Icon name="contact" />
          </Button>
        </Right>
      </Header>
      <Content>
        <UserDetail userdetail={this.props.userdetail} />
        <PersonalDetail personaldetail={this.props.personaldetail} />
        <ContactDetail contactdetail={this.props.contactdetail} />
        <OfficeDetail officedetail={this.props.officedetail} />
      </Content>
    </Container>
  );
}
const mapStateToProps = ({
  token,
  profile: {
    data: { userdetail, personaldetail, contactdetail, officedetail }
  }
}) => ({
  token,
  userdetail,
  personaldetail,
  contactdetail,
  officedetail
});
const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(loginUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container1);
