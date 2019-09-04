import { statusBarState } from "./action";
const initialDashboard = {
  statusBar: true
};
export const statusBar = (state = initialDashboard, action) => {
  switch (action.type) {
    case statusBarState.SET:
      return { ...state, statusBar: action.state };

    default:
      return state;
  }
};
