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

class Container extends Component {
  componentDidMount = () => {
    this.props.getdoclanguage(this.props.token.token);
    this.props.documentationTypes(this.props.token.token);
  };
  render = () => {
    const {
      documentattestation: { loading }
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <LanguageTranslation {...this.props} state={this.state} />
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
