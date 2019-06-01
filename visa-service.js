var abc = {
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
      OriginalDocumentRequired: {
        Text: "Original Document Required",
        Name: "OriginalDocumentRequired",
        Options: ["Sponsors Emirates ID"]
      },
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
      "Courier Charge": {
        Text: "Courier Charge",
        Name: "CourierCharge",
        Value: "XX (if opt service)"
      },
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
      ],
      ShowHideLogic: {
        Operator: "AND",
        Condition: [
          {
            ContolName: "VisaServiceQuestion",
            Operator: "EQUAL",
            TriggeringValue: "New Visa"
          },
          {
            ContolName: "NewVisaServiceType",
            Operator: "EQUAL",
            TriggeringValue: "Entry Permit"
          },
          {
            ContolName: "EntryPermitVisaType",
            Operator: "EQUAL",
            TriggeringValue: "Family Visa"
          },
          {
            ContolName: "WhoIsTheSponsorQuestion1",
            Operator: "EQUAL",
            TriggeringValue: "Partner/Investor"
          },
          {
            ContolName: "WhomToSponsorQuestion1",
            Operator: "EQUAL",
            TriggeringValue: "Husband/Wife"
          },
          {
            ContolName: "Location1",
            Operator: "EQUAL",
            TriggeringValue: "Inside Country"
          }
        ]
      }
    }
  ]
};

const abc = {
  Message: "The request is invalid.",
  ModelState: {
    "model.AddressCountry": ["The Country field is required."],
    "model.SelectedState": ["The State field is required."],
    "model.Address1": ["The Address Line 1 field is required."],
    "model.Street": ["The Street Address field is required."],
    "model.City": ["The City field is required."]
  }
};
