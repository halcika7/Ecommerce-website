import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
    Roles: [],
    Role: {},
    failedMessage: false,
    successMessage: false,
    loading: false
}

const reducer = (state = initialState, action) => {
    const actions = {
        [actionTypes.ROLE_START] :
            updateObject(state, {
                failedMessage:false,
                successMessage: false,
                loading: true
            }),
        [actionTypes.ADD_USER_ROLE_SUCCESS] :
            updateObject(state, {
                successMessage: action.successMessage,
                loading: false
            }),
        [actionTypes.ADD_USER_ROLE_FAILED] :
            updateObject(state, {
                failedMessage: action.failedMessage,
                loading: false
            }),
        [actionTypes.GET_USER_ROLES_SUCCESS] : 
            updateObject(state, {
                Roles: action.Roles,
                loading: false
            }),
        [actionTypes.GET_USER_ROLES_FAILED] : 
            updateObject(state, {
                failedMessage: action.failedMessage,
                successMessage: false
            }),
        [actionTypes.DELETE_ALL_USER_ROLES_FAILED] :
            updateObject(state, {
                failedMessage: action.failedMessage,
                loading: false
            }),
        [actionTypes.DELETE_USER_ROLE_FAILED] :
            updateObject(state, {
                failedMessage: action.failedMessage,
                loading: false
            }),
        [actionTypes.GET_ROLE_FAILED] :
            updateObject(state, {
                ...initialState,
                failedMessage: action.failedMessage
            }),
        [actionTypes.GET_ROLE_SUCCESS] :
            updateObject(state, {
                ...initialState,
                Role: action.role
            }),
        [actionTypes.UPDATE_ROLE_START] : 
            updateObject(state, {
                Role: {},
                successMessage: false,
                failedMessage: false
            }),
        [actionTypes.UPDATE_ROLE_FAILED] : 
            updateObject(state, {
                failedMessage: action.failedMessage
            }),
        [actionTypes.UPDATE_ROLE_SUCCESS] :
            updateObject(state, {
                successMessage: action.successMessage,
                Role: action.role
            }),
        default: state
    }

    return actions[action.type] || actions.default;
}

export default reducer;