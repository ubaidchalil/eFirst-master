import React, { Component } from "react";
import DocumentAttestation from "./screen";
import { connect } from "react-redux";
import {
  countries,
  documentationTypes,
  attestationPrice,
  docAttestationCreate
} from "../action";
import Loader from "../../styled/loader";
import { View } from "react-native";
import AlertView from "../../styled/alert-view";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false
    };
  }

  componentDidMount = () => {
    this.props.getCountries(this.props.token.token);
    this.props.documentationTypes(this.props.token.token);
  };
  render = () => {
    const {
      countries,
      documenttypes,
      attestationrate,
      documentattestation,
      profile
    } = this.props;

    const loading =
      documentattestation.loading ||
      countries.loading ||
      documenttypes.loading ||
      attestationrate.loading;

    const error =
      documentattestation.error ||
      countries.error ||
      documenttypes.error ||
      attestationrate.error;

    const success = documentattestation.success;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <DocumentAttestation {...this.props} state={this.state} />
        {error && <AlertView type="error" />}
        {success && <AlertView type="success" />}
      </View>
    );
  };
}
const mapStateToProps = ({
  countries,
  documenttypes,
  attestationrate,
  documentattestation,
  profile,
  token
}) => ({
  countries,
  documenttypes,
  attestationrate,
  documentattestation,
  profile,
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
