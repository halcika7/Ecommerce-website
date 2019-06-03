import * as actionTypes from "../actionTypes";
import jwt_decode from 'jwt-decode';
import axios from "axios";

export const addToCart = sku => async dispatch => {
    const cartItems = JSON.stringify(localStorage.getItem('cart'));
    const response = await axios.post(`/cart/addtocart?sku=${sku}&cartItems=${cartItems}`);

    if(response.data.successMessage) {
        localStorage.setItem('cart', JSON.stringify(response.data.token))
        const decoded = jwt_decode(response.data.token);
        dispatch({  type: actionTypes.CART_SUCCESS, cartItems: decoded.items, totals: decoded.cartPrice, successMessage: response.data.successMessage });
    }else {
        dispatch({  type: actionTypes.CART_FAILED, failedMessage: response.data.failedMessage });
    }

};

export const moveToSaveForLater = sku => async dispatch => {
    const cartItems = JSON.stringify(localStorage.getItem('cart'));
    const saveForLaterItems = JSON.stringify(localStorage.getItem('saveforlater'));
    const response = await axios.post(`/cart/movetosaveforlater?sku=${sku}&cartItems=${cartItems}&saveForLaterItems=${saveForLaterItems}`);
  
    if(response.data.successMessage) {
        localStorage.setItem('cart', JSON.stringify(response.data.token))
        localStorage.setItem('saveforlater', JSON.stringify(response.data.save))
        const decodedCart = jwt_decode(response.data.token);
        const decodedSave = jwt_decode(response.data.token);
        dispatch({ 
            type: actionTypes.CART_SUCCESS,
            cartItems: decodedCart.items,
            saveForLaterItems: decodedSave.savedForLater,
            totals: decodedCart.cartPrice,
            successMessage: response.data.successMessage
        });
    }else {
        dispatch({  type: actionTypes.CART_FAILED, failedMessage: response.data.failedMessage });
    }
  
};

export const moveToCart = sku => async dispatch => {
    const cartItems = JSON.stringify(localStorage.getItem('cart'));
    const saveForLaterItems = JSON.stringify(localStorage.getItem('saveforlater'));
    const response = await axios.post(`/cart/movetocart?sku=${sku}&cartItems=${cartItems}&saveForLaterItems=${saveForLaterItems}`);

    if(response.data.successMessage) {
        localStorage.setItem('cart', JSON.stringify(response.data.token))
        localStorage.setItem('saveforlater', JSON.stringify(response.data.save))
        const decodedCart = jwt_decode(response.data.token);
        const decodedSave = jwt_decode(response.data.token);
        dispatch({ 
            type: actionTypes.CART_SUCCESS,
            cartItems: decodedCart.items,
            saveForLaterItems: decodedSave.savedForLater,
            totals: decodedCart.cartPrice,
            successMessage: response.data.successMessage
        });
    }else {
        dispatch({  type: actionTypes.CART_FAILED, failedMessage: response.data.failedMessage });
    }
  
};

export const deleteFromCart = sku => async dispatch => {
    const cartItems = JSON.stringify(localStorage.getItem('cart'));
    const response = await axios.delete(`/cart/deletefromcart?sku=${sku}&cartItems=${cartItems}`);
  
    if(response.data.successMessage) {
        localStorage.setItem('cart', JSON.stringify(response.data.token))
        const decoded = jwt_decode(response.data.token);
        dispatch({ 
            type: actionTypes.CART_SUCCESS,
            cartItems: decoded.items,
            totals: decoded.cartPrice,
            successMessage: response.data.successMessage
        });
    }else {
        dispatch({  type: actionTypes.CART_FAILED, failedMessage: response.data.failedMessage });
    }
  
};

export const deleteFromSavedForLater = sku => async dispatch => {
    const saveForLaterItems = JSON.stringify(localStorage.getItem('saveforlater'));
    const response = await axios.delete(`/cart/deletefromsave?sku=${sku}&saveForLaterItems=${saveForLaterItems}`);
  
    if(response.data.successMessage) {
        localStorage.setItem('saveforlater', JSON.stringify(response.data.save))
        const decoded = jwt_decode(response.data.save);
        dispatch({ 
            type: actionTypes.CART_SUCCESS,
            saveForLaterItems: decoded.savedForLater,
            successMessage: response.data.successMessage
        });
    }else {
        dispatch({  type: actionTypes.CART_FAILED, failedMessage: response.data.failedMessage });
    }
  
};

export const updateCartItem = (sku, value) => async dispatch => {
    const cartItems = JSON.stringify(localStorage.getItem('cart'));
    const response = await axios.patch(`/cart/updatecartitem?sku=${sku}&cartItems=${cartItems}&value=${value}`);
  
    if(response.data.successMessage) {
        localStorage.setItem('cart', JSON.stringify(response.data.token))
        const decoded = jwt_decode(response.data.token);
        dispatch({ 
            type: actionTypes.CART_SUCCESS,
            cartItems: decoded.items,
            totals: decoded.cartPrice,
            successMessage: response.data.successMessage
        });
    }
    if(response.data.failedMessage) {
      const decoded = jwt_decode(localStorage.getItem('cart'));
      dispatch({ 
          type: actionTypes.CART_FAILED,
          cartItems: decoded.items,
          totals: decoded.cartPrice,
          failedMessage: response.data.failedMessage
      });
    }
  
  };

export const setCart = () => async dispatch => {
    if(localStorage.getItem('cart')){
        const decoded = jwt_decode(localStorage.getItem('cart'));
        dispatch({ 
            type: actionTypes.CART_SUCCESS,
            cartItems: decoded.items,
            totals: decoded.cartPrice
        });
    } else {
        dispatch({ 
            type: actionTypes.CART_SUCCESS,
            cartItems: [],
            totals: {subtotal: 0, total: 0, tax: 0}
        });
    }
    if(localStorage.getItem('saveforlater')) {
        const decodedSave = jwt_decode(localStorage.getItem('saveforlater'));
        dispatch({ 
            type: actionTypes.CART_SUCCESS,
            saveForLaterItems: decodedSave.savedForLater,
        });
    } else {
        dispatch({ 
            type: actionTypes.CART_SUCCESS,
            saveForLaterItems: [],
        });
    }
}
