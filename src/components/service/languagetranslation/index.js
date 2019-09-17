import React, { Component } from "react";
import LanguageTranslation from "./screen";
import { connect } from "react-redux";
import {
  getdoclanguage,
  documentationTypes,
  translationPrice,
  doclangTransCreate,
  servicesData,
  updAttestationSRAmt
} from "../action";
import { View } from "react-native";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";
import Toast, { DURATION } from "react-native-easy-toast";
import { getPaymentDetail } from "../../foloosi/action";
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
    this.props.getdoclanguage(this.props.token.token);
    this.props.documentationTypes(this.props.token.token);
  };
  showToast = text => {
    this.refs.validationToasts.show(text, 3000);
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.langtranslation.success &&
      !prevProps.langtranslation.success
    ) {
      this.setState({ Requested: false, UpdatedSRAmount: true });

      var SrId = this.props.langtranslation.data.SRID;
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
      var { SRID } = this.props.langtranslation.data;
      this.props.navigation.navigate("Foloosi", {
        Id,
        userid: UserId,
        srid: SRID
      });
    }
  }
  // componentDidUpdate(prevProps) {
  //   if (
  //     this.props.langtranslation.success &&
  //     !prevProps.langtranslation.success
  //   ) {
  //     this.setState({ Requested: false, UpdatedSRAmount: true });

  //     var SrId = this.props.documentattestation.data.SRID;
  //     const { UserId } = this.props.profile.data.userdetail;
  //     this.props.getPaymentDetail({
  //       token: this.props.token.token,
  //       SrId,
  //       Amount: this.state.SRAmount,
  //       UserId
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
  //     var SRID = this.props.langtranslation.data.SRID;
  //     this.props.navigation.navigate("PayfortPay", {
  //       srid: SRID,
  //       userid: UserId
  //     });
  //   }
  // }

  render = () => {
    const {
      documentlanguage,
      translationrate,
      documenttypes,
      token,
      langtranslation
    } = this.props;

    const loading =
      documentlanguage.loading ||
      translationrate.loading ||
      documenttypes.loading ||
      langtranslation.loading;

    const error =
      documentlanguage.error ||
      translationrate.error ||
      documenttypes.error ||
      langtranslation.error;

    const success = langtranslation.success;
    return (
      <View style={{ flex: 1 }}>
        {/* <Loader loading={loading} /> */}
        <LanguageTranslation
          showToast={this.showToast}
          setRequestedValue={this.setRequestedValue}
          {...this.props}
          state={this.state}
          setShowTerms={this.setShowTerms}
        />
        <Toast
          ref="validationToasts"
          style={{
            backgroundColor: "#d12626",
            bottom: 25
          }}
          position="bottom"
        />
        {error && <AlertView type="error" />}
        {/* {success && <AlertView type="success" />} */}
      </View>
    );
  };
}
const mapStateToProps = ({
  documentlanguage,
  translationrate,
  documenttypes,
  token,
  profile,
  langtranslation,
  docSRAmUpdation,
  paymentdetail
}) => ({
  documentlanguage,
  translationrate,
  documenttypes,
  token,
  profile,
  langtranslation,
  docSRAmUpdation,
  paymentdetail
});
const mapDispatchToProps = dispatch => ({
  translationPrice: payload => dispatch(translationPrice(payload)),
  getdoclanguage: payload => dispatch(getdoclanguage(payload)),
  documentationTypes: payload => dispatch(documentationTypes(payload)),
  doclangTransCreate: payload => dispatch(doclangTransCreate(payload)),
  servicesData: payload => dispatch(servicesData(payload)),
  updAttestationSRAmt: payload => dispatch(updAttestationSRAmt(payload)),
  getPaymentDetail: payload => dispatch(getPaymentDetail(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
