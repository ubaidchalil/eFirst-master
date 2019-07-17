import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Linking } from "react-native";
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
import VisaServiceDt from "./visaservicedt";

class SRInfo extends Component {
  certtificateTypeName = SelectedCertificateType => {
    console.log("certificateParams =>", SelectedCertificateType);
    const { certificatetype } = this.props;
    const selectCertType = certificatetype.data.filter(
      cert => cert.CertificateTypeID == SelectedCertificateType
    );
    if (selectCertType.length > 0) {
      return selectCertType[0].CertificateTypeName;
    } else {
      return "";
    }
  };

  countryName = SelectedCountryId => {
    const { countries } = this.props;
    const selectCountry = countries.data.filter(
      country => country.CountryID == SelectedCountryId
    );
    if (selectCountry.length > 0) {
      return selectCountry[0].CountryName;
    } else {
      return "";
    }
  };

  documentTypesName = documentTypeId => {
    const { documenttypes } = this.props;
    const selectDocumentType = documenttypes.data.filter(
      doc => doc.DocumentTypeId == documentTypeId
    );
    if (selectDocumentType.length > 0) {
      return selectDocumentType[0].DocumentTypeName;
    } else {
      return "";
    }
  };

  languageName = languageId => {
    const { documentlanguage } = this.props;
    const selectedLanguage = documentlanguage.data.filter(
      lang => lang.LanguageID == languageId
    );
    if (selectedLanguage.length > 0) {
      return selectedLanguage[0].LanguageName;
    } else {
      return "";
    }
  };

  render() {
    const {
      srInfo: {
        CustomerName,
        Email,
        PersonalPhone,
        OfficePhone,
        Address,
        TotalRate,
        SelectedCountryId,
        SelectedCertificateType,
        SelectedDocumentTypeId,
        SelectedFromDocumentLanguageId,
        SelectedToDocumentLanguageId
      },
      srDetail: { TrackingNo }
    } = this.props;

    const pageData = this.props.srInfo.PageData || null;
    const ServiceName = this.props.srInfo.Service
      ? this.props.srInfo.Service.ServiceName
      : this.props.srDetail.ServiceName;
    const legalStamp = this.props.srInfo.LegalStamp
      ? this.props.srInfo.LegalStamp
      : false;
    const PickUpandDropOption = this.props.srInfo.PickUpandDropOption
      ? this.props.srInfo.PickUpandDropOption
      : "";
    console.log("PICKUP==>", PickUpandDropOption);
    return (
      <Container>
        <ScrollView>
          <Content style={{ padding: 10 }}>
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
            {OfficePhone && OfficePhone != "undefined" && (
              <View style={styles.item_border}>
                <Text style={styles.label}>Office : </Text>
                <Text style={styles.value}> {OfficePhone} </Text>
              </View>
            )}
            <View style={styles.item_border}>
              <Text style={styles.label}>Address : </Text>
              <View style={{flex:1}} >
                <Text style={styles.value}> {Address} </Text>
              </View>
            </View>
            {ServiceName === "ATTESTATION SERVICE" && (
              <View style={styles.item_border}>
                <Text style={styles.label}>Country : </Text>
                <Text style={styles.value}>
                  {" "}
                  {this.props.countries.data
                    ? this.countryName(SelectedCountryId)
                    : ""}{" "}
                </Text>
              </View>
            )}
            {ServiceName === "ATTESTATION SERVICE" && (
              <View style={styles.item_border}>
                <Text style={styles.label}>Certificate Type : </Text>
                <Text style={styles.value}>
                  {" "}
                  {this.props.certificatetype.data
                    ? this.certtificateTypeName(SelectedCertificateType)
                    : ""}{" "}
                </Text>
              </View>
            )}

            {(ServiceName === "TRANSLATION SERVICE" ||
              ServiceName == "TRANSLATION") && (
              <View style={styles.item_border}>
                <Text style={styles.label}>Document Type : </Text>
                <Text style={styles.value}>
                  {" "}
                  {this.props.certificatetype.data
                    ? this.documentTypesName(SelectedDocumentTypeId)
                    : ""}{" "}
                </Text>
              </View>
            )}

            {(ServiceName === "TRANSLATION SERVICE" ||
              ServiceName == "TRANSLATION") && (
              <View style={styles.item_border}>
                <Text style={styles.label}>Document Language : </Text>
                <Text style={styles.value}>
                  {" "}
                  {this.props.certificatetype.data
                    ? this.languageName(SelectedFromDocumentLanguageId)
                    : ""}{" "}
                </Text>
              </View>
            )}

            {(ServiceName === "TRANSLATION SERVICE" ||
              ServiceName == "TRANSLATION") && (
              <View style={styles.item_border}>
                <Text style={styles.label}>Document to be Translated : </Text>
                <Text style={styles.value}>
                  {" "}
                  {this.props.certificatetype.data
                    ? this.languageName(SelectedToDocumentLanguageId)
                    : ""}{" "}
                </Text>
              </View>
            )}
            {ServiceName === "ATTESTATION SERVICE" && (
              <View style={styles.item_border}>
                <Text style={styles.label}>Pick Up & Drop Option : </Text>
                <Text style={styles.value}> {PickUpandDropOption} </Text>
              </View>
            )}
            {(ServiceName === "TRANSLATION SERVICE" ||
              ServiceName == "TRANSLATION") && (
              <View style={styles.item_border}>
                <Text style={styles.label}>Legal Stamp : </Text>
                <Text style={styles.value}>
                  {legalStamp == true ? "Yes" : "No"}
                </Text>
              </View>
            )}

            {(ServiceName === "TRANSLATION SERVICE" ||
              ServiceName == "TRANSLATION") &&
              legalStamp == true && (
                <View style={styles.item_border}>
                  <Text style={styles.label}>Pick Up & Drop Option : </Text>
                  <Text style={styles.value}>{PickUpandDropOption}</Text>
                </View>
              )}

            {(ServiceName === "TRANSLATION SERVICE" ||
              ServiceName == "TRANSLATION") &&
              legalStamp == true &&
              PickUpandDropOption == "Through Courier" && (
                <View style={styles.item_border}>
                  <Text style={styles.label}>Shipment Tracking No : </Text>
                  <Text
                    onPress={() =>
                      Linking.openURL(
                        "https://track.easypick.me/track-shipment"
                      )
                    }
                    style={[
                      styles.value,
                      { color: "#337ab7", textDecorationLine: "underline" }
                    ]}
                  >
                    {TrackingNo}
                  </Text>
                </View>
              )}

            {ServiceName === "ATTESTATION SERVICE" &&
              PickUpandDropOption == "Through Courier" && (
                <View style={styles.item_border}>
                  <Text style={styles.label}>Shipment Tracking No : </Text>
                  <Text
                    onPress={() =>
                      Linking.openURL(
                        "https://track.easypick.me/track-shipment"
                      )
                    }
                    style={[
                      styles.value,
                      { color: "#337ab7", textDecorationLine: "underline" }
                    ]}
                  >
                    {TrackingNo}
                  </Text>
                </View>
              )}

            {ServiceName != "VISA SERVICE" && (
              <View style={styles.item_border}>
                <Text style={styles.label}>Bill Amount :</Text>
                <Text style={styles.value}> {TotalRate} AED </Text>
              </View>
            )}
            <View style={{ marginBottom: 10 }} />
            {pageData && <VisaServiceDt pageData={pageData} />}
          </Content>
        </ScrollView>
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
  value: { color: "#A6ACAF", fontSize: 16, flexGrow: 1 }
});

const mapStateToProps = ({
  servicerequest: { srInfo, srDetail },
  certificatetype,
  countries,
  documenttypes,
  documentlanguage
}) => ({
  srInfo,
  srDetail,
  certificatetype,
  countries,
  documenttypes,
  documentlanguage
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SRInfo);
