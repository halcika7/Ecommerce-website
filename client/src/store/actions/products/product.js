import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { returnProductDataOnError } from '../../../helpers/product';

export const addProduct = (formData, config) => async dispatch => {
	dispatch({ type: actionTypes.PRODUCT_START });
	const productData = returnProductDataOnError(formData);
	const response = await axios.post(
		'/products/product/addproduct',
		formData,
		config
	);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.PRODUCT_FAILED,
			productData,
			failedMessage: response.data.failedMessage
		});
	} else if (response.data.errors) {
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

export const homePageProducts = () => async dispatch => {
	dispatch({ type: actionTypes.PRODUCT_START });
	const response = await axios.get('/products/product/homepageproducts');
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.PRODUCT_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.PRODUCT_SUCCESS,
			successMessage: response.data.successMessage,
			featuredProducts: response.data.featuredProducts,
			topSellingProducts: response.data.topSellingProducts,
			newProducts: response.data.newProducts,
			bannerProducts: response.data.bannerProducts,
			ourProducts: response.data.ourProducts,
			dailyOffer: response.data.dailyOffer,
			weeklyOffer: response.data.weeklyOffer
		});
	}
};
