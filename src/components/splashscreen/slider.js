import React, { Component } from "react";
import { connect } from "react-redux";
import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { Left, Right, Body } from "native-base";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images : [
        require("../../Assets/bg/slider1.jpg"),
        require("../../Assets/bg/slider2.jpg"),
        require("../../Assets/bg/slider3.jpg"),
        require("../../Assets/bg/slider4.jpg"),
        require("../../Assets/bg/slider5.jpg")
      ],
      captions : [
        "One Touch Visa Services Application",
        "Express Visa Services at your Doorstep",
        "Residency Visa Services at your doorstep / fingertips",
        "Access Dubai visa services anywhere you go",
        "Residency Visa Services at your doorstep / fingertips"
      ],
      color : [
        "#000",
        "#FFF",
        "#000",
        "#000",
        "#FFF"
      ]
    };
  }


  NextSlide = (index) => {
    if(index==4)
      this.props.navigation.navigate("Auth")
    else
      this.props.navigation.push("SplashSlider",{ index: index+1 })
  }

  render = () => {
    const index = this.props.navigation.getParam('index', 0);
    return (
        <ImageBackground source={this.state.images[index]} style={{width: '100%', height: '100%', flexDirection: "row" , alignItems: "flex-end"}}>
            
            <View style={{ flex:1, padding :2 }} >
              <View style={{ flex:1, padding :2 }} >
                <Text style={{marginTop: "25%", textAlign: "center", fontSize: 20, fontWeight:"bold", color: this.state.color[index] }} >
                  {this.state.captions[index]}
                </Text>

              </View>
              <View style={{ flexDirection:"row", padding: 10 }} >
                <Left>
                  <TouchableOpacity style={{padding: 5}} onPress={()=>this.props.navigation.navigate("Auth")} >
                    <Text style={{ color:"#FFF", fontSize:17  }} >Skip</Text>
                  </TouchableOpacity >
                </Left>
                <Body>
                  <Text style={{ color:"#FFF" }} >{}</Text>
                </Body>
                <Right>
                  <TouchableOpacity style={{padding: 10}}
                    onPress={()=>this.NextSlide(index)}  >
                    <Text style={{color:"#FFF", fontSize:17 }} >Next</Text>
                  </TouchableOpacity >
                </Right>
              </View>
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
)(Slider);
