import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const addRole = (role) => async dispatch => {
    dispatch({ type: actionTypes.ROLE_START });
    const response = await axios.post('/api/users/adduserrole', role);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.ROLE_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.ROLE_SUCCESS, successMessage: response.data.successMessage });
    }
}

export const getRoles = () => async dispatch => {
    dispatch({ type: actionTypes.ROLE_START });
    const response = await axios.get('/api/users/userroles');
    if(response.data.failedMessage){
        dispatch({ type: actionTypes.ROLE_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.ROLE_SUCCESS, roles: response.data });
    }
}

export const deleteUserRole = id => async dispatch => {
    dispatch({ type: actionTypes.ROLE_START });
    const response = await axios.delete(`/api/users/deleterole?id=${id}`);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.ROLE_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.ROLE_SUCCESS, successMessage: 'Role deleted !', loading: true });
    }
    setTimeout(() => dispatch(getRoles()), 4000);
}

export const deleteManyUserRoles = ids => async dispatch => {
    let queryString = '/api/users/deletemanyroles?';
    ids.forEach((id,index) => { queryString += `id${index}=${id}&` });
    dispatch({ type: actionTypes.ROLE_START });
    const response = await axios.delete(queryString);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.ROLE_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.ROLE_SUCCESS, successMessage: 'Roles deleted !', loading: true });
    }
    setTimeout(() => dispatch(getRoles()), 4000);
}

export const getUserRole = id => async dispatch => {
    dispatch({ type: actionTypes.ROLE_START });
    const response = await axios.post('/api/users/getrole', {id});
    if(response.data.error) {
        dispatch({ type: actionTypes.ROLE_FAILED, errorId: response.data.error });
    }else if(response.data.failedMessage){
        dispatch({ type: actionTypes.ROLE_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.ROLE_SUCCESS, role: response.data });
    }
}

export const updateUserRole = data => async dispatch => {
    dispatch({ type: actionTypes.ROLE_START });
    const response = await axios.patch('/api/users/updaterole', data);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.ROLE_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.ROLE_SUCCESS, successMessage: response.data.successMessage, role: response.data.role });
    }
}