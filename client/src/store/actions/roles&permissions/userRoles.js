import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { logoutUser } from '../auth/login';

export const addRole = (role, callBack) => async dispatch => {
  dispatch({ type: actionTypes.ROLE_START });
  const token = localStorage.jwtToken;
  const response = await axios.post(
    '/rolespermissions/roles/adduserrole',
    role,
    {
      headers: { Authorization: token }
    }
  );
  if (response.data.authenticationFailed) {
    dispatch(logoutUser(callBack));
  }
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.ROLE_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.ROLE_SUCCESS,
      successMessage: response.data.successMessage
    });
  }
};

export const getRoles = () => async dispatch => {
  dispatch({ type: actionTypes.ROLE_START });
  const response = await axios.get('/rolespermissions/roles/userroles');
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.ROLE_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({ type: actionTypes.ROLE_SUCCESS, roles: response.data });
  }
};

export const deleteUserRole = (id, callBack) => async dispatch => {
  dispatch({ type: actionTypes.ROLE_START });
  const token = localStorage.jwtToken;
  const response = await axios.delete(
    `/rolespermissions/roles/deleterole?id=${id}`,
    {
      headers: { Authorization: token }
    }
  );
  if (response.data.authenticationFailed) {
    dispatch(logoutUser(callBack));
  }
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.ROLE_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.ROLE_SUCCESS,
      successMessage: 'Role deleted !',
      loading: true
    });
  }
  dispatch(getRoles());
};

export const deleteManyUserRoles = (ids, callBack) => async dispatch => {
  const token = localStorage.jwtToken;
  let queryString = '/rolespermissions/roles/deletemanyroles?';
  ids.forEach((id, index) => {
    queryString += `id${index}=${id}&`;
  });
  dispatch({ type: actionTypes.ROLE_START });
  const response = await axios.delete(queryString, {
    headers: { Authorization: token }
  });
  if (response.data.authenticationFailed) {
    dispatch(logoutUser(callBack));
  }
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.ROLE_FAILED,
      failedMessage: response.data.failedMessage,
      loading: true
    });
  } else {
    dispatch({
      type: actionTypes.ROLE_SUCCESS,
      successMessage: 'Roles deleted !',
      loading: true
    });
  }
  dispatch(getRoles());
};

export const getUserRole = id => async dispatch => {
  dispatch({ type: actionTypes.ROLE_START });
  const response = await axios.post('/rolespermissions/roles/getrole', { id });
  if (response.data.error) {
    dispatch({ type: actionTypes.ROLE_FAILED, errorId: response.data.error });
  } else if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.ROLE_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({ type: actionTypes.ROLE_SUCCESS, role: response.data });
  }
};

export const updateUserRole = (data, callBack) => async dispatch => {
  dispatch({ type: actionTypes.ROLE_START });
  const token = localStorage.jwtToken;
  const response = await axios.patch(
    '/rolespermissions/roles/updaterole',
    data,
    {
      headers: { Authorization: token }
    }
  );
  if (response.data.authenticationFailed) {
    dispatch(logoutUser(callBack));
  }
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.ROLE_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.ROLE_SUCCESS,
      successMessage: response.data.successMessage,
      role: response.data.role
    });
  }
};
