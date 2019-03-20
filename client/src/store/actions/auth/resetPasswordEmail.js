import * as actionTypes from '../actionTypes';
import axios from 'axios';

// catch
export const resetUserPasswordEmail = (email) => async dispatch => {

    dispatch({ type: actionTypes.RESETPASSWORDEMAIL_START });

    const response = await axios.post('/api/users/resetpasswordemail', {email});

    if(response.data.errors){
        dispatch({type: actionTypes.RESETPASSWORDEMAIL_FAILED, errors: response.data.errors, email, failedMessage: false });
    }else if(response.data.failedMessage){
        dispatch({type: actionTypes.RESETPASSWORDEMAIL_FAILED, errors: {}, email, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ 
            type: actionTypes.RESETPASSWORDEMAIL_SUCCESS, 
            email,
            successMessage: response.data.successMessage,
            token: response.data.token});
        setTimeout(() => {
            dispatch({ type: actionTypes.RESETPASSWORDEMAIL_CLEAR });
        }, 4000);
        localStorage.setItem('resetpasswordtoken', response.data.token);
    }
}