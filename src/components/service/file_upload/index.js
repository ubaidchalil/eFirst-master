import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform } from "react-native";
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
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
import { visaServiceCreate } from "../action";
import { visaServiceData } from "../../../visaSrviceData";
var ImagePicker = require("react-native-image-picker");

class Container1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      docItem: []
    };
  }
  saveData = () => {
    const { token } = this.props.token;
    const serviceData = JSON.stringify(visaServiceData);
    let data = new FormData();
    data.append("ServiceData", serviceData);
    this.state.docItem.map((item, index) =>
      data.append("Files[]", item, item.name)
    );
    console.log("data", data);
    return this.props.visaServiceCreate({ data, token });
  };
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

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        let imgName = response.fileName;
        if (Platform.OS === "ios") {
          // on iOS, using camera returns undefined fileName. This fixes that issue, so API can work.
          var getFilename = response.uri.split("/");
          imgName = getFilename[getFilename.length - 1];
        }
        const file = {
          uri: response.uri,
          type: response.type,
          name: imgName
        };

        console.log(JSON.stringify(file));
      }
    });
  };

  openFile = () => {
    var _docs = this.state.docsAttached;
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.images()]
      },
      (error, res) => {
        const file = {
          uri: res.uri,
          type: res.type,
          name: res.fileName
        };
        this.state.docItem.push(file);
      }
    );
    console.table(this.state.docItem);
  };

  componentDidUpdate() {}
  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 10 }}>
          <Item style={{ borderBottomWidth: 0, borderTopWidth: 1 }}>
            <Text style={{ padding: 10 }}>Name </Text>
          </Item>
          <View>
            <Text
              style={{
                textAlign: "center",
                color: "#B2BABB",
                padding: 10
              }}
            >
              FileName
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
                style={{ alignItems: "center" }}
                onPress={() => this.openlaunchCamera()}
              >
                <Icon name="camera" />
                <Text>Camera</Text>
              </Button>
              <Button
                transparent
                style={{
                  borderLeftWidth: 1,
                  borderLeftColor: "#CACFD2",
                  alignItems: "center"
                }}
                onPress={() => this.openFile()}
              >
                <Icon name="albums" />
                <Text>Album</Text>
              </Button>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <Item style={{ borderBottomWidth: 0, borderTopWidth: 1 }}>
            <Text style={{ padding: 10 }}>Name </Text>
          </Item>
          <View>
            <Text
              style={{
                textAlign: "center",
                color: "#B2BABB",
                padding: 10
              }}
            >
              FileName
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
                style={{ alignItems: "center" }}
                onPress={() => this.openlaunchCamera()}
              >
                <Icon name="camera" />
                <Text>Camera</Text>
              </Button>
              <Button
                transparent
                style={{
                  borderLeftWidth: 1,
                  borderLeftColor: "#CACFD2",
                  alignItems: "center"
                }}
                onPress={() => this.openFile()}
              >
                <Icon name="albums" />
                <Text>Album</Text>
              </Button>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <Item style={{ borderBottomWidth: 0, borderTopWidth: 1 }}>
            <Text style={{ padding: 10 }}>Name </Text>
          </Item>
          <View>
            <Text
              style={{
                textAlign: "center",
                color: "#B2BABB",
                padding: 10
              }}
            >
              FileName
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
                style={{ alignItems: "center" }}
                onPress={() => this.openlaunchCamera()}
              >
                <Icon name="camera" />
                <Text>Camera</Text>
              </Button>
              <Button
                transparent
                style={{
                  borderLeftWidth: 1,
                  borderLeftColor: "#CACFD2",
                  alignItems: "center"
                }}
                onPress={() => this.openFile()}
              >
                <Icon name="albums" />
                <Text>Album</Text>
              </Button>
            </View>
          </View>
        </View>
        <View style={{ margin: 30 }}>
          <Button
            transparent
            style={{
              borderLeftWidth: 1,
              borderLeftColor: "#CACFD2",
              alignItems: "center"
            }}
            onPress={() => this.saveData()}
          >
            <Text>Save</Text>
          </Button>
        </View>
      </View>
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
)(Container1);
