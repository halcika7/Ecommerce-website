import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const addRole = (role) => async dispatch => {
    dispatch({ type: actionTypes.ADD_USER_ROLE_START })
    const response = await axios.post('/api/users/adduserrole', role);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.ADD_USER_ROLE_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.ADD_USER_ROLE_SUCCESS, successMessage: response.data.successMessage });
    }
}

export const getRoles = () => async dispatch => {
    try{
        const response = await axios.get('/api/users/userroles');
        dispatch({ type: actionTypes.GET_USER_ROLES_SUCCESS, Roles: response.data })
    }catch(err) {
        console.log(err);
    }
}