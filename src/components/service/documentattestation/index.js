import React, { Component } from "react";
import DocumentAttestation from "./screen";
import { connect } from "react-redux";
import {
  countries,
  getcertificateType,
  attestationPrice,
  docAttestationCreate,
  servicesData,
  updAttestationSRAmt
} from "../action";

import { getPaymentDetail } from "../../foloosi/action";
import Loader from "../../styled/loader";
import { View } from "react-native";
import AlertView from "../../styled/alert-view";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      Requested: false,
      UpdatedSRAmount: false,
      SRAmount: "0",
      ShowTerms: false
    };
  }
  setRequestedValue = amount => {
    this.setState({ Requested: true, SRAmount: amount });
  };
  setShowTerms = state => {
    this.setState({ ShowTerms: state });
  };
  componentDidMount = () => {
    this.props.getCountries(this.props.token.token);
    this.props.getcertificateType(this.props.token.token);
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.documentattestation.success &&
      !prevProps.documentattestation.success
    ) {
      this.setState({ Requested: false, UpdatedSRAmount: true });
      var SrId = this.props.documentattestation.data.SRID;
      const { UserId } = this.props.profile.data.userdetail;
      this.props.getPaymentDetail({
        token: this.props.token.token,
        SrId,
        Amount: this.state.SRAmount,
        UserId
      });
    }
    if (this.props.paymentdetail.success && !prevProps.paymentdetail.success) {
      const { UserId } = this.props.profile.data.userdetail;
      var { Id } = this.props.paymentdetail.data;
      var { SRID } = this.props.documentattestation.data;
      this.props.navigation.navigate("Foloosi", {
        Id,
        userid: UserId,
        srid: SRID
      });
    }
  }

  // componentDidUpdate(prevProps) {
  //   console.log(
  //     "Doc Attest Upd: result = >",
  //     JSON.stringify(this.props.documentattestation)
  //   );
  //   if (
  //     this.props.documentattestation.success &&
  //     !prevProps.documentattestation.success
  //   ) {
  //     this.setState({ Requested: false, UpdatedSRAmount: true });
  //     var SRID = this.props.documentattestation.data.SRID;
  //     this.props.updAttestationSRAmt({
  //       token: this.props.token.token,
  //       SRID: SRID,
  //       amount: this.state.SRAmount
  //     });
  //   }
  //   if (
  //     !this.props.docSRAmUpdation.loading &&
  //     !this.props.docSRAmUpdation.error &&
  //     this.props.docSRAmUpdation.success &&
  //     this.state.UpdatedSRAmount
  //   ) {
  //     this.setState({ UpdatedSRAmount: false });
  //     const { UserId } = this.props.profile.data.userdetail;
  //     var SRID = this.props.documentattestation.data.SRID;
  //     this.props.navigation.navigate("PayfortPay", {
  //       srid: SRID,
  //       userid: UserId
  //     });
  //   }
  // }
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
        <DocumentAttestation
          setRequestedValue={this.setRequestedValue}
          {...this.props}
          state={this.state}
          setShowTerms={this.setShowTerms}
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
  paymentdetail
}) => ({
  countries,
  certificatetype,
  attestationrate,
  documentattestation,
  docSRAmUpdation,
  profile,
  token,
  srActivation,
  paymentdetail
});
const mapDispatchToProps = dispatch => ({
  attestationPrice: payload => dispatch(attestationPrice(payload)),
  getCountries: payload => dispatch(countries(payload)),
  getcertificateType: payload => dispatch(getcertificateType(payload)),
  docAttestationCreate: payload => dispatch(docAttestationCreate(payload)),
  servicesData: payload => dispatch(servicesData(payload)),
  updAttestationSRAmt: payload => dispatch(updAttestationSRAmt(payload)),
  getPaymentDetail: payload => dispatch(getPaymentDetail(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
