export const statusBarState = {
  SET: "SET_STATUSBAR"
};

export const setStatusBar = val => dispatch => {
  dispatch({ type: statusBarState.SET, state: val });
};
