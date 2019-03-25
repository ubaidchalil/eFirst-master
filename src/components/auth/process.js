import React, { Component } from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";
import Loader from "../styled/loader";
import { DashboardData } from "../dashboard/action";

class Container extends Component {
  componentDidMount = () => {
    if (this.props.token) {
      const { token } = this.props.token;
      this.props.DashboardData(token);
    }
  };
  componentDidUpdate() {
    const { loading, success, data } = this.props.dashboard;
    if (!loading) {
      if (success) {
        const total =
          data.Tiles.InReviewNewUpdateCount +
          data.Tiles.InReviewTotalUpdateCount;
        total > 0
          ? this.props.navigation.navigate("Home")
          : this.props.navigation.navigate("RequestService");
      }
    }
  }

  render = () => (
    <View style={{ flex: 1 }}>
      <Loader loading={this.props.dashboard.loading} />
    </View>
  );
}
const mapStateToProps = ({ token, dashboard }) => ({
  token,
  dashboard
});

const mapDispatchToProps = dispatch => ({
  DashboardData: payload => dispatch(DashboardData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
