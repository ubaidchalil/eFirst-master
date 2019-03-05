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
import MyHeader from "../../../Header";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";
class Container1 extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const {
      profile,
      usercontactdetail,
      userofficeadress,
      userpersonaldetail,
      userprofile
    } = this.props;

    const loading =
      usercontactdetail.loading ||
      userofficeadress.loading ||
      userpersonaldetail.loading ||
      userprofile.loading ||
      profile.loading;

    const error =
      usercontactdetail.error ||
      userofficeadress.error ||
      userpersonaldetail.error ||
      userprofile.error ||
      profile.error;

    const success =
      usercontactdetail.success ||
      userofficeadress.success ||
      userpersonaldetail.success ||
      userprofile.success;

    return (
      <Container>
        <MyHeader navigation={this.props.navigation} header="Manage Profile" />
        <Content>
          <Loader loading={loading} />
          <UserDetail userdetail={this.props.userdetail} />
          <PersonalDetail personaldetail={this.props.personaldetail} />
          <ContactDetail contactdetail={this.props.contactdetail} />
          <OfficeDetail officedetail={this.props.officedetail} />
        </Content>
        {error && <AlertView type="error" />}
        {success && <AlertView type="success" />}
      </Container>
    );
  };
}
const mapStateToProps = ({
  token,
  profile: {
    data: { userdetail, personaldetail, contactdetail, officedetail },
    ...profile
  },
  usercontactdetail,
  userofficeadress,
  userpersonaldetail,
  userprofile
}) => ({
  token,
  profile,
  userdetail,
  personaldetail,
  contactdetail,
  officedetail,
  usercontactdetail,
  userofficeadress,
  userpersonaldetail,
  userprofile
});
export default connect(mapStateToProps)(Container1);
