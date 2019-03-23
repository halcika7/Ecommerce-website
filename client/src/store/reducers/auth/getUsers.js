import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
    Users: [],
    SingleUser: {},
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
                successMessage: action.successMessage,
                loading: false
            }),
        [actionTypes.GET_ALL_USERS_FAILED] : 
            updateObject(state, {
                failedMessage: action.failedMessage
            }),
        [actionTypes.GET_SINGLE_USER_SUCCESS] : 
            updateObject(state, {
                SingleUser: {
                    ...action.User,
                    role: {...action.role}
                },
                successMessage: action.successMessage
            }),
        [actionTypes.GET_SINGLE_USER_FAILED] : 
            updateObject(state, {
                ...initialState,
                failedMessage: action.failedMessage
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
        default: state
    }

    return actions[action.type] || actions.default;
}

export default reducer;