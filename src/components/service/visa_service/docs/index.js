import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, BackHandler, ImageBackground } from "react-native";
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
import DocumentPicker from "react-native-document-picker";
var ImagePicker = require("react-native-image-picker");
import { validateFileTypeAndSize } from "../../../../constants";
import Toast, { DURATION } from "react-native-easy-toast";

class _Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionType: "Through Courier",
      docsAttached: [],
      docNames: [],
      docsNotRequired: [],
      docItem: [],
      courier_charge: 10,
      notes: "",
      iban: "",
      validationMsg: ""
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount = () => {};

  componentWillMount = () => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };

  handleBackButtonClick = () => {
    if (Array.isArray(this.state.pageData))
      this.setState(
        {
          pageData: this.state.pageData.pop()
        },
        () => {
          this.props.navigation.goBack(null);
        }
      );
    else this.props.navigation.goBack(null);
    return true;
  };

  showToast = text => {
    this.refs.validationToasts.show(text, 3000);
  };

  openlaunchCamera = (doc, index) => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      var _docs = this.state.docsAttached;
      var _docNames = this.state.docNames;
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        let imgName = response.fileName;
        if (Platform.OS === "ios") {
          // on iOS, using camera returns undefined fileName. This fixes that issue, so API can work.
          var getFilename = response.uri.split("/");
          imgName = getFilename[getFilename.length - 1];
        }

        const pic =
          Platform.OS === "ios"
            ? {
                uri: response.uri,
                type: response.type,
                name: imgName
              }
            : {
                uri: response.uri,
                type: response.type,
                name: imgName
              };
        this.state.docItem.push(pic);
        _docs.push(doc);
        if (index < 0) {
          _docNames[doc] = !Array.isArray(_docNames[doc]) ? [] : _docNames[doc];
          _docNames[doc].push(response.fileName);
        } else _docNames[doc][index] = response.fileName;
        this.setState({ docsAttached: _docs });
        this.setState({ docNames: _docNames });
        console.log(JSON.stringify(pic));
      }
    });
  };
  openlaunchCamera_ = (doc, index) => {
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
        console.log("result => ", "User cancelled image picker");
      } else if (response.error) {
        console.log("result => ", "ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log(
          "result => ",
          "User tapped custom button: ",
          response.customButton
        );
      } else {
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

        this.state.docItem.push(file);
        _docs.push(doc);
        if (index < 0) {
          _docNames[doc] = !Array.isArray(_docNames[doc]) ? [] : _docNames[doc];
          _docNames[doc].push(response.fileName);
        } else _docNames[doc][index] = response.fileName;
        this.setState({ docsAttached: _docs });
        this.setState({ docNames: _docNames });
      }
    });
  };

  openFile = async (doc, index) => {
    var _docs = this.state.docsAttached;
    var _docNames = this.state.docNames;
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      });

      if (res) {
        const { name, size } = res;
        const valdateRes = validateFileTypeAndSize({
          fileName: name,
          fileSize: size
        });
        if (valdateRes.validateSize && valdateRes.validateType) {
          _docs.push(doc);

          if (index < 0) {
            _docNames[doc] = !Array.isArray(_docNames[doc])
              ? []
              : _docNames[doc];
            _docNames[doc].push(res.name);
          } else _docNames[doc][index] = res.name;

          this.setState({ docsAttached: _docs });
          this.setState({ docNames: _docNames });

          const file = {
            uri: res.uri,
            type: res.type,
            name: res.name
          };

          this.state.docItem.push(file);
        } else {
          showToast("- Invalid file type.\n- File must be smaller than 5 MB");
        }
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  goToDetails = () => {
    var docsNotRequired =
      this.props.navigation.state.params.details.docsNotRequired || [];
    var docs = this.props.navigation.state.params.details.docs || [];
    var docsAttached = this.state.docsAttached || [];

    this.setState({ validationMsg: "" });

    var validationErr = "";
    docs.forEach(doc => {
      if (docsAttached.indexOf(doc) == -1 && docsNotRequired.indexOf(doc) == -1)
        validationErr = "Please select all required files";
    });

    if(this.state.iban == "")
      validationErr = "Please fill the IBAN No.";

    if (validationErr) {
      this.setState({ validationMsg: validationErr });
     // return;
    }

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

    docsAndPayment.PriceDetils = price_details;
    docsAndPayment.Notes = this.props.navigation.state.params.details.Notes;
    docsAndPayment.OriginalDocumentRequired = this.props.navigation.state.params.details.OriginalDocumentRequired;

    this.props.navigation.navigate("VisaServiceDetails", {
      pageData: pageData,
      docs: this.props.navigation.state.params.details.docs,
      docsAttached: this.state.docsAttached,
      docItem: this.state.docItem,
      docsAndPayment: docsAndPayment,
      passportExpiry: this.props.navigation.state.params.details.PassportExpiry ? false : true
    });
  };

  renderDocNew = doc => {
    const _doc = doc;

    return (
      <View>
        <View>
          <Text
            style={{
              color: "#FFF",
              textAlign: "center",
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
              style={{ alignItems: "center", backgroundColor: "#D3D0C1" }}
              onPress={() => this.openlaunchCamera(_doc, -1)}
            >
              <Icon style={styles.uploadBtnIcon} name="camera" />
              <Text style={styles.uploadBtnText}>Photo</Text>
            </Button>
            <Button
              transparent
              style={{
                borderLeftWidth: 1,
                borderLeftColor: "#7f8385",
                alignItems: "center",
                backgroundColor: "#D3D0C1"
              }}
              onPress={() => this.openFile(_doc, -1)}
            >
              <Icon style={styles.uploadBtnIcon} name="albums" />
              <Text style={styles.uploadBtnText}>File</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  };

  renderDocArr = doc => {
    const _doc = doc;
    return this.state.docNames[doc] ? (
      this.state.docNames[doc].map((doc, index) => {
        return (
          <View
            style={{
              borderRadius: 15,
              borderTopLeftRadius: 0,
              marginTop: 5,
              padding: 5
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "#FFF",
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
                  borderRadius: 10,
                  backgroundColor: "#D3D0C1"
                }}
              >
                <Button
                  transparent
                  style={{ alignItems: "center" }}
                  onPress={() => this.openlaunchCamera(_doc, index)}
                >
                  <Icon style={styles.uploadBtnIcon} name="camera" />
                  <Text style={styles.uploadBtnText}>Photo</Text>
                </Button>
                <Button
                  transparent
                  style={{
                    borderLeftWidth: 1,
                    borderLeftColor: "#7f8385",
                    alignItems: "center",
                    backgroundColor: "#D3D0C1"
                  }}
                  onPress={() => this.openFile(_doc, index)}
                >
                  <Icon style={styles.uploadBtnIcon} name="albums" />
                  <Text style={styles.uploadBtnText}>File</Text>
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
    var docsNotRequired =
      this.props.navigation.state.params.details.docsNotRequired || null;

    return this.props.navigation.state.params.details.docs.map(doc => {
      var IsRequired =
        docsNotRequired != null
          ? docsNotRequired.indexOf(doc) >= 0
            ? ""
            : "*"
          : "*";
      const fileSelected = this.state.docNames[doc] ? true : false;
      return (
        <View
          style={{
            marginTop: 10,
            backgroundColor: fileSelected
              ? "rgba(0,153,51,0.2)"
              : "rgba(52, 52, 52, 0.17)",
            borderRadius: 15,
            borderTopLeftRadius: 0,
            padding: 5
          }}
        >
          <Item style={{ borderBottomWidth: 0 }}>
            <Text style={[{ color: "#FFF", padding: 10 }]}>
              {doc} {IsRequired}{" "}
            </Text>
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
        <ImageBackground
          source={require("../../../../Assets/bg_all.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{
              backgroundColor: "rgba(52, 52, 52, 0.3)",
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
          >
            <View>
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 14,
                  marginLeft: 5,
                  fontWeight: "bold"
                }}
              >
                Documents
              </Text>
            </View>
            <Right />
          </View>
          <Content style={{ padding: 10, marginBottom: 50 }}>
            <View style={styles.itemTransparent}>
              <Item>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 16,
                    padding: 10,
                    fontWeight: "bold"
                  }}
                >
                  Original Document Submission Type
                </Text>
              </Item>

              <ListItem
                onPress={() =>
                  this.setState({ submissionType: "Through Courier" })
                }
              >
                <Left>
                  <Text style={{ color: "#FFF" }}>Through Courier</Text>
                </Left>
                <Right>
                  <Radio
                    selected={this.state.submissionType == "Through Courier"}
                  />
                </Right>
              </ListItem>
              <ListItem
                onPress={() =>
                  this.setState({
                    submissionType: "Direct Submission at Office"
                  })
                }
              >
                <Left>
                  <Text style={{ color: "#FFF" }}>
                    Direct Submission at Office
                  </Text>
                </Left>
                <Right>
                  <Radio
                    selected={
                      this.state.submissionType == "Direct Submission at Office"
                    }
                  />
                </Right>
              </ListItem>
            </View>
            <Item style={{}}>
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 16,
                  padding: 10,
                  fontWeight: "bold"
                }}
              >
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
              <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 12 }}>
                File format:
              </Text>
              <Text style={{ color: "#FFF", fontSize: 12 }}>
                {" "}
                .jpeg, .jpg, .png, .docx, .doc, .xlx, .xlxs, .pdf
              </Text>
            </View>
            {this.renderDocs()}

            <View>
              <Item style={styles.itemTransparent}>
                <Input
                  style={{ fontSize: 16, color: "#FFF" }}
                  placeholderTextColor={"#FFF"}
                  placeholder="IBAN Number *"
                  name="Iban"
                  label="Iban"
                  onChangeText={value => this.setState({ iban: value })}
                  value={this.state.iban}
                />
              </Item>
            </View>

            <Item style={styles.itemTransparent}>
              <Textarea
                style={{ fontSize: 16, color: "#FFF" }}
                placeholderTextColor={"#FFF"}
                rowSpan={5}
                placeholder="Notes"
                underline
                name="notes"
                label="notes"
                onChangeText={value => this.setState({ notes: value })}
                value={this.state.notes}
              />
            </Item>

            <Item style={{ borderBottomWidth: 0 }}>
              <Text style={{ fontSize: 14, padding: 10, color: "red" }}>
                {this.state.validationMsg}
              </Text>
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
        </ImageBackground>
      </Container>
    );
  };
}

const styles = {
  uploadBtnIcon: {
    color: "black"
  },
  uploadBtnText: {
    color: "black"
  },
  uploadBtn: {
    borderColor: "black"
  },
  itemTransparent: {
    marginTop: 5,
    borderBottomWidth: 0,
    backgroundColor: "rgba(250, 250, 250, 0.13)",
    paddingHorizontal: 10
  }
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_Container);
