import React, { Component } from "react";
import { connect } from "react-redux";
import SelectService from "./screen";

class Container extends Component {
  componentDidMount = () => {
    console.log(this.props);
  };
  render = () => <SelectService  {...this.props} />;
}

export default connect()(Container);
