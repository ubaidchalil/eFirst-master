import React, { Component } from "react";
import { connect } from "react-redux";
import HomeScreen from "./screen";
import { DashboardData } from "./action";
import { profileData } from "../profile/action";

class Container extends Component {
  componentDidMount = () => {
    const { token } = this.props.token;
    this.props.DashboardData(token);
    this.props.profileData(token);
  };
  render = () => <HomeScreen {...this.props} />;
}

const mapStateToProps = ({ dashboard, token }) => ({
  dashboard,
  token
});
const mapDispatchToProps = dispatch => ({
  DashboardData: payload => dispatch(DashboardData(payload)),
  profileData: payload => dispatch(profileData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
