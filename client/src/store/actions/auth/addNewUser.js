import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const addNewUser = userData => async dispatch => {
    console.log(userData);
    const response = await axios.post('/api/users/adduser', userData);
}