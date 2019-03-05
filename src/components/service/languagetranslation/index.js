import React, { Component } from "react";
import LanguageTranslation from "./screen";
import { connect } from "react-redux";
import {
  getdoclanguage,
  documentationTypes,
  translationPrice,
  doclangTransCreate
} from "../action";
import { View } from "react-native";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";
class Container extends Component {
  componentDidMount = () => {
    this.props.getdoclanguage(this.props.token.token);
    this.props.documentationTypes(this.props.token.token);
  };
  render = () => {
    const {
      documentlanguage,
      translationrate,
      documenttypes,
      token
    } = this.props;

    const loading =
      documentlanguage.loading ||
      translationrate.loading ||
      documenttypes.loading;

    const error =
      documentlanguage.error || translationrate.error || documenttypes.error;

    const success = documentlanguage.success;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
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
  profile
}) => ({
  documentlanguage,
  translationrate,
  documenttypes,
  token,
  profile
});
const mapDispatchToProps = dispatch => ({
  translationPrice: payload => dispatch(translationPrice(payload)),
  getdoclanguage: payload => dispatch(getdoclanguage(payload)),
  documentationTypes: payload => dispatch(documentationTypes(payload)),
  doclangTransCreate: payload => dispatch(doclangTransCreate(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
