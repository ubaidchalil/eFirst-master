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
  Textarea,
  Input
} from "native-base";
import MyHeader from "../../../../Header";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
var ImagePicker = require("react-native-image-picker");

class _Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionType : "Direct Submission at Office",
      docsAttached : [],
      docItem: [],
      courier_charge : 10,
      notes: "",
      iban: ""
    };
  }

  componentDidMount = () => {
    console.log("result = > data : ",JSON.stringify(this.props.navigation.state.params.data));
  };
  componentDidUpdate() {
    
  }

  openlaunchCamera = () => {
    
    const options = {
      title: "Select Avatar",
      storageOptions: {
        cameraRoll: true,
        waitUntilSaved: true
      }
    };

    ImagePicker.launchCamera(options, response => {
      console.log("Response = ", response);

      var _docs = this.state.docsAttached;
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        const file = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        };
        this.state.docItem.push(file);
        

        _docs.push(doc);

        console.log(JSON.stringify(file));
      }
    });
  };
  
  openFile = (doc) => {
    var _docs = this.state.docsAttached;
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.images()],
    },(error,res) => {
      // Android
      console.log(
         res.uri,
         res.type, // mime type
         res.fileName,
         res.fileSize
      );
      console.log(_docs);
      _docs.push(doc);
      
      const file = {
        uri: res.uri,
        type: res.type,
        name: res.fileName
      };

      this.state.docItem.push(file);
    });
  };

  goToDetails = () => {
    var data = this.props.navigation.state.params.data;
    var price_details = this.props.navigation.state.params.details.PriceDetails;
    data.IBANNumber = {
      Text: "IBAN Number",
      value: this.state.iban
    }
    data.AdditionalNotes = {
      Text: "Additional Notes",
      value: this.state.notes
    }
    if(this.state.submissionType == "Through Courier")
      price_details.push({ Text: "Courier Charge", Value: this.state.courier_charge })
    data.PriceDetails = price_details;
      
    this.props.navigation.navigate("VisaServiceDetails", {
        data: data,
        docs: this.props.navigation.state.params.details.docs,
        docsAttached: this.state.docsAttached,
        docItem: this.state.docItem
      });
  }

  renderDocs = () => {
    
    return this.props.navigation.state.params.details.docs.map((doc) => {
      return (
        <View style={{marginTop:10}} >
          <Item style={{ borderBottomWidth: 0, borderTopWidth:1 }}>
            <Text style={{padding:10}} >{doc} </Text>
          </Item>
        <View>
        <Text
          style={{
            textAlign: "center",
            color: "#B2BABB",
            padding: 10
          }}
        >
          {(this.state.docsAttached.indexOf(doc)>=0)? "" : "FileName" }
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 7 }}>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#CACFD2",
            borderRadius: 10
          }}
        >
          <Button
            transparent
            dark
            style={{ alignItems: "center" }}
            onPress={() => this.openlaunchCamera()}
          >
            <Icon name="camera" />
            <Text>Camera</Text>
          </Button>
          <Button
            transparent
            dark
            style={{
              borderLeftWidth: 1,
              borderLeftColor: "#CACFD2",
              alignItems: "center"
            }}
            onPress={() => this.openFile(doc)}
          >
            <Icon name="albums" />
            <Text>Album</Text>
          </Button>
        </View>
      </View>
      </View>


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
              Documents
            </Text>
          </View>
          <Right>
          </Right>
        </View>
        <Content>
         
        <Item>
          <Text style={{fontSize:16, padding:10, fontWeight:'bold'}} >Original Document Submission Type</Text>
        </Item>

        <ListItem onPress={()=>this.setState({submissionType : "Through Courier"})}>
          <Left>
            <Text>Through Courier</Text>
          </Left>
          <Right>
            <Radio  selected={this.state.submissionType=="Through Courier"} />
          </Right>
        </ListItem>

        <ListItem onPress={()=>this.setState({submissionType : "Direct Submission at Office"})}>
          <Left>
            <Text>Direct Submission at Office</Text>
          </Left>
          <Right>
            <Radio selected={this.state.submissionType=="Direct Submission at Office"} />
          </Right>
        </ListItem>

        <Item style={{borderBottomWidth:0}} >
          <Text style={{fontSize:16, padding:10, fontWeight:'bold'}} >Upload Document Copies</Text>
        </Item>
         { this.renderDocs() }

         {(this.props.navigation.state.params.details["IBAN number"]!=undefined) ? 
         (
           <View>
          <Item>
            <Text style={{fontSize:16, padding:10, fontWeight:'bold', marginTop: 5}} >IBAN Number</Text>
          </Item>
          <Item >
              <Input
                style={{ fontSize: 16 }}
                placeholder="IBAN Number"
                name="Iban"
                label="Iban"
                onChangeText={value => this.setState({iban: value})}
                value={this.state.iban}
              />
            </Item>
           </View>
         ) : (<View/>)
         }

        <Item>
          <Text style={{fontSize:16, padding:10, fontWeight:'bold'}} >Additional Notes</Text>
        </Item>
        <Item >
              <Textarea
                rowSpan={5}
                placeholder="Notes"
                underline
                name="notes"
                label="notes"
                onChangeText={value => this.setState({notes: value})}
                value={this.state.notes}
              />
        </Item>

        <Button
           style={{ backgroundColor: "#183E61", marginBottom: 30, marginTop: 10 }}
           full
           rounded
           onPress={() => { this.goToDetails() }}
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
