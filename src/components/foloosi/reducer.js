import { paymentDetailState } from "./action";

const initialPaymantDetail = {
  loading: false,
  success: null,
  error: null,
  data: null
};

export const paymentdetail = (state = initialPaymantDetail, action) => {
  switch (action.type) {
    case paymentDetailState.LOADING:
      return { ...state, loading: action.state };
    case paymentDetailState.SUCCESS:
      return { ...state, success: action.state };
    case paymentDetailState.DONE:
      return { ...state, data: action.state };
    case paymentDetailState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};
