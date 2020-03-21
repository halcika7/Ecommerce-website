import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const resetUserPasswordEmail = email => async dispatch => {
  dispatch({ type: actionTypes.RESETPASSWORDEMAIL_START });
  const response = await axios.post('/api/users/resetpasswordemail', { email });

  if (response.data.errors) {
    dispatch({
      type: actionTypes.RESETPASSWORDEMAIL_FAILED,
      errors: response.data.errors,
      email,
      failedMessage: false
    });
  } else if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.RESETPASSWORDEMAIL_FAILED,
      errors: {},
      email,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.RESETPASSWORDEMAIL_SUCCESS,
      email,
      successMessage: response.data.successMessage,
      token: response.data.token
    });
    dispatch({ type: actionTypes.RESETPASSWORDEMAIL_CLEAR });
    localStorage.setItem('resetpasswordtoken', response.data.token);
  }
};
