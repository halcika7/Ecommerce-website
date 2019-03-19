import jwt_decode from 'jwt-decode';
import { store } from '../store/store';

import setAuthToken from './setAuthToken';
import * as actions from '../store/actions';

export const checkLoggedInUser = () => {
    if(localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const decoded = jwt_decode(localStorage.jwtToken);
        store.dispatch(actions.setCurrentUser(decoded));

        const currentTime = Date.now() / 1000;
    
        if(decoded.exp < currentTime) {
            store.dispatch(actions.logoutUser());
        }
    }
}

export const clearResetState = () => {
    store.dispatch(actions.resetState())
}

