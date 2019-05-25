import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { returnProductDataOnError } from '../../../helpers/product';
import { setTimeout } from 'timers';

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

export const getProduct = id => async dispatch => {
	dispatch({ type: actionTypes.PRODUCT_START });
	const response = await axios.get('/products/product/getproduct?id=' + id);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.PRODUCT_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.PRODUCT_SUCCESS,
			singleProduct: response.data.product
		});
	}
};

export const searchProducts = query => async dispatch => {
	dispatch({ type: actionTypes.PRODUCT_START });
	const response = await axios.get('/products/product/serachforproduct?query=' + query);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.PRODUCT_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {

		dispatch({
			type: actionTypes.PRODUCT_SUCCESS,
			loading: true
		});

		setTimeout( () => { 
			dispatch({
				type: actionTypes.PRODUCT_SUCCESS,
				searchedProducts: response.data.products
			});
		}, 1000)

	}
};
