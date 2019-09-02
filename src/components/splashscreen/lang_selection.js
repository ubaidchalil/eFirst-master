import React, { Component } from "react";
import { connect } from "react-redux";
import { ImageBackground, Button, View, AsyncStorage, Text } from "react-native";
import { DASHBOARD_DATA_URL } from "../../constants";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: ""
    };
  }

  async getIn() {
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

      if (total > 0) this.props.navigation.navigate("Home");
      else this.props.navigation.navigate("SelectService");
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('InitialLogin');
      if (value !== null) 
      {
        if (this.props.token) 
          await this.getIn();
        else
          this.props.navigation.push("Auth");
      }
      else
      {
        AsyncStorage.setItem('InitialLogin', '1');
        this.setState({loading: false});
      }
    } catch (error) {
      this.setState({loading: false});
    }
  };

  render = () => {
    return (
        <ImageBackground source={require("../../Assets/bg/lang_selection.jpg")} style={{width: '100%', height: '100%', flexDirection: "row" , alignItems: "flex-end"}}>
            <View style={{ flex:1, padding :2 }} >
            {(this.state.error) ?
            (
              <View style={{marginBottom: "10%", alignItems: "center"}}>
                <Text style={{ color: "red", fontSize: 17 }}>Network connection failed</Text>
              </View>
              ) : 
              (!this.state.loading) ? (
                <Button
                    title="English"
                    color="#003366"
                    onPress={()=>this.props.navigation.push("SplashSlider")}
                    />
              ) : (
            <View style={{marginBottom: "10%", alignItems: "center"}}>
              <Text style={{ color: "#FFF", fontSize: 17 }}>Loading..</Text>
            </View>
            )}
            </View>
        </ImageBackground>
    );
  };
}

const mapStateToProps = ({ token }) => ({ token });
const mapDispatchToProps = dispatch => ({
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);
