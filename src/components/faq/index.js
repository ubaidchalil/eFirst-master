import React, { Component } from "react";
import { connect } from "react-redux";
import FAQ from "./screen";
import { View } from "react-native";
import Loader from "../styled/loader";
import AlertView from "../styled/alert-view";

class Container extends Component {
  render = () => {
    const { faq } = this.props;
    const { loading, error, success } = faq ? faq : "";
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        {success && <FAQ {...this.props} />}

        {error && <AlertView type="error" />}
      </View>
    );
  };
}

const mapStateToProps = ({ faq: { data, ...faq } }) => ({
  data,
  faq
});

export default connect(mapStateToProps)(Container);
