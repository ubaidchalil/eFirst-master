import React, { Component } from "react";
import { connect } from "react-redux";
import UserActions from "./screen";
import { servicesData } from "../action";

class Container extends Component {
  componentDidMount = () => {
    const statusId = this.props.navigation.state.params
      ? this.props.navigation.state.params.statusId
      : null;
    const token = this.props.token.token;
    this.props.servicesData({ statusId, token });
    console.log("statusId", statusId);
  };
  componentDidUpdate() {
    console.log("loaded");
  }
  render = () => <UserActions {...this.props} />;
}

const mapStateToProps = ({ services, token }) => ({
  services,
  token
});
const mapDispatchToProps = dispatch => ({
  servicesData: payload => dispatch(servicesData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
