import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Container, Picker, Content, Form, Item, Input, Icon, CheckBox, Text, ListItem, Button, Textarea, Header, Left, Right, Body } from 'native-base';
export default class FormExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [{
        label: "Phone : ",
        value: "+9715521234567 +971561234567"
      },{
        label: "E-mail : ",
        value: "example@mail.com"
      },{
        label: "Address : ",
        value: "Emirates First Business Service\nGround Floor, Al Hilal Bank Building. \nAl Nahda Road Al Qusais, Dubai, UAE"
      }]
    }
  }
  
  renderList() {
    return this.state.data.map((datum) => {
        return (
          <View style={styles.item_border} >
            <Text style={styles.label} >{datum.label} </Text>
            <Text style={styles.value}> {datum.value} </Text>
          </View>
        );
    });
  }

  render() {
    return (
      <Container>
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
              <Button style={{ marginTop: 10 }} full rounded > 
                <Text> Pay Now </Text>
              </Button>
            </Form>
            
            {
              this.renderList()
            }

          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = {
  item_margin : {
    marginTop: 5
  },
  item_border: { 
    marginTop: 10,
    borderWidth:1, 
    borderRadius: 8, 
    borderColor: '#BDC3C7',
     padding:10, 
     flexDirection: 'row' 
    },
  label: { fontSize: 16 },
  value: {color: '#A6ACAF', fontSize: 16 }
}