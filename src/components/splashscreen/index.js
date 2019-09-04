import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { DASHBOARD_DATA_URL } from "../../constants";
import AlertView from "../styled/alert-view";
import Loader from "../styled/loader";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null
    };
  }

  async componentDidMount() {
    const { token } = this.props.token;
    const result = await fetch(DASHBOARD_DATA_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }).catch(error => {
      this.setState({ error });
      this.setState({ loading: false });
    });
    if(!result) return;
    const data = await result.json();
    const {
      ActionRequiredNewUpdateCount,
      ActionRequiredTotalUpdateCount,
      CompletedNewUpdateCount,
      CompletedTotalUpdateCount,
      InReviewNewUpdateCount,
      InReviewTotalUpdateCount,
      RejectedNewUpdateCount,
      RejectedTotalUpdateCount
    } = data.Tiles;

    const total =
      ActionRequiredNewUpdateCount +
      ActionRequiredTotalUpdateCount +
      CompletedNewUpdateCount +
      CompletedTotalUpdateCount +
      InReviewNewUpdateCount +
      InReviewTotalUpdateCount +
      RejectedNewUpdateCount +
      RejectedTotalUpdateCount;

    this.setState({ loading: false }, () => {
      if (total > 0) this.props.navigation.navigate("Home");
      else this.props.navigation.navigate("SelectService");
    });
  }

  render = () => {
    return (
        !this.state.error ? (
          <AlertView type="error" message="Sorry, No Internet connection" />
        ) : (<View />)
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
