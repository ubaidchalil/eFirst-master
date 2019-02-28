import React, { Component } from "react";
import { connect } from "react-redux";
import Support from "./screen";

class Container extends Component {
  render = () => <Support {...this.props} />;
}

const mapStateToProps = ({ token }) => ({
  token
});

export default connect(mapStateToProps)(Container);
