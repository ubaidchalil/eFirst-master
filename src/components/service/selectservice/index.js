import React, { Component } from "react";
import { connect } from "react-redux";
import SelectService from "./screen";

class Container extends Component {
  render = () => <SelectService />;
}

export default connect()(Container);
