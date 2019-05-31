import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const filterProducts = data => async dispatch => {
	const options = JSON.stringify(data);
	dispatch({ type: actionTypes.FILTER_PRODUCT_START });
	const response = await axios.get(`/products/product/filter/filterproducts?options=${options}`);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.FILTER_PRODUCT_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.FILTER_PRODUCT_SUCCESS,
			products: response.data.products,
			pages: response.data.pages
		});
	}
};

export const getFilters = data => async dispatch => {
	const options = JSON.stringify(data);
	dispatch({ type: actionTypes.FILTER_PRODUCT_START });
	const response = await axios.get(`/products/product/filter/filters?options=${options}`);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.FILTER_PRODUCT_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.FILTER_PRODUCT_SUCCESS,
			brands: response.data.brands ? response.data.brands : [],
			sizes: response.data.sizes ? response.data.sizes : [],
			colors: response.data.colors ? response.data.colors : [],
			graphics: response.data.graphics ? response.data.graphics : [],
			hdds: response.data.hdds ? response.data.hdds : [],
			rams: response.data.rams ? response.data.rams : [],
			ssds: response.data.ssds ? response.data.ssds : [],
			resolutions: response.data.resolutions ? response.data.resolutions : [],
			memorys: response.data.memorys ? response.data.memorys : [],
			displays: response.data.displays ? response.data.displays : [],
			wifi: response.data.wifi ? response.data.wifi : [],
			bluetooth: response.data.bluetooth ? response.data.bluetooth : [],
			consoles: response.data.consoles ? response.data.consoles : [],
		});
	}
}

