import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { DashboardData } from "../dashboard/action";
import Loader from "../styled/loader";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardDataLoaded: false
    };
  }

  componentDidMount() {
    const { token } = this.props.token;
    this.props.DashboardData(token);
    this.setState({ dashboardDataLoaded: true });
  }

  componentDidUpdate() {

    const { dashboard } = this.props;
    const { loading, error, data } = dashboard;
    const { dashboardDataLoaded } = this.state;

    if (!loading && !error && data) {
      console.log("in if");
      const {
        ActionRequiredNewUpdateCount,
        ActionRequiredTotalUpdateCount,
        CompletedNewUpdateCount,
        CompletedTotalUpdateCount,
        InReviewNewUpdateCount,
        InReviewTotalUpdateCount,
        RejectedNewUpdateCount,
        RejectedTotalUpdateCount
      } = dashboard.data.Tiles;
      const total =
        ActionRequiredNewUpdateCount +
        ActionRequiredTotalUpdateCount +
        CompletedNewUpdateCount +
        CompletedTotalUpdateCount +
        InReviewNewUpdateCount +
        InReviewTotalUpdateCount +
        RejectedNewUpdateCount +
        RejectedTotalUpdateCount;
        
          this.props.navigation.navigate("Home");
    }
    
  }
  
  render = () => {
    const { loading, error } = this.props.dashboard;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
      </View>
    );
  };
}
const mapStateToProps = ({ dashboard, token }) => ({ dashboard, token });
const mapDispatchToProps = dispatch => ({
  DashboardData: payload => dispatch(DashboardData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);
