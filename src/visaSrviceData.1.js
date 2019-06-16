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

const savedData = {
  CustomerName: "Anees",
  Email: "thanikalanees@yahoo.com",
  PersonalPhone: "+919686957085",
  Address1: "Indirangar, Bangalore",
  Zip: "",
  AddressCountry: "United Arab Emirates",
  Street: "dsadas",
  City: "D",
  SelectedState: "Ajman",
  SelectedCountryId: 4,
  pageData: [
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
