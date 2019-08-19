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
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import { Platform } from "react-native";

const getLocalPath = url => {
  const filename = url.split("/").pop();
  // feel free to change main path according to your requirements
  return `${RNFS.DocumentDirectoryPath}/${filename}`;
};
class Documents extends Component {
  viewFile = () => {
    const url =
      "https://www.adobe.com/content/dam/Adobe/en/devnet/pdf/pdfs/PDF32000_2008.pdf";
    const localFile = getLocalPath(url);

    const options = {
      fromUrl: url,
      toFile: localFile
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  };

  renderItem = ({ item, index }) => {
    console.log("result => ", JSON.stringify(item));
    return (
      <TouchableOpacity onPress={() => this.viewFile()}>
        <View style={styles.doc_main}>
          <Image
            style={styles.image}
            source={require("../../../../Assets/document.png")}
          />
          <Text
            style={{
              textAlign: "center",
              padding: 5,
              marginTop: 5,
              color: "#515A5A",
              fontSize: 14
            }}
          >
            {item.FileName.length > 12
              ? item.FileName.substr(0, 12) + "..."
              : item.FileName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { documents } = this.props;
    return (
      <View style={{ padding: 10 }}>
        <GridList
          showSeparator
          data={documents}
          numColumns={2}
          renderItem={this.renderItem}
          itemStyle={{ padding: 5 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  doc_main: {
    backgroundColor: "#E5E8E8",
    borderRadius: 10,
    padding: 20,
    height: 150,
    alignItems: "center"
  },
  image: {
    width: 80,
    height: 80
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
