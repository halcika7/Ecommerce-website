import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getProductsOnLoad = ({ category, subcategoryName, subcategory }) => async dispatch => {
    dispatch({ type: actionTypes.FILTER_PRODUCT_START });
	const response = await axios.get(`/products/product/filter/getproducts?category=${category}&subcategoryName=${subcategoryName}&subcategory=${subcategory}`);
	if (response.data.failedMessage) {
		dispatch({
			type: actionTypes.FILTER_PRODUCT_FAILED,
			failedMessage: response.data.failedMessage
		});
	} else {
		dispatch({
			type: actionTypes.FILTER_PRODUCT_SUCCESS,
			products: response.data.products,
			brands: response.data.brands,
			colors: response.data.colors,
			minPrice: response.data.minPrice,
			maxPrice: response.data.maxPrice,
		});
	}
};
