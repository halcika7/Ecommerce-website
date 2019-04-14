import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
    Users: [],
    SingleUser: {},
    errorID: false,
    profilePicture: false,
    failedMessage: false,
    successMessage: false,
    loading: true
}

const reducer = (state = initialState, action) => {
    const actions = {
        [actionTypes.GET_ALL_USERS_START] :
            updateObject(state, {
                ...initialState
            }),
        [actionTypes.GET_ALL_USERS_SUCCESS] : 
            updateObject(state, {
                ...initialState,
                Users:{...action.Users},
                loading: false
            }),
        [actionTypes.GET_ALL_USERS_FAILED] : 
            updateObject(state, {
                failedMessage: action.failedMessage
            }),
        [actionTypes.GET_SINGLE_USER_SUCCESS] : 
            updateObject(state, {
                SingleUser: {
                    ...action.User
                }
            }),
        [actionTypes.GET_SINGLE_USER_FAILED] : 
            updateObject(state, {
                ...initialState,
                failedMessage: action.failedMessage ? action.failedMessage : false,
                errorID: action.errorID ? action.errorID : false
            }),
        [actionTypes.DELETE_SINGLE_USER_START] :
            updateObject(state, {
                failedMessage: false,
                successMessage: false
            }),
        [actionTypes.DELETE_SINGLE_USER_SUCCESS] :
            updateObject(state, {
                successMessage: action.successMessage,
                loading: true
            }),
        [actionTypes.DELETE_SINGLE_USER_FAILED] :
            updateObject(state, {
                failedMessage: action.failedMessage,
                loading: true
            }),
        [actionTypes.GET_USER_PHOTO_FAILED] : 
            updateObject(state, {
                failedMessage: action.failedMessage
            }),
        [actionTypes.GET_USER_PHOTO_SUCCESS] : 
            updateObject(state, {
                profilePicture: action.photo
            }),
        [actionTypes.CLEAR_MESSAGES] :
            updateObject(state, {
                failedMessage: false,
                successMessage: false
            }),
        default: state
    }
    return actions[action.type] || actions.default;
}

export default reducer;