// import React from "react";

// const PostMessage = (
//   <View style={{ padding: 15 }}>
//     <Form>
//       <Item>
//         <Input
//           placeholder="Message Title"
//           name="Office"
//           label="Office"
//           onChangeText={value => setFieldValue("OfficePhone", value)}
//           value={values.OfficePhone}
//           error={touched.OfficePhone && errors.OfficePhone}
//           underlineColor={Color.secondary}
//         />
//       </Item>
//       <Item style={styles.item_margin}>
//         <Textarea rowSpan={5} placeholder="Message" underline />
//       </Item>
//       <Button
//         style={{ marginTop: 10 }}
//         full
//         rounded
//         onPress={() => this.setState({ showPopUp: false })}
//       >
//         <Text> SEND </Text>
//       </Button>
//     </Form>
//   </View>
// );

// export default withFormik({
//   mapPropsToValues: ({
//     attestationPrice,
//     countries,
//     documenttypes,
//     documentTypes,
//     getCountries,
//     attestationrate,
//     message,
//     token,
//     docAttestationCreate
//   }) => ({
//     CustomerName: profile.data.userdetail.FirstName,
//     Email: profile.data.contactdetail.Email,
//     PersonalPhone: profile.data.contactdetail.Phone,
//     OfficePhone: profile.data.officedetail.FirstName,
//     Address: profile.data.contactdetail.Addressline1,
//     SelectedCountryId: "",
//     SelectedCertificateType: "",
//     PickUpandDropOption: "Through Courier",
//     docAttestationCreate
//   }),
//   validateOnChange: false,

//   validationSchema: Yup.object().shape({
//     CustomerName: Yup.string()
//       .min(3, "Must be longer than 3 characters")
//       .required("Required"),
//     Email: Yup.string()
//       .min(4, "Must be longer than 4 characters")
//       .email("Email not valid")
//       .required("Required"),
//     PersonalPhone: Yup.string().required("Required"),
//     SelectedCountryId: Yup.string().required("Required"),
//     SelectedCertificateType: Yup.string().required("Required")
//   }),

//   handleSubmit: (values, { props }) => {
//     const { attestationrate } = props;
//     const token = props.token.token;
//     var Rate = attestationrate.data
//       ? values.PickUpandDropOption == "Through Courier"
//         ? attestationrate.data.Rate + 28
//         : attestationrate.data.Rate
//       : 0;
//     return values.docAttestationCreate({ ...values, Rate, token });
//   }
// })(DocumentAttestation);

// // NoteType: NewMessage
// // MessageTitle: Test
// // MessageContent: gfvvbbmmb
// // SRID: 138
// // NoteID: 0
// // IsAdminMessage: 0
// // CreatedBy: 44
