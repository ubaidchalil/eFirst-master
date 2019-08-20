import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { servicesData } from "../action";
import { connect } from "react-redux";

class Container extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {};

  componentDidUpdate() {}

  goHome = () => {
    const { token } = this.props.token;
    const statusId = null;
    this.props.servicesData({ statusId, token });

    this.props.navigation.navigate("UserActions", {
      headerTitle: "My Requests",
      noDataLabel: "No recent service request"
    });
  };

  render = () => {
    const srid = this.props.navigation.state.params.srid;
    return (
      <View style={{ flex: 1, backgroundColor: "#163d62" }}>
        <View style={styles.imageView}>
          <Image
            source={require("./like.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <Text style={styles.txtThankYou}>Thank you</Text>
        <Text style={styles.txtSuccess}>Payment Successful</Text>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={styles.txtInvNo}>Your Invoice Number: #{srid}</Text>
          <TouchableOpacity style={styles.Btn} onPress={this.goHome}>
            <Text style={styles.BtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}
const mapStateToProps = ({ token }) => ({
  token
});

const mapDispatchToProps = dispatch => ({
  servicesData: payload => dispatch(servicesData(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

const styles = {
  imageView: {
    alignItems: "center",
    padding: 20,
    marginTop: 30
  },
  txtThankYou: {
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFF",
    flexDirection: "row",
    textAlign: "center"
  },
  txtSuccess: {
    padding: 10,
    fontSize: 30,
    color: "#FFF",
    flexDirection: "row",
    textAlign: "center"
  },
  txtInvNo: {
    padding: 5,
    paddingHorizontal: 40,
    fontSize: 25,
    color: "#FFF",
    textAlign: "center",
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 25
  },
  BtnText: {
    fontSize: 25,
    color: "#FFF",
    textAlign: "center"
  },
  Btn: {
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 40,
    backgroundColor: "#122c45",
    borderRadius: 25
  }
};
