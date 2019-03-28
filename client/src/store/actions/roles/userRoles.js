import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const addRole = (role) => async dispatch => {
    dispatch({ type: actionTypes.ROLE_START });
    const response = await axios.post('/api/users/adduserrole', role);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.ADD_USER_ROLE_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.ADD_USER_ROLE_SUCCESS, successMessage: response.data.successMessage });
    }
}

export const getRoles = () => async dispatch => {
    dispatch({ type: actionTypes.ROLE_START });
    const response = await axios.get('/api/users/userroles');
    if(response.data.failedMessage){
        dispatch({ type: actionTypes.GET_USER_ROLES_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.GET_USER_ROLES_SUCCESS, Roles: response.data });
    }
}

export const deleteAllUserRoles = () => async dispatch => {
    dispatch({ type: actionTypes.ROLE_START });
    const response = await axios.delete('/api/users/deleteallroles');
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.DELETE_ALL_USER_ROLES_FAILED, failedMessage: response.data.failedMessage });
    }
    setTimeout(() => dispatch(getRoles()), 4000);
}

export const deleteUserRole = name => async dispatch => {
    dispatch({ type: actionTypes.ROLE_START });
    const response = await axios.delete(`/api/users/deleterole?name=${name}`);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.DELETE_USER_ROLE_FAILED, failedMessage: response.data.failedMessage });
    }
    setTimeout(() => dispatch(getRoles()), 4000);
}

export const getUserRole = id => async dispatch => {
    const response = await axios.post('/api/users/getrole', {id});
    if(response.data.failedMessage){
        dispatch({ type: actionTypes.GET_ROLE_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.GET_ROLE_SUCCESS, role: response.data });
    }
}