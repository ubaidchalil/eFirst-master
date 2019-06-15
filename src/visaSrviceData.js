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
      OriginalDocumentSubmissionType: {
        Text: "Original Document Submission Type",
        Name: "OriginalDocumentSubmissionType",
        IsRequired: true,
        Options: ["Through Courier", "Direct Submission at Office"],
        Value: "Through Courier",
        CourierCharge: 10
      },
      IBANNumber: {
        Text: "IBAN Number",
        Name: "IBANNumber",
        IsRequired: false,
        Value: ""
      },
      AdditionalNotes: {
        Text: "Additional Notes",
        Name: "AdditionalNotes",
        IsRequired: false,
        Value: "Test Note"
      },
      Notes: { Text: "Notes", Name: "Notes", Value: "" },

      PriceDetils: [
        {
          Text: "Sponsor File Opening",
          Currency: "AED",
          Value: 324,
          Comments: "",
          $$hashKey: "object:841"
        },
        {
          Text: "Gov. fees",
          Currency: "AED",
          Value: 4222,
          Comments: "(inside country visa)",
          $$hashKey: "object:842"
        },
        {
          Text: "Service charge",
          Currency: "AED",
          Value: 105,
          Comments: "(VAT included)",
          $$hashKey: "object:843"
        }
      ],

      Documents: [
        {
          Text: "Sponsors emirates ID",
          Name: "SponsorsEmiratesID",
          FileUploaded: "YES",
          IsRequired: false,
          $$hashKey: "object:849"
        },
        {
          Text: "Sponsors passport (Front)",
          Name: "SponsorsPassport_Front",
          FileUploaded: "NO",
          IsRequired: false,
          $$hashKey: "object:850"
        },
        {
          Text: "Sponsors passport (Back)",
          Name: "SponsorsPassport_Back",
          FileUploaded: "NO",
          IsRequired: false,
          $$hashKey: "object:851"
        },
        {
          Text: "Sponsor visa",
          Name: "SponsorVisa",
          FileUploaded: "NO",
          IsRequired: false,
          $$hashKey: "object:852"
        },
        {
          Text: "Residential ejari (under sponsors name)",
          Name: "ResidentialEjari_UnderSponsorsName",
          FileUploaded: "NO",
          IsRequired: false,
          $$hashKey: "object:853"
        },
        {
          Text: "Memorandum of association (MOA)",
          Name: "MemorandumOfAssociation_MOA",
          FileUploaded: "NO",
          IsRequired: false,
          $$hashKey: "object:854"
        },
        {
          Text: "Marriage certi?cate attested",
          Name: "MarriageCerti?cateAttested",
          FileUploaded: "NO",
          IsRequired: false,
          $$hashKey: "object:855"
        },
        {
          Text: "Sponsored passport (Front)",
          Name: "SponsoredPassport_Front",
          FileUploaded: "NO",
          IsRequired: false,
          $$hashKey: "object:856"
        },
        {
          Text: "Sponsored passport (Back)",
          Name: "SponsoredPassport_Back",
          FileUploaded: "NO",
          IsRequired: false,
          $$hashKey: "object:857"
        },
        {
          Text: "1 photo (white background)",
          Name: "OnePhoto_WhiteBackground",
          FileUploaded: "NO",
          IsRequired: false,
          $$hashKey: "object:858"
        },
        {
          Text: "Last 3 months bank statement (if available)",
          Name: "LastThreeMonthsBankStatement_IfAvailable",
          FileUploaded: "NO",
          IsRequired: false,
          $$hashKey: "object:859"
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
