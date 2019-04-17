import * as actionTypes from "../actionTypes";
import axios from "axios";

export const getAllUsers = () => async dispatch => {
  dispatch({ type: actionTypes.USER_START });
  const response = await axios.get("/api/users/allusers");
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.USER_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({ type: actionTypes.USER_SUCCESS, Users: response.data.users });
  }
  // setTimeout(() => dispatch({ type: actionTypes.CLEAR_MESSAGES }), 4000);
};

export const getSingleUser = (
  id,
  id2 = false,
  profile = false
) => async dispatch => {
  dispatch({ type: actionTypes.USER_START });
  const response = await axios.get(
    `/api/users/singleuser?id=${id}&id2=${id2}&profile=${profile}`
  );
  if (response.data.error) {
    dispatch({ type: actionTypes.USER_FAILED, errorID: response.data.error });
  } else if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.USER_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({ type: actionTypes.USER_SUCCESS, User: response.data.user });
  }
  setTimeout(() => dispatch(getLoggedInUserPhoto(id2)), 200);
};

export const deleteUser = id => async dispatch => {
  dispatch({ type: actionTypes.USER_START });
  const response = await axios.delete("/api/users/deleteuser?id=" + id);
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.USER_FAILED,
      failedMessage: response.data.failedMessage,
      loading: true
    });
  } else {
    dispatch({
      type: actionTypes.USER_SUCCESS,
      successMessage: response.data.successMessage,
      loading: true
    });
  }
  setTimeout(() => dispatch(getAllUsers()), 4000);
};

export const getLoggedInUserPhoto = id => async dispatch => {
  const response = await axios.get("/api/users/getuserphoto?id=" + id);
  if (response.data.failedMessage) {
    dispatch({ type: actionTypes.USER_FAILED });
  } else {
    dispatch({
      type: actionTypes.USER_SUCCESS,
      photo: response.data.profilePicture
    });
  }
};

export const addNewUser = userData => async dispatch => {
  dispatch({ type: actionTypes.USER_START });
  const response = await axios.post("/api/users/adduser", userData);
  if (response.data.errors) {
    dispatch({ type: actionTypes.USER_FAILED, errors: response.data.errors });
  } else {
    dispatch({
      type: actionTypes.USER_SUCCESS,
      successMessage: response.data.successMessage
    });
  }
};

export const updateUser = userData => async dispatch => {
  dispatch({ type: actionTypes.USER_START });
  const response = await axios.patch("/api/users/updateuser", userData);
  if (response.data.errors) {
    dispatch({ type: actionTypes.USER_FAILED, errors: response.data.errors });
  }
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.USER_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.USER_SUCCESS,
      successMessage: response.data.successMessage
    });
    dispatch(getSingleUser(userData.id));
    dispatch(getLoggedInUserPhoto(userData.id));
  }
};

export const userUpdateProfilePicture = (
  formData,
  config,
  id
) => async dispatch => {
  dispatch({ type: actionTypes.USER_START });
  const response = await axios.put(
    "/api/users/updateprofilepicture",
    formData,
    config
  );
  if (response.data.failedMessage) {
    dispatch({
      type: actionTypes.USER_FAILED,
      failedMessage: response.data.failedMessage
    });
  } else {
    dispatch({
      type: actionTypes.USER_SUCCESS,
      successMessage: response.data.successMessage
    });
    dispatch(getSingleUser(id));
    dispatch(getLoggedInUserPhoto(id));
  }
};
