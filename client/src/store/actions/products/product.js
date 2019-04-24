import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const checkProductName = name => async dispatch => {
	dispatch({ type: actionTypes.PRODUCT_START });
	const response = await axios.post(
		'/products/product/validateproductname',
		{name}
    );
    // console.log(response.data);
	// if (response.data.error) {
	// 	dispatch({
	// 		type: actionTypes.CATEGORY_FAILED,
	// 		error: response.data.error,
	// 		data: categoryData
	// 	});
	// } else if (response.data.failedMessage) {
	// 	dispatch({
	// 		type: actionTypes.CATEGORY_FAILED,
	// 		failedMessage: response.data.failedMessage,
	// 		data: categoryData
	// 	});
	// } else {
	// 	dispatch({
	// 		type: actionTypes.CATEGORY_SUCCESS,
	// 		successMessage: response.data.successMessage
	// 	});
	// 	setTimeout(() => clearState(), 4000);
	// }
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

