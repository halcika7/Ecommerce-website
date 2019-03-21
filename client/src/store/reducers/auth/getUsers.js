import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
    Users: [],
    SingleUser: {},
    failedMessage: false,
    successMessage: false
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
                successMessage: action.successMessage
            }),
        [actionTypes.GET_ALL_USERS_FAILED] : 
            updateObject(state, {
                failedMessage: action.failedMessage
            }),
        [actionTypes.GET_SINGLE_USER_SUCCESS] : 
            updateObject(state, {
                SingleUser: {
                    ...action.User,
                    ...action.role
                },
                successMessage: action.successMessage
            }),
        [actionTypes.GET_SINGLE_USER_FAILED] : 
            updateObject(state, {
                ...initialState,
                failedMessage: action.failedMessage
            }),
        default: state
    }

    return actions[action.type] || actions.default;
}

export default reducer;