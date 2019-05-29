import React, { Component } from "react";
import Home from "./screen";
import { connect } from "react-redux";
import { View } from "react-native";
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
      selectedOption : ""
    };
  }

  componentDidMount = () => {
    const options = this.props.navigation.state.params.options;
    this.setState({options:options});
  };
  componentDidUpdate() {
    
  }

  NextOption = () => {
    if(this.state.options.options)
      this.props.navigation.push('VisaServceType', {options :this.state.options[this.state.selectedOption]} )
      //this.setState({ options: this.state.options[this.state.selectedOption] });
    else
      alert("End");
  }

  renderRadio = () => {

    return this.state.options.options.map((option) => {
      return (
        
        <ListItem>
        <Left>
          <Text>{option}</Text>
        </Left>
        <Right>
          <Radio onPress={()=>this.setState({selectedOption : option})} selected={this.state.selectedOption==option} />
        </Right>
      </ListItem>
      )
    })

  }

  render = () => {
    return (
      <Container>
        <MyHeader navigation={this.props.navigation} header="My Services" />
  
        <View
          style={{
            backgroundColor: "#F7F9F9",
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <View>
            <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5 }}>
              {this.state.options.title}
            </Text>
          </View>
          <Right>
          </Right>
        </View>
        <Content>
          { this.renderRadio() }
          
          <Button
              style={{ backgroundColor: "#183E61", marginBottom: 50 }}
              full
              rounded
              onPress={() => { this.NextOption() }}
            >
            <Text>Next</Text>
          </Button>  
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
