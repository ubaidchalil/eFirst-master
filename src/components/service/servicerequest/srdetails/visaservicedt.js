import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Content,
  Radio,
  Text,
  ListItem,
  Left,
  Right,
  Button,
  Item,
  Icon,
  Textarea
} from "native-base";

export default class VisaServiceDt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBillAmt : 0
    };
  }

  componentDidMount = () => {
    
  };
  componentDidUpdate() {
    
  }

  renderPageData = () => {

    return this.props.pageData.map((datum) => {
      return (
        (datum["Text"] != "Documents and Payment Collection") && 
        <Item>
          <Text style={{padding:10, fontWeight:'bold'}} >{datum["Text"]} : </Text>
          <Text style={{padding:10 }} >{datum["Value"]}</Text>
        </Item>
      )
    })

  }

  renderDocsData = () => {
    const docsAndPayment = this.props.pageData[this.props.pageData.length-1];
    return docsAndPayment.Documents.map((datum) => {
      return (
        <Item>
          <Text style={{padding:10, fontWeight:'bold'}} >{datum.Text} : </Text>
          <Text style={{padding:10 }} >{datum.FileUploaded}</Text>
        </Item>
      )
    })

  }
  
  renderPriceDts = () => {
    const docsAndPayment = this.props.pageData[this.props.pageData.length-1];
    return docsAndPayment.PriceDetils.map((datum) => {
      return (
        <Item>
          <Text style={{padding:10, fontWeight:'bold'}} >{datum.Text} : </Text>
          <Text style={{padding:10 }} >AED {datum.Value}</Text>
        </Item>
      )
    })
  }
  
  renderTotalPrice = () => {
    var total = 0;
    const docsAndPayment = this.props.pageData[this.props.pageData.length-1];
    docsAndPayment.PriceDetils.forEach(function(item){
        total += parseFloat(item.Value);
      });
      return (
        <Item>
          <Text style={{padding:10, fontWeight:'bold'}} >Total : </Text>
          <Text style={{padding:10, fontWeight:'bold' }} >AED {total}</Text>
        </Item>
      )
  }

  render = () => {
    return (
      <View>

        <View
          style={{
            backgroundColor: "#F7F9F9",
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <View>
            <Text style={{ color: "#99A3A4", fontSize: 17, marginLeft: 5, fontWeight:"bold" }}>
              Application Details
            </Text>
          </View>
          <Right>
          </Right>
        </View>
         
        {  this.renderPageData()  }
        
        <View
          style={{
            backgroundColor: "#F7F9F9",
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <View>
            <Text style={{ color: "#99A3A4", fontSize: 17, marginLeft: 5, fontWeight:"bold"  }}>
            Documents Uploaded
            </Text>
          </View>
          <Right>
          </Right>
        </View>
        {  this.renderDocsData()  }

        <View
          style={{
            backgroundColor: "#F7F9F9",
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <View>
            <Text style={{ color: "#99A3A4", fontSize: 17, marginLeft: 5, fontWeight:"bold"  }}>
            Price Details
            </Text>
          </View>
          <Right>
          </Right>
        </View>
        {  this.renderPriceDts()  }
        {  this.renderTotalPrice()  }
        
        <View
          style={{
            backgroundColor: "#F7F9F9",
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <View>
            <Text style={{ color: "#99A3A4", fontSize: 17, marginLeft: 5, fontWeight:"bold" }}>
            Additional Notes
            </Text>
          </View>
          <Right>
          </Right>
        </View>
          <View>
            <Text >
            { this.props.pageData[this.props.pageData.length-1].AdditionalNotes.Value }
            </Text>
          </View>
        </View>
    );
  };
}