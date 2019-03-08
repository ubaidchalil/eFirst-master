import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Icon,
  Input,
  Text,
  Button,
  StyleProvider
} from "native-base";
import { connect } from "react-redux";
class SRInfo extends Component {
  render() {
    const {
      srInfo: { CustomerName, Email, PersonalPhone, Address, TotalRate }
    } = this.props;
    return (
      <Container>
        <Content style={{ padding: 10 }}>
          <ScrollView>
            <View style={styles.item_border}>
              <Text style={styles.label}>Name : </Text>
              <Text style={styles.value}> {CustomerName} </Text>
            </View>
            <View style={styles.item_border}>
              <Text style={styles.label}>E-mail : </Text>
              <Text style={styles.value}> {Email} </Text>
            </View>
            <View style={styles.item_border}>
              <Text style={styles.label}>Phone : </Text>
              <Text style={styles.value}> {PersonalPhone} </Text>
            </View>
            <View style={styles.item_border}>
              <Text style={styles.label}>Address : </Text>
              <Text style={styles.value}> {Address} </Text>
            </View>
            <View style={styles.item_border}>
              <Text style={styles.label}>Country : </Text>
              <Text style={styles.value}> India </Text>
            </View>
            <View style={styles.item_border}>
              <Text style={styles.label}>Certificate Type : </Text>
              <Text style={styles.value}> Text </Text>
            </View>
            <View style={styles.item_border}>
              <Text style={styles.label}>
                Document Pickup and Drop Location :
              </Text>
              <Text style={styles.value}> Text</Text>
            </View>
            <View style={styles.item_border}>
              <Text style={styles.label}>Rate :</Text>
              <Text style={styles.value}> {TotalRate} </Text>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  item_border: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#BDC3C7",
    padding: 10,
    flexDirection: "row"
  },
  label: { fontSize: 16 },
  value: { color: "#A6ACAF", fontSize: 16 }
});

const mapStateToProps = ({ servicerequest: { srInfo } }) => ({
  srInfo
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SRInfo);
