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
import RNFetchBlob from "rn-fetch-blob";
import Loader from "../../../styled/loader";
const getLocalPath = fileName => {
  // feel free to change main path according to your requirements
  return `${RNFS.DocumentDirectoryPath}/${fileName}`;
};

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
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
  downloadFile(docId) {
    console.log("id======>", docId);
    this.setState({ loading: true });
    console.log("OPEN");
    const { UserId } = this.props.profile.data.userdetail;
    const token = this.props.token.token;
    RNFetchBlob.fetch(
      "POST",
      `https://api.efirst.ae/ServiceRequest/GetSRDocument?userid=${UserId}&id=${docId}`,
      {
        Authorization: `Bearer ${token}`
        // more headers  ..
      }
    )
      // when response status code is 200
      .then(res => {
        // the conversion is done in native code
        const data = res.base64();

        // const localFile = getLocalPath(url);
        const info = res.info();
        const fileName = this.getFileName(info.headers["Content-Disposition"]);
        console.log("FileName", fileName);
        const path = getLocalPath(fileName);
        RNFS.writeFile(path, data, "base64")
          .then(() => {
            this.setState({ loading: false });
            setTimeout(() => {
              try {
                FileViewer.open(path, { showOpenWithDialog: true })
                  .then(() => {
                    this.setState({ loading: false });
                  })
                  .catch(error => {
                    this.setState({ loading: false });
                  });
              } catch (error) {
                console.log("Error " + error);
              }
            }, 50);

            console.log("Image converted to jpg and saved at " + path);
            this.setState({ loading: false });
          })
          .catch(error => {
            this.setState({ loading: false });
          });
        //     // the following conversions are done in js, it's SYNC
        //     console.log("The file saved to ", res.path());
      })
      // Status code is not 200
      .catch((errorMessage, statusCode) => {
        console.log("response", errorMessage);
        this.setState({ loading: false });
      });
  }
  getFileName(disposition) {
    var filename = "";
    if (disposition && disposition.indexOf("attachment") !== -1) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
        return filename;
      }
    }
    return filename;
  }
  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.downloadFile(item.SRDocID)}>
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
        <Loader loading={this.state.loading} />
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

const mapStateToProps = ({
  servicerequest: { documents },
  profile,
  token
}) => ({
  documents,
  profile,
  token
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Documents);
