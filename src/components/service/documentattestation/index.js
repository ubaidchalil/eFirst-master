import React, { Component } from "react";
import DocumentAttestation from "./screen";
import { connect } from "react-redux";
import {
  countries,
  getcertificateType,
  attestationPrice,
  docAttestationCreate,
  servicesData
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
    this.props.getcertificateType(this.props.token.token);
  };
  componentDidUpdate() {
    const {
      countries,
      certificatetype,
      attestationrate,
      documentattestation,
      profile
    } = this.props;
    const loading =
      documentattestation.loading ||
      countries.loading ||
      certificatetype.loading ||
      attestationrate.loading;

    console.log("Loaiding", loading);
    if (!this.props.documentattestation.loading) {
      if (this.props.documentattestation.success) {
        const { token } = this.props.token;
        const statusId = null;
        this.props.servicesData({ statusId, token });
        this.props.navigation.navigate("MyRequests");
      }
    }
  }
  render = () => {
    const {
      countries,
      certificatetype,
      attestationrate,
      documentattestation,
      profile
    } = this.props;

    const loading =
      documentattestation.loading ||
      countries.loading ||
      certificatetype.loading ||
      attestationrate.loading;

    const error =
      documentattestation.error ||
      countries.error ||
      certificatetype.error ||
      attestationrate.error;

    const success = documentattestation.success;
    return (
      <View style={{ flex: 1 }}>
        {/* <Loader loading={loading} /> */}
        <DocumentAttestation {...this.props} state={this.state} />
        {error && <AlertView type="error" />}
        {success && <AlertView type="success" />}
      </View>
    );
  };
}
const mapStateToProps = ({
  countries,
  certificatetype,
  attestationrate,
  documentattestation,
  profile,
  token
}) => ({
  countries,
  certificatetype,
  attestationrate,
  documentattestation,
  profile,
  token
});
const mapDispatchToProps = dispatch => ({
  attestationPrice: payload => dispatch(attestationPrice(payload)),
  getCountries: payload => dispatch(countries(payload)),
  getcertificateType: payload => dispatch(getcertificateType(payload)),
  docAttestationCreate: payload => dispatch(docAttestationCreate(payload)),
  servicesData: payload => dispatch(servicesData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
