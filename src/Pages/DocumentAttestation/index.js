import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Container,  Content, Form, Item, Input, Icon, CheckBox, Text,  Button, Textarea  } from 'native-base';


export default class Example extends Component {
  state = {
    visibleModal: null,
  };

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Item style={{ flexDirection: 'row', padding: 7 }} >
        <View style={{ flexDirection: 'row', fontSize: 17, padding: 10, paddingHorizontal: 15 , flex: 0.9, fontWeight: "bold" }}>
          <Icon style={{ color:"#F1C40F" }} name="alert" />
          <Text style={{ fontSize: 17, fontWeight: "bold" }} >Info</Text>
        </View>
        <TouchableOpacity style={{ flex:0.1 }} onPress={()=>this.setState({ visibleModal: 0 })} >
          <Icon name="close" />
        </TouchableOpacity>
      </Item >
      <View style={{ padding: 20 }} >
        <Text style={{ fontSize: 13, lineHeight: 20, paddingHorizontal: 10 }} >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </Text>
        <Text style={{ paddingTop:5, fontSize: 13, lineHeight: 20, padding: 10 }} >          
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </Text>
        <Text style={{ paddingTop:5, fontSize: 13, fontWeight: "bold", paddingHorizontal: 10  }} >
          AED : 75/PAGE
        </Text>
        <Text style={{ paddingTop:5, fontSize: 13, fontWeight: "bold", paddingHorizontal: 10, paddingBottom: 10  }} >
          SERVICE CHARGE: AED 105 (VAT INCLUDED)
        </Text>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this._renderButton('Default modal1', () => this.setState({ visibleModal: 1 }))}
        {this._renderButton('Sliding from the sides', () => this.setState({ visibleModal: 2 }))}
        {this._renderButton('A slower modal', () => this.setState({ visibleModal: 3 }))}
        {this._renderButton('Fancy modal!', () => this.setState({ visibleModal: 4 }))}
        {this._renderButton('Bottom half modal', () => this.setState({ visibleModal: 5 }))}
        <Modal isVisible={this.state.visibleModal === 1}>
          {this._renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 2}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
        >
          {this._renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 3}
          animationInTiming={2000}
          animationOutTiming={2000}
          backdropTransitionInTiming={2000}
          backdropTransitionOutTiming={2000}
        >
          {this._renderModalContent()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 4}
          backdropColor={'red'}
          backdropOpacity={1}
          animationIn={'zoomInDown'}
          animationOut={'zoomOutUp'}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          {this._renderModalContent()}
        </Modal>
        <Modal isVisible={this.state.visibleModal === 5} style={styles.bottomModal}>
          {this._renderModalContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 13,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});