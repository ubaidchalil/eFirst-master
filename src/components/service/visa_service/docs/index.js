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
import {
  DocumentPicker,
  DocumentPickerUtil
} from "react-native-document-picker";
var ImagePicker = require("react-native-image-picker");
import { validateFileTypeAndSize } from "../../../../constants";
import Toast, { DURATION } from "react-native-easy-toast";

class _Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionType: "Direct Submission at Office",
      docsAttached: [],
      docNames: [],
      docItem: [],
      courier_charge: 10,
      notes: "",
      iban: ""
    };
  }

  componentDidMount = () => {
    console.log(
      "result = > data : ",
      JSON.stringify(this.props.navigation.state.params.data)
    );
  };
  componentDidUpdate() {}
  showToast = text => {
    this.refs.validationToasts.show(text, 3000);
  };
  openlaunchCamera = (doc, index) => {
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
      var _docNames = this.state.docNames;

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const file = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        };
        this.state.docItem.push(file);

        _docs.push(doc);

        if (index < 0) {
          _docNames[doc] = !Array.isArray ? [] : _docNames[doc];
          _docNames[doc].push(res.fileName);
        } else _docNames[doc][index] = res.fileName;

        this.setState({ docsAttached: _docs });
        this.setState({ docNames: _docNames });

        console.log(JSON.stringify(file));
      }
    });
  };

  openFile = (doc, index) => {
    var _docs = this.state.docsAttached;
    var _docNames = this.state.docNames;

    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.allFiles()]
      },
      (error, res) => {
        // Android
        console.log(
          res.uri,
          res.type, // mime type
          res.fileName,
          res.fileSize
        );
        console.log(_docs);
        const valdateRes = validateFileTypeAndSize(res);
        if (valdateRes.validateSize && valdateRes.validateType) {
          _docs.push(doc);

          if (index < 0) {
            _docNames[doc] = !Array.isArray(_docNames[doc])
              ? []
              : _docNames[doc];
            _docNames[doc].push(res.fileName);
          } else _docNames[doc][index] = res.fileName;

          this.setState({ docsAttached: _docs });
          this.setState({ docNames: _docNames });

          const file = {
            uri: res.uri,
            type: res.type,
            name: res.fileName
          };

          this.state.docItem.push(file);
        } else {
          this.showToast(
            "- Invalid file type.\n- File must be smaller than 5 MB"
          );
        }
      }
    );
  };

  goToDetails = () => {
    var data = this.props.navigation.state.params.data;
    var pageData = this.props.navigation.state.params.pageData;
    var price_details = this.props.navigation.state.params.details.PriceDetails;

    var docsAndPayment = {
      Text: "Documents and Payment Collection",
      Name:
        "PIFV_New_EntryPermit_FamilyVisa_PartnerOrInvestor_HusbandOrWife_InsideCountry",
      ControlType: "AdditionalDetails",
      Value: "",
      IsRequired: false,
      IsVisible: true
    };

    docsAndPayment.IBANNumber = {
      Text: "IBAN Number",
      Name: "IBANNumber",
      IsRequired: false,
      value: this.state.iban
    };

    docsAndPayment.AdditionalNotes = {
      Text: "Additional Notes",
      Name: "AdditionalNotes",
      IsRequired: false,
      value: this.state.notes
    };

    docsAndPayment.OriginalDocumentSubmissionType = {
      Text: "Original Document Submission Type",
      Name: "OriginalDocumentSubmissionType",
      IsRequired: true,
      Options: ["Through Courier", "Direct Submission at Office"],
      Value: this.state.submissionType,
      CourierCharge: 10
    };

    if (this.state.submissionType == "Through Courier")
      price_details.push({
        Text: "Courier Charge",
        Value: this.state.courier_charge
      });
    docsAndPayment.PriceDetils = price_details;
    docsAndPayment.Notes = this.props.navigation.state.params.details.Notes;
    docsAndPayment.OriginalDocumentRequired = this.props.navigation.state.params.details.OriginalDocumentRequired;

    this.props.navigation.navigate("VisaServiceDetails", {
      data: data,
      pageData: pageData,
      docs: this.props.navigation.state.params.details.docs,
      docsAttached: this.state.docsAttached,
      docItem: this.state.docItem,
      docsAndPayment: docsAndPayment
    });
  };

  renderDocNew = doc => {
    const _doc = doc;
    return (
      <View>
        <View>
          <Text
            style={{
              textAlign: "center",
              color: "#B2BABB",
              padding: 10
            }}
          >
            {"Select File"}
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
              onPress={() => this.openlaunchCamera(_doc, -1)}
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
              onPress={() => this.openFile(_doc, -1)}
            >
              <Icon name="albums" />
              <Text>Album</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  };

  renderDocArr = doc => {
    const _doc = doc;
    return this.state.docNames[doc] ? (
      this.state.docNames[doc].map(doc => {
        return (
          <View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "#B2BABB",
                  padding: 10
                }}
              >
                {doc || "Select File"}
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
                  onPress={() => this.openlaunchCamera(_doc, index)}
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
                  onPress={() => this.openFile(_doc, index)}
                >
                  <Icon name="albums" />
                  <Text>Album</Text>
                </Button>
              </View>
            </View>
          </View>
        );
      })
    ) : (
      <View />
    );
  };

  renderDocs = () => {
    return this.props.navigation.state.params.details.docs.map(doc => {
      return (
        <View style={{ marginTop: 10 }}>
          <Item style={{ borderBottomWidth: 0, borderTopWidth: 1 }}>
            <Text style={{ padding: 10 }}>{doc} </Text>
          </Item>
          {this.renderDocArr(doc)}
          {this.renderDocNew(doc)}
        </View>
      );
    });
  };

  render = () => {
    return (
      <Container>
        <MyHeader navigation={this.props.navigation} header="Visa Service" />

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
          <Right />
        </View>
        <Content style={{ padding: 10 }}>
          <Item>
            <Text style={{ fontSize: 16, padding: 10, fontWeight: "bold" }}>
              Original Document Submission Type
            </Text>
          </Item>

          <ListItem
            onPress={() => this.setState({ submissionType: "Through Courier" })}
          >
            <Left>
              <Text>Through Courier</Text>
            </Left>
            <Right>
              <Radio
                selected={this.state.submissionType == "Through Courier"}
              />
            </Right>
          </ListItem>

          <ListItem
            onPress={() =>
              this.setState({ submissionType: "Direct Submission at Office" })
            }
          >
            <Left>
              <Text>Direct Submission at Office</Text>
            </Left>
            <Right>
              <Radio
                selected={
                  this.state.submissionType == "Direct Submission at Office"
                }
              />
            </Right>
          </ListItem>

          <Item style={{ borderBottomWidth: 0 }}>
            <Text style={{ fontSize: 16, padding: 10, fontWeight: "bold" }}>
              Upload Document Copies
            </Text>
          </Item>
          <View
            style={{
              paddingTop: 10,
              paddingLeft: 10,
              paddingRight: 10,
              flexDirection: "row"
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 12 }}>
              File format:
            </Text>
            <Text style={{ fontSize: 12 }}>
              {" "}
              .jpeg, .jpg, .png, .docx, .doc, .xlx, .xlxs, .pdf
            </Text>
          </View>
          {this.renderDocs()}

          {this.props.navigation.state.params.details["IBAN number"] !=
          undefined ? (
            <View>
              <Item>
                <Text
                  style={{
                    fontSize: 16,
                    padding: 10,
                    fontWeight: "bold",
                    marginTop: 5
                  }}
                >
                  IBAN Number
                </Text>
              </Item>
              <Item>
                <Input
                  style={{ fontSize: 16 }}
                  placeholder="IBAN Number"
                  name="Iban"
                  label="Iban"
                  onChangeText={value => this.setState({ iban: value })}
                  value={this.state.iban}
                />
              </Item>
            </View>
          ) : (
            <View />
          )}

          <Item>
            <Text style={{ fontSize: 16, padding: 10, fontWeight: "bold" }}>
              Additional Notes
            </Text>
          </Item>
          <Item>
            <Textarea
              rowSpan={5}
              placeholder="Notes"
              underline
              name="notes"
              label="notes"
              onChangeText={value => this.setState({ notes: value })}
              value={this.state.notes}
            />
          </Item>

          <Button
            style={{
              backgroundColor: "#183E61",
              marginBottom: 30,
              marginTop: 10,
              marginHorizontal: 5
            }}
            full
            rounded
            onPress={() => {
              this.goToDetails();
            }}
          >
            <Text>Next</Text>
          </Button>
        </Content>
        <Toast
          ref="validationToasts"
          style={{
            backgroundColor: "#d12626",
            bottom: 25
          }}
          position="bottom"
        />
      </Container>
    );
  };
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_Container);
