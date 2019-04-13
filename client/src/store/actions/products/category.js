import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const addCategory = categoryData => async dispatch => {
    dispatch({ type: actionTypes.CATEGORY_START });
    const response = await axios.post('/products/category/addcategory', categoryData);
    if(response.data.error) {
        dispatch({ type: actionTypes.ADD_EDIT_DELETE_CATEGORY_FAILED_OR_ERROR, error: response.data.error, data: categoryData });
    }else if (response.data.failedMessage) {
        dispatch({ type: actionTypes.ADD_EDIT_DELETE_CATEGORY_FAILED_OR_ERROR, failedMessage: response.data.failedMessage, data: categoryData });
    }else {
        dispatch({ type: actionTypes.ADD_EDIT_DELETE_CATEGORY_SUCESS, successMessage: response.data.successMessage });
        setTimeout(() => clearState(), 4000);
    }
}

export const getAllCategories = () => async dispatch => {
    dispatch({ type: actionTypes.CATEGORY_START });
    const response = await axios.get('/products/category/getallcategories');
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.GET_ALL_OR_SINGLE_CATEGORIES_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.GET_ALL_OR_SINGLE_CATEGORIES_SUCCESS, categories: response.data.categories });
    }
}

export const getCategory = (id) => async dispatch => {
    dispatch({ type: actionTypes.CATEGORY_START });
    const response = await axios.get('/products/category/getcategory?id=' + id);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.GET_ALL_OR_SINGLE_CATEGORIES_FAILED, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.GET_ALL_OR_SINGLE_CATEGORIES_SUCCESS, data: response.data.category });
    }
}

export const editCategory = (id, data) => async dispatch => {
    dispatch({ type: actionTypes.CATEGORY_START });
    const response = await axios.put(`/products/category/editcategory`, {id, data});
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.ADD_EDIT_DELETE_CATEGORY_FAILED_OR_ERROR, failedMessage: response.data.failedMessage, data });
    }if(response.data.error) {
        dispatch({ type: actionTypes.ADD_EDIT_DELETE_CATEGORY_FAILED_OR_ERROR,  error: response.data.error, data });
    }else {
        dispatch({ type: actionTypes.ADD_EDIT_DELETE_CATEGORY_SUCESS, successMessage: response.data.successMessage });
        dispatch(getCategory(id));
    }
}

export const deleteCategory = (id) => async dispatch => {
    dispatch({ type: actionTypes.CATEGORY_START });
    const response = await axios.delete(`/products/category/deletecategory?id=${id}`);
    if(response.data.failedMessage) {
        dispatch({ type: actionTypes.ADD_EDIT_DELETE_CATEGORY_FAILED_OR_ERROR, failedMessage: response.data.failedMessage });
    }else {
        dispatch({ type: actionTypes.ADD_EDIT_DELETE_CATEGORY_SUCESS, successMessage: response.data.successMessage });
        setTimeout(() => dispatch(getAllCategories()) , 4000);
    }
}

export const clearState = () => async dispatch => dispatch({ type: actionTypes.CLEAR_CATEGORY_STATE })