import React, { Component } from "react";
import { connect } from "react-redux";
import HomeScreen from "./screen";
import { DashboardData } from "./action";
import { View } from "react-native";
import { profileData } from "../profile/action";
import {
  servicesData,
  countries,
  getcertificateType,
  getdoclanguage,
  documentationTypes
} from "../service/action";
import { FAQCategoryData, clearFaq } from "../faq/action";
import AlertView from "../styled/alert-view";
import Loader from "../styled/loader";
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Refreshing : false
    }
  }
  
  componentDidMount = () => {
    const { token } = this.props.token;
    this.props.profileData(token);
    this.props.ClearFaq();
    this.props.FAQCategoryData(token);
    this.props.countries(token);
    this.props.getcertificateType(token);
    this.props.getdoclanguage(token);
    this.props.documentationTypes(token);
  };
  
  componentDidUpdate = () => {
    const { loading, error, data } = this.props.dashboard;
    
    if (!loading && !error && data && this.state.Refreshing) {
      this.setState({ Refreshing : false })
    }
  };

  _onRefresh = ()=>{
    this.setState({ Refreshing : true })
    const { token } = this.props.token;
    this.props.DashboardData(token);
  } 

  render = () => {
    const { dashboard } = this.props;
    const { loading, error } = dashboard;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <HomeScreen {...this.props}
        _onRefresh={this._onRefresh}
        state={this.state} />
        {error && <AlertView type="error" />}
      </View>
    );
  };
}

const mapStateToProps = ({ dashboard, token }) => ({
  dashboard,
  token
});
const mapDispatchToProps = dispatch => ({
  DashboardData: payload => dispatch(DashboardData(payload)),
  profileData: payload => dispatch(profileData(payload)),
  FAQCategoryData: payload => dispatch(FAQCategoryData(payload)),
  ClearFaq: () => dispatch(clearFaq()),
  servicesData: payload => dispatch(servicesData(payload)),
  countries: payload => dispatch(countries(payload)),
  getcertificateType: payload => dispatch(getcertificateType(payload)),
  getdoclanguage: payload => dispatch(getdoclanguage(payload)),
  documentationTypes: payload => dispatch(documentationTypes(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
