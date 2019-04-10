import * as actionTypes from '../actionTypes';
import { getSingleUser } from './getUsers';
import axios from 'axios';

export const addNewUser = userData => async dispatch => {
    dispatch({ type: actionTypes.ADD_NEW_USER_START });
    const response = await axios.post('/api/users/adduser', userData);
    if(response.data.errors) {
        dispatch({ type: actionTypes.ADD_NEW_USER_FAILED, errors: response.data.errors });
    }else {
        dispatch({ type: actionTypes.ADD_NEW_USER_SUCCESS, successMessage: response.data.successMessage });
    }
    setTimeout(() => dispatch({ type: actionTypes.USER_CLEAR }), 4000);
}

export const updateUser = userData => async dispatch => {
    dispatch({ type: actionTypes.UPDATE_USER_START });
    const response = await axios.patch('/api/users/updateuser', userData);
    console.log(response.data);
    if(response.data.errors) {
        dispatch({ type: actionTypes.UPDATE_USER_ERROR, errors: response.data.errors });
    }
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.UPDATE_USER_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.UPDATE_USER_SUCCESS, successMessage: response.data.successMessage });
        dispatch(getSingleUser(userData.id));
    }
}
