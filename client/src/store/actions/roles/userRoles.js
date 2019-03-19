import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getRoles = () => async dispatch => {
    try{

        const response = await axios.get('/api/users/userroles');

        dispatch({ type: actionTypes.GET_USER_ROLES_SUCCESS, Roles: response.data })

    }catch(err) {
        console.log(err);
    }
}