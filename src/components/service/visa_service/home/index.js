import React, { Component } from "react";
import Home from "./screen";
import { connect } from "react-redux";
import { View } from "react-native";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false
    };
  }

  componentDidMount = () => {
    
  };
  componentDidUpdate() {
    
  }
  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <Home {...this.props} state={this.state} />
      </View>
    );
  };
}
const mapStateToProps = ({
  
}) => ({
  
});
const mapDispatchToProps = dispatch => ({
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
