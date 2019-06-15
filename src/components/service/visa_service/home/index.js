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
} from "../../action";
import Loader from "../../../styled/loader";
import { View } from "react-native";
import AlertView from "../../../styled/alert-view";

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

    console.log("Doc Attest Upd: result = >", JSON.stringify(this.props.documentattestation));
    if (!this.props.documentattestation.loading) {
      if (this.props.documentattestation.success) {
        const { token } = this.props.token;
        const statusId = null;
        this.props.servicesData({ statusId, token });
        console.log("result = > "+ JSON.stringify(this.props.documentattestation.data));
    //    alert(this.props.documentattestation.data.SRID);
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
        
        
     //   if(this.props.docSRAmUpdation.success)
     //     this.props.navigation.navigate("PayfortPay");
        //this.props.navigation.navigate("MyRequests");
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
  docSRAmUpdation,
  profile,
  token,
  srActivation
}) => ({
  countries,
  certificatetype,
  attestationrate,
  documentattestation,
  docSRAmUpdation,
  profile,
  token,
  srActivation
});
const mapDispatchToProps = dispatch => ({
  attestationPrice: payload => dispatch(attestationPrice(payload)),
  getCountries: payload => dispatch(countries(payload)),
  getcertificateType: payload => dispatch(getcertificateType(payload)),
  docAttestationCreate: payload => dispatch(docAttestationCreate(payload)),
  servicesData: payload => dispatch(servicesData(payload)),
  updAttestationSRAmt: payload => dispatch(updAttestationSRAmt(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
