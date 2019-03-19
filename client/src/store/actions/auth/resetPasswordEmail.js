import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const resetUserPasswordEmail = (email) => async dispatch => {
    try {
        dispatch({ type: actionTypes.RESETPASSWORDEMAIL_START });

        const response = await axios.post('/api/users/resetpasswordemail', {email});

        if(response.data.errors){
            dispatch({type: actionTypes.RESETPASSWORDEMAIL_FAILED, errors: response.data.errors, email });
        }else {
            dispatch({ type: actionTypes.RESETPASSWORDEMAIL_SUCCESS , email, token: response.data.token});
            localStorage.setItem('resetpasswordtoken', response.data.token);
        }

    } catch (err) {
        dispatch({ type: actionTypes.RESETPASSWORDEMAIL_FAILED, errors: err.response.data, email });
    }
}