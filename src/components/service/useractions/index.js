import React, { Component } from "react";
import { connect } from "react-redux";
import UserActions from "./screen";
import { servicesData } from "../action";
import { View, StyleSheet, Text } from "react-native";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";
class Container extends Component {
  componentDidMount = () => {
    const statusId = this.props.navigation.state.params
      ? this.props.navigation.state.params.statusId
      : null;
    const token = this.props.token.token;
    this.props.servicesData({ statusId, token });
  };
  
  componentDidUpdate = () => {
    const statusId = this.props.navigation.state.params
      ? this.props.navigation.state.params.statusId
      : null;
    const token = this.props.token.token;
    this.props.servicesData({ statusId, token });
  };

  render = () => {
    const {
      services: { loading, error }
    } = this.props;

    return (
      <View style={styles.container}>
        <Loader loading={loading} />
        <UserActions {...this.props} />
        {error && <AlertView type="error" />}
      </View>
    );
  };
}

const mapStateToProps = ({ services, token }) => ({
  services,
  token
});
const mapDispatchToProps = dispatch => ({
  servicesData: payload => dispatch(servicesData(payload))
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
