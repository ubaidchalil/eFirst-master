export const visaServiceData = {
  CustomerName: "Sandeep M",
  Email: "sandeepmadollathil@gmail.com",
  PersonalPhone: "123456789",
  OfficePhone: "",
  Address: "Address Line 1, Address Line 2 Street, City - ",
  Street: "Street",
  City: "City",
  Zip: "1234",
  AddressCountry: "United Arab Emirates",
  AddressState: "Abu Dhabi",
  TotalBillAmount: 4661,
  CurrencyUsed: "AED",
  MinimumServiceCharge: 105,
  PageData: [
    {
      Text: "Select Service",
      Name: "SelectService1",
      Value: "New Visa",
      ControlType: "Radio"
    },
    {
      Text: "Service Type",
      Name: "ServiceType1",
      Value: "Entry Permit",
      ControlType: "Radio"
    },
    {
      Text: "Visa Type",
      Name: "VisaType1",
      Value: "Partner/Investor Visa",
      ControlType: "Radio"
    },
    {
      Text: "Location",
      Name: "Location1",
      Value: "Inside Country",
      ControlType: "Radio"
    },
    {
      Text: "Documents and Payment Collection",
      Name:
        "PIFV_New_EntryPermit_FamilyVisa_PartnerOrInvestor_HusbandOrWife_InsideCountry",
      ControlType: "AdditionalDetails",
      Value: "",
      IsRequired: false,
      IsVisible: true,
      IBANNumber: {
        Text: "IBAN Number",
        Name: "IBANNumber",
        IsRequired: false,
        value: ""
      },
      AdditionalNotes: {
        Text: "Additional Notes",
        Name: "AdditionalNotes",
        IsRequired: false,
        value: ""
      },
      OriginalDocumentSubmissionType: {
        Text: "Original Document Submission Type",
        Name: "OriginalDocumentSubmissionType",
        IsRequired: true,
        Options: ["Through Courier", "Direct Submission at Office"],
        Value: "Direct Submission at Office",
        CourierCharge: 10
      },
      PriceDetails: [
        { Text: "Gov. fees", Value: 1180 },
        { Text: "Service charge", Value: 105 }
      ],
      Documents: [
        {
          Text: "Sponsors emirates ID",
          Name: "SponsorsemiratesID",
          FileUploaded: "YES"
        },
        { Text: "License", Name: "License", FileUploaded: "NO" },
        {
          Text: "Immigration card",
          Name: "Immigrationcard",
          FileUploaded: "NO"
        },
        {
          Text: "Memorandum of association (MOA)",
          Name: "Memorandumofassociation(MOA)",
          FileUploaded: "NO"
        },
        {
          Text: "Passport (Front)",
          Name: "Passport(Front)",
          FileUploaded: "NO"
        },
        { Text: "Passport (Back)", Name: "Passport(Back)", FileUploaded: "NO" },
        {
          Text: "1 photo (White background)",
          Name: "1photo(Whitebackground)",
          FileUploaded: "NO"
        }
      ]
    }
  ]
};

// export const visaServiceData = {
//     CustomerName: "Anees",
//     Email: "thanikalanees@yahoo.com",
//     PersonalPhone: "+919686957085",
//     OfficePhone: "23234234",
//     Address1: "Indirangar, Bangalore",
//     Zip: "213123",
//     AddressCountry: "United Arab Emirates",
//     Street: "234234234\n",
//     City: "Khalidiya",
//     SelectedState: "Abu Dhabi",
//     SelectedCountryId: 5,
//     pageData: [
//       { Text: "Select Service", Value: "New Visa" },
//       { Text: "Select Service", Value: "New Visa" },
//       { Text: "Service Type", Value: "Entry Permit" },
//       { Text: "Visa Type", Value: "Partner/Investor Visa" },
//       { Text: "Location", Value: "Inside Country" }
//     ],
//     IBANNumber: { Text: "IBAN Number", value: "" },
//     AdditionalNotes: { Text: "Additional Notes", value: "gfdggf" },
//     PriceDetails: [
//       { Text: "Gov. fees", Value: 535 },
//       { Text: "Service charge", Value: 105 },
//       { Text: "Courier Charge", Value: 10 }
//     ]
//   };
//   PriceDetils: [
//         {
//           Text: "Sponsor File Opening",
//           Currency: "AED",
//           Value: 324,
//           Comments: "",
//           $$hashKey: "object:841"
//         },
//         {
//           Text: "Gov. fees",
//           Currency: "AED",
//           Value: 4222,
//           Comments: "(inside country visa)",
//           $$hashKey: "object:842"
//         },
//         {
//           Text: "Service charge",
//           Currency: "AED",
//           Value: 105,
//           Comments: "(VAT included)",
//           $$hashKey: "object:843"
//         }
//       ],

export const liveData = {
  CustomerName: "Sandeep M",
  Email: "sandeepmadollathil@gmail.com",
  PersonalPhone: "123456789",
  OfficePhone: "",
  Address: "Address Line 1, Address Line 2 Street, City - ",
  Street: "Street",
  City: "City",
  Zip: "1234",
  AddressCountry: "United Arab Emirates",
  AddressState: "Abu Dhabi",
  TotalBillAmount: 4661,
  CurrencyUsed: "AED",
  MinimumServiceCharge: 105,
  PageData: [
    {
      Text: "Select Service",
      Name: "VisaServiceQuestion",
      Value: "New Visa",
      ControlType: "Radio"
    },
    {
      Text: "Select Service Type",
      Name: "NewVisaServiceType",
      Value: "Entry Permit",
      ControlType: "Radio"
    },
    {
      Text: "Select Visa Type",
      Name: "EntryPermitVisaType",
      Value: "Family Visa",
      ControlType: "Radio"
    },
    {
      Text: "Who is the Sponsor?",
      Name: "WhoIsTheSponsorQuestion1",
      Value: "Partner/Investor",
      ControlType: "Radio"
    },
    {
      Text: "Whom to Sponsor",
      Name: "WhomToSponsorQuestion1",
      Value: "Husband/Wife",
      ControlType: "Radio"
    },
    {
      Text: "Select Location",
      Name: "Location1",
      Value: "Inside Country",
      ControlType: "Radio"
    },
    {
      Text: "Documents and Payment Collection",
      Name:
        "PIFV_New_EntryPermit_FamilyVisa_PartnerOrInvestor_HusbandOrWife_InsideCountry",
      ControlType: "AdditionalDetails",
      Value: "",
      IsRequired: false,
      IsVisible: true,
      IBANNumber: {
        Text: "IBAN Number",
        Name: "IBANNumber",
        IsRequired: false,
        value: ""
      },
      AdditionalNotes: {
        Text: "Additional Notes",
        Name: "AdditionalNotes",
        IsRequired: false,
        value: ""
      },
      OriginalDocumentSubmissionType: {
        Text: "Original Document Submission Type",
        Name: "OriginalDocumentSubmissionType",
        IsRequired: true,
        Options: ["Through Courier", "Direct Submission at Office"],
        Value: "Direct Submission at Office",
        CourierCharge: 10
      },
      PriceDetails: [
        { Text: "Gov. fees", Value: 1180 },
        { Text: "Service charge", Value: 105 }
      ],
      Documents: [
        {
          Text: "Sponsors emirates ID",
          Name: "SponsorsemiratesID",
          FileUploaded: "YES"
        },
        { Text: "License", Name: "License", FileUploaded: "NO" },
        {
          Text: "Immigration card",
          Name: "Immigrationcard",
          FileUploaded: "NO"
        },
        {
          Text: "Memorandum of association (MOA)",
          Name: "Memorandumofassociation(MOA)",
          FileUploaded: "NO"
        },
        {
          Text: "Passport (Front)",
          Name: "Passport(Front)",
          FileUploaded: "NO"
        },
        { Text: "Passport (Back)", Name: "Passport(Back)", FileUploaded: "NO" },
        {
          Text: "1 photo (White background)",
          Name: "1photo(Whitebackground)",
          FileUploaded: "NO"
        }
      ]
    }
  ]
};

const savedData = {
  CustomerName: "Sandeep M",
  Email: "sandeepmadollathil@gmail.com",
  PersonalPhone: "123456789",
  OfficePhone: "",
  Address: "Address Line 1, Address Line 2 Street, City - ",
  Street: "Street",
  City: "City",
  Zip: "1234",
  AddressCountry: "United Arab Emirates",
  AddressState: "Abu Dhabi",
  TotalBillAmount: 4661,
  CurrencyUsed: "AED",
  MinimumServiceCharge: 105,
  PageData: [
    {
      Text: "Select Service",
      Name: "VisaServiceQuestion",
      Value: "New Visa",
      ControlType: "Radio"
    },
    {
      Text: "Select Service Type",
      Name: "NewVisaServiceType",
      Value: "Entry Permit",
      ControlType: "Radio"
    },
    {
      Text: "Select Visa Type",
      Name: "EntryPermitVisaType",
      Value: "Family Visa",
      ControlType: "Radio"
    },
    {
      Text: "Who is the Sponsor?",
      Name: "WhoIsTheSponsorQuestion1",
      Value: "Partner/Investor",
      ControlType: "Radio"
    },
    {
      Text: "Whom to Sponsor",
      Name: "WhomToSponsorQuestion1",
      Value: "Husband/Wife",
      ControlType: "Radio"
    },
    {
      Text: "Select Location",
      Name: "Location1",
      Value: "Inside Country",
      ControlType: "Radio"
    },
    {
      Text: "Documents and Payment Collection",
      Name:
        "PIFV_New_EntryPermit_FamilyVisa_PartnerOrInvestor_HusbandOrWife_InsideCountry",
      ControlType: "AdditionalDetails",
      Value: "",
      IsRequired: false,
      IsVisible: true,
      IBANNumber: {
        Text: "IBAN Number",
        Name: "IBANNumber",
        IsRequired: false,
        value: ""
      },
      AdditionalNotes: {
        Text: "Additional Notes",
        Name: "AdditionalNotes",
        IsRequired: false,
        value: ""
      },
      OriginalDocumentSubmissionType: {
        Text: "Original Document Submission Type",
        Name: "OriginalDocumentSubmissionType",
        IsRequired: true,
        Options: ["Through Courier", "Direct Submission at Office"],
        Value: "Direct Submission at Office",
        CourierCharge: 10
      },
      PriceDetails: [
        { Text: "Gov. fees", Value: 1180 },
        { Text: "Service charge", Value: 105 }
      ],
      Documents: [
        {
          Text: "Sponsors emirates ID",
          Name: "SponsorsemiratesID",
          FileUploaded: "YES"
        },
        { Text: "License", Name: "License", FileUploaded: "NO" },
        {
          Text: "Immigration card",
          Name: "Immigrationcard",
          FileUploaded: "NO"
        },
        {
          Text: "Memorandum of association (MOA)",
          Name: "Memorandumofassociation(MOA)",
          FileUploaded: "NO"
        },
        {
          Text: "Passport (Front)",
          Name: "Passport(Front)",
          FileUploaded: "NO"
        },
        { Text: "Passport (Back)", Name: "Passport(Back)", FileUploaded: "NO" },
        {
          Text: "1 photo (White background)",
          Name: "1photo(Whitebackground)",
          FileUploaded: "NO"
        }
      ]
    }
  ]
};
