import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const getAllUsers = () => async dispatch => {
    try{
        const response = await axios.get('/api/users/allusers')

        dispatch({type: actionTypes.GET_ALL_USERS_SUCCESS, Users: response.data})

    }catch (err) {
        console.log(err);
    }
}

export const getSingleUser = (id) => async dispatch => {
    try{

        const response = await axios.get('/api/users/singleuser?id=' + id)

        dispatch({type: actionTypes.GET_SINGLE_USER_SUCCESS, User: response.data})

    }catch (err) {
        console.log(err);
    }
}

export const deleteUser = (id) => async dispatch => {
    try{
        const response = await axios.delete('/api/users/deleteuser?id=' + id);

        dispatch({type: actionTypes.DELETE_SUCCESS, successMessage: response.data.successMessage});
        
        const res = await axios.get('/api/users/allusers')

        setTimeout(() => {
            dispatch({type: actionTypes.GET_ALL_USERS_SUCCESS, Users: res.data})
        }, 4000);

    }catch(err) {
        console.log(err);
    }
}