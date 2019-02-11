import React, { Component } from "react";
import DocumentAttestation from "./screen";
import { connect } from "react-redux";
import {
  countries,
  documentationTypes,
  attestationPrice,
  docAttestationCreate
} from "../action";

class Container extends Component {
  componentDidMount = () => {
    this.props.getCountries(this.props.token.token);
    this.props.documentationTypes(this.props.token.token);
  };
  render = () => <DocumentAttestation {...this.props} />;
}
const mapStateToProps = ({
  countries,
  documenttypes,
  attestationrate,
  documentattestation,
  token
}) => ({
  countries,
  documenttypes,
  attestationrate,
  documentattestation,
  token
});
const mapDispatchToProps = dispatch => ({
  attestationPrice: payload => dispatch(attestationPrice(payload)),
  getCountries: payload => dispatch(countries(payload)),
  documentationTypes: payload => dispatch(documentationTypes(payload)),
  docAttestationCreate: payload => dispatch(docAttestationCreate(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
