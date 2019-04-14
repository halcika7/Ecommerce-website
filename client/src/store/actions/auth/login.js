import * as actionTypes from '../actionTypes';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../../helpers/setAuthToken';
import { getLoggedInUserPhoto } from '../index';

export const login = (UserObj) => async dispatch => {
    dispatch({ type: actionTypes.LOGIN_START });

    const response = await axios.post('/api/users/login', UserObj);

    if(response.data.errors){
        dispatch({type: actionTypes.LOGIN_FAILED, errors: response.data.errors, UserInfo: UserObj, failedMessage: false});
    }else if(response.data.failedMessage) {
        dispatch({type: actionTypes.LOGIN_FAILED, errors: response.data.errors, UserInfo: UserObj, failedMessage: response.data.failedMessage});
    }else {
        const { token } = response.data;
        const { rememberMe } = response.data;

        localStorage.setItem('jwtToken', token);
        // Set Token to Auth Header
        setAuthToken(token);
        // decode token
        const decoded = jwt_decode(token);

        dispatch(setCurrentUser(decoded, rememberMe, response.data.successMessage));
        dispatch(getLoggedInUserPhoto(decoded.id));
    }
}

export const setCurrentUser = (decoded, rememberMe, message=false) => {
    return {
      type: actionTypes.LOGIN_SUCCESS,
      User: decoded,
      rememberMe,
      successMessage: message
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);

    dispatch({
        type: actionTypes.LOGOUT,
        User: {}
    });
}

export const userUpdateProfilePicture = (formData, config) => async dispatch => {

    dispatch({ type: actionTypes.PROFILE_PICTURE_UPDATE_START });
    const response = await axios.put('/api/users/updateprofilepicture',formData, config);
    if(response.data.failedMessage){
        dispatch({type: actionTypes.PROFILE_PICTURE_UPDATE_FAILED, failedMessage: response.data.failedMessage});
        setTimeout(() => {
            dispatch({type: actionTypes.PROFILE_PICTURE_CLEAR_MESSAGES});
        }, 4000);
    }else {
        dispatch({type: actionTypes.PROFILE_PICTURE_UPDATE_SUCCESS, successMessage: response.data.successMessage});

        setTimeout(() => {
            dispatch({type: actionTypes.PROFILE_PICTURE_CLEAR_MESSAGES});
        }, 4000);
    }
}