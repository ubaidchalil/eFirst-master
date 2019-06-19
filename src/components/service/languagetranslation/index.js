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
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      Requested: false,
      UpdatedSRAmount: false,
      SRAmount: "0"
    };
  }
  setRequestedValue = amount => {
    this.setState({ Requested: true, SRAmount: amount });
  };
  componentDidMount = () => {
    this.props.getdoclanguage(this.props.token.token);
    this.props.documentationTypes(this.props.token.token);
  };

  componentDidUpdate() {
    console.log(
      "Doc Attest Upd: result = >",
      JSON.stringify(this.props.langtranslation)
    );
    if (
      !this.props.langtranslation.loading &&
      !this.props.langtranslation.error &&
      this.props.langtranslation.success &&
      this.state.Requested
    ) {
      this.setState({ Requested: false, UpdatedSRAmount: true });
      console.log("this.state", this.state);
      var SRID = this.props.langtranslation.data.SRID;
      this.props.updAttestationSRAmt({
        token: this.props.token.token,
        SRID: SRID,
        amount: this.state.SRAmount
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
      var SRID = this.props.langtranslation.data.SRID;
      this.props.navigation.navigate("PayfortPay", {
        srid: SRID,
        userid: UserId
      });
    }
  }

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
          setRequestedValue={this.setRequestedValue}
          {...this.props}
          state={this.state}
        />
        {error && <AlertView type="error" />}
        {success && <AlertView type="success" />}
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
  docSRAmUpdation
}) => ({
  documentlanguage,
  translationrate,
  documenttypes,
  token,
  profile,
  langtranslation,
  docSRAmUpdation
});
const mapDispatchToProps = dispatch => ({
  translationPrice: payload => dispatch(translationPrice(payload)),
  getdoclanguage: payload => dispatch(getdoclanguage(payload)),
  documentationTypes: payload => dispatch(documentationTypes(payload)),
  doclangTransCreate: payload => dispatch(doclangTransCreate(payload)),
  servicesData: payload => dispatch(servicesData(payload)),
  updAttestationSRAmt: payload => dispatch(updAttestationSRAmt(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
