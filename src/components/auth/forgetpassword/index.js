import React, { Component } from "react";
import ForgetPasswordScreen from "./screen";
import { connect } from "react-redux";
import { resetPasswordUser } from "../action";
import Loader from "../../styled/loader";
import AlertView from "../../styled/alert-view";
import { View } from "react-native";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: ""
    };
  }
  componentDidMount = () => {
    //if (this.props.user) this.props.navigation.navigate('Profile');
  };
  setStateEmail = email => {
    this.setState({ Email: email });
  };
  componentDidUpdate() {
    if (!this.props.forgetpassword.loading) {
      if (this.props.forgetpassword.error) {
      } else {
        this.props.navigation.navigate("ChangePassword", {
          Email: this.state.Email
        });
      }
    }
  }
  render() {
    const { loading, error } = this.props.forgetpassword;
    return (
      <View style={{ flex: 1 }}>
        <Loader loading={loading} />
        <ForgetPasswordScreen
          {...this.props}
          setStateEmail={this.setStateEmail}
        />
        {error && <AlertView type={error} />}
      </View>
    );
  }
}

const mapStateToProps = ({ forgetpassword }) => ({
  forgetpassword
  //
});
const mapDispatchToProps = dispatch => ({
  resetPasswordUser: email => dispatch(resetPasswordUser(email))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
