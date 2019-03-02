import React, { Component } from "react";
import LanguageTranslation from "./screen";
import { connect } from "react-redux";
import {
  getdoclanguage,
  documentationTypes,
  translationPrice,
  doclangTransCreate
} from "../action";

class Container extends Component {
  componentDidMount = () => {
    this.props.getdoclanguage(this.props.token.token);
    this.props.documentationTypes(this.props.token.token);
  };
  render = () => <LanguageTranslation {...this.props} />;
}
const mapStateToProps = ({
  documentlanguage,
  translationrate,
  documenttypes,
  token,
  profile
}) => ({
  documentlanguage,
  translationrate,
  documenttypes,
  token,
  profile
});
const mapDispatchToProps = dispatch => ({
  translationPrice: payload => dispatch(translationPrice(payload)),
  getdoclanguage: payload => dispatch(getdoclanguage(payload)),
  documentationTypes: payload => dispatch(documentationTypes(payload)),
  doclangTransCreate: payload => dispatch(doclangTransCreate(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
