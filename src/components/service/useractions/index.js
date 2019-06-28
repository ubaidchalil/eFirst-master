import React, { Component } from "react";
import { connect } from "react-redux";
import UserActions from "./screen";
import { servicesData, serviceRequestData } from "../action";
import { View, StyleSheet, Text } from "react-native";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";

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
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: "",
      noDataLabel: ""
    };
  }
  componentDidMount = () => {
    // this.updateTitleandLabel(statusId);
  };
  // updateTitleandLabel = statusId => {
  //   switch (statusId) {
  //     case 0: {
  //       this.setState({
  //         headerTitle: "My Requests",
  //         noDataLabel: "No recent service request"
  //       });
  //       break;
  //     }
  //     case 1: {
  //       this.setState({
  //         headerTitle: "Action Required",
  //         noDataLabel: "No new action required item available"
  //       });
  //       break;
  //     }
  //     case 2: {
  //       this.setState({
  //         headerTitle: "In Review",
  //         noDataLabel: "Service not requested"
  //       });
  //       break;
  //     }

  //     case 3: {
  //       this.setState({
  //         headerTitle: "Completed",
  //         noDataLabel: "No recent Completed service request"
  //       });
  //       break;
  //     }
  //     case 4: {
  //       this.setState({
  //         headerTitle: "Rejected",
  //         noDataLabel: "No recent Rejected service request"
  //       });
  //       break;
  //     }
  //     default:
  //       break;
  //   }
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
        <UserActions {...this.props} {...this.props.navigation.state.params} />
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
