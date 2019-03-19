import React, { Component } from "react";
import { connect } from "react-redux";
import UserActions from "./screen";
import { servicesData, serviceRequestData } from "../action";
import { View, StyleSheet, Text } from "react-native";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";
import { NavigationEvents } from "react-navigation";
class Container extends Component {
  // componentDidMount = () => {
  //   const statusId = this.props.navigation.state.params
  //     ? this.props.navigation.state.params.statusId
  //     : null;
  //   const token = this.props.token.token;
  //   this.props.servicesData({ statusId, token });
  // };

  // componentDidUpdate = () => {
  //   const statusId = this.props.navigation.state.params
  //     ? this.props.navigation.state.params.statusId
  //     : null;
  //   const token = this.props.token.token;
  //   this.props.servicesData({ statusId, token });
  // };

  render = () => {
    const {
      services: { error, loading }
    } = this.props;

    const success =
      this.props.documentattestation.success ||
      this.props.langtranslation.success;
    return (
      <View style={styles.container}>
        <Loader loading={loading} />
        <UserActions {...this.props} />
        {error && <AlertView type="error" />}
        {success && <AlertView type="success" />}
      </View>
    );
  };
}

const mapStateToProps = ({
  services,
  token,
  langtranslation,
  documentattestation
}) => ({
  services,
  token,
  documentattestation,
  langtranslation
});
const mapDispatchToProps = dispatch => ({
  servicesData: payload => dispatch(servicesData(payload)),
  serviceRequestData: payload => dispatch(serviceRequestData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
