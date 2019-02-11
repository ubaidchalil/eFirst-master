import React, { Component } from "react";
import { connect } from "react-redux";
import HomeScreen from "./screen";
import { DashboardData } from "./action";

class Container extends Component {
  componentDidMount = () => {
    this.props.DashboardData(this.props.token.token);
  };
  render = () => <HomeScreen {...this.props} />;
}

const mapStateToProps = ({ dashboard, token }) => ({
  dashboard,
  token
});
const mapDispatchToProps = dispatch => ({
  DashboardData: payload => dispatch(DashboardData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
