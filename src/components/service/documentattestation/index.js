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
      documentattestation: { loading }
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <DocumentAttestation {...this.props} state={this.state} />
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
