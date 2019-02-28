import React, { Component } from "react";
import { connect } from "react-redux";
import HomeScreen from "./screen";
import { DashboardData } from "./action";
import { profileData } from "../profile/action";
import { FAQCategoryData, clearFaq } from "../faq/action";

class Container extends Component {
  componentDidMount = () => {
    const { token } = this.props.token;
    this.props.DashboardData(token);
    this.props.profileData(token);
    this.props.ClearFaq();
    this.props.FAQCategoryData(token);
  };
  render = () => <HomeScreen {...this.props} />;
}

const mapStateToProps = ({ dashboard, token }) => ({
  dashboard,
  token
});
const mapDispatchToProps = dispatch => ({
  DashboardData: payload => dispatch(DashboardData(payload)),
  profileData: payload => dispatch(profileData(payload)),
  FAQCategoryData: payload => dispatch(FAQCategoryData(payload)),
  ClearFaq: () => dispatch(clearFaq())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
