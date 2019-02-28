import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Content, Icon, Input, Text,  StyleProvider } from 'native-base';

import GridList from 'react-native-grid-list';

export default class Details extends Component {

  constructor(props){
    super(props);
    this.state ={
      data: [{
                document_id: '1', 
                document_name: 'Document Name'
              },
              {
                document_id: '2', 
                document_name: 'Document Name'
              },
              {
                document_id: '3', 
                document_name: 'Document Name'
              }
            ]
    }
  }
  

  renderItem = ({ item, index }) => (
    <View style={styles.doc_main} >
      <Image  style={styles.image} source={require('../../../Assets/document.png')}  />
      <Text style={{textAlign:'center', padding:5, color: '#515A5A', fontSize: 18 }} >{item.document_name}</Text>
    </View>
  );

  render() {
    
    
    return (
      <Container>
        <Content style={{ padding:10 }} >
          <GridList
            showSeparator
            data={this.state.data}
            numColumns={2}
            renderItem={this.renderItem}
            itemStyle={{ height:220, padding: 5 }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  doc_main: {
    backgroundColor: '#E5E8E8',
    borderRadius: 10,
    padding: 20,
    height: 200,
    alignItems: 'center'
  },
  image: {
    width: 120,
    height: 120
  }
});