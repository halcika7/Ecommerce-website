import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
    Roles: [],
    failedMessage: false,
    successMessage: false,
    loading: false
}

const reducer = (state = initialState, action) => {
    const actions = {
        [actionTypes.ADD_USER_ROLE_START] :
            updateObject(state, {
                ...initialState,
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
                ...initialState,
                Roles: action.Roles
            }),
        default: state
    }

    return actions[action.type] || actions.default;
}

export default reducer;