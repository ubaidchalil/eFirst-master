import React, { Component } from "react";
import { connect } from "react-redux";
import LanguageTranslation from "./screen";

class Container extends Component {
  render = () => <LanguageTranslation  {...this.props} />;
}

export default connect()(Container);
