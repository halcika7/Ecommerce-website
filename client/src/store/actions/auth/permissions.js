import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const addNewPermission = permission => async dispatch => {

    dispatch({ type: actionTypes.PERMISSION_START });

    const response = await axios.post('/api/users/addpermission', {permission});

    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.NEW_PERMISSION_FAILED, failedMessage: response.data.failedMessage, permission });
        setTimeout(() => {
            dispatch(getAllPermissions());
        }, 4000);
    }else {
        dispatch({ type: actionTypes.NEW_PERMISSION_SUCCESS, successMessage: response.data.successMessage });
        setTimeout(() => {
            dispatch(getAllPermissions());
        }, 4000);
    }
}

export const getAllPermissions = () => async dispatch => {
    
    dispatch({ type: actionTypes.PERMISSION_START });

    const response = await axios.get('/api/users/getallpermissions');

    if(response.data.failedMessage) 
        return dispatch({ type: actionTypes.GET_ALL_PERMISSIONS_FAILED, failedMessage: response.data.failedMessage });
    
    dispatch({ type: actionTypes.GET_ALL_PERMISSIONS_SUCCESS, allPermissions: response.data.permissions });
}

export const deletePermission = slug => async dispatch => {
    dispatch({ type: actionTypes.PERMISSION_START });

    const response = await axios.delete('/api/users/deletepermission?permission=' + slug);

    helperResponse(dispatch, response);
}

const helperResponse = (dispatch, response) => {
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.DELETE_PERMISSION_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.DELETE_PERMISSION_SUCCESS, successMessage: response.data.successMessage });
    }
    setTimeout(() => { dispatch(getAllPermissions()); }, 4000);
}