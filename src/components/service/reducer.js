import {
  attestationState,
  countryState,
  documentTypeState,
  attesstationRateState,
  servicesState,
  documentLanguageState,
  certificateTypeState,
  langTransState,
  serviceRequestState,
  translationRateState
} from "./action";

const initialDocumentAttestation = {
  loading: false,
  succuss: null,
  error: null
};

const initialLangTranslation = {
  loading: false,
  succuss: null,
  error: null
};

const initialCountry = {
  loading: false,
  data: [],
  succuss: null,
  error: null
};

const initialServices = {
  loading: false,
  data: [],
  succuss: null,
  error: null
};

const initialDocumentType = {
  loading: false,
  data: [],
  succuss: null,
  error: null
};

const initialCertificateType = {
  loading: false,
  data: [],
  succuss: null,
  error: null
};

const initialDocumentLanguage = {
  loading: false,
  data: [],
  succuss: null,
  error: null
};

const initialAttestationRate = {
  loading: false,
  data: null,
  succuss: null,
  error: null
};

const initialTranslationRate = {
  loading: false,
  data: null,
  succuss: null,
  error: null
};

const initialServiceRequest = {
  loading: false,
  messages: null,
  messageIds: [],
  documents: [],
  srDetail: null,
  srInfo: null,
  messageList: [],
  statusList: [],
  succuss: null,
  error: null
};

export const documentattestation = (
  state = initialDocumentAttestation,
  action
) => {
  switch (action.type) {
    case attestationState.LOADING:
      return { ...state, loading: action.state };
    case attestationState.SUCCESS:
      return { ...state, success: action.state };
    case attestationState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const langtranslation = (state = initialLangTranslation, action) => {
  switch (action.type) {
    case langTransState.LOADING:
      return { ...state, loading: action.state };
    case langTransState.SUCCESS:
      return { ...state, success: action.state };
    case langTransState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const documenttypes = (state = initialDocumentType, action) => {
  switch (action.type) {
    case documentTypeState.LOADING:
      return { ...state, loading: action.state };
    case documentTypeState.DONE:
      return { ...state, data: action.state };
    case documentTypeState.SUCCESS:
      return { ...state, success: action.state };
    case documentTypeState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const countries = (state = initialCountry, action) => {
  switch (action.type) {
    case countryState.LOADING:
      return { ...state, loading: action.state };
    case countryState.DONE:
      return { ...state, data: action.state };
    case countryState.SUCCESS:
      return { ...state, success: action.state };
    case countryState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const translationrate = (state = initialTranslationRate, action) => {
  switch (action.type) {
    case translationRateState.LOADING:
      return { ...state, loading: action.state };
    case translationRateState.DONE:
      return { ...state, data: action.state };
    case translationRateState.SUCCESS:
      return { ...state, success: action.state };
    case translationRateState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const services = (state = initialServices, action) => {
  switch (action.type) {
    case servicesState.LOADING:
      return { ...state, loading: action.state };
    case servicesState.DONE:
      return { ...state, data: action.state };
    case servicesState.SUCCESS:
      return { ...state, success: action.state };
    case servicesState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const attestationrate = (state = initialAttestationRate, action) => {
  switch (action.type) {
    case attesstationRateState.LOADING:
      return { ...state, loading: action.state };
    case attesstationRateState.DONE:
      return { ...state, data: action.state };
    case attesstationRateState.SUCCESS:
      return { ...state, success: action.state };
    case attesstationRateState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const documentlanguage = (state = initialDocumentLanguage, action) => {
  switch (action.type) {
    case documentLanguageState.LOADING:
      return { ...state, loading: action.state };
    case documentLanguageState.DONE:
      return { ...state, data: action.state };
    case documentLanguageState.SUCCESS:
      return { ...state, success: action.state };
    case documentLanguageState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const certificatetype = (state = initialCertificateType, action) => {
  switch (action.type) {
    case certificateTypeState.LOADING:
      return { ...state, loading: action.state };
    case certificateTypeState.DONE:
      return { ...state, data: action.state };
    case certificateTypeState.SUCCESS:
      return { ...state, success: action.state };
    case certificateTypeState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const servicerequest = (state = initialServiceRequest, action) => {
  switch (action.type) {
    case serviceRequestState.LOADING:
      return { ...state, loading: action.state };
    case serviceRequestState.DONE: {
      const {
        DocumentList,
        SRNotes,
        Messages,
        SRDetail: { SRDataJson, ...SRDetail }
      } = action.state;
      const messageList = Messages.reduce((r, a) => {
        r[a.NoteID] = r[a.NoteID] || [];
        r[a.NoteID].push(a);
        return r;
      }, {});

      var srInfo = SRDataJson;
      if (typeof srInfo == "string") {
        srInfo = JSON.parse(SRDataJson);
      }
      const srMessage = SRNotes.filter(({ NoteType }) => NoteType === 5);
      const srStaus = SRNotes.filter(({ NoteType }) => NoteType !== 5);
      return {
        ...state,
        messages: messageList,
        documents: DocumentList,
        messageList: srMessage,
        statusList: srStaus,
        srDetail: SRDetail,
        srInfo: srInfo
      };
    }
    case serviceRequestState.SUCCESS:
      return { ...state, success: action.state };
    case serviceRequestState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};
