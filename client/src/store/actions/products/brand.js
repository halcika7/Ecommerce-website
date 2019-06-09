import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const addBrand = brandData => async dispatch => {
	dispatch({ type: actionTypes.BRAND_START });
	const response = await axios.post('/products/brand/addbrand', brandData);
	if (response.data.error) {
		dispatch({
			type: actionTypes.BRAND_FAILED,
			error: response.data.error,
			data: brandData
		});
	} else if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.BRAND_FAILED,
			failedMessage: response.data.failedMessage,
			data: brandData
		});
	} else {
		dispatch({
			type: actionTypes.BRAND_SUCCESS,
			successMessage: response.data.successMessage
		});
		setTimeout(() => clearBrandState(), 4000);
	}
};

export const getAllBrands = () => async dispatch => {
	dispatch({ type: actionTypes.BRAND_START });
	const response = await axios.get('/products/brand/getallbrands');
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.BRAND_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({ type: actionTypes.BRAND_SUCCESS, brands: response.data.brands });
	}
};

export const getBrand = id => async dispatch => {
	dispatch({ type: actionTypes.BRAND_START });
	const response = await axios.get('/products/brand/getbrand?id=' + id);
	if (response.data.error) {
		dispatch({ type: actionTypes.BRAND_FAILED, errorID: response.data.error });
	} else if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.BRAND_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({ type: actionTypes.BRAND_SUCCESS, data: response.data.brand });
	}
};

export const getBrandByCategory = category => async dispatch => {
	dispatch({ type: actionTypes.BRAND_START });
	const response = await axios.get(
		'/products/brand/getbrandsbycategory?category=' + category
	);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.BRAND_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({ type: actionTypes.BRAND_SUCCESS, brands: response.data });
	}
};

export const editBrand = (id, data) => async dispatch => {
	dispatch({ type: actionTypes.BRAND_START });
	const response = await axios.put(`/products/brand/editbrand`, { id, data });
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.BRAND_FAILED,
			failedMessage: response.data.failedMessage,
			data
		});
	} else {
		dispatch({
			type: actionTypes.BRAND_SUCCESS,
			successMessage: response.data.successMessage
		});
		dispatch(getBrand(id));
	}
};

export const deleteBrand = id => async dispatch => {
	dispatch({ type: actionTypes.BRAND_START });
	const response = await axios.delete(`/products/brand/deletebrand?id=${id}`);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.BRAND_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.BRAND_SUCCESS,
			successMessage: response.data.successMessage,
			loading: true
		});
	}
	setTimeout(() => dispatch(getAllBrands()), 4000);
};

export const deleteManyBrands = ids => async dispatch => {
	let queryString = '/products/brand/deletemanybrands?';
	ids.forEach((id, index) => {
		queryString += `id${index}=${id}&`;
	});
	dispatch({ type: actionTypes.BRAND_START });
	const response = await axios.delete(queryString);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.BRAND_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.BRAND_SUCCESS,
			successMessage: response.data.successMessage,
			loading: true
		});
	}
	setTimeout(() => dispatch(getAllBrands()), 4000);
};

export const clearBrandState = () => async dispatch =>
	dispatch({ type: actionTypes.CLEAR_BRAND_STATE });
