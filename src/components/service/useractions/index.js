import React, { Component } from "react";
import { connect } from "react-redux";
import UserActions from "./screen";
import { BackHandler } from "react-native";
import { servicesData, serviceRequestData } from "../action";
import { View, StyleSheet, Text } from "react-native";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";

class Container extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: "",
      noDataLabel: "",
      searchText: "",
      Refreshing: false
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidUpdate = () => {
    const { loading, error, data } = this.props.services;
    console.log("result => ", `${loading} - ${error} - ${data}`);
    if (!loading && !error && data && this.state.Refreshing) {
      this.setState({ Refreshing: false });
    }
  };

  _onRefresh = () => {
    this.setState({ Refreshing: true });
    const { token } = this.props.token;
    this.props.servicesData({ statusId: null, token });
  };

  setSearchText = searchText => {
    this.setState({ searchText });
  };

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate("HomeScreen");
    return true;
  }
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
        <UserActions
          _onRefresh={this._onRefresh}
          {...this.props}
          state={this.state}
          {...this.props.navigation.state.params}
          setSearchText={this.setSearchText}
        />
        {error && <AlertView type="error" />}
        {/* {success && <AlertView type="success" />} */}
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
