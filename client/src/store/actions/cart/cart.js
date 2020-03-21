import * as actionTypes from '../actionTypes';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { logoutUser } from '../index';

export const addToCart = sku => async dispatch => {
  dispatch({ type: actionTypes.CART_START });
  const cartItems = localStorage.getItem('cart');
  const response = await axios.post(
    `/cart/addtocart?sku=${sku}&cartItems=${cartItems}`
  );

  if (response.data.successMessage) {
    localStorage.setItem('cart', response.data.token);
    const decoded = jwt_decode(response.data.token);
    dispatch({
      type: actionTypes.CART_SUCCESS,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      successMessage: response.data.successMessage
    });
  } else {
    const decoded = jwt_decode(cartItems);
    dispatch({
      type: actionTypes.CART_FAILED,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      failedMessage: response.data.failedMessage
    });
  }
};

export const applyCoupon = code => async dispatch => {
  dispatch({ type: actionTypes.CART_START });
  const cartItems = localStorage.getItem('cart');
  const response = await axios.post(
    `/cart/applycoupon?code=${code}&cartItems=${cartItems}`
  );
  if (response.data.successMessage) {
    localStorage.setItem('cart', response.data.token);
    const decoded = jwt_decode(response.data.token);
    dispatch({
      type: actionTypes.CART_SUCCESS,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      successMessage: response.data.successMessage
    });
  } else {
    const decoded = jwt_decode(cartItems);
    dispatch({
      type: actionTypes.CART_FAILED,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      failedMessage: response.data.failedMessage
    });
  }
};

export const removeCoupon = () => async dispatch => {
  dispatch({ type: actionTypes.CART_START });
  const cartItems = localStorage.getItem('cart');
  const response = await axios.delete(
    `/cart/removecoupon?cartItems=${cartItems}`
  );
  if (response.data.successMessage) {
    localStorage.setItem('cart', response.data.token);
    const decoded = jwt_decode(response.data.token);
    dispatch({
      type: actionTypes.CART_SUCCESS,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      successMessage: response.data.successMessage
    });
  } else {
    const decoded = jwt_decode(cartItems);
    dispatch({
      type: actionTypes.CART_FAILED,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      failedMessage: response.data.failedMessage
    });
  }
};

export const moveToSaveForLater = sku => async dispatch => {
  dispatch({ type: actionTypes.CART_START });
  const cartItems = localStorage.getItem('cart');
  const saveForLaterItems = localStorage.getItem('saveforlater');
  const response = await axios.post(
    `/cart/movetosaveforlater?sku=${sku}&cartItems=${cartItems}&saveForLaterItems=${saveForLaterItems}`
  );

  if (response.data.successMessage) {
    localStorage.setItem('cart', response.data.token);
    localStorage.setItem('saveforlater', response.data.save);
    const decodedCart = jwt_decode(response.data.token);
    const decodedSave = jwt_decode(response.data.token);
    dispatch({
      type: actionTypes.CART_SUCCESS,
      cartItems: decodedCart.items,
      saveForLaterItems: decodedSave.savedForLater,
      totals: decodedCart.cartPrice,
      coupon: decodedCart.coupon,
      successMessage: response.data.successMessage
    });
  } else {
    const decoded = jwt_decode(cartItems);
    dispatch({
      type: actionTypes.CART_FAILED,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      failedMessage: response.data.failedMessage
    });
  }
};

export const moveToCart = sku => async dispatch => {
  dispatch({ type: actionTypes.CART_START });
  const cartItems = localStorage.getItem('cart');
  const saveForLaterItems = localStorage.getItem('saveforlater');
  const response = await axios.post(
    `/cart/movetocart?sku=${sku}&cartItems=${cartItems}&saveForLaterItems=${saveForLaterItems}`
  );

  if (response.data.successMessage) {
    localStorage.setItem('cart', response.data.token);
    localStorage.setItem('saveforlater', response.data.save);
    const decodedCart = jwt_decode(response.data.token);
    const decodedSave = jwt_decode(response.data.token);
    dispatch({
      type: actionTypes.CART_SUCCESS,
      cartItems: decodedCart.items,
      saveForLaterItems: decodedSave.savedForLater,
      totals: decodedCart.cartPrice,
      coupon: decodedCart.coupon,
      successMessage: response.data.successMessage
    });
  } else {
    const decoded = jwt_decode(cartItems);
    dispatch({
      type: actionTypes.CART_FAILED,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      failedMessage: response.data.failedMessage
    });
  }
};

export const deleteFromCart = sku => async dispatch => {
  dispatch({ type: actionTypes.CART_START });
  const cartItems = localStorage.getItem('cart');
  const response = await axios.delete(
    `/cart/deletefromcart?sku=${sku}&cartItems=${cartItems}`
  );

  if (response.data.successMessage) {
    localStorage.setItem('cart', response.data.token);
    const decoded = jwt_decode(response.data.token);
    dispatch({
      type: actionTypes.CART_SUCCESS,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      successMessage: response.data.successMessage
    });
  } else {
    const decoded = jwt_decode(cartItems);
    dispatch({
      type: actionTypes.CART_FAILED,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      failedMessage: response.data.failedMessage
    });
  }
};

export const deleteFromSavedForLater = sku => async dispatch => {
  dispatch({ type: actionTypes.CART_START });
  const saveForLaterItems = localStorage.getItem('saveforlater');
  const response = await axios.delete(
    `/cart/deletefromsave?sku=${sku}&saveForLaterItems=${saveForLaterItems}`
  );

  if (response.data.successMessage) {
    localStorage.setItem('saveforlater', response.data.save);
    const decoded = jwt_decode(response.data.save);
    dispatch({
      type: actionTypes.CART_SUCCESS,
      saveForLaterItems: decoded.savedForLater,
      successMessage: response.data.successMessage
    });
  } else {
    dispatch({
      type: actionTypes.CART_FAILED,
      failedMessage: response.data.failedMessage
    });
  }
};

export const updateCartItem = (sku, value) => async dispatch => {
  dispatch({ type: actionTypes.CART_START });
  const cartItems = localStorage.getItem('cart');
  const response = await axios.patch(
    `/cart/updatecartitem?sku=${sku}&cartItems=${cartItems}&value=${value}`
  );

  if (response.data.successMessage) {
    localStorage.setItem('cart', response.data.token);
    const decoded = jwt_decode(response.data.token);
    dispatch({
      type: actionTypes.CART_SUCCESS,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      successMessage: response.data.successMessage
    });
  }
  if (response.data.failedMessage) {
    const decoded = jwt_decode(localStorage.getItem('cart'));
    dispatch({
      type: actionTypes.CART_FAILED,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      failedMessage: response.data.failedMessage
    });
  }
};

export const setCart = () => async dispatch => {
  if (localStorage.getItem('cart')) {
    const decoded = jwt_decode(localStorage.getItem('cart'));
    dispatch({
      type: actionTypes.CART_SUCCESS,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon
    });
  } else {
    dispatch({
      type: actionTypes.CART_SUCCESS,
      cartItems: [],
      totals: { subtotal: 0, total: 0, tax: 0 },
      coupon: {}
    });
  }
  if (localStorage.getItem('saveforlater')) {
    const decodedSave = jwt_decode(localStorage.getItem('saveforlater'));
    dispatch({
      type: actionTypes.CART_SUCCESS,
      saveForLaterItems: decodedSave.savedForLater
    });
  } else {
    dispatch({
      type: actionTypes.CART_SUCCESS,
      saveForLaterItems: []
    });
  }
};

export const processPayment = (token, userData, callBack) => async dispatch => {
  dispatch({ type: actionTypes.CART_START });
  const cart = localStorage.getItem('cart');
  const jwtToken = localStorage.jwtToken;
  const data = { cart, userData, tokenId: token.id };
  const decoded = cart
    ? jwt_decode(cart)
    : { cartItems: [], totals: {}, coupon: 0 };
  const response = await axios.post('/cart/checkout/payment', data, {
    headers: { Authorization: jwtToken }
  });
  if (response.data.authenticationFailed) {
    dispatch(logoutUser(callBack));
    dispatch({
      type: actionTypes.CART_FAILED,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      successMessage: response.data.successMessage
    });
  }
  if (response.data.errors) {
    dispatch({
      type: actionTypes.CART_FAILED,
      errors: response.data.errors,
      inputs: userData,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon
    });
  }
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.CART_FAILED,
      cartItems: decoded.items,
      totals: decoded.cartPrice,
      coupon: decoded.coupon,
      failedMessage: response.data.failedMessage,
      inputs: userData
    });
  }
  if (response.data.successMessage) {
    dispatch({
      type: actionTypes.CART_SUCCESS,
      successMessage: response.data.successMessage
    });
    localStorage.removeItem('cart');
    dispatch(setCart());
  }
};
