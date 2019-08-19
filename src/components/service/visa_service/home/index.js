import React, { Component } from "react";
import DocumentAttestation from "./screen";
import { connect } from "react-redux";
import {
  countries,
  getcertificateType,
  attestationPrice,
  docAttestationCreate,
  servicesData,
  updAttestationSRAmt,
  visaServiceCreate
} from "../../action";
import Loader from "../../../styled/loader";
import { View } from "react-native";
import AlertView from "../../../styled/alert-view";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      ShowTerms: false,
      totalBillAmt: 0,
      UpdatedSRAmount: false,
      Requested: false
    };
  }
  setShowTerms = state => {
    this.setState({ ShowTerms: state });
  };
  updateTotalAmount = totalBillAmt =>
    this.setState({ totalBillAmt, Requested: true });
  componentDidMount = () => {
    this.props.getCountries(this.props.token.token);
    this.props.getcertificateType(this.props.token.token);
  };
  componentDidUpdate(prevProps) {
    if (this.props.visaservice.success && !prevProps.visaservice.success) {
      this.setState({ Requested: false, UpdatedSRAmount: true });
      var SRID = this.props.visaservice.data.Result.SRID;
      this.props.updAttestationSRAmt({
        token: this.props.token.token,
        SRID: SRID,
        amount: this.state.totalBillAmt
      });
    }
    if (
      !this.props.docSRAmUpdation.loading &&
      !this.props.docSRAmUpdation.error &&
      this.props.docSRAmUpdation.success &&
      this.state.UpdatedSRAmount
    ) {
      this.setState({ UpdatedSRAmount: false });
      const { UserId } = this.props.profile.data.userdetail;
      var SRID = this.props.visaservice.data.Result.SRID;
      this.props.navigation.navigate("PayfortPay", {
        srid: SRID,
        userid: UserId
      });
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
        <Loader loading={loading} />
        <DocumentAttestation
          setShowTerms={this.setShowTerms}
          updateTotalAmount={this.updateTotalAmount}
          {...this.props}
          state={this.state}
        />
        {error && <AlertView type="error" />}
        {/* {success && <AlertView type="success" />} */}
      </View>
    );
  };
}
const mapStateToProps = ({
  countries,
  certificatetype,
  attestationrate,
  documentattestation,
  docSRAmUpdation,
  profile,
  token,
  srActivation,
  visaservice
}) => ({
  countries,
  certificatetype,
  attestationrate,
  documentattestation,
  docSRAmUpdation,
  profile,
  token,
  srActivation,
  visaservice
});
const mapDispatchToProps = dispatch => ({
  attestationPrice: payload => dispatch(attestationPrice(payload)),
  getCountries: payload => dispatch(countries(payload)),
  getcertificateType: payload => dispatch(getcertificateType(payload)),
  docAttestationCreate: payload => dispatch(docAttestationCreate(payload)),
  servicesData: payload => dispatch(servicesData(payload)),
  updAttestationSRAmt: payload => dispatch(updAttestationSRAmt(payload)),
  visaServiceCreate: payload => dispatch(visaServiceCreate(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
