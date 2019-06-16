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
  componentDidMount = () => {
    this.props.getdoclanguage(this.props.token.token);
    this.props.documentationTypes(this.props.token.token);
  };
  componentDidUpdate() {
    if (!this.props.langtranslation.loading) {
      if (this.props.langtranslation.success) {
        const { token } = this.props.token;
        const statusId = null;
        this.props.servicesData({ statusId, token });
        var SRID = this.props.documentattestation.data.SRID;
        if(!this.props.docSRAmUpdation.loading)
        {
          if(!this.props.docSRAmUpdation.success && !this.props.docSRAmUpdation.error)
          {
            console.log("Requesting UpdSRAmt","result = > "+ JSON.stringify(this.props.docSRAmUpdation));
            this.props.updAttestationSRAmt({token: this.props.token.token, SRID: SRID, amount: 100});
          }
          else{
            console.log("Request Complete","result = > "+ JSON.stringify(this.props.docSRAmUpdation));
            if(this.props.docSRAmUpdation.success)
              this.props.navigation.navigate("PayfortPay",{srid: SRID, userid: "4"});
              
              
          }
          
        }
      }
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
        <LanguageTranslation {...this.props} state={this.state} />
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
