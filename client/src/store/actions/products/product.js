import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const checkProductName = name => async dispatch => {
	dispatch({ type: actionTypes.PRODUCT_START });
	const response = await axios.post(
		'/products/product/validateproductname',
		{name}
    );
	if (response.data.error) {
		dispatch({
			type: actionTypes.PRODUCT_FAILED,
			errorName: response.data.error,
		});
	}else if(response.data.failedMessage) {
		dispatch({
			type: actionTypes.PRODUCT_FAILED,
			failedMessage: response.data.failedMessage,
		});
	} else {
		dispatch({
			type: actionTypes.PRODUCT_SUCCESS
		});
	}
};

export const addProduct = (formData, config) => async dispatch => {
	dispatch({ type: actionTypes.PRODUCT_START });
	const response = await axios.post('/products/product/addproduct', formData, config);
	// if (response.data.failedMessage) {
	// 	dispatch({
	// 		type: actionTypes.CATEGORY_FAILED,
	// 		failedMessage: response.data.failedMessage
	// 	});
	// } else {
	// 	dispatch({
	// 		type: actionTypes.CATEGORY_SUCCESS,
	// 		categories: response.data.categories
	// 	});
	// }
};

