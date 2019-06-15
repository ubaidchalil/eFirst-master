import React, { Component } from "react";
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
  Button,
  Item,
  Icon,
  Textarea
} from "native-base";
import MyHeader from "../../../../Header";
import { visaServiceCreate } from "../../action";

class _Container extends Component {
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

  saveData = () => {
    const { token } = this.props.token;
    var _data = this.props.navigation.state.params.data;
    var pageData = this.props.navigation.state.params.pageData;
    var docsAndPayment = this.props.navigation.state.params.docsAndPayment;
    var Documents = [];

    const docsAttached = this.props.navigation.state.params.docsAttached

    _data.TotalBillAmount = this.state.totalBillAmt;
    _data.CurrencyUsed = "AED";
    _data.MinimumServiceCharge = 105;

    this.props.navigation.state.params.docs.forEach(function(doc){
      Documents.push({
        Text : doc,
        Name : doc.replace(/ /g,''),
        FileUploaded: docsAttached.indexOf(doc)>=0 ? "YES" : "NO"
      })
    });

    docsAndPayment.Documents= Documents;
    pageData.push(docsAndPayment);
    _data.PageData = pageData;

    const serviceData = JSON.stringify(_data);

    const docsAttached = this.props.navigation.state.params.docsAttached
    const docItem = this.props.navigation.state.params.docItem;
    let data = new FormData();
    data.append("ServiceData", serviceData);
    docItem.map((item, index) =>
      data.append("Files[]", item, item.name)
    );
    console.log("data", data);
   // return this.props.visaServiceCreate({ data, token });
  };

  renderPageData = () => {

    return this.props.navigation.state.params.pageData.map((datum) => {
      return (
        <Item>
          <Text style={{padding:10, fontWeight:'bold'}} >{datum["Text"]} : </Text>
          <Text style={{padding:10 }} >{datum["Value"]}</Text>
        </Item>
      )
    })

  }

  renderDocsData = () => {
    const docs = this.props.navigation.state.params.docsAttached
    return this.props.navigation.state.params.docs.map((datum) => {
      return (
        <Item>
          <Text style={{padding:10, fontWeight:'bold'}} >{datum} : </Text>
          <Text style={{padding:10 }} >{docs.indexOf(datum)>=0 ? "Yes" : "No"}</Text>
        </Item>
      )
    })

  }
  
  renderPriceDts = () => {
    const docs = this.props.navigation.state.params.docsAttached
    return this.props.navigation.state.params.docsAndPayment.PriceDetails.map((datum) => {
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
    this.props.navigation.state.params.docsAndPayment.PriceDetails.forEach(function(item){
        total += parseFloat(item.Value);
      });
      this.setState({totalBillAmt : total});
      return (
        <Item>
          <Text style={{padding:10, fontWeight:'bold'}} >Total : </Text>
          <Text style={{padding:10, fontWeight:'bold' }} >AED {total}</Text>
        </Item>
      )
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
              Application Details
            </Text>
          </View>
          <Right>
          </Right>
        </View>
        <Content>
         
        { this.renderPageData() }
        
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
            Documents Uploaded
            </Text>
          </View>
          <Right>
          </Right>
        </View>
        { this.renderDocsData() }

        <View>
            <Text style={{ color: "#99A3A4", fontSize: 14, marginLeft: 5 }}>
            Price Details
            </Text>
          </View>
          <Right>
          </Right>
        { this.renderPriceDts() }
        { this.renderTotalPrice() }


        <Button
           style={{ backgroundColor: "#183E61", marginBottom: 30, marginTop: 10 }}
           full
           rounded
           onPress={() => { this.saveData() }}
        >
            <Text>Next</Text>
          </Button>  
        </Content>
        </Container>
    );
  };
}


const mapStateToProps = ({ token }) => ({ token });
const mapDispatchToProps = dispatch => ({
  visaServiceCreate: payload => dispatch(visaServiceCreate(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_Container);