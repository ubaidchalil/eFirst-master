import React, { Component } from "react";
import { connect } from "react-redux";
import { View, BackHandler } from "react-native";
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

class _Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      options : {
        title : "",
        options : []
      },
      selectedOption : "",
      pageData : [],
      _prev_options : {
        title : "",
        options : []
      },
      _prev_pageData : []
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount = () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount = () =>{
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidMount = () => {
    const options = this.props.navigation.state.params.options;
    const pageData = this.props.navigation.state.params.pageData;
    this.setState({options : options});
    this.setState({pageData : pageData});
    this.setState({_prev_options : options});
    this.setState({_prev_pageData : pageData});
  };

  handleBackButtonClick = () => {
    if(Array.isArray(this.state.pageData))
      this.setState({
          pageData: this.state.pageData.pop(),
        }, () => {
        this.props.navigation.goBack(null);
      });
    else
      this.props.navigation.goBack(null);
    return true;
  }

  componentDidUpdate() {
    
  }

  NextOption = (option) => {
    this.setState({selectedOption : option});

    var pageData = this.state.pageData;
    var i = 1;
    pageData.push({
      Text : this.state.options.title,
      Name : this.state.options.title.replace(/ /g,'') + i++,
      Value : option,
      ControlType: "Radio"
    })
    this.setState({pageData : pageData},
      () => {
        console.log(pageData);
        if(this.state.options[option]["title"])
          this.props.navigation.push('VisaServceType', {options :this.state.options[option], pageData: pageData, data: this.props.navigation.state.params.data} )
        else
        {
          var data = this.props.navigation.state.params.data;
          this.props.navigation.navigate('VisaServiceDocs', {details :this.state.options[option], data: data, pageData : pageData} )
        }
      }
    );

  }

  renderRadio = () => {

    return this.state.options.options.map((option) => {
      return (
        <ListItem onPress={()=>this.NextOption(option)} >
          <Left>
            <Text>{option}</Text>
          </Left>
          <Right >
            <Radio  onPress={()=>this.NextOption(option)}  selected={this.state.selectedOption==option} />
          </Right>
        </ListItem>
      )
    })

  }

  render = () => {
    return (
      <Container>
        <MyHeader navigation={this.props.navigation} onBackPressed={this.handleBackButtonClick} header="Visa Service" />
  
        <View
          style={{
            backgroundColor: "#F7F9F9",
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <View>
            <Text style={{ color: "#AAACAC", fontSize: 17, marginLeft: 5 }}>
              {this.state.options.title} *
            </Text>
          </View>
          <Right>
          </Right>
        </View>
        <Content style={{ padding: 10 }}>
          { this.renderRadio() }
           
        </Content>
        </Container>
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
)(_Container);
