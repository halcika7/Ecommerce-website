import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
    Roles: []
}

const reducer = (state = initialState, action) => {
    const actions = {
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