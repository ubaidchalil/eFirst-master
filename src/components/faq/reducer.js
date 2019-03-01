import { faqCategoryState, faqState } from "./action";

const initialFAQCategory = {
  loading: false,
  data: null,
  succuss: null,
  error: null
};

const initialFAQ = {
  loading: false,
  data: [],
  succuss: null,
  error: null
};

export const faqcategory = (state = initialFAQCategory, action) => {
  switch (action.type) {
    case faqCategoryState.LOADING:
      return { ...state, loading: action.state };
    case faqCategoryState.DONE:
      return { ...state, data: action.state };
    case faqCategoryState.SUCCESS:
      return { ...state, success: action.state };
    case faqCategoryState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const faq = (state = initialFAQ, action) => {
  switch (action.type) {
    case faqState.LOADING:
      return { ...state, loading: action.state };

    case faqState.DONE: {
      if (state.data) {
        return { ...state, data: [...state.data, ...[action.state]] };
      } else return { ...state, data: [action.state] };
    }
    case faqState.SUCCESS:
      return { ...state, success: action.state };
    case faqState.ERROR:
      return { ...state, error: action.state };
    case faqState.CLEAR:
      return { ...state, data: action.state };
    default:
      return state;
  }
};
