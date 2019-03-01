import {
  profileState,
  userProfileState,
  userContactDetailState,
  userOfficeAddressState,
  userPersonalDetailState
} from "./action";

const initialUserProfile = {
  loading: false,
  succuss: null,
  error: null
};

const initialUserPersonalDetail = {
  loading: false,
  succuss: null,
  error: null
};

const initialUserContactlDetail = {
  loading: false,
  succuss: null,
  error: null
};

const initialUserOfficeAddress = {
  loading: false,
  succuss: null,
  error: null
};

const initialProfile = {
  loading: false,
  data: {
    userdetail: [],
    officedetail: [],
    personaldetail: [],
    contactdetail: []
  },
  succuss: null,
  error: null
};

export const userprofile = (state = initialUserProfile, action) => {
  switch (action.type) {
    case userProfileState.LOADING:
      return { ...state, loading: action.state };
    case userProfileState.SUCCESS:
      return { ...state, success: action.state };
    case userProfileState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const userpersonaldetail = (
  state = initialUserPersonalDetail,
  action
) => {
  switch (action.type) {
    case userPersonalDetailState.LOADING:
      return { ...state, loading: action.state };
    case userPersonalDetailState.SUCCESS:
      return { ...state, success: action.state };
    case userPersonalDetailState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const usercontactdetail = (
  state = initialUserContactlDetail,
  action
) => {
  switch (action.type) {
    case userContactDetailState.LOADING:
      return { ...state, loading: action.state };
    case userContactDetailState.SUCCESS:
      return { ...state, success: action.state };
    case userContactDetailState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const userofficeadress = (state = initialUserOfficeAddress, action) => {
  switch (action.type) {
    case userOfficeAddressState.LOADING:
      return { ...state, loading: action.state };
    case userOfficeAddressState.SUCCESS:
      return { ...state, success: action.state };
    case userOfficeAddressState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const profile = (state = initialProfile, action) => {
  switch (action.type) {
    case profileState.LOADING:
      return { ...state, loading: action.state };
    case profileState.DONE:
      return {
        ...state,
        data: {
          ...state.data,
          userdetail: {
            FirstName: action.state.FirstName,
            Designation: action.state.Designation
          },
          contactdetail: {
            Phone: action.state.Phone,
            Email: action.state.Email,
            Website: action.state.Website,
            Addressline1: action.state.Addressline1
          },
          officedetail: {
            Company: action.state.Company,
            CompanyEmail: action.state.CompanyEmail,
            CompanyPhone: action.state.CompanyPhone,
            CompanyWebsite: action.state.CompanyWebsite
          },
          personaldetail: {
            Dob: action.state.Dob,
            Gender: action.state.Gender
          }
        }
      };

    case profileState.SUCCESS:
      return { ...state, success: action.state };
    case profileState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};
