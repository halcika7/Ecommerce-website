import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { logoutUser } from '../auth/login';

export const addCategory = (categoryData, callBack) => async dispatch => {
  dispatch({ type: actionTypes.CATEGORY_START });
  const token = localStorage.jwtToken;
  const response = await axios.post(
    '/products/category/addcategory',
    categoryData,
    {
      headers: { Authorization: token }
    }
  );
  if (response.data.authenticationFailed) {
    dispatch(logoutUser(callBack));
  }
  if (response.data.error) {
    dispatch({
      type: actionTypes.CATEGORY_FAILED,
      error: response.data.error,
      data: categoryData
    });
  } else if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.CATEGORY_FAILED,
      failedMessage: response.data.failedMessage,
      data: categoryData
    });
  } else {
    dispatch({
      type: actionTypes.CATEGORY_SUCCESS,
      successMessage: response.data.successMessage
    });
    clearState();
  }
};

export const getAllCategories = () => async dispatch => {
  dispatch({ type: actionTypes.CATEGORY_START });
  const response = await axios.get('/products/category/getallcategories');

  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.CATEGORY_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.CATEGORY_SUCCESS,
      categories: response.data.categories
    });
  }
};

export const getCategory = (id, callBack) => async dispatch => {
  dispatch({ type: actionTypes.CATEGORY_START });
  const token = localStorage.jwtToken;
  const response = await axios.get(`/products/category/getcategory?id=${id}`, {
    headers: { Authorization: token }
  });
  if (response.data.authenticationFailed) {
    dispatch(logoutUser(callBack));
  }
  if (response.data.error) {
    dispatch({
      type: actionTypes.CATEGORY_FAILED,
      errorId: response.data.error
    });
  } else if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.CATEGORY_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.CATEGORY_SUCCESS,
      data: response.data.category
    });
  }
};

export const editCategory = (id, data, callBack) => async dispatch => {
  dispatch({ type: actionTypes.CATEGORY_START });
  const token = localStorage.jwtToken;
  const response = await axios.put(
    `/products/category/editcategory`,
    {
      id,
      data
    },
    {
      headers: { Authorization: token }
    }
  );
  if (response.data.authenticationFailed) {
    dispatch(logoutUser(callBack));
  }
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.CATEGORY_FAILED,
      failedMessage: response.data.failedMessage,
      data
    });
  }
  if (response.data.error) {
    dispatch({
      type: actionTypes.CATEGORY_FAILED,
      error: response.data.error,
      data
    });
  } else {
    dispatch({
      type: actionTypes.CATEGORY_SUCCESS,
      successMessage: response.data.successMessage
    });
    dispatch(getCategory(id));
  }
};

export const deleteCategory = (id, callBack) => async dispatch => {
  dispatch({ type: actionTypes.CATEGORY_START });
  const token = localStorage.jwtToken;
  const response = await axios.delete(
    `/products/category/deletecategory?id=${id}`,
    {
      headers: { Authorization: token }
    }
  );
  if (response.data.authenticationFailed) {
    dispatch(logoutUser(callBack));
  }
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.CATEGORY_FAILED,
      failedMessage: response.data.failedMessage,
      loading: true
    });
  } else {
    dispatch({
      type: actionTypes.CATEGORY_SUCCESS,
      successMessage: response.data.successMessage,
      loading: true
    });
  }
  dispatch(getAllCategories());
};

export const deleteManyCategories = (ids, callBack) => async dispatch => {
  const token = localStorage.jwtToken;
  let queryString = '/products/category/deletemanycategories?';
  ids.forEach((id, index) => {
    queryString += `id${index}=${id}&`;
  });
  dispatch({ type: actionTypes.CATEGORY_START });
  const response = await axios.delete(queryString, {
    headers: { Authorization: token }
  });
  if (response.data.authenticationFailed) {
    dispatch(logoutUser(callBack));
  }
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.CATEGORY_FAILED,
      failedMessage: response.data.failedMessage,
      loading: true
    });
  } else {
    dispatch({
      type: actionTypes.CATEGORY_SUCCESS,
      successMessage: response.data.successMessage,
      loading: true
    });
  }
  dispatch(getAllCategories());
};

export const clearState = () => async dispatch =>
  dispatch({ type: actionTypes.CLEAR_CATEGORY_STATE });
