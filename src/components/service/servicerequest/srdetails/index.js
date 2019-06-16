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
import VisaServiceDt from "./visaservicedt";

class SRInfo extends Component {
  certtificateTypeName = SelectedCertificateType => {
    const { certificatetype } = this.props;
    const selectCertType = certificatetype.data.filter(
      cert => cert.CertificateTypeID == SelectedCertificateType
    );
    return selectCertType[0].CertificateTypeName;
  };

  countryName = SelectedCountryId => {
    const { countries } = this.props;
    const selectCountry = countries.data.filter(
      country => country.CountryID == SelectedCountryId
    );
    return selectCountry[0].CountryName;
  };

  documentTypesName = documentTypeId => {
    const { documenttypes } = this.props;
    const selectDocumentType = documenttypes.data.filter(
      doc => doc.DocumentTypeId == documentTypeId
    );
    return selectDocumentType[0].DocumentTypeName;
  };

  languageName = languageId => {
    const { documentlanguage } = this.props;
    const selectedLanguage = documentlanguage.data.filter(
      lang => lang.LanguageID == languageId
    );
    return selectedLanguage[0].LanguageName;
  };

  render() {
    const {
      srInfo: {
        CustomerName,
        Email,
        PersonalPhone,
        Address,
        TotalRate, 
        SelectedCountryId,
        SelectedCertificateType,
        SelectedDocumentTypeId,
        SelectedFromDocumentLanguageId,
        SelectedToDocumentLanguageId
      }
    } = this.props;
    const {
      srDetail: { ServiceName }
    } = this.props;
    const pageData = this.props.srInfo.PageData || null;
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
            <View style={styles.item_border}>
              <Text style={styles.label}>Address : </Text>
              <Text style={styles.value}> {Address} </Text>
            </View>
            {ServiceName === "ATTESTATION" && (
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
            {ServiceName === "ATTESTATION" && (
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

            {ServiceName === "TRANSLATION" && (
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

            {ServiceName === "TRANSLATION" && (
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

            {ServiceName === "TRANSLATION" && (
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

            {/* <View style={styles.item_border}>
              <Text style={styles.label}>
                Document Pickup and Drop Location :
              </Text>
              <Text style={styles.value}> Text</Text>
            </View> */}
            <View style={styles.item_border}>
              <Text style={styles.label}>Rate :</Text>
              <Text style={styles.value}>
                {" "}
                {TotalRate}
                {""}AED{" "}
              </Text>
            </View>
            {pageData && (
             <VisaServiceDt pageData={pageData} />
            )}
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
  value: { color: "#A6ACAF", fontSize: 16 }
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
