import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { returnProductDataOnError } from '../../../helpers/product';

export const checkProductName = name => async dispatch => {
	const response = await axios.post('/products/product/validateproductname', {
		name
	});
	if (response.data.error) {
		dispatch({
			type: actionTypes.PRODUCT_FAILED,
			errorName: response.data.error
		});
	} else if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.PRODUCT_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.PRODUCT_SUCCESS
		});
	}
};

export const addProduct = (formData, config) => async dispatch => {
	dispatch({ type: actionTypes.PRODUCT_START });
	const productData = returnProductDataOnError(formData);
	const response = await axios.post('/products/product/addproduct', formData, config);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.PRODUCT_FAILED,
			productData,
			failedMessage: response.data.failedMessage
		});
	}else if (response.data.errors) {
		dispatch({
			type: actionTypes.PRODUCT_FAILED,
			productData,
			errors: response.data.errors
		});
	} else {
		dispatch({
			type: actionTypes.PRODUCT_SUCCESS,
			successMessage: response.data.successMessage
		});
	}
};
