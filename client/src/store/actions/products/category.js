import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const addCategory = categoryData => async dispatch => {
    dispatch({ type: actionTypes.CATEGORY_START });
    const response = await axios.post('/products/category/addcategory', categoryData);
    if(response.data.error) {
        dispatch({ type: actionTypes.CATEGORY_FAILED, error: response.data.error, data: categoryData });
    }else if (response.data.failedMessage) {
        dispatch({ type: actionTypes.CATEGORY_FAILED, failedMessage: response.data.failedMessage, data: categoryData });
    }else {
        dispatch({ type: actionTypes.CATEGORY_SUCCESS, successMessage: response.data.successMessage });
        setTimeout(() => clearState(), 4000);
    }
}

export const getAllCategories = () => async dispatch => {
    dispatch({ type: actionTypes.CATEGORY_START });
    const response = await axios.get('/products/category/getallcategories');
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.CATEGORY_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.CATEGORY_SUCCESS, categories: response.data.categories });
    }
}

export const getCategory = (id) => async dispatch => {
    dispatch({ type: actionTypes.CATEGORY_START });
    const response = await axios.get('/products/category/getcategory?id=' + id);
    if(response.data.error) {
        dispatch({ type: actionTypes.CATEGORY_FAILED, errorId: response.data.error });
    }else if(response.data.failedMessage) {
        dispatch({ type: actionTypes.CATEGORY_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.CATEGORY_SUCCESS, data: response.data.category });
    }
}

export const editCategory = (id, data) => async dispatch => {
    dispatch({ type: actionTypes.CATEGORY_START });
    const response = await axios.put(`/products/category/editcategory`, {id, data});
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.CATEGORY_FAILED, failedMessage: response.data.failedMessage, data });
    }if(response.data.error) {
        dispatch({ type: actionTypes.CATEGORY_FAILED,  error: response.data.error, data });
    }else {
        dispatch({ type: actionTypes.CATEGORY_SUCCESS, successMessage: response.data.successMessage });
        dispatch(getCategory(id));
    }
}

export const deleteCategory = (id) => async dispatch => {
    dispatch({ type: actionTypes.CATEGORY_START });
    const response = await axios.delete(`/products/category/deletecategory?id=${id}`);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.CATEGORY_FAILED, failedMessage: response.data.failedMessage, loading: true });
    }else {
        dispatch({ type: actionTypes.CATEGORY_SUCCESS, successMessage: response.data.successMessage, loading: true });
    }
    setTimeout(() => dispatch(getAllCategories()) , 4000);
}

export const deleteManyCategories = (ids) => async dispatch => {
    let queryString = '/products/category/deletemanycategories?';
    ids.forEach((id,index) => { queryString += `id${index}=${id}&` });
    dispatch({ type: actionTypes.CATEGORY_START });
    const response = await axios.delete(queryString);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.CATEGORY_FAILED, failedMessage: response.data.failedMessage, loading: true });
    }else {
        dispatch({ type: actionTypes.CATEGORY_SUCCESS, successMessage: response.data.successMessage, loading: true });
    }
    setTimeout(() => dispatch(getAllCategories()) , 4000);
}

export const clearState = () => async dispatch => dispatch({ type: actionTypes.CLEAR_CATEGORY_STATE })