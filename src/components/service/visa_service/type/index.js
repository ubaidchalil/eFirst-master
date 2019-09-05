import React, { Component } from "react";
import { connect } from "react-redux";
import { View, BackHandler, ImageBackground } from "react-native";
import {
  Container,
  Content,
  Radio,
  Text,
  ListItem,
  Left,
  Right,
  Button
} from "native-base";
import MyHeader from "../../../../Header";
import visa_options from "./data";

class _Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      options: {
        title: "",
        options: []
      },
      selectedOption: "",
      pageData: [],
      _prev_options: {
        title: "",
        options: []
      },
      _prev_pageData: []
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount = () => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };

  componentDidMount = () => {
    const options = this.props.navigation.state.params ? this.props.navigation.state.params.options : visa_options;
    const pageData = this.props.navigation.state.params ? this.props.navigation.state.params.pageData : [];
    
    console.log("result => mount ",JSON.stringify(pageData));
    this.setState({ options: options });
    this.setState({ pageData: pageData });

    var visaFlow = pageData.map(obj => obj.Value).join(" > ");
    this.setState({ visaFlow : visaFlow })
    
  };

  handleBackButtonClick = () => {
    if (Array.isArray(this.state.pageData))
      this.setState(
        {
          pageData: this.state.pageData.pop()
        },
        () => {
          this.props.navigation.goBack(null);
        }
      );
    else this.props.navigation.goBack(null);
    return true;
  };

  componentDidUpdate() {}

  NextOption = option => {
    this.setState({ selectedOption: option });

    var pageData = this.state.pageData;

    console.log("result =>",JSON.stringify(pageData));
    if(this.state.options)
    {
      let obj = pageData.find(o => o.Text === this.state.options.title);
      if(obj)pageData.pop();
    }
    else
      pageData.pop();
    var i = 1;
    pageData.push({
      Text: this.state.options.title,
      Name: this.state.options.title.replace(/ /g, "") + i++,
      Value: option,
      ControlType: "Radio"
    });
    this.setState({ pageData: pageData }, () => {
      console.log(pageData);
      if (this.state.options[option]["title"])
        this.props.navigation.push("VisaServceType", {
          options: this.state.options[option],
          pageData: pageData,
        });
      else {
        this.props.navigation.navigate("VisaServiceDocs", {
          details: this.state.options[option],
          pageData: pageData
        });
      }
    });
  };

  renderRadio = () => {
    return this.state.options.options.map(option => {
      return (
        <ListItem onPress={() => this.NextOption(option)} style={{ backgroundColor: 'rgba(250, 250, 250, 0.4)', marginLeft:0, paddingLeft: 10 }} >
          <Left>
            <Text>{option}</Text>
          </Left>
          <Right>
            <Radio
              onPress={() => this.NextOption(option)}
              selected={this.state.selectedOption == option}
            />
          </Right>
        </ListItem>
      );
    });
  };

  render = () => {
    return (
      <Container>
        <ImageBackground source={require("../../../../Assets/bg_all.jpg")} style={{width: '100%', height: '100%'}}>
        <MyHeader
          navigation={this.props.navigation}
          onBackPressed={this.handleBackButtonClick}
          header="Visa Service"
        />

        <View
          style={{
            backgroundColor: 'rgba(250, 250, 250, 0.8)',
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderBottomColor: "#CCC",
            borderBottomWidth: 1
          }}
        >
          <View>
            <Text style={{ color: "#000", fontSize: 17, marginLeft: 5, fontWeight: "bold" }}>
              {this.state.visaFlow}
            </Text>
          </View>
          <Right />
        </View>

        <View
          style={{
            backgroundColor: 'rgba(250, 250, 250, 0.8)',
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <View>
            <Text style={{ color: "#000", fontSize: 17, marginLeft: 5, fontWeight: "bold" }}>
              {this.state.options.title} *
            </Text>
          </View>
          <Right />
        </View>
        <Content >{this.renderRadio()}</Content>
        </ImageBackground>
      </Container>
    );
  };
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_Container);
