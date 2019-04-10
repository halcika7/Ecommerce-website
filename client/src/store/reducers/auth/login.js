import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialStateLogin = {
    usernameEmail: '',
    password: '',
    rememberMe: false,
    errors: {
        usernameEmail: '',
        password: ''
    },
    User: {
        isAdmin: false
    },
    isAuthenticated: false,
    successMessage: false,
    failedMessage: false,
    loading: false
}

const reducer = (state = initialStateLogin, action) => {
    const actions = {
        [actionTypes.LOGIN_START] :
            updateObject(state, {
                ...initialStateLogin,
                loading: true
            }),
        [actionTypes.LOGIN_SUCCESS] : 
            updateObject(state, {
                ...initialStateLogin,
                User:{...action.User},
                rememberMe: action.rememberMe,
                isAuthenticated: true,
                successMessage: action.successMessage
            }),
        [actionTypes.PROFILE_PICTURE_UPDATE_START] : 
            updateObject(state, {
                loading: true
            }),
        [actionTypes.PROFILE_PICTURE_UPDATE_SUCCESS] : 
            updateObject(state, {
                successMessage: action.successMessage,
                loading: false
            }),
        [actionTypes.LOGIN_FAILED] : 
            updateObject(state, {
                ...action.UserInfo,
                errors: {...action.errors},
                isAuthenticated: false,
                failedMessage: action.failedMessage,
                loading: false
            }),
        [actionTypes.PROFILE_PICTURE_UPDATE_FAILED] : 
            updateObject(state, {
                failedMessage: action.failedMessage,
                loading: false
            }),
        [actionTypes.PROFILE_PICTURE_CLEAR_MESSAGES] :
            updateObject(state, {
                failedMessage: '',
                successMessage: ''
            }),
        [actionTypes.LOGOUT] : 
            updateObject(state, {
                ...initialStateLogin,
                User: action.User,
                isAuthenticated: false
            }),
        default: state
    }

    return actions[action.type] || actions.default;
}

export default reducer;