import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const addNewPermission = permission => async dispatch => {
    dispatch({ type: actionTypes.PERMISSION_START });
    const response = await axios.post('/rolespermissions/permissions/addpermission', {permission});
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.PERMISSION_FAILED, failedMessage: response.data.failedMessage, permission });
    }else {
        dispatch({ type: actionTypes.PERMISSION_SUCCESS, successMessage: response.data.successMessage });
    }
    setTimeout(() => { dispatch(getAllPermissions()); }, 4000);
}

export const getAllPermissions = () => async dispatch => {
    dispatch({ type: actionTypes.PERMISSION_START });
    const response = await axios.get('/rolespermissions/permissions/getallpermissions');
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.PERMISSION_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.PERMISSION_SUCCESS, allPermissions: response.data.permissions });
    }
}

export const deletePermission = permission => async dispatch => {
    dispatch({ type: actionTypes.PERMISSION_START });
    const response = await axios.delete('/rolespermissions/permissions/deletepermission?permission=' + permission);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.PERMISSION_FAILED, failedMessage: response.data.failedMessage, loading: true });
    }else {
        dispatch({ type: actionTypes.PERMISSION_SUCCESS, successMessage: response.data.successMessage, loading: true });
    }
    setTimeout(() => { dispatch(getAllPermissions()); }, 4000);
}
