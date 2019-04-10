import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getAllUsers = () => async dispatch => {
    dispatch({ type: actionTypes.GET_ALL_USERS_START });
    const response = await axios.get('/api/users/allusers');
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.GET_ALL_USERS_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.GET_ALL_USERS_SUCCESS, Users: response.data.users });
    }
    setTimeout(() => dispatch({ type: actionTypes.CLEAR_MESSAGES }), 4000);
}

export const getSingleUser = (id) => async dispatch => {
    dispatch({ type: actionTypes.GET_ALL_USERS_START });
    const response = await axios.get('/api/users/singleuser?id=' + id);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.GET_SINGLE_USER_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({type: actionTypes.GET_SINGLE_USER_SUCCESS, User: response.data.user})
    }
    // setTimeout(() => dispatch({ type: actionTypes.CLEAR_MESSAGES }), 4000);
}

export const deleteUser = (id) => async dispatch => {
    dispatch({ type: actionTypes.DELETE_SINGLE_USER_START });
    const response = await axios.delete('/api/users/deleteuser?id=' + id);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.DELETE_SINGLE_USER_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({type: actionTypes.DELETE_SINGLE_USER_SUCCESS, successMessage: response.data.successMessage});
    }
    setTimeout(() => dispatch(getAllUsers()), 4000);
}

export const getLoggedInUserPhoto = (id) => async dispatch => {
    const response = await axios.get('/api/users/getuserphoto?id=' + id);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.GET_USER_PHOTO_FAILED });
    }else {
        dispatch({ type: actionTypes.GET_USER_PHOTO_SUCCESS, photo: response.data.profilePicture })
    }
}