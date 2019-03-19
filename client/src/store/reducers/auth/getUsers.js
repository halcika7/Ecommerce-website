import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
    Users: {},
    SingleUser: {},
    failedMessage: '',
    successMessage: ''
}

const reducer = (state = initialState, action) => {
    const actions = {
        [actionTypes.GET_ALL_USERS_SUCCESS] : 
            updateObject(state, {
                ...initialState,
                Users:{...action.Users}
            }),
        [actionTypes.GET_ALL_USERS_FAILED] : 
            updateObject(state, {
                failedMessage: action.failedMessage
            }),
        [actionTypes.GET_SINGLE_USER_SUCCESS] : 
            updateObject(state, {
                SingleUser: {...action.User}
            }),
        [actionTypes.DELETE_SUCCESS] : 
            updateObject(state, {
                ...initialState,
                successMessage: action.successMessage
            }),
        [actionTypes.CLEAR_MESSAGES] : 
            updateObject(state, {
                ...initialState,
                successMessage: '',
                failedMessage: ''
            }),
        default: state
    }

    return actions[action.type] || actions.default;
}

export default reducer;