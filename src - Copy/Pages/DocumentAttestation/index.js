import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Container, Picker, Content, Form, Item, Input, Icon, Radio, Text, ListItem, Button, Textarea, Header, Left, Right, Body } from 'native-base';
export default class FormExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected_country: undefined,
      selected_cert_type: undefined,
      countries: [
        {
          country: "India"
        },
        {
          country: "UAE"
        }
      ],
      certificate_types: [
        {
          type: "Type 1"
        },
        {
          type: "Type 2"
        }
      ]

    };
  }
  onValueChange_Country(value: string) {
    this.setState({
      selected_country: value
    });
  }
  onValueChange_Cert_Type(value: string) {
    this.setState({
      selected_cert_type: value
    });
  }

  renderDocumentCountries(){
      return this.state.countries.map((country) => {
          return (
            <Picker.Item label={country.country} value={country.country} />
          );
      });
  }

  renderDocumentCertTypes(){
    return this.state.certificate_types.map((cert_type) => {
        return (
          <Picker.Item label={cert_type.type} value={cert_type.type} />
        );
    });
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor:'#F7F9F9', height: 50 }} >
          <Body>
            <Text style={{ color: '#99A3A4', fontSize: 14, marginLeft: 5 }} >DOCUMENT ATTESTATION</Text>
          </Body>
          <Right >
            <View style={{ flexDirection: 'row'}}  >
              <Icon name="alert" style={{ fontSize: 20, color: '#F39C12'  }} /> 
              <Text > Info</Text>
            </View>
          </Right>
        </Header>
        <Content style={{padding:10}} >
          <ScrollView>
            <Form>
              <Item>
                <Input placeholder="Name" />
              </Item >
              <Item style={styles.item_margin} >
                <Input placeholder="Email" />
              </Item>
              <Item style={styles.item_margin} >
                <Input placeholder="Mobile" />
                <Input placeholder="Office" />
              </Item>
              <Item style={styles.item_margin} >
                <Textarea rowSpan={5} placeholder="Address" underline />
              </Item>
              <Item style={styles.item_margin} >
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Country"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected_country}
                  onValueChange={this.onValueChange_Country.bind(this)}
                >
                {
                  this.renderDocumentCountries()
                }
                </Picker>
              </Item>
              <Item style={styles.item_margin} >
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Certificate Type"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected_cert_type}
                  onValueChange={this.onValueChange_Cert_Type.bind(this)}
                >
                {
                  this.renderDocumentCertTypes()
                }
                </Picker>
              </Item>
              <ListItem style={[styles.item_margin, { borderBottomWidth:0 }]} >
                <Radio selected={true} />
                <Body>
                  <Text>Direct Delivery</Text>
                </Body>
                <Radio selected={false} />
                <Body>
                  <Text>Through Courier</Text>
                </Body>
              </ListItem>
              <View>
                <Text style={{textAlign: 'center', color: 'red' , padding: 10, fontWeight: 'bold'}} >Rate : 200 AED</Text>
              </View>
              <Button full rounded > 
                <Text> Pay Now </Text>
              </Button>
            </Form>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = {
  item_margin : {
    marginTop: 5
  }
}