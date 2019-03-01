import React, { Component } from "react";
import { connect } from "react-redux";
import Profile from "./screen";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditUser: false,
      showEditPersonalDts: false,
      showEditOfficeDts: false,
      user: {
        username: "User Name",
        designation: "Project Manager"
      },
      persaonal_details: {
        phone: "=91 000000000",
        email: "email@domain.in",
        website: "email@domain.in",
        address: "Diera, Dubai, UAE"
      },
      office_details: {
        company: "Company Name",
        email: "email@domain.in",
        website: "email@domain.in",
        address: "Diera, Dubai, UAE"
      }
    };
  }
  render = () => <Profile user={this.state}  {...this.props} />;
}

export default connect()(Container);
