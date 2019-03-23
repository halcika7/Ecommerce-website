import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getAllUsers = () => async dispatch => {

    dispatch({ type: actionTypes.GET_ALL_USERS_START });
    const response = await axios.get('/api/users/allusers');

    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.GET_ALL_USERS_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({type: actionTypes.GET_ALL_USERS_SUCCESS, Users: response.data.users, successMessage: response.data.successMessage});
    }
}

export const getSingleUser = (id) => async dispatch => {

    const response = await axios.get('/api/users/singleuser?id=' + id);

    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.GET_SINGLE_USER_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({type: actionTypes.GET_SINGLE_USER_SUCCESS, User: response.data.user, role: response.data.role, successMessage: response.data.successMessage});
    }
}

export const deleteUser = (id) => async dispatch => {
    dispatch({ type: actionTypes.DELETE_SINGLE_USER_START });
    const response = await axios.delete('/api/users/deleteuser?id=' + id);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.DELETE_SINGLE_USER_FAILED, failedMessage: response.data.failedMessage });
        setTimeout(() => dispatch(getAllUsers()), 4000);
    }else {
        console.log(response.data)
        dispatch({type: actionTypes.DELETE_SINGLE_USER_SUCCESS, successMessage: response.data.successMessage});
        setTimeout(() => dispatch(getAllUsers()), 4000);
    }
}