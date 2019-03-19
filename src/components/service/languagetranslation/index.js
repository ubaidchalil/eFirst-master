import React, { Component } from "react";
import LanguageTranslation from "./screen";
import { connect } from "react-redux";
import {
  getdoclanguage,
  documentationTypes,
  translationPrice,
  doclangTransCreate,
  servicesData
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
        this.props.navigation.navigate("MyRequests");
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
  langtranslation
}) => ({
  documentlanguage,
  translationrate,
  documenttypes,
  token,
  profile,
  langtranslation
});
const mapDispatchToProps = dispatch => ({
  translationPrice: payload => dispatch(translationPrice(payload)),
  getdoclanguage: payload => dispatch(getdoclanguage(payload)),
  documentationTypes: payload => dispatch(documentationTypes(payload)),
  doclangTransCreate: payload => dispatch(doclangTransCreate(payload)),
  servicesData: payload => dispatch(servicesData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
