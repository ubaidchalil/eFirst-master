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
import {
  userConatctDetailCreate,
  userOfficeAddressCreate,
  userPersonalDetailCreate,
  userProfileCreate,
  profileData
} from "../action";
class Container1 extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      usercontactdetail,
      userofficeadress,
      userpersonaldetail,
      userprofile
    } = this.props;

    const contsuccess = usercontactdetail.success;
    const contprevSuccess = prevProps.usercontactdetail.success;

    const offsuccess = userofficeadress.success;
    const offprevSuccess = prevProps.userofficeadress.success;

    const perssuccess = userpersonaldetail.success;
    const persprevSuccess = prevProps.userpersonaldetail.success;

    const profsuccess = userprofile.success;
    const profprevSuccess = prevProps.userprofile.success;

    if (
      (contsuccess && contsuccess != contprevSuccess) ||
      (offsuccess && offsuccess != offprevSuccess) ||
      (perssuccess && perssuccess != persprevSuccess) ||
      (profsuccess && profsuccess != profprevSuccess)
    ) {
      this.props.profileData(this.props.token.token);
    }
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

    const {
      userConatctDetailCreate,
      userOfficeAddressCreate,
      userPersonalDetailCreate,
      userProfileCreate
    } = this.props;

    return (
      <Container>
        <MyHeader navigation={this.props.navigation} header="Manage Profile" />
        <Content>
          <Loader loading={loading} />
          <UserDetail
            userdetail={this.props.userdetail}
            token={this.props.token}
            userProfileCreate={userProfileCreate}
          />
          <PersonalDetail
            personaldetail={this.props.personaldetail}
            token={this.props.token}
            userPersonalDetailCreate={userPersonalDetailCreate}
          />
          <ContactDetail
            contactdetail={this.props.contactdetail}
            token={this.props.token}
            userConatctDetailCreate={userConatctDetailCreate}
          />
          <OfficeDetail
            officedetail={this.props.officedetail}
            token={this.props.token}
            userOfficeAddressCreate={userOfficeAddressCreate}
          />
        </Content>
        {error && <AlertView type="error" />}
        {success && <AlertView type="success" />}
      </Container>
    );
  };
}
const mapDispatchToProps = dispatch => ({
  profileData: payload => dispatch(profileData(payload)),
  userConatctDetailCreate: payload =>
    dispatch(userConatctDetailCreate(payload)),
  userOfficeAddressCreate: payload =>
    dispatch(userOfficeAddressCreate(payload)),
  userPersonalDetailCreate: payload =>
    dispatch(userPersonalDetailCreate(payload)),
  userProfileCreate: payload => dispatch(userProfileCreate(payload))
});
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container1);
