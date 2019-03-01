import React, { Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Icon,
  Input,
  Text,
  StyleProvider
} from "native-base";

import GridList from "react-native-grid-list";
import { connect } from "react-redux";
class Documents extends Component {
  renderItem = ({ item, index }) => (
    <View style={styles.doc_main}>
      <Image
        style={styles.image}
        source={require("../../../../Assets/document.png")}
      />
      <Text
        style={{
          textAlign: "center",
          padding: 5,
          color: "#515A5A",
          fontSize: 18
        }}
      >
        {item.FileName}
      </Text>
    </View>
  );

  render() {
    const { documents } = this.props;
    return (
      <Container>
        <Content style={{ padding: 10 }}>
          <GridList
            showSeparator
            data={documents}
            numColumns={2}
            renderItem={this.renderItem}
            itemStyle={{ height: 220, padding: 5 }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  doc_main: {
    backgroundColor: "#E5E8E8",
    borderRadius: 10,
    padding: 20,
    height: 200,
    alignItems: "center"
  },
  image: {
    width: 120,
    height: 120
  }
});

const mapStateToProps = ({ servicerequest: { documents } }) => ({
  documents
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Documents);
