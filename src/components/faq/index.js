import React, { Component } from "react";
import { connect } from "react-redux";
import FAQ from "./screen";

class Container extends Component {
  render = () => <FAQ {...this.props} />;
}

const mapStateToProps = ({ faq: { data } }) => ({
  data
});

export default connect(mapStateToProps)(Container);
