import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const register = (UserObj) => async dispatch => {
    try {
        const response = await axios.post('/api/users/register', UserObj);

        if(response.data.errors){
            dispatch({type: actionTypes.REGISTER_FAILED, errors: response.data.errors, User: UserObj});
        }else {
            localStorage.setItem('activationToken', response.data.token);
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                User: response.data.addNewUser,
                message: response.data.message
            });
        }


    } catch (err) {
        dispatch({type: actionTypes.REGISTER_FAILED, errors: err.response.data, User: UserObj});
    }
}

export const activateAccount = (activationObject) => async dispatch => {
    try{
        const response = await axios.post('/api/users/activateaccount', activationObject);

        
        if(response.data.failedMessage) {
            dispatch({type: actionTypes.REGISTERACTIVATION_FAILED, failedMessage: response.data.failedMessage});
        }else {
            dispatch({
                type: actionTypes.REGISTERACTIVATION_SUCCESS,
                successMessage: response.data.successMessage
            });

            setTimeout(() => {
                localStorage.removeItem('activationToken');
                dispatch({type: actionTypes.REGISTERACTIVATION_CLEAR });
            }, 4000);
        }
    }catch(err){
        dispatch({type: actionTypes.REGISTERACTIVATION_FAILED, errors: err.response.data});
    }
}

export const resendActivationLink = activationObject => async dispatch => {
    try{
        const response = await axios.post('/api/users/resendactivateaccount', activationObject);

        if(response.data.failedMessage) {
            dispatch({type: actionTypes.REGISTERACTIVATION_FAILED, failedMessage: response.data.failedMessage});
        }else {

            dispatch({
                type: actionTypes.REGISTERACTIVATION_SUCCESS,
                successMessage: response.data.successMessage
            });

            setTimeout(() => {
                localStorage.setItem('activationToken', response.data.token);
                dispatch({type: actionTypes.REGISTERACTIVATION_CLEAR });
            }, 4000);
        }
    }catch(err){
        dispatch({type: actionTypes.REGISTERACTIVATION_FAILED, errors: err.response.data});
    }
}