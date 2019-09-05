import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StatusBar
} from "react-native";

import { Left, Right } from "native-base";
import { connect } from "react-redux";
import Swiper from "react-native-swiper";
import { setStatusBar } from "./action";
const Background = props => {
  return (
    <ImageBackground
      source={props.source}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{ flex: 1, padding: 2 }}>
        <View style={{ flex: 1, padding: 2 }}>
          <Text
            style={{
              marginTop: "25%",
              textAlign: "center",
              fontSize: 22,
              fontWeight: "bold",
              color: props.color
            }}
          >
            {props.caption}
          </Text>
        </View>
        <View style={{ flexDirection: "row", padding: 10, marginBottom: 35 }}>
          <Left>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                props.setStatusBar(true);
                props.navigation.navigate("Auth");
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 17 }}>Skip</Text>
            </TouchableOpacity>
          </Left>
          {props.last && (
            <Right>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  props.setStatusBar(true);
                  props.navigation.navigate("Auth");
                }}
              >
                <Text style={{ color: "#FFF", fontSize: 17 }}>Next</Text>
              </TouchableOpacity>
            </Right>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require("../../Assets/bg/slider1.jpg"),
        require("../../Assets/bg/slider2.jpg"),
        require("../../Assets/bg/slider3.jpg"),
        require("../../Assets/bg/slider4.jpg"),
        require("../../Assets/bg/slider5.jpg")
      ],
      captions: [
        "One Touch Visa Services Application",
        "Express Visa Services at your Doorstep",
        "Residency Visa Services at your doorstep / fingertips",
        "Access Dubai visa services anywhere you go",
        "Residency Visa Services at your doorstep / fingertips"
      ],
      color: ["#000", "#FFF", "#000", "#000", "#FFF"]
    };
  }

  render() {
    return (
      <Swiper
        loop={false}
        style={styles.wrapper}
        showsButtons
        buttonWrapperStyle={styles.buttonWrapperStyle}
        activeDotColor="#FFF"
      >
      <StatusBar backgroundColor="rgba(52, 52, 52, 0)" barStyle="light-content" translucent /> 
        <View style={styles.slide}>
          <Background
            source={this.state.images[0]}
            color={this.state.color[0]}
            caption={this.state.captions[0]}
            navigation={this.props.navigation}
            setStatusBar={this.props.setStatusBar}
          />
        </View>
        <View style={styles.slide}>
          <Background
            source={this.state.images[1]}
            color={this.state.color[1]}
            caption={this.state.captions[1]}
            navigation={this.props.navigation}
            setStatusBar={this.props.setStatusBar}
          />
        </View>
        <View style={styles.slide}>
          <Background
            source={this.state.images[2]}
            color={this.state.color[2]}
            caption={this.state.captions[2]}
            navigation={this.props.navigation}
            setStatusBar={this.props.setStatusBar}
          />
        </View>
        <View style={styles.slide}>
          <Background
            source={this.state.images[3]}
            color={this.state.color[3]}
            caption={this.state.captions[3]}
            navigation={this.props.navigation}
            setStatusBar={this.props.setStatusBar}
          />
        </View>
        <View style={styles.slide}>
          <Background
            last
            source={this.state.images[4]}
            color={this.state.color[4]}
            caption={this.state.captions[4]}
            navigation={this.props.navigation}
            setStatusBar={this.props.setStatusBar}
          />
        </View>
      </Swiper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setStatusBar: payload => dispatch(setStatusBar(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(Slider);
const styles = StyleSheet.create({
  wrapper: {},
  buttonWrapperStyle: {
    backgroundColor: "transparent",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BB"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});
