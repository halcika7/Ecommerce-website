import * as actionTypes from "../actionTypes";
import axios from "axios";

export const resetPassword = passwords => async dispatch => {
  dispatch({ type: actionTypes.RESETPASSWORD_START, passwords: passwords });

  const response = await axios.post("/api/users/resetpassword", passwords);

  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.RESETPASSWORD_FAILED,
      errors: {},
      passwords,
      failedMessage: response.data.failedMessage
    });
  } else if (response.data.errors) {
    dispatch({
      type: actionTypes.RESETPASSWORD_FAILED,
      errors: response.data.errors,
      passwords,
      failedMessage: false
    });
  } else {
    dispatch({
      type: actionTypes.RESETPASSWORD_SUCCESS,
      successMessage: response.data.successMessage
    });

    setTimeout(() => {
      localStorage.removeItem("resetpasswordtoken");
      dispatch({ type: actionTypes.RESETPASSWORD_CLEAR });
    }, 4000);
  }
};

export const resetState = () => dispatch => {
  localStorage.removeItem("resetpasswordtoken");
  dispatch({ type: actionTypes.RESETPASSWORD_CLEAR });
};

export const updatePassword = passwords => async dispatch => {
  dispatch({ type: actionTypes.PROFILE_PASSWORD_UPDATE_START });

  const response = await axios.put("/api/users/updatepassword", passwords);

  if (response.data.errors) {
    dispatch({
      type: actionTypes.PROFILE_PASSWORD_UPDATE_FAILED,
      errors: response.data.errors,
      passwords,
      failedMessage: false
    });
  } else if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.PROFILE_PASSWORD_UPDATE_FAILED,
      errors: {},
      passwords,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.PROFILE_PASSWORD_UPDATE_SUCCESS,
      successMessage: response.data.successMessage
    });
  }
};
